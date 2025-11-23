/**
 * Channel Video Sync System
 *
 * Syncs videos from YouTube channels to the database.
 * Includes:
 * - Fetching latest videos from YouTube
 * - Updating existing videos with new metrics
 * - Calculating channel averages
 * - Running outlier detection
 * - Auto-fetching transcripts for outliers
 */

import { createClient } from '@/lib/supabase/server';
import { getChannelVideos } from '@/lib/youtube/api';
import { calculateChannelAverages, calculateOutlierScore } from '@/lib/analytics/outlier-detection';
import { fetchTranscript } from '@/lib/youtube/transcript';
import { TablesInsert, TablesUpdate } from '@/types/database';

interface ChannelData {
  id: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
}

export interface SyncResult {
  success: boolean;
  channelId: string;
  videosAdded: number;
  videosUpdated: number;
  outliersFound: number;
  transcriptsFetched: number;
  error?: string;
}

/**
 * Sync videos for a specific channel
 *
 * @param channelId - Database channel ID (UUID)
 * @returns Sync result with statistics
 */
export async function syncChannelVideos(channelId: string): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    channelId,
    videosAdded: 0,
    videosUpdated: 0,
    outliersFound: 0,
    transcriptsFetched: 0
  };

  try {
    const supabase = createClient();

    // 1. Get channel info from database
    const { data, error: channelError } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .single();

    if (channelError || !data) {
      result.error = 'Channel not found';
      return result;
    }

    const channel = data as ChannelData;

    // 2. Fetch latest videos from YouTube
    const youtubeVideos = await getChannelVideos(channel.channel_id, 50);

    if (!youtubeVideos || youtubeVideos.length === 0) {
      result.error = 'No videos found on YouTube';
      return result;
    }

    // 3. Process each video
    for (const ytVideo of youtubeVideos) {
      // Check if video already exists
      const { data: existingVideo } = await supabase
        .from('videos')
        .select('id, view_count, like_count, comment_count')
        .eq('video_id', ytVideo.videoId)
        .single();

      const engagementRate = ytVideo.views > 0
        ? (ytVideo.likes + ytVideo.comments) / ytVideo.views
        : 0;

      if (existingVideo) {
        // Update existing video
        const updateData: TablesUpdate<'videos'> = {
          view_count: ytVideo.views,
          like_count: ytVideo.likes,
          comment_count: ytVideo.comments,
          engagement_rate: engagementRate,
          updated_at: new Date().toISOString()
        };

        const { error: updateError } = await supabase
          .from('videos')
          // @ts-ignore - Supabase auth-helpers type inference issue
          .update(updateData)
          // @ts-ignore - Supabase auth-helpers type inference issue
          .eq('id', existingVideo.id)
          .select();

        if (!updateError) {
          result.videosUpdated++;
        }
      } else {
        // Insert new video
        const insertData: TablesInsert<'videos'> = {
          channel_id: channelId,
          platform: 'youtube',
          video_id: ytVideo.videoId,
          title: ytVideo.title,
          description: ytVideo.description || '',
          thumbnail_url: ytVideo.thumbnail,
          duration: ytVideo.duration,
          published_at: ytVideo.publishedAt,
          view_count: ytVideo.views,
          like_count: ytVideo.likes,
          comment_count: ytVideo.comments,
          engagement_rate: engagementRate
        };

        const { error: insertError } = await supabase
          .from('videos')
          // @ts-ignore - Supabase auth-helpers type inference issue
          .insert(insertData)
          .select();

        if (!insertError) {
          result.videosAdded++;
        }
      }
    }

    // 4. Calculate channel averages and detect outliers
    await detectAndMarkOutliers(channelId);

    // 5. Count outliers found
    const { count: outlierCount } = await supabase
      .from('videos')
      .select('id', { count: 'exact', head: true })
      .eq('channel_id', channelId)
      .eq('is_outlier', true);

    result.outliersFound = outlierCount || 0;

    // 6. Fetch transcripts for outliers (if they don't have one)
    result.transcriptsFetched = await fetchTranscriptsForOutliers(channelId);

    // 7. Update channel's last_synced_at
    await supabase
      .from('channels')
      // @ts-ignore - Supabase auth-helpers type inference issue
      .update({ last_synced_at: new Date().toISOString() })
      .eq('id', channelId)
      .select();

    result.success = true;

  } catch (error) {
    console.error('Error syncing channel:', error);
    result.error = error instanceof Error ? error.message : 'Unknown error';
  }

  return result;
}

/**
 * Detect outliers and update videos table
 */
