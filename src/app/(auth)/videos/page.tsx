"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVideos, useFetchTranscript } from "@/hooks/use-videos";
import { useChannels } from "@/hooks/use-channels";
import { useWatchlists } from "@/hooks/use-watchlists";
import { VideoCard } from "@/components/videos/video-card";
import { VideoFilters, VideoFilterOptions } from "@/components/videos/video-filters";
import { GridSkeleton, VideoCardSkeleton } from "@/components/ui/loading-skeletons";

export default function VideosPage() {
  const router = useRouter();

  // Fetch channels and watchlists for filters
  const { data: channels } = useChannels();
  const { data: watchlists } = useWatchlists();

  // Filter state
  const [filters, setFilters] = useState<VideoFilterOptions>({
    search: "",
    channelId: undefined,
    watchlistId: undefined,
    isOutlier: false,
    sortBy: "date",
    sortOrder: "desc",
  });

  // Fetch videos with filters
  const { data: videosData, isLoading } = useVideos({
    search: filters.search || undefined,
    channelId: filters.channelId,
    watchlistId: filters.watchlistId,
    isOutlier: filters.isOutlier || undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    page: 1,
    limit: 50,
  });

  const videos = videosData?.videos || [];

  // Mutations
  const fetchTranscript = useFetchTranscript();

  // Action handlers
  const handleAnalyze = (videoId: string) => {
    router.push(`/videos/${videoId}?tab=analysis`);
  };

  const handleGenerateScript = (videoId: string) => {
    router.push(`/scripts/new?videoId=${videoId}`);
  };

  const handleFetchTranscript = async (videoId: string) => {
    try {
      await fetchTranscript.mutateAsync(videoId);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  // Transform channels for filter dropdown
  const channelOptions = channels?.map((channel) => ({
    id: channel.id,
    name: channel.channel_name,
  }));

  // Transform watchlists for filter dropdown
  const watchlistOptions = watchlists?.map((watchlist) => ({
    id: watchlist.id,
    name: watchlist.name,
  }));

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Videos</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Discover and analyze viral content from your tracked channels
          </p>
        </div>

        {/* Filters */}
        <VideoFilters
          filters={filters}
          onFilterChange={setFilters}
          channels={channelOptions}
          watchlists={watchlistOptions}
          showWatchlistFilter={true}
        />
      </div>

      {/* Videos List */}
      <div className="px-4 lg:px-6">
        {isLoading ? (
          <GridSkeleton count={6} SkeletonComponent={VideoCardSkeleton} />
        ) : videos && videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onAnalyze={handleAnalyze}
                onGenerateScript={handleGenerateScript}
                onFetchTranscript={handleFetchTranscript}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
            <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-8 mb-6 animate-float">
              <Play className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No videos found</h3>
            <p className="text-muted-foreground mb-6 max-w-md text-base leading-relaxed">
              {filters.search || filters.channelId || filters.watchlistId || filters.isOutlier
                ? "Try adjusting your filters to see more results. Clear filters or browse all videos."
                : "Start discovering viral content by adding YouTube channels to your watchlists. Track performance and find outlier videos."}
            </p>
            {!filters.search && !filters.channelId && !filters.watchlistId && !filters.isOutlier && (
              <Button size="lg" onClick={() => router.push("/channels")}>
                <Play className="mr-2 h-5 w-5" />
                Add Your First Channel
              </Button>
            )}
          </div>
        )}

        {/* Pagination info */}
        {videosData && videos.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Showing {videos.length} of {videosData.total} videos
            {videosData.hasMore && (
              <span className="ml-2">• More results available</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
