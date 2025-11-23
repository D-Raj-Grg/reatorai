"use client"

import { useState } from "react"
import { Plus, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useChannels, useAddChannel } from "@/hooks/use-channels"
import { ChannelCard } from "@/components/channels/channel-card"
import { SUGGESTED_CHANNELS, getAllCategories } from "@/lib/suggestions/educational-channels"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChannelsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [channelUrl, setChannelUrl] = useState("")

  const { data: channels, isLoading } = useChannels()
  const addChannel = useAddChannel()

  const handleAddChannel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!channelUrl.trim()) return

    try {
      await addChannel.mutateAsync(channelUrl)
      setChannelUrl("")
      setIsAddModalOpen(false)
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Channels</h1>
          <p className="text-muted-foreground">
            Track YouTube channels and discover viral content
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddChannel}>
              <DialogHeader>
                <DialogTitle>Add YouTube Channel</DialogTitle>
                <DialogDescription>
                  Enter a YouTube channel URL, handle, or ID to start tracking
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="channel-url">Channel URL or Handle</Label>
                  <Input
                    id="channel-url"
                    placeholder="https://youtube.com/@channel or @username"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                    disabled={addChannel.isPending}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    <li>https://youtube.com/@username</li>
                    <li>https://youtube.com/channel/UC...</li>
                    <li>@username</li>
                    <li>UC... (channel ID)</li>
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={addChannel.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addChannel.isPending || !channelUrl.trim()}>
                  {addChannel.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Channel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Channels List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : channels && channels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Empty State Header */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No channels yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Start tracking YouTube channels to discover viral content and generate scripts
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Channel
            </Button>
          </div>

          {/* Suggested Channels */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Popular Educational Channels</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Get started quickly by adding channels from popular educators
            </p>

            <Tabs defaultValue="Science" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {getAllCategories().map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {getAllCategories().map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {SUGGESTED_CHANNELS.filter((ch) => ch.category === category).map(
                      (channel) => (
                        <Card key={channel.channelId} className="overflow-hidden">
                          <CardHeader className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold line-clamp-1">
                                  {channel.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {channel.handle}
                                </p>
                              </div>
                              <Badge variant="secondary">{channel.subscribers}</Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="p-4 pt-0 space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {channel.description}
                            </p>

                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                setChannelUrl(channel.handle)
                                setIsAddModalOpen(true)
                              }}
                              disabled={addChannel.isPending}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Channel
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
