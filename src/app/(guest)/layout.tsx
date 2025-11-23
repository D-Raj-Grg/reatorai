import { ReactNode } from "react"

export default function GuestLayout({ children }: { children: ReactNode }) {
  // TODO: Add authentication check here
  // Redirect to /dashboard if already authenticated

  return <>{children}</>
}
