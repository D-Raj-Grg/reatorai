"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Video, Trash2, Loader2, RefreshCw, FolderPlus, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteChannel, useSyncChannel, type Channel } from "@/hooks/use-channels"
import {
  useWatchlists,
  useAddChannelToWatchlist,
  useRemoveChannelFromWatchlist,
} from "@/hooks/use-watchlists"
import { formatDistanceToNow } from "date-fns"

interface ChannelCardProps {
  channel: Channel
}

interface ChannelWithWatchlists extends Channel {
  watchlist_ids?: string[]
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const deleteChannel = useDeleteChannel()
  const syncChannel = useSyncChannel()
  const { data: watchlists } = useWatchlists()
  const addToWatchlist = useAddChannelToWatchlist()
  const removeFromWatchlist = useRemoveChannelFromWatchlist()

  const handleDelete = async () => {
    try {
      await deleteChannel.mutateAsync(channel.id)
      setShowDeleteDialog(false)
    } catch {
      // Error is handled in the hook
    }
  }

  const handleSync = async () => {
    try {
      await syncChannel.mutateAsync(channel.id)
    } catch {
      // Error is handled in the hook
    }
  }

  const handleWatchlistToggle = async (watchlistId: string, isInWatchlist: boolean) => {
    try {
      if (isInWatchlist) {
        await removeFromWatchlist.mutateAsync({ watchlistId, channelId: channel.id })
      } else {
        await addToWatchlist.mutateAsync({ watchlistId, channelId: channel.id })
      }
    } catch {
      // Error is handled in the hooks
    }
  }

  // Check which watchlists this channel is in (if data available)
  const channelWatchlists = (channel as ChannelWithWatchlists).watchlist_ids || []
  const isInWatchlist = (watchlistId: string) => channelWatchlists.includes(watchlistId)

  const formatNumber = (num: number | undefined | null): string => {
    if (!num) return "0"
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <CardHeader className="p-0">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative group-hover:from-primary/15 group-hover:to-primary/10 transition-colors duration-300">
            {channel.thumbnail_url ? (
              <div className="relative w-24 h-24 rounded-full border-4 border-background overflow-hidden">
                <Image
                  src={channel.thumbnail_url}
                  alt={channel.channel_name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <Video className="h-12 w-12 text-primary" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">
                {channel.channel_name}
              </h3>
              {channel.channel_handle && (
                <p className="text-sm text-muted-foreground">
                  {channel.channel_handle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{formatNumber(channel.subscriber_count)} subs</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>{formatNumber(channel.total_videos)} videos</span>
              </div>
            </div>

            {channel.last_synced_at ? (
              <p className="text-xs text-muted-foreground">
                Synced {formatDistanceToNow(new Date(channel.last_synced_at), { addSuffix: true })}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Not synced yet
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[80px] min-h-[44px]"
            onClick={handleSync}
            disabled={syncChannel.isPending}
          >
            {syncChannel.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Sync
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="min-w-[44px] min-h-[44px]">
                <FolderPlus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Add to Watchlist</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {watchlists && watchlists.length > 0 ? (
                <>
                  {watchlists.map((watchlist) => {
                    const inWatchlist = isInWatchlist(watchlist.id)
                    return (
                      <DropdownMenuItem
                        key={watchlist.id}
                        onClick={() => handleWatchlistToggle(watchlist.id, inWatchlist)}
                        disabled={addToWatchlist.isPending || removeFromWatchlist.isPending}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: watchlist.color }}
                          />
                          <span className="flex-1">{watchlist.name}</span>
                          {inWatchlist && <Check className="h-4 w-4" />}
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </>
              ) : (
                <DropdownMenuItem disabled>
                  <span className="text-muted-foreground text-sm">
                    No watchlists yet
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/watchlists" className="w-full cursor-pointer">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Watchlist
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/channels/${channel.id}`}>
            <Button variant="default" size="sm" className="min-h-[44px]">
              View
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive hover:text-destructive min-w-[44px] min-h-[44px]"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Channel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{channel.channel_name}</strong>?
              This will also delete all videos and data associated with this channel.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteChannel.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteChannel.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteChannel.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete Channel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
