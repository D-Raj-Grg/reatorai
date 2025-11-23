import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  // TODO: Add authentication check here
  // Redirect to /login if not authenticated

  return <>{children}</>
}
