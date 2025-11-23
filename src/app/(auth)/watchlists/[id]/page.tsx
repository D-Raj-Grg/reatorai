"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Folder, Settings, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useWatchlist,
  useDeleteWatchlist,
  useRemoveChannelFromWatchlist,
} from "@/hooks/use-watchlists"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { useState } from "react"
import Link from "next/link"

export default function WatchlistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [channelToRemove, setChannelToRemove] = useState<string | null>(null)

  const { data: watchlist, isLoading } = useWatchlist(id)
  const deleteWatchlist = useDeleteWatchlist()
  const removeChannel = useRemoveChannelFromWatchlist()

  const handleDeleteWatchlist = async () => {
    try {
      await deleteWatchlist.mutateAsync(id)
      router.push("/watchlists")
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  const handleRemoveChannel = async (channelId: string) => {
    try {
      await removeChannel.mutateAsync({ watchlistId: id, channelId })
      setChannelToRemove(null)
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!watchlist) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">Watchlist not found</h3>
        <p className="text-muted-foreground mb-4">
          This watchlist may have been deleted or doesn't exist.
        </p>
        <Button onClick={() => router.push("/watchlists")}>
          Back to Watchlists
        </Button>
      </div>
    )
  }

  const channels = watchlist.watchlist_channels?.map((wc) => wc.channels) || []

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: watchlist.color }}
          >
            <Folder className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{watchlist.name}</h1>
            {watchlist.description && (
              <p className="text-muted-foreground">{watchlist.description}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" title="Settings (coming soon)" disabled>
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive hover:text-destructive"
            title="Delete watchlist"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4">
            <div className="text-3xl font-bold">{watchlist.channel_count}</div>
            <div className="text-sm text-muted-foreground">Channels</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <div className="text-3xl font-bold">{watchlist.total_videos}</div>
            <div className="text-sm text-muted-foreground">Total Videos</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <div className="text-3xl font-bold text-green-600">
              {watchlist.total_outliers}
            </div>
            <div className="text-sm text-muted-foreground">Outliers</div>
          </CardHeader>
        </Card>
      </div>

      {/* Channels */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Channels</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Channel
          </Button>
        </div>

        {channels.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <Card key={channel.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-3">
                    {channel.thumbnail_url ? (
                      <img
                        src={channel.thumbnail_url}
                        alt={channel.channel_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Folder className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-1">
                        {channel.channel_name}
                      </h3>
                      {channel.channel_handle && (
                        <p className="text-sm text-muted-foreground">
                          {channel.channel_handle}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subscribers:</span>
                    <span className="font-medium">
                      {channel.subscriber_count?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Videos:</span>
                    <span className="font-medium">
                      {channel.total_videos?.toLocaleString() || "N/A"}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/channels/${channel.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setChannelToRemove(channel.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No channels in this watchlist yet
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Channel
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Watchlist Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Watchlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{watchlist.name}</strong>?
              This will not delete the channels themselves, only remove this
              watchlist organization. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteWatchlist.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWatchlist}
              disabled={deleteWatchlist.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteWatchlist.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete Watchlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Channel Dialog */}
      <AlertDialog
        open={channelToRemove !== null}
        onOpenChange={(open) => !open && setChannelToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Channel</AlertDialogTitle>
            <AlertDialogDescription>
              Remove this channel from the watchlist? The channel will not be
              deleted, only removed from this watchlist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removeChannel.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => channelToRemove && handleRemoveChannel(channelToRemove)}
              disabled={removeChannel.isPending}
            >
              {removeChannel.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
