"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { FileText, Plus, Search, Star, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useScripts, useToggleFavorite, type ScriptsQueryParams, type ScriptData } from "@/hooks/use-scripts"
import { HOOK_FORMATS, FRAMEWORKS } from "@/lib/openai/constants"
import { formatDistanceToNow } from "date-fns"
import { GridSkeleton, ScriptCardSkeleton } from "@/components/ui/loading-skeletons"

/**
 * Script Card Component
 */
function ScriptCard({ script }: { script: ScriptData }) {
  const toggleFavorite = useToggleFavorite()

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await toggleFavorite.mutateAsync({
        scriptId: script.id,
        isFavorite: !script.is_favorite
      })
    } catch {
      // Error is handled in the hook
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      {/* Thumbnail from source video (if available) */}
      {script.videos?.thumbnail_url && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={script.videos.thumbnail_url}
            alt={script.topic || 'Script thumbnail'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {script.is_favorite && (
            <div className="absolute top-2 right-2">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 drop-shadow-lg" />
            </div>
          )}
        </div>
      )}

      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-2 mb-1 text-base">
              {script.topic || 'Untitled Script'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {script.created_at && formatDistanceToNow(new Date(script.created_at), { addSuffix: true })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 flex-shrink-0"
            onClick={handleToggleFavorite}
            disabled={toggleFavorite.isPending}
          >
            <Star className={`h-4 w-4 ${script.is_favorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        {/* Hook Preview */}
        <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
          {script.hook_text || 'No hook text available'}
        </p>

        {/* Metadata Badges */}
        <div className="flex gap-2 flex-wrap">
          {script.hook_format && (
            <Badge variant="secondary" className="text-xs">
              {HOOK_FORMATS[script.hook_format.toUpperCase() as keyof typeof HOOK_FORMATS]?.name || script.hook_format}
            </Badge>
          )}
          {script.storytelling_framework && (
            <Badge variant="outline" className="text-xs">
              {FRAMEWORKS[script.storytelling_framework.toUpperCase() as keyof typeof FRAMEWORKS]?.name || script.storytelling_framework}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {script.estimated_duration && (
            <span>{script.estimated_duration}s</span>
          )}
          {script.word_count && (
            <span>{script.word_count} words</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/scripts/${script.id}`}>
              View Script
            </Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/scripts/new?videoId=${script.source_video_id}`}>
              <Sparkles className="h-4 w-4 mr-1" />
              Regenerate
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hookFormat, setHookFormat] = useState("")
  const [framework, setFramework] = useState("")
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sortBy, setSortBy] = useState<ScriptsQueryParams['sortBy']>("created_at")
  const [sortOrder, setSortOrder] = useState<ScriptsQueryParams['sortOrder']>("desc")

  // Build query params
  const queryParams: ScriptsQueryParams = useMemo(() => ({
    search: searchQuery || undefined,
    hookFormat: hookFormat || undefined,
    framework: framework || undefined,
    favoritesOnly: favoritesOnly || undefined,
    sortBy,
    sortOrder,
    limit: 50,
  }), [searchQuery, hookFormat, framework, favoritesOnly, sortBy, sortOrder])

  // Fetch scripts with filters
  const { data, isLoading } = useScripts(queryParams)
  const scripts = data?.scripts || []

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Scripts</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              AI-generated scripts for your viral content
            </p>
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/scripts/new">
              <Plus className="mr-2 h-4 w-4" />
              Generate Script
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          {/* Search and Sort Row */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search scripts by topic or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as ScriptsQueryParams['sortBy'])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Most Recent</SelectItem>
                <SelectItem value="is_favorite">Favorites First</SelectItem>
                <SelectItem value="topic">Topic</SelectItem>
                <SelectItem value="word_count">Word Count</SelectItem>
                <SelectItem value="estimated_duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={hookFormat} onValueChange={setHookFormat}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Hook Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Hook Formats</SelectItem>
                {HOOK_FORMATS && Object.values(HOOK_FORMATS).map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Frameworks</SelectItem>
                {FRAMEWORKS && Object.values(FRAMEWORKS).map((fw) => (
                  <SelectItem key={fw.id} value={fw.id}>
                    {fw.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="favorites"
                checked={favoritesOnly}
                onCheckedChange={(checked) => setFavoritesOnly(checked as boolean)}
              />
              <label
                htmlFor="favorites"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Favorites Only
              </label>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || hookFormat || framework || favoritesOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setHookFormat("")
                  setFramework("")
                  setFavoritesOnly(false)
                }}
                className="ml-auto"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scripts List */}
      <div className="px-4 lg:px-6">
        {isLoading ? (
          <GridSkeleton count={6} SkeletonComponent={ScriptCardSkeleton} />
        ) : scripts && scripts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scripts.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
            <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-8 mb-6 animate-float">
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {searchQuery || hookFormat || framework || favoritesOnly
                ? 'No scripts found'
                : 'No scripts yet'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md text-base leading-relaxed">
              {searchQuery || hookFormat || framework || favoritesOnly
                ? 'Try adjusting your filters to see more results. Clear filters or browse all scripts.'
                : 'Generate AI-powered scripts from viral videos to create your own engaging content. Use proven frameworks to hook your audience.'}
            </p>
            <Button size="lg" asChild>
              <Link href="/scripts/new">
                <Plus className="mr-2 h-5 w-5" />
                {searchQuery || hookFormat || framework || favoritesOnly
                  ? 'Generate New Script'
                  : 'Generate Your First Script'}
              </Link>
            </Button>
          </div>
        )}

        {/* Pagination Info */}
        {data && scripts.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Showing {scripts.length} of {data.pagination.total} scripts
            {data.pagination.hasMore && (
              <span className="ml-2">• More results available</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
