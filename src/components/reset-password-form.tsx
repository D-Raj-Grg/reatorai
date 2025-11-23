"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function ResetPasswordFormContent({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    // Check if we have an access token or code from the URL
    const code = searchParams.get("code")
    const accessToken = searchParams.get("access_token")

    if (code || accessToken) {
      setHasToken(true)
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    // Client-side validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Failed to reset password")
        return
      }

      toast.success("Password reset successfully!")
      router.push("/login")
    } catch (error) {
      console.error("Reset password error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasToken) {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
            <p className="text-muted-foreground text-sm text-balance">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <Button asChild>
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Set new password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={isLoading}
          />
          <FieldDescription>
            Must be at least 8 characters long
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            disabled={isLoading}
          />
          <FieldDescription>Re-enter your new password</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Remember your password?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Back to Login
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-6 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ResetPasswordFormContent className={className} {...props} />
    </Suspense>
  )
}
