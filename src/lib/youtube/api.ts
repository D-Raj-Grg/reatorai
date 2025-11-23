// YouTube Data API v3 integration
// Reference: https://developers.google.com/youtube/v3/docs

import { google } from 'googleapis';

// Initialize YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export interface YouTubeChannelInfo {
  id: string;
  name: string;
  handle?: string;
  thumbnail: string;
  subscribers: number;
  totalVideos: number;
  description?: string;
}

export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  description?: string;
  thumbnail: string;
  publishedAt: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
}

/**
 * Fetch channel information from YouTube API
 * @param channelId - YouTube channel ID (UC...) or handle (@username)
 * @returns Channel information
 */
export async function getChannelInfo(channelId: string): Promise<YouTubeChannelInfo> {
  try {
    // Handle different input types
    let searchBy: 'id' | 'forHandle' = 'id';
    let identifier = channelId;

    // If it's a handle (@username)
    if (channelId.startsWith('@')) {
      searchBy = 'forHandle';
      identifier = channelId.substring(1); // Remove @ prefix
    }

    const params = searchBy === 'id'
      ? { part: ['snippet', 'statistics'], id: [identifier] }
      : { part: ['snippet', 'statistics'], forHandle: identifier };

    const response = await youtube.channels.list(params);

    const channel = response.data.items?.[0];
    if (!channel) {
      throw new Error('Channel not found');
    }

    return {
      id: channel.id!,
      name: channel.snippet!.title!,
      handle: channel.snippet!.customUrl,
      thumbnail: channel.snippet!.thumbnails!.default!.url!,
      subscribers: parseInt(channel.statistics!.subscriberCount || '0'),
      totalVideos: parseInt(channel.statistics!.videoCount || '0'),
      description: channel.snippet!.description,
    };
  } catch (error) {
    console.error('Error fetching channel info:', error);
    throw new Error(`Failed to fetch channel info: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch videos from a YouTube channel
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of videos to fetch (default: 50)
 * @returns Array of video information
 */
export async function getChannelVideos(
  channelId: string,
  maxResults: number = 50
): Promise<YouTubeVideoInfo[]> {
  try {
    // Step 1: Get the uploads playlist ID
    const channelResponse = await youtube.channels.list({
      part: ['contentDetails'],
      id: [channelId],
    });

    const uploadsPlaylistId = channelResponse.data.items?.[0]
      ?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Uploads playlist not found');
    }

    // Step 2: Get videos from uploads playlist
    const playlistResponse = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: uploadsPlaylistId,
      maxResults,
    });

    const videoIds = playlistResponse.data.items?.map(
      (item) => item.contentDetails!.videoId!
    ) || [];

    if (videoIds.length === 0) {
      return [];
    }

    // Step 3: Get detailed stats for each video
    const videosResponse = await youtube.videos.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: videoIds,
    });

    return videosResponse.data.items?.map((video) => ({
      videoId: video.id!,
      title: video.snippet!.title!,
      description: video.snippet!.description,
      thumbnail: video.snippet!.thumbnails!.high!.url!,
      publishedAt: video.snippet!.publishedAt!,
      duration: parseDuration(video.contentDetails!.duration!),
      views: parseInt(video.statistics!.viewCount || '0'),
      likes: parseInt(video.statistics!.likeCount || '0'),
      comments: parseInt(video.statistics!.commentCount || '0'),
    })) || [];
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw new Error(`Failed to fetch channel videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse ISO 8601 duration to seconds
 * @param duration - ISO 8601 duration string (e.g., "PT15M33S")
 * @returns Duration in seconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Parse YouTube channel URL to extract channel ID or handle
 * Supports multiple URL formats:
 * - https://youtube.com/channel/UC...
 * - https://youtube.com/@username
 * - https://youtube.com/c/ChannelName
 * - Just channel ID (UC...)
 * - Just handle (@username)
 *
 * @param url - YouTube channel URL or handle
 * @returns Channel ID or handle
 */
export function parseChannelUrl(url: string): string {
  // Remove whitespace
  url = url.trim();

  // If it's just a handle or channel ID, return as is
  if (url.startsWith('@') || url.startsWith('UC')) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Handle /channel/UC... format
    const channelMatch = pathname.match(/^\/channel\/(UC[\w-]+)/);
    if (channelMatch) {
      return channelMatch[1];
    }

    // Handle /@username format
    const handleMatch = pathname.match(/^\/@([\w-]+)/);
    if (handleMatch) {
      return `@${handleMatch[1]}`;
    }

    // Handle /c/ChannelName format (needs to be resolved via API)
    const customMatch = pathname.match(/^\/c\/([\w-]+)/);
    if (customMatch) {
      // For custom URLs, we'll try with @ prefix
      return `@${customMatch[1]}`;
    }

    // Handle /user/username format (old format)
    const userMatch = pathname.match(/^\/user\/([\w-]+)/);
    if (userMatch) {
      return `@${userMatch[1]}`;
    }

    throw new Error('Invalid YouTube URL format');
  } catch (error) {
    // If URL parsing fails, treat as potential channel ID
    if (url.startsWith('UC')) {
      return url;
    }
    throw new Error('Invalid YouTube channel URL or ID');
  }
}

/**
 * Track API quota usage
 * Note: This is a simple counter. YouTube API has a quota of 10,000 units/day
 * - channels.list: 1 unit
 * - playlistItems.list: 1 unit
 * - videos.list: 1 unit
 */
let quotaUsed = 0;

export function trackQuota(units: number): void {
  quotaUsed += units;
  console.log(`YouTube API quota used: ${quotaUsed} units`);

  if (quotaUsed > 8000) {
    console.warn('⚠️  Approaching YouTube API quota limit (10,000/day)');
  }
}

export function getQuotaUsage(): number {
  return quotaUsed;
}

export function resetQuota(): void {
  quotaUsed = 0;
  console.log('YouTube API quota reset');
}
