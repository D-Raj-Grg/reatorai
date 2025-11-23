/**
 * Loading Skeleton Components
 *
 * Reusable skeleton components matching actual content layout
 * for a smooth loading experience
 */

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Video Card Skeleton
 * Matches VideoCard component layout
 */
export function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Thumbnail */}
      <Skeleton className="aspect-video w-full" />

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-10 w-full" />

        {/* Channel Info */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Engagement Bar */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-1.5 w-full" />
        </div>

        {/* Date */}
        <Skeleton className="h-3 w-24" />

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Channel Card Skeleton
 * Matches ChannelCard component layout
 */
export function ChannelCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header with avatar */}
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Channel name */}
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Last synced */}
        <Skeleton className="h-3 w-32" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 gap-2">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-10" />
      </CardFooter>
    </Card>
  );
}

/**
 * Watchlist Card Skeleton
 * Matches WatchlistCard component layout
 */
export function WatchlistCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header with color */}
      <CardHeader className="p-4 bg-muted">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardHeader>

      {/* Content with stats */}
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1">
            <Skeleton className="h-8 w-full mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-8 w-full mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-8 w-full mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}

/**
 * Script Card Skeleton
 * Matches ScriptCard component layout
 */
export function ScriptCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 pt-0 space-y-3">
        {/* Script preview */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Video Detail Skeleton
 * For video detail pages
 */
export function VideoDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back button */}
      <Skeleton className="h-9 w-24" />

      {/* Video header */}
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Thumbnail */}
        <Skeleton className="aspect-video w-full rounded-lg" />

        {/* Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Channel */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Card>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Grid Loading Skeleton
 * Generic grid layout with specified skeleton component
 */
interface GridSkeletonProps {
  count?: number;
  SkeletonComponent: React.ComponentType;
}

export function GridSkeleton({ count = 6, SkeletonComponent }: GridSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

/**
 * Script Detail Skeleton
 * For script detail pages
 */
export function ScriptDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back button */}
      <Skeleton className="h-9 w-24" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Script content - 2/3 */}
        <div className="md:col-span-2 space-y-6">
          {/* Hook */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Body */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>

          {/* CTA */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Source video */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * List Loading Skeleton
 * Single column list layout
 */
interface ListSkeletonProps {
  count?: number;
  SkeletonComponent: React.ComponentType;
}

export function ListSkeleton({ count = 5, SkeletonComponent }: ListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
