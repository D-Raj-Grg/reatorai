"use client"

import Link from "next/link"
import {
  Sparkles,
  Grid3x3,
  Workflow,
  Play,
  DollarSign,
  LogIn,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"

const NAV_ITEMS = [
  { href: "/", icon: Sparkles, label: "Home" },
  { href: "#features", icon: Grid3x3, label: "Features" },
  { href: "#how-it-works", icon: Workflow, label: "How It Works" },
  { href: "#demo", icon: Play, label: "Demo" },
  { href: "#pricing", icon: DollarSign, label: "Pricing" },
]

const AUTH_ITEMS = [
  { href: "/login", icon: LogIn, label: "Login" },
]

export function NavigationDock() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <Dock direction="middle">
          {/* Navigation Items */}
          {NAV_ITEMS.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-full" />

          {/* Auth Items */}
          {AUTH_ITEMS.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Start Button - Special styling */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/signup"
                  aria-label="Start Free Trial"
                  className={cn(
                    buttonVariants({ variant: "default", size: "icon" }),
                    "size-12 rounded-full font-semibold"
                  )}
                >
                  <span className="text-xs">Start</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Free Trial</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
    </div>
  )
}
