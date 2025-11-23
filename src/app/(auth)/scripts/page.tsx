"use client"

import { useState } from "react"
import { FileText, Plus, Search, Star, Loader2, Sparkles } from "lucide-react"
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

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Placeholder: This will be replaced with actual API call
  const isLoading = false
  const scripts: any[] = []

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Scripts</h1>
            <p className="text-muted-foreground">
              AI-generated scripts for your viral content
            </p>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Script
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search scripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Most Recent</SelectItem>
              <SelectItem value="favorite">Favorites</SelectItem>
              <SelectItem value="views">Most Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scripts List */}
      <div className="px-4 lg:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : scripts && scripts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scripts.map((script) => (
              <Card key={script.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1 mb-1">
                        {script.topic}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {script.hook_format}
                      </p>
                    </div>
                    {script.is_favorite && (
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <p className="text-sm line-clamp-3 mb-3">
                    {script.hook_text}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {script.estimated_duration}s
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {script.word_count} words
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No scripts yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Generate AI-powered scripts from viral videos to create your own engaging content
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Your First Script
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
