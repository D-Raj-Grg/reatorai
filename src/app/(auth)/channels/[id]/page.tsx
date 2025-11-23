"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Video, Users, ArrowLeft, Trash2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useChannel, useDeleteChannel, useSyncChannel } from "@/hooks/use-channels";
import { VideoCard } from "@/components/videos/video-card";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ChannelVideo {
  id: string;
  video_id: string;
  title: string;
  thumbnail_url: string | null;
  published_at: string;
  view_count: number | null;
  like_count: number | null;
  comment_count: number | null;
  is_outlier: boolean;
  outlier_score: number | null;
}

export default function ChannelDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: channelData, isLoading } = useChannel(id);
  const deleteChannel = useDeleteChannel();
  const syncChannel = useSyncChannel();

  const handleDelete = async () => {
    try {
      await deleteChannel.mutateAsync(id);
      router.push("/channels");
    } catch {
      // Error handling is done in the hook
    }
  };

  const handleSync = async () => {
    try {
      await syncChannel.mutateAsync(id);
    } catch {
      // Error handling is done in the hook
    }
  };

  const formatNumber = (num: number | undefined | null): string => {
    if (!num) return "0";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (!channelData) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Video className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Channel not found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              The channel you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Button onClick={() => router.push("/channels")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Channels
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const channel = channelData;
  const videos = (channel.videos || []) as ChannelVideo[];
  const outliers = videos.filter((v) => v.is_outlier);

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/channels")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Channel Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Channel Avatar */}
          <div className="relative">
            {channel.thumbnail_url ? (
              <Image
                src={channel.thumbnail_url}
                alt={channel.channel_name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-lg">
                <Video className="h-16 w-16 text-primary" />
              </div>
            )}
          </div>

          {/* Channel Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">{channel.channel_name}</h1>
              {channel.channel_handle && (
                <p className="text-lg text-muted-foreground">
                  {channel.channel_handle}
                </p>
              )}
              {channel.description && (
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                  {channel.description}
                </p>
              )}
            </div>

            {/* Stats - Minimal Design */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-y">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Subscribers</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(channel.subscriber_count)}
                  </p>
                </div>
              </div>

              <div className="h-12 w-px bg-border hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Videos</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(channel.total_videos)}
                  </p>
                </div>
              </div>

              <div className="h-12 w-px bg-border hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Synced</p>
                  <p className="text-2xl font-bold">{videos.length}</p>
                </div>
              </div>

              <div className="h-12 w-px bg-border hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Outliers</p>
                  <p className="text-2xl font-bold">
                    {outliers.length}
                    {videos.length > 0 && (
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({Math.round((outliers.length / videos.length) * 100)}%)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSync}
                  disabled={syncChannel.isPending}
                  variant="default"
                  size="lg"
                  className="font-semibold"
                >
                  {syncChannel.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  {syncChannel.isPending ? "Syncing..." : "Sync Videos"}
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  variant="outline"
                  size="lg"
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>

              {/* Sync Status */}
              {channel.last_synced_at && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>
                    Last synced{" "}
                    {formatDistanceToNow(new Date(channel.last_synced_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="px-4 lg:px-6">
        <div className="space-y-4">
          {/* Outliers Section */}
          {outliers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Outlier Videos</h2>
                </div>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1">
                  {outliers.length} viral {outliers.length === 1 ? 'video' : 'videos'}
                </Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {outliers.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={{
                      id: video.id,
                      videoId: video.video_id,
                      title: video.title,
                      thumbnailUrl: video.thumbnail_url || "",
                      publishedAt: video.published_at,
                      duration: 0,
                      viewCount: video.view_count || 0,
                      likeCount: video.like_count || 0,
                      commentCount: video.comment_count || 0,
                      engagementRate: 0,
                      isOutlier: video.is_outlier || false,
                      outlierScore: video.outlier_score ?? undefined,
                      hasTranscript: false,
                      hasAnalysis: false,
                      channel: {
                        id: channel.id,
                        name: channel.channel_name,
                        thumbnailUrl: channel.thumbnail_url || "",
                      },
                    }}
                    onAnalyze={(videoId) => router.push(`/videos/${videoId}?tab=analysis`)}
                    onGenerateScript={(videoId) =>
                      router.push(`/scripts/new?videoId=${videoId}`)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Videos Section */}
          {videos.length > 0 ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Video className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    {outliers.length > 0 ? "All Videos" : "Videos"}
                  </h2>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {videos.length} total
                </Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos
                  .filter((v) => !v.is_outlier)
                  .map((video) => (
                    <VideoCard
                      key={video.id}
                      video={{
                        id: video.id,
                        videoId: video.video_id,
                        title: video.title,
                        thumbnailUrl: video.thumbnail_url || "",
                        publishedAt: video.published_at,
                        duration: 0,
                        viewCount: video.view_count || 0,
                        likeCount: video.like_count || 0,
                        commentCount: video.comment_count || 0,
                        engagementRate: 0,
                        isOutlier: video.is_outlier || false,
                        outlierScore: video.outlier_score ?? undefined,
                        hasTranscript: false,
                        hasAnalysis: false,
                        channel: {
                          id: channel.id,
                          name: channel.channel_name,
                          thumbnailUrl: channel.thumbnail_url || "",
                        },
                      }}
                      onAnalyze={(videoId) => router.push(`/videos/${videoId}?tab=analysis`)}
                      onGenerateScript={(videoId) =>
                        router.push(`/scripts/new?videoId=${videoId}`)
                      }
                    />
                  ))}
              </div>
            </div>
          ) : (
            <Card className="border-2 border-dashed">
              <CardContent className="p-12 text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                  <Video className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to discover viral content?</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                  Sync this channel to fetch the latest videos, identify top performers, and discover what makes content go viral.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleSync}
                    disabled={syncChannel.isPending}
                    size="lg"
                    className="font-semibold"
                  >
                    {syncChannel.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Syncing {channel.channel_name}...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Sync {formatNumber(channel.total_videos)} Videos
                      </>
                    )}
                  </Button>
                  {syncChannel.isPending && (
                    <p className="text-sm text-muted-foreground animate-pulse">
                      This may take a few moments...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Channel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{channel.channel_name}&quot;? This will also
              delete all synced videos and analyses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteChannel.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
