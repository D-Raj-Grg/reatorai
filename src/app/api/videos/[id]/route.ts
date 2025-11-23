import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await params;
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch video with channel and analysis data
    const { data: video, error } = await supabase
      .from('videos')
      .select(
        `
        *,
        channels (
          id,
          channel_name,
          channel_handle,
          thumbnail_url,
          user_id
        ),
        video_analyses (
          id,
          hook_analysis,
          storytelling_analysis,
          emotional_triggers,
          visual_format,
          cta_analysis,
          key_takeaways,
          full_analysis,
          tokens_used,
          analyzed_at
        )
      `
      )
      .eq('id', videoId)
      .single();

    if (error) {
      console.error('Error fetching video:', error);
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    // Check if user owns the channel
    if (!video.channels || video.channels.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - You do not own this channel' },
        { status: 403 }
      );
    }

    // Transform data to match VideoData interface
    const transformedVideo = {
      id: video.id,
      videoId: video.video_id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail_url,
      publishedAt: video.published_at,
      duration: video.duration || 0,
      viewCount: video.view_count || 0,
      likeCount: video.like_count || 0,
      commentCount: video.comment_count || 0,
      engagementRate: video.engagement_rate || 0,
      isOutlier: video.is_outlier || false,
      outlierScore: video.outlier_score,
      hasTranscript: !!video.transcript,
      transcript: video.transcript,
      transcriptFetchedAt: video.transcript_fetched_at,
      hasAnalysis: !!video.video_analyses,
      analysis: video.video_analyses || null,
      channel: {
        id: video.channels?.id || '',
        name: video.channels?.channel_name || '',
        handle: video.channels?.channel_handle || '',
        thumbnailUrl: video.channels?.thumbnail_url || '',
      },
    };

    return NextResponse.json(
      {
        success: true,
        video: transformedVideo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get video error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
