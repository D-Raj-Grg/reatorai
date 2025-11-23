import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

export interface WatchlistWithChannels extends Watchlist {
  watchlist_channels: Array<{
    id: string;
    added_at: string;
    channels: {
      id: string;
      channel_id: string;
      channel_name: string;
      channel_handle?: string;
      thumbnail_url?: string;
      subscriber_count?: number;
      total_videos?: number;
      last_synced_at?: string;
    };
  }>;
}

interface CreateWatchlistData {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

interface UpdateWatchlistData {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  display_order?: number;
}

/**
 * Hook to fetch all watchlists for the current user
 */
export function useWatchlists() {
  return useQuery({
    queryKey: ['watchlists'],
    queryFn: async () => {
      const response = await fetch('/api/watchlists');
      if (!response.ok) {
        throw new Error('Failed to fetch watchlists');
      }
      const data = await response.json();
      return data.watchlists as Watchlist[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Hook to fetch a single watchlist with its channels
 */
export function useWatchlist(watchlistId: string | undefined) {
  return useQuery({
    queryKey: ['watchlist', watchlistId],
    queryFn: async () => {
      if (!watchlistId) return null;
      const response = await fetch(`/api/watchlists/${watchlistId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist');
      }
      const data = await response.json();
      return data.watchlist as WatchlistWithChannels;
    },
    enabled: !!watchlistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Hook to create a new watchlist
 */
export function useCreateWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWatchlistData) => {
      const response = await fetch('/api/watchlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create watchlist');
      }

      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast.success(`Watchlist "${data.watchlist.name}" created successfully!`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to update a watchlist
 */
export function useUpdateWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateWatchlistData }) => {
      const response = await fetch(`/api/watchlists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update watchlist');
      }

      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', variables.id] });
      toast.success('Watchlist updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to delete a watchlist
 */
export function useDeleteWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (watchlistId: string) => {
      const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete watchlist');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast.success('Watchlist deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to add a channel to a watchlist
 */
export function useAddChannelToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, channelId }: { watchlistId: string; channelId: string }) => {
      const response = await fetch(`/api/watchlists/${watchlistId}/channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add channel to watchlist');
      }

      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', variables.watchlistId] });
      toast.success('Channel added to watchlist');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to remove a channel from a watchlist
 */
export function useRemoveChannelFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, channelId }: { watchlistId: string; channelId: string }) => {
      const response = await fetch(`/api/watchlists/${watchlistId}/channels/${channelId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove channel from watchlist');
      }

      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', variables.watchlistId] });
      toast.success('Channel removed from watchlist');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to fetch videos from a watchlist
 */
export function useWatchlistVideos(
  watchlistId: string | undefined,
  filters: {
    isOutlier?: boolean;
    sortBy?: 'views' | 'engagement' | 'date';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: ['watchlist-videos', watchlistId, filters],
    queryFn: async () => {
      if (!watchlistId) return null;

      const params = new URLSearchParams();
      if (filters.isOutlier) params.set('isOutlier', 'true');
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());

      const response = await fetch(`/api/watchlists/${watchlistId}/videos?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist videos');
      }
      return response.json();
    },
    enabled: !!watchlistId,
  });
}
