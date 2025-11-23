"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    // Exchange code for session
    async function verifyEmail() {
      if (error) {
        setStatus("error")
        setMessage(errorDescription || "Verification failed. Please try again.")
        return
      }

      if (!code) {
        setStatus("error")
        setMessage("Invalid verification link. Please request a new one.")
        return
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage("Email verified successfully! Redirecting to login...")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else {
          setStatus("error")
          setMessage(data.error || "Verification failed. Please try again.")
        }
      } catch (err) {
        console.error("Verification error:", err)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {status === "loading" && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            {status === "success" && <CheckCircle2 className="h-8 w-8 text-green-600" />}
            {status === "error" && <XCircle className="h-8 w-8 text-red-600" />}
          </div>
          <CardTitle>
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {status === "error" && (
          <CardContent className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Create New Account</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