async function detectAndMarkOutliers(channelId: string): Promise<void> {
  const supabase = createClient();

  // Get all videos for this channel
  const { data: videos } = await supabase
    .from('videos')
    .select('id, view_count, like_count, comment_count')
    .eq('channel_id', channelId);

  if (!videos || videos.length === 0) return;

  // Type assertion for PostgrestVersion compatibility
  type VideoMetrics = { id: string; view_count: number | null; like_count: number | null; comment_count: number | null };
  const typedVideos = videos as VideoMetrics[];

  // Calculate channel averages
  const videoMetrics = typedVideos.map(v => ({
    views: v.view_count || 0,
    likes: v.like_count || 0,
    comments: v.comment_count || 0
  }));

  const channelAvg = calculateChannelAverages(videoMetrics);

  // Update channel with averages
  await supabase
    .from('channels')
    // @ts-ignore - Supabase auth-helpers type inference issue
    .update({
      avg_view_count: Math.round(channelAvg.avgViews),
      avg_engagement_rate: channelAvg.avgEngagementRate
    })
    .eq('id', channelId)
    .select();

  // Calculate outlier score for each video
  for (const video of typedVideos) {
    const metrics = {
      views: video.view_count || 0,
      likes: video.like_count || 0,
      comments: video.comment_count || 0
    };

    const outlierResult = calculateOutlierScore(metrics, channelAvg);

    // Update video with outlier status
    await supabase
      .from('videos')
      // @ts-ignore - Supabase auth-helpers type inference issue
      .update({
        is_outlier: outlierResult.isOutlier,
        outlier_score: outlierResult.score
      })
      .eq('id', video.id)
      .select();
  }
}

/**
 * Fetch transcripts for outlier videos that don't have one
 */
async function fetchTranscriptsForOutliers(channelId: string): Promise<number> {
  const supabase = createClient();
  let transcriptsFetched = 0;

  // Get outlier videos without transcripts
  const { data: outliers } = await supabase
    .from('videos')
    .select('id, video_id')
    .eq('channel_id', channelId)
    .eq('is_outlier', true)
    .is('transcript', null);

  if (!outliers || outliers.length === 0) return 0;

  // Type assertion for PostgrestVersion compatibility
  type OutlierVideo = { id: string; video_id: string };
  const typedOutliers = outliers as OutlierVideo[];

  // Fetch transcripts (with rate limiting)
  for (const video of typedOutliers) {
    try {
      const transcript = await fetchTranscript(video.video_id);

      if (transcript) {
        await supabase
          .from('videos')
          // @ts-ignore - Supabase auth-helpers type inference issue
          .update({
            transcript,
            transcript_fetched_at: new Date().toISOString()
          })
          .eq('id', video.id)
          .select();

        transcriptsFetched++;
      }

      // Rate limiting: wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to fetch transcript for video ${video.video_id}:`, error);
    }
  }

  return transcriptsFetched;
}

/**
 * Sync multiple channels in batch
 *
 * @param channelIds - Array of channel IDs to sync
 * @param concurrent - Number of channels to sync concurrently (default: 3)
 * @returns Array of sync results
 */
export async function syncChannelsBatch(
  channelIds: string[],
  concurrent: number = 3
): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  // Process in batches to avoid overwhelming APIs
  for (let i = 0; i < channelIds.length; i += concurrent) {
    const batch = channelIds.slice(i, i + concurrent);

    const batchResults = await Promise.allSettled(
      batch.map(id => syncChannelVideos(id))
    );

    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        console.error('Batch sync error:', result.reason);
      }
    });

    // Wait between batches to respect rate limits
    if (i + concurrent < channelIds.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return results;
}

/**
 * Get channels that need syncing (last synced > 6 hours ago or never synced)
 *
 * @param limit - Maximum number of channels to return
 * @returns Array of channel IDs
 */
export async function getChannelsNeedingSync(limit: number = 10): Promise<string[]> {
  const supabase = createClient();
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

  const { data: channels } = await supabase
    .from('channels')
    .select('id')
    .or(`last_synced_at.is.null,last_synced_at.lt.${sixHoursAgo}`)
    .order('last_synced_at', { ascending: true, nullsFirst: true })
    .limit(limit);

  type ChannelId = { id: string };
  return (channels as ChannelId[] | null)?.map(c => c.id) || [];
}

/**
 * Sync all channels for a specific user
 *
 * @param userId - User ID
 * @returns Array of sync results
 */
export async function syncUserChannels(userId: string): Promise<SyncResult[]> {
  const supabase = createClient();

  // Get all user's channels
  const { data: channels } = await supabase
    .from('channels')
    .select('id')
    .eq('user_id', userId);

  if (!channels || channels.length === 0) {
    return [];
  }

  type ChannelId = { id: string };
  const channelIds = (channels as ChannelId[]).map(c => c.id);
  return syncChannelsBatch(channelIds, 3);
}

/**
 * Get sync statistics for a channel
 */
export async function getChannelSyncStats(channelId: string): Promise<{
  totalVideos: number;
  outliers: number;
  videosWithTranscripts: number;
  lastSyncedAt: string | null;
} | null> {
  const supabase = createClient();

  const { data: channel } = await supabase
    .from('channels')
    .select('last_synced_at')
    .eq('id', channelId)
    .single();

  if (!channel) return null;

  type ChannelSync = { last_synced_at: string | null };
  const typedChannel = channel as ChannelSync;

  const { count: totalVideos } = await supabase
    .from('videos')
    .select('id', { count: 'exact', head: true })
    .eq('channel_id', channelId);

  const { count: outliers } = await supabase
    .from('videos')
    .select('id', { count: 'exact', head: true })
    .eq('channel_id', channelId)
    .eq('is_outlier', true);

  const { count: videosWithTranscripts } = await supabase
    .from('videos')
    .select('id', { count: 'exact', head: true })
    .eq('channel_id', channelId)
    .not('transcript', 'is', null);

  return {
    totalVideos: totalVideos || 0,
    outliers: outliers || 0,
    videosWithTranscripts: videosWithTranscripts || 0,
    lastSyncedAt: typedChannel.last_synced_at
  };
}
