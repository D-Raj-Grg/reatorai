/**
 * VideoCard Component
 *
 * Displays a video with thumbnail, metadata, and action buttons.
 * Used in the video library and watchlist views.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, MessageCircle, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
  channel: {
    id: string;
    name: string;
    thumbnailUrl: string;
  };
}

interface VideoCardProps {
  video: VideoData;
  onAnalyze?: (videoId: string) => void;
  onGenerateScript?: (videoId: string) => void;
  onFetchTranscript?: (videoId: string) => void;
  compact?: boolean;
}

export function VideoCard({
  video,
  onAnalyze,
  onGenerateScript,
  onFetchTranscript,
  compact = false
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Thumbnail Section */}
      <Link href={`/videos/${video.id}`}>
        <div className="relative aspect-video bg-muted overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            priority={false}
          />

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>

          {/* Outlier Badge */}
          {video.isOutlier && (
            <Badge
              className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {video.outlierScore ? `${video.outlierScore.toFixed(1)}x` : 'Outlier'}
            </Badge>
          )}

          {/* Status Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {video.hasTranscript && (
              <Badge variant="secondary" className="text-xs">
                <FileText className="w-3 h-3" />
              </Badge>
            )}
            {video.hasAnalysis && (
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                Analyzed
              </Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <CardContent className="p-4">
        {/* Title */}
        <Link href={`/videos/${video.id}`}>
          <h3 className="font-semibold line-clamp-2 text-sm hover:text-primary transition-colors mb-2 min-h-[40px]">
            {video.title}
          </h3>
        </Link>

        {/* Channel Info */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={video.channel.thumbnailUrl}
            alt={video.channel.name}
            width={24}
            height={24}
            className="rounded-full"
            loading="lazy"
          />
          <span className="text-sm text-muted-foreground truncate">
            {video.channel.name}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1" title="Views">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(video.viewCount)}</span>
          </div>
          <div className="flex items-center gap-1" title="Likes">
            <ThumbsUp className="w-4 h-4" />
            <span>{formatNumber(video.likeCount)}</span>
          </div>
          <div className="flex items-center gap-1" title="Comments">
            <MessageCircle className="w-4 h-4" />
            <span>{formatNumber(video.commentCount)}</span>
          </div>
        </div>

        {/* Engagement Rate */}
        {!compact && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Engagement</span>
              <span>{(video.engagementRate * 100).toFixed(2)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${Math.min(video.engagementRate * 100 * 10, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Published Date */}
        {!compact && (
          <div className="text-xs text-muted-foreground mb-3">
            {formatRelativeTime(video.publishedAt)}
          </div>
        )}

        {/* Action Buttons */}
        {!video.hasTranscript ? (
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => onFetchTranscript?.(video.id)}
            >
              <FileText className="w-3 h-3 mr-1" />
              Fetch Transcript
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Transcript required for analysis & scripts
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onAnalyze?.(video.id)}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Analyze
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onGenerateScript?.(video.id)}
            >
              <FileText className="w-3 h-3 mr-1" />
              Script
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Format number to compact notation (e.g., 1.2K, 1.5M)
 */
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format duration in seconds to MM:SS or HH:MM:SS
 */
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format relative time (e.g., "2 days ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
