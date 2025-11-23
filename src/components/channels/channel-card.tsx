"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Video, Trash2, Loader2, RefreshCw } from "lucide-react"
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
import { useDeleteChannel, type Channel } from "@/hooks/use-channels"
import { formatDistanceToNow } from "date-fns"

interface ChannelCardProps {
  channel: Channel
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const deleteChannel = useDeleteChannel()

  const handleDelete = async () => {
    try {
      await deleteChannel.mutateAsync(channel.id)
      setShowDeleteDialog(false)
    } catch (error) {
      // Error is handled in the hook
    }
  }

  const formatNumber = (num: number | undefined | null): string => {
    if (!num) return "0"
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
            {channel.thumbnail_url ? (
              <img
                src={channel.thumbnail_url}
                alt={channel.channel_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background"
              />
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

        <CardFooter className="p-4 pt-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            title="Sync videos (coming soon)"
            disabled
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Link href={`/channels/${channel.id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive hover:text-destructive"
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
