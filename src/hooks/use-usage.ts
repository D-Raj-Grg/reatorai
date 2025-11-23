import { useQuery } from '@tanstack/react-query';

export interface UsageStatus {
  canUse: boolean;
  remaining: number;
  limit: number;
  used: number;
  percentUsed: number;
  planType: string;
}

export interface AllUsageStatus {
  analyses: UsageStatus;
  scripts: UsageStatus;
  channels: UsageStatus;
}

/**
 * Hook to fetch current user's usage data
 */
export function useUsage() {
  return useQuery<{ success: boolean; usage: AllUsageStatus }>({
    queryKey: ['usage'],
    queryFn: async () => {
      const response = await fetch('/api/usage');
      if (!response.ok) {
        throw new Error('Failed to fetch usage');
      }
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}
