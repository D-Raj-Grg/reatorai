"use client";

import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Play, Sparkles, FileText, Eye, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVideo } from "@/hooks/use-videos";
import { formatDistanceToNow } from "date-fns";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function VideoDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";

  const { data, isLoading, error } = useVideo(id);

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
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

  if (error || !data || !data.success) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Play className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Video not found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              The video you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => router.push("/videos")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Videos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const video = data.video;

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/videos")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Video Header */}
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            {video.duration > 0 && (
              <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                {formatDuration(video.duration)}
              </Badge>
            )}
            {video.isOutlier && (
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500">
                ⚡ Outlier {video.outlierScore && `${video.outlierScore.toFixed(1)}x`}
              </Badge>
            )}
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link
                  href={`https://youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  className="hover:underline"
                >
                  Watch on YouTube →
                </Link>
                <span>
                  {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center gap-3">
              {video.channel.thumbnailUrl && (
                <img
                  src={video.channel.thumbnailUrl}
                  alt={video.channel.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{video.channel.name}</p>
                {video.channel.handle && (
                  <p className="text-sm text-muted-foreground">
                    {video.channel.handle}
                  </p>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="text-lg font-semibold">
                        {formatNumber(video.viewCount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Likes</p>
                      <p className="text-lg font-semibold">
                        {formatNumber(video.likeCount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Comments</p>
                      <p className="text-lg font-semibold">
                        {formatNumber(video.commentCount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="text-lg font-semibold">
                      {(video.engagementRate * 100).toFixed(2)}%
                    </p>
                    <div className="h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(video.engagementRate * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              {video.hasTranscript && (
                <Badge variant="secondary">
                  <FileText className="h-3 w-3 mr-1" />
                  Transcript
                </Badge>
              )}
              {video.hasAnalysis && (
                <Badge variant="secondary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Analyzed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-6">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {video.description || "No description available"}
                  </p>
                </div>

                {video.isOutlier && (
                  <div>
                    <h3 className="font-semibold mb-2">Outlier Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      This video is performing {video.outlierScore?.toFixed(1)}x better than the
                      channel's average, making it an outlier worth analyzing for viral patterns.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="mt-6">
            {video.hasAnalysis && video.analysis ? (
              <div className="space-y-4">
                {video.analysis.hook_analysis && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Hook Analysis</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.hook_analysis}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.storytelling_analysis && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Storytelling</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.storytelling_analysis}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.emotional_triggers && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Emotional Triggers</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.emotional_triggers}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.visual_format && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Visual Format</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.visual_format}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.cta_analysis && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Call to Action</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.cta_analysis}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.key_takeaways && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Key Takeaways</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {video.analysis.key_takeaways}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {video.analysis.analyzed_at && (
                  <p className="text-xs text-muted-foreground text-center">
                    Analyzed {formatDistanceToNow(new Date(video.analysis.analyzed_at), { addSuffix: true })}
                  </p>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Analyze this video to discover what makes it successful and learn viral
                    content patterns.
                  </p>
                  <Button
                    onClick={() => {
                      // TODO: Implement analyze action
                      alert("Analyze functionality will be implemented in the next phase");
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Video
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="mt-6">
            {video.hasTranscript && video.transcript ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Transcript</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(video.transcript || "");
                        alert("Transcript copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                    {video.transcript}
                  </div>
                  {video.transcriptFetchedAt && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Fetched {formatDistanceToNow(new Date(video.transcriptFetchedAt), { addSuffix: true })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Transcript Available</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    This video doesn't have a transcript yet. Transcripts are automatically
                    fetched for outlier videos.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
