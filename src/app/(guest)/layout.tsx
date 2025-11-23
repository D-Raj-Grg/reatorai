import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function GuestLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  // Check if user is already authenticated
  const { data: { user } } = await supabase.auth.getUser()

  // If authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  return <>{children}</>
}
