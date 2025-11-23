"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVideos } from "@/hooks/use-videos";
import { useChannels } from "@/hooks/use-channels";
import { useWatchlists } from "@/hooks/use-watchlists";
import { VideoCard } from "@/components/videos/video-card";
import { VideoFilters, VideoFilterOptions } from "@/components/videos/video-filters";

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

  // Action handlers
  const handleAnalyze = (videoId: string) => {
    router.push(`/videos/${videoId}?tab=analysis`);
  };

  const handleGenerateScript = (videoId: string) => {
    router.push(`/scripts/new?videoId=${videoId}`);
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
          <h1 className="text-3xl font-bold">Videos</h1>
          <p className="text-muted-foreground">
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
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onAnalyze={handleAnalyze}
                onGenerateScript={handleGenerateScript}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {filters.search || filters.channelId || filters.watchlistId || filters.isOutlier
                ? "Try adjusting your filters to see more results"
                : "Add channels to your watchlists to start discovering viral content"}
            </p>
            {!filters.search && !filters.channelId && !filters.watchlistId && !filters.isOutlier && (
              <Button onClick={() => router.push("/channels")}>
                <Play className="mr-2 h-4 w-4" />
                Add Channels
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
