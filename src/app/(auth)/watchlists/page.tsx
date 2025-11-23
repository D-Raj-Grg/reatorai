"use client"

import { useState } from "react"
import { Plus, Loader2, Folder } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { useWatchlists, useCreateWatchlist } from "@/hooks/use-watchlists"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const PRESET_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
]

const PRESET_ICONS = ["folder", "star", "heart", "bookmark", "tag", "flag"]

export default function WatchlistsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value)
  const [selectedIcon, setSelectedIcon] = useState(PRESET_ICONS[0])

  const { data: watchlists, isLoading } = useWatchlists()
  const createWatchlist = useCreateWatchlist()

  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      await createWatchlist.mutateAsync({
        name,
        description: description || undefined,
        color: selectedColor,
        icon: selectedIcon,
      })
      setName("")
      setDescription("")
      setSelectedColor(PRESET_COLORS[0].value)
      setSelectedIcon(PRESET_ICONS[0])
      setIsCreateModalOpen(false)
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Watchlists</h1>
          <p className="text-muted-foreground">
            Organize your channels into custom collections
          </p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateWatchlist}>
              <DialogHeader>
                <DialogTitle>Create Watchlist</DialogTitle>
                <DialogDescription>
                  Create a new watchlist to organize your channels
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Science Channels"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={createWatchlist.isPending}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this watchlist for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createWatchlist.isPending}
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color.value
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Icon</Label>
                  <div className="flex gap-2 flex-wrap">
                    {PRESET_ICONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setSelectedIcon(icon)}
                        className={`w-10 h-10 rounded border-2 flex items-center justify-center transition-all ${
                          selectedIcon === icon
                            ? "border-foreground bg-accent"
                            : "border-border hover:bg-accent/50"
                        }`}
                        title={icon}
                      >
                        <Folder className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={createWatchlist.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createWatchlist.isPending || !name.trim()}>
                  {createWatchlist.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Watchlist
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Watchlists List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : watchlists && watchlists.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {watchlists.map((watchlist) => (
            <Link key={watchlist.id} href={`/watchlists/${watchlist.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader
                  className="p-4"
                  style={{
                    backgroundColor: `${watchlist.color}20`,
                    borderLeft: `4px solid ${watchlist.color}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: watchlist.color }}
                    >
                      <Folder className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {watchlist.name}
                      </h3>
                      {watchlist.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {watchlist.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-2xl font-bold">
                        {watchlist.channel_count}
                      </div>
                      <div className="text-xs text-muted-foreground">Channels</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {watchlist.total_videos}
                      </div>
                      <div className="text-xs text-muted-foreground">Videos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {watchlist.total_outliers}
                      </div>
                      <div className="text-xs text-muted-foreground">Outliers</div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Folder className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No watchlists yet</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Organize your channels into watchlists to track related content together
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Watchlist
          </Button>
        </div>
      )}
    </div>
  )
}
