"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Video,
  Tv,
  FileText,
  Settings,
  Folder,
  Plus,
  ChevronRight,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useWatchlists } from "@/hooks/use-watchlists"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: Video,
  },
  {
    title: "Channels",
    url: "/channels",
    icon: Tv,
  },
  {
    title: "Scripts",
    url: "/scripts",
    icon: FileText,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { data: watchlists } = useWatchlists()
  const { user } = useUser()
  const [watchlistsOpen, setWatchlistsOpen] = React.useState(true)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Video className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ReatorAI</span>
                  <span className="text-xs">Viral Content Research</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Watchlists */}
        <SidebarGroup>
          <Collapsible open={watchlistsOpen} onOpenChange={setWatchlistsOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="group/collapsible">
                <span>Watchlists</span>
                <ChevronRight
                  className={cn(
                    "ml-auto size-4 transition-transform",
                    watchlistsOpen && "rotate-90"
                  )}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/watchlists"}>
                      <Link href="/watchlists">
                        <Folder className="size-4" />
                        <span>All Watchlists</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {watchlists && watchlists.length > 0 && (
                    <SidebarMenuSub>
                      {watchlists.slice(0, 5).map((watchlist) => (
                        <SidebarMenuSubItem key={watchlist.id}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/watchlists/${watchlist.id}`}
                          >
                            <Link href={`/watchlists/${watchlist.id}`}>
                              <div
                                className="size-2 rounded-full"
                                style={{ backgroundColor: watchlist.color }}
                              />
                              <span className="truncate">{watchlist.name}</span>
                              <span className="ml-auto text-xs text-muted-foreground">
                                {watchlist.channel_count}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                      {watchlists.length > 5 && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href="/watchlists" className="text-muted-foreground">
                              <span>View all ({watchlists.length})</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  )}

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/watchlists" className="text-muted-foreground">
                        <Plus className="size-4" />
                        <span>New Watchlist</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {user && <NavUser user={{ name: user.email || 'User', email: user.email || '', avatar: '' }} />}
      </SidebarFooter>
    </Sidebar>
  )
}
