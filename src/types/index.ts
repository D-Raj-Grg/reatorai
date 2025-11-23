// Shared TypeScript types for ReatorAI

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Channel {
  id: string;
  user_id: string;
  platform: string;
  channel_id: string;
  channel_name: string;
  channel_handle?: string;
  thumbnail_url?: string;
  description?: string;
  subscriber_count?: number;
  total_videos?: number;
  avg_view_count?: number;
  avg_engagement_rate?: number;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  channel_id: string;
  platform: string;
  video_id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  duration?: number;
  published_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  engagement_rate?: number;
  is_outlier: boolean;
  outlier_score?: number;
  transcript?: string;
  transcript_fetched_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  channel_count: number;
  total_videos: number;
  total_outliers: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Script {
  id: string;
  user_id: string;
  source_video_id?: string;
  writing_style_id?: string;
  hook_format?: string;
  storytelling_framework?: string;
  topic?: string;
  hook_text?: string;
  body_text?: string;
  cta_text?: string;
  visual_suggestions?: string;
  full_script?: string;
  estimated_duration?: number;
  word_count?: number;
  tokens_used?: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoAnalysis {
  id: string;
  video_id: string;
  user_id: string;
  hook_analysis?: string;
  storytelling_analysis?: string;
  emotional_triggers?: string;
  visual_format?: string;
  cta_analysis?: string;
  key_takeaways?: string;
  full_analysis?: string;
  tokens_used?: number;
  analyzed_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_type: 'free' | 'pro' | 'creator' | 'team';
  max_scripts_per_month: number;
  max_analyses_per_month: number;
  max_channels: number;
  scripts_used_this_month: number;
  analyses_used_this_month: number;
  channels_count: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// YouTube API Types
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
  duration: number;
  views: number;
  likes: number;
  comments: number;
}
