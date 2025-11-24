import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Star, Copy, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ScriptsPage() {
  // Mock data - will be replaced with actual data from Supabase
  const scripts = [
    {
      id: "1",
      topic: "The Science of Sleep",
      hook: "Did you know you're losing 3 years of your life?",
      hookFormat: "Shocking Stat",
      framework: "Problem-Agitate-Solve (PAS)",
      createdAt: "2024-11-20",
      isFavorite: true,
      wordCount: 350,
    },
    {
      id: "2",
      topic: "Black Holes Explained",
      hook: "What if I told you black holes aren't actually black?",
      hookFormat: "Question Hook",
      framework: "Curiosity Loop",
      createdAt: "2024-11-19",
      isFavorite: false,
      wordCount: 420,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scripts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your generated scripts
          </p>
        </div>
        <Link href="/scripts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate New Script
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scripts..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Hook Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="shocking-stat">Shocking Stat</SelectItem>
                <SelectItem value="question">Question Hook</SelectItem>
                <SelectItem value="bold-claim">Bold Claim</SelectItem>
                <SelectItem value="personal-story">Personal Story</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-frameworks">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-frameworks">All Frameworks</SelectItem>
                <SelectItem value="pas">Problem-Agitate-Solve</SelectItem>
                <SelectItem value="bab">Before-After-Bridge</SelectItem>
                <SelectItem value="aida">AIDA</SelectItem>
                <SelectItem value="curiosity">Curiosity Loop</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scripts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script) => (
          <Card key={script.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">
                    {script.topic}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {script.hook}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                >
                  <Star
                    className={`h-4 w-4 ${
                      script.isFavorite
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{script.hookFormat}</Badge>
                  <Badge variant="outline">{script.framework}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{script.wordCount} words</span>
                  <span>{new Date(script.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/scripts/${script.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (show when no scripts) */}
      {scripts.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No scripts yet</h3>
              <p className="text-muted-foreground mb-6">
                Generate your first viral script to get started
              </p>
              <Link href="/scripts/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Your First Script
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Script Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">8 / 30</p>
              <p className="text-xs text-muted-foreground">
                Scripts generated this month
              </p>
            </div>
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
