import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Script data structure
 */
export interface ScriptData {
  id: string;
  user_id: string;
  source_video_id: string | null;
  writing_style_id: string | null;
  hook_format: string | null;
  storytelling_framework: string | null;
  topic: string | null;
  hook_text: string | null;
  body_text: string | null;
  cta_text: string | null;
  visual_suggestions: string | null;
  full_script: string | null;
  estimated_duration: number | null;
  word_count: number | null;
  tokens_used: number | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  videos?: {
    id: string;
    video_id: string;
    title: string;
    thumbnail_url: string | null;
    view_count: number | null;
    published_at: string | null;
    channels?: {
      channel_name: string;
      channel_handle: string | null;
    } | null;
  } | null;
}

/**
 * Scripts query parameters
 */
export interface ScriptsQueryParams {
  search?: string;
  hookFormat?: string;
  framework?: string;
  favoritesOnly?: boolean;
  sortBy?: 'created_at' | 'updated_at' | 'is_favorite' | 'topic' | 'estimated_duration' | 'word_count';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Scripts response with pagination
 */
export interface ScriptsResponse {
  success: boolean;
  scripts: ScriptData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Generate script request parameters
 */
export interface GenerateScriptParams {
  videoId: string;
  hookFormat: string;
  framework: string;
  tone?: string;
  vocabularyLevel?: string;
  customTopic?: string;
  targetDuration?: number;
}

/**
 * Generate script response
 */
interface GenerateScriptResponse {
  success: boolean;
  script: ScriptData;
  metadata: {
    hookFormat: string;
    framework: string;
    tone: string;
    keyPoints: string[];
    pacing: string;
    voiceoverNotes: string;
    visualSuggestions: string[];
  };
  tokensUsed: number;
  remaining: number;
}

/**
 * Hook to fetch all scripts for the current user with filtering and pagination
 */
export function useScripts(params?: ScriptsQueryParams) {
  return useQuery<ScriptsResponse>({
    queryKey: ['scripts', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.search) searchParams.set('search', params.search);
      if (params?.hookFormat) searchParams.set('hookFormat', params.hookFormat);
      if (params?.framework) searchParams.set('framework', params.framework);
      if (params?.favoritesOnly) searchParams.set('favoritesOnly', 'true');
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const url = `/api/scripts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch scripts');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch a single script by ID
 */
export function useScript(scriptId: string | undefined) {
  return useQuery<{ success: boolean; script: ScriptData }>({
    queryKey: ['script', scriptId],
    queryFn: async () => {
      if (!scriptId) return null;

      const response = await fetch(`/api/scripts/${scriptId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch script');
      }
      return response.json();
    },
    enabled: !!scriptId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to generate a new script using AI
 */
export function useGenerateScript() {
  const queryClient = useQueryClient();

  return useMutation<GenerateScriptResponse, Error, GenerateScriptParams>({
    mutationFn: async (params: GenerateScriptParams) => {
      const response = await fetch('/api/scripts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate script');
      }

      return data;
    },
    onSuccess: (data) => {
      // Invalidate scripts queries to refetch with new script
      queryClient.invalidateQueries({ queryKey: ['scripts'] });
      queryClient.invalidateQueries({ queryKey: ['usage'] });

      // Show success message
      toast.success('Script generated successfully!', {
        description: `${data.remaining} scripts remaining this month`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to generate script', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to delete a script
 */
export function useDeleteScript() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scriptId: string) => {
      const response = await fetch(`/api/scripts/${scriptId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete script');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate scripts queries
      queryClient.invalidateQueries({ queryKey: ['scripts'] });

      toast.success('Script deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete script', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to toggle favorite status of a script
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scriptId, isFavorite }: { scriptId: string; isFavorite: boolean }) => {
      const response = await fetch(`/api/scripts/${scriptId}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favorite: isFavorite }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update favorite status');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate script queries
      queryClient.invalidateQueries({ queryKey: ['script', variables.scriptId] });
      queryClient.invalidateQueries({ queryKey: ['scripts'] });

      toast.success(variables.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    },
    onError: (error: Error) => {
      toast.error('Failed to update favorite status', {
        description: error.message,
      });
    },
  });
}
