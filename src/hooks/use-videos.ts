import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Video analysis data structure
 */
export interface VideoAnalysis {
  id: string;
  hook_analysis: string | null;
  storytelling_analysis: string | null;
  emotional_triggers: string | null;
  visual_format: string | null;
  cta_analysis: string | null;
  key_takeaways: string | null;
  full_analysis: string | null;
  tokens_used: number | null;
  analyzed_at: string | null;
}

/**
 * Video data structure matching the VideoCard component expectations
 */
export interface VideoData {
  id: string;
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagementRate: number;
  isOutlier: boolean;
  outlierScore?: number;
  hasTranscript: boolean;
  hasAnalysis: boolean;
  transcript?: string | null;
  transcriptFetchedAt?: string | null;
  analysis?: VideoAnalysis | null;
  channel: {
    id: string;
    name: string;
    handle?: string;
    thumbnailUrl: string;
  };
}

export interface VideoFilters {
  search?: string;
  channelId?: string;
  watchlistId?: string;
  isOutlier?: boolean;
  sortBy?: 'views' | 'engagement' | 'date';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface VideosResponse {
  success: boolean;
  videos: VideoData[];
  total: number;
  page: number;
  hasMore: boolean;
}

/**
 * Hook to fetch videos with optional filters
 */
export function useVideos(filters: VideoFilters = {}) {
  return useQuery<VideosResponse>({
    queryKey: ['videos', filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.search) params.set('search', filters.search);
      if (filters.channelId) params.set('channelId', filters.channelId);
      if (filters.watchlistId) params.set('watchlistId', filters.watchlistId);
      if (filters.isOutlier) params.set('isOutlier', 'true');
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());

      const response = await fetch(`/api/videos?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single video by ID
 */
export function useVideo(videoId: string | undefined) {
  return useQuery<{ success: boolean; video: VideoData }>({
    queryKey: ['video', videoId],
    queryFn: async () => {
      if (!videoId) return null;

      const response = await fetch(`/api/videos/${videoId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }
      return response.json();
    },
    enabled: !!videoId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to analyze a video using AI
 */
export function useAnalyzeVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      const response = await fetch(`/api/videos/${videoId}/analyze`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to analyze video');
      }

      return data;
    },
    onSuccess: (data, videoId) => {
      // Invalidate video queries to refetch with new analysis
      queryClient.invalidateQueries({ queryKey: ['video', videoId] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });

      // Show success message
      if (data.fromCache) {
        toast.success('Analysis loaded from cache');
      } else {
        toast.success('Video analyzed successfully!', {
          description: `${data.remaining} analyses remaining this month`,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to analyze video', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to fetch transcript for a video
 */
export function useFetchTranscript() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      const response = await fetch(`/api/videos/${videoId}/transcript`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transcript');
      }

      return data;
    },
    onSuccess: (data, videoId) => {
      // Invalidate video queries to refetch with new transcript
      queryClient.invalidateQueries({ queryKey: ['video', videoId] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });

      toast.success('Transcript fetched successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to fetch transcript', {
        description: error.message,
      });
    },
  });
}
