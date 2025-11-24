import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WatchlistDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Mock data - will be replaced with actual data from Supabase
  const watchlist = {
    id,
    name: "Educational Science",
    description: "Top science and educational channels",
    color: "#3b82f6",
    icon: "📚",
    channel_count: 5,
    total_videos: 234,
    total_outliers: 12,
  };

  const channels = [
    {
      id: "1",
      name: "Veritasium",
      thumbnail: "https://via.placeholder.com/50",
      subscribers: "14.2M",
      videos: 45,
    },
    {
      id: "2",
      name: "Vsauce",
      thumbnail: "https://via.placeholder.com/50",
      subscribers: "18.5M",
      videos: 38,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{watchlist.icon}</span>
              <h1 className="text-3xl font-bold">{watchlist.name}</h1>
            </div>
            {watchlist.description && (
              <p className="text-muted-foreground mt-1">{watchlist.description}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{watchlist.channel_count}</div>
            <p className="text-xs text-muted-foreground">
              Tracked channels
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{watchlist.total_videos}</div>
            <p className="text-xs text-muted-foreground">
              Total videos discovered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{watchlist.total_outliers}</div>
            <p className="text-xs text-muted-foreground">
              Viral videos found
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Channels Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Channels in this Watchlist</CardTitle>
              <CardDescription>
                Manage channels in your watchlist
              </CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={channel.thumbnail}
                    alt={channel.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {channel.subscribers} subscribers · {channel.videos} videos
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Channel
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Outliers Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Outlier Videos</CardTitle>
          <CardDescription>
            Viral videos from channels in this watchlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No outlier videos yet</p>
            <p className="text-sm mt-2">
              Videos will appear here once channels are synced
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
