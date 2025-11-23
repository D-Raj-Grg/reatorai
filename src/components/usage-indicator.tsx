"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsage } from "@/hooks/use-usage";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export function UsageIndicator() {
  const { data, isLoading } = useUsage();

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (!data || !data.success) {
    return null;
  }

  const { analyses, scripts, channels } = data.usage;

  // Find the most constrained resource
  const resources = [
    { name: "Analyses", ...analyses },
    { name: "Scripts", ...scripts },
    { name: "Channels", ...channels },
  ].sort((a, b) => b.percentUsed - a.percentUsed);

  const mostConstrained = resources[0];

  // Determine badge variant based on percentage used
  const getBadgeVariant = (percentUsed: number) => {
    if (percentUsed >= 80) return "destructive";
    if (percentUsed >= 50) return "outline";
    return "secondary";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          <Badge variant={getBadgeVariant(mostConstrained.percentUsed)}>
            {mostConstrained.remaining}/{mostConstrained.limit}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Usage This Month</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 space-y-3">
          {/* Analyses */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">AI Analyses</span>
              <span className="text-muted-foreground">
                {analyses.used}/{analyses.limit}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  analyses.percentUsed >= 80
                    ? "bg-destructive"
                    : analyses.percentUsed >= 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(analyses.percentUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {analyses.remaining} remaining
            </p>
          </div>

          {/* Scripts */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Scripts</span>
              <span className="text-muted-foreground">
                {scripts.used}/{scripts.limit}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  scripts.percentUsed >= 80
                    ? "bg-destructive"
                    : scripts.percentUsed >= 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(scripts.percentUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {scripts.remaining} remaining
            </p>
          </div>

          {/* Channels */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Channels</span>
              <span className="text-muted-foreground">
                {channels.used}/{channels.limit}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  channels.percentUsed >= 80
                    ? "bg-destructive"
                    : channels.percentUsed >= 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(channels.percentUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {channels.remaining} remaining
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full cursor-pointer">
            <span className="text-sm">
              {mostConstrained.percentUsed >= 80 ? "Upgrade Plan" : "View Plans"}
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
