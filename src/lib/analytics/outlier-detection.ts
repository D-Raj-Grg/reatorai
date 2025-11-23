/**
 * Outlier Detection Algorithm
 *
 * Identifies "outlier" videos that perform significantly better than
 * a channel's average, indicating viral potential.
 *
 * Algorithm:
 * - Calculate engagement rate for the video
 * - Compare to channel's average views and engagement
 * - Weighted score: 60% views ratio + 40% engagement ratio
 * - Mark as outlier if score >= 2.0 (2x better than average)
 */

export interface VideoMetrics {
  views: number;
  likes: number;
  comments: number;
}

export interface ChannelAverage {
  avgViews: number;
  avgEngagementRate: number;
}

export interface OutlierResult {
  isOutlier: boolean;
  score: number;
  viewRatio: number;
  engagementRatio: number;
  engagementRate: number;
}

/**
 * Calculate engagement rate for a video
 * Engagement = (Likes + Comments) / Views
 */
export function calculateEngagementRate(metrics: VideoMetrics): number {
  if (metrics.views === 0) return 0;

  const engagement = (metrics.likes + metrics.comments) / metrics.views;
  return engagement;
}

/**
 * Calculate outlier score for a video
 *
 * @param video - Video metrics (views, likes, comments)
 * @param channelAvg - Channel's average metrics
 * @returns OutlierResult with score and classification
 */
export function calculateOutlierScore(
  video: VideoMetrics,
  channelAvg: ChannelAverage
): OutlierResult {
  // Calculate engagement rate for this video
  const engagementRate = calculateEngagementRate(video);

  // Handle edge cases
  if (channelAvg.avgViews === 0 || channelAvg.avgEngagementRate === 0) {
    return {
      isOutlier: false,
      score: 0,
      viewRatio: 0,
      engagementRatio: 0,
      engagementRate
    };
  }

  // Calculate ratios compared to channel average
  const viewRatio = video.views / channelAvg.avgViews;
  const engagementRatio = engagementRate / channelAvg.avgEngagementRate;

  // Weighted score: 60% views, 40% engagement
  const outlierScore = (viewRatio * 0.6) + (engagementRatio * 0.4);

  // Mark as outlier if 2x better than average
  const isOutlier = outlierScore >= 2.0;

  return {
    isOutlier,
    score: outlierScore,
    viewRatio,
    engagementRatio,
    engagementRate
  };
}

/**
 * Calculate channel averages from a list of videos
 *
 * @param videos - Array of video metrics
 * @returns Channel average metrics
 */
export function calculateChannelAverages(
  videos: VideoMetrics[]
): ChannelAverage {
  if (videos.length === 0) {
    return {
      avgViews: 0,
      avgEngagementRate: 0
    };
  }

  // Calculate total views
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const avgViews = totalViews / videos.length;

  // Calculate average engagement rate
  const totalEngagementRate = videos.reduce((sum, v) => {
    return sum + calculateEngagementRate(v);
  }, 0);
  const avgEngagementRate = totalEngagementRate / videos.length;

  return {
    avgViews,
    avgEngagementRate
  };
}

/**
 * Batch process videos to identify outliers
 *
 * @param videos - Array of videos with metrics
 * @param channelAvg - Optional pre-calculated channel averages
 * @returns Array of videos with outlier scores
 */
export function detectOutliers(
  videos: VideoMetrics[],
  channelAvg?: ChannelAverage
): (VideoMetrics & OutlierResult)[] {
  // Calculate channel averages if not provided
  const avg = channelAvg || calculateChannelAverages(videos);

  // Calculate outlier score for each video
  return videos.map(video => ({
    ...video,
    ...calculateOutlierScore(video, avg)
  }));
}

/**
 * Get only outlier videos from a list
 *
 * @param videos - Array of videos with metrics
 * @param channelAvg - Optional pre-calculated channel averages
 * @returns Array of only outlier videos
 */
export function getOutlierVideos(
  videos: VideoMetrics[],
  channelAvg?: ChannelAverage
): (VideoMetrics & OutlierResult)[] {
  const processed = detectOutliers(videos, channelAvg);
  return processed.filter(v => v.isOutlier);
}

/**
 * Format outlier score for display
 *
 * @param score - Outlier score
 * @returns Formatted string (e.g., "2.5x")
 */
export function formatOutlierScore(score: number): string {
  return `${score.toFixed(1)}x`;
}

/**
 * Get outlier tier/badge based on score
 *
 * @param score - Outlier score
 * @returns Tier information
 */
export function getOutlierTier(score: number): {
  tier: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
  label: string;
  color: string;
} {
  if (score < 2.0) {
    return { tier: 'none', label: 'Normal', color: 'gray' };
  } else if (score < 3.0) {
    return { tier: 'bronze', label: 'Outlier', color: 'orange' };
  } else if (score < 5.0) {
    return { tier: 'silver', label: 'Strong Outlier', color: 'blue' };
  } else if (score < 10.0) {
    return { tier: 'gold', label: 'Viral', color: 'yellow' };
  } else {
    return { tier: 'platinum', label: 'Mega Viral', color: 'purple' };
  }
}
