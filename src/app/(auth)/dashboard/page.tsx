import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Tv, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Welcome Section */}
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to ReatorAI - Your AI-powered viral content research platform
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Channels</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Start tracking channels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No videos tracked yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outlier Videos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Viral videos found
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scripts Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Generate your first script
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Get Started Section */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Get Started with ReatorAI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Follow these steps to start discovering viral content and generating scripts:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                    1
                  </div>
                  <h3 className="font-semibold">Add Channels</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start by adding YouTube channels you want to track for viral content
                </p>
                <Button asChild className="w-full">
                  <Link href="/channels">Go to Channels</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                    2
                  </div>
                  <h3 className="font-semibold">Create Watchlists</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Organize your channels into watchlists by niche or category
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/watchlists">Go to Watchlists</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                    3
                  </div>
                  <h3 className="font-semibold">Discover Outliers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI automatically finds viral videos performing 2x+ better than average
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/videos">Browse Videos</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                    4
                  </div>
                  <h3 className="font-semibold">Generate Scripts</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create custom scripts from viral videos using proven frameworks
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/scripts">View Scripts</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
