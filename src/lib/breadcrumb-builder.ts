/**
 * Breadcrumb builder utility
 * Converts pathname to breadcrumb structure for navigation
 */

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

/**
 * Route label mappings
 */
const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  videos: "Videos",
  channels: "Channels",
  watchlists: "Watchlists",
  scripts: "Scripts",
  settings: "Settings",
}

/**
 * Build breadcrumbs from pathname
 * @param pathname - Current pathname from usePathname()
 * @returns Array of breadcrumb items
 */
export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Remove leading/trailing slashes and split
  const segments = pathname.replace(/^\/|\/$/g, "").split("/")

  // Always start with Dashboard
  const breadcrumbs: BreadcrumbItem[] = []

  // Build cumulative href as we go through segments
  let cumulativeHref = ""

  segments.forEach((segment, index) => {
    // Skip empty segments
    if (!segment) return

    // Build href
    cumulativeHref += `/${segment}`

    // Determine if this is the current/last segment
    const isCurrent = index === segments.length - 1

    // Get label for this segment
    let label = ROUTE_LABELS[segment] || segment

    // Handle UUID/ID segments (32 chars alphanumeric)
    if (segment.length >= 32 && /^[a-f0-9-]+$/i.test(segment)) {
      // For IDs, we'll just show the parent context
      // The actual name should be fetched from data if needed
      const parentSegment = segments[index - 1]
      if (parentSegment === "watchlists") {
        label = "Watchlist Details"
      } else if (parentSegment === "videos") {
        label = "Video Details"
      } else if (parentSegment === "channels") {
        label = "Channel Details"
      } else if (parentSegment === "scripts") {
        label = "Script Details"
      } else {
        label = "Details"
      }
    }

    // Capitalize if not in route labels
    if (!ROUTE_LABELS[segment] && segment.length < 32) {
      label = segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    breadcrumbs.push({
      label,
      href: cumulativeHref,
      isCurrent,
    })
  })

  return breadcrumbs
}
