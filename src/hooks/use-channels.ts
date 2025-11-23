import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
  video_id: string;
  title: string;
  thumbnail_url?: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  published_at: string;
  is_outlier: boolean;
  outlier_score?: number;
}

export interface ChannelWithVideos extends Channel {
  videos: Video[];
}

/**
 * Hook to fetch all channels for the current user
 */
export function useChannels() {
  return useQuery({
    queryKey: ['channels'],
    queryFn: async () => {
      const response = await fetch('/api/channels');
      if (!response.ok) {
        throw new Error('Failed to fetch channels');
      }
      const data = await response.json();
      return data.channels as Channel[];
    },
  });
}

/**
 * Hook to fetch a single channel with its videos
 */
export function useChannel(channelId: string | undefined) {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: async () => {
      if (!channelId) return null;
      const response = await fetch(`/api/channels/${channelId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch channel');
      }
      const data = await response.json();
      return data.channel as ChannelWithVideos;
    },
    enabled: !!channelId,
  });
}

/**
 * Hook to add a new channel
 */
export function useAddChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (channelUrl: string) => {
      const response = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add channel');
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      toast.success(`Channel "${data.channel.channel_name}" added successfully!`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to delete a channel
 */
export function useDeleteChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (channelId: string) => {
      const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete channel');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      toast.success('Channel deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
