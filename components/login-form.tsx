"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Attempting login with username:", username)

    try {
      const formData = new URLSearchParams()
      formData.append("username", username)
      formData.append("password", password)

      console.log("[v0] Sending request to:", API_ENDPOINTS.auth.login)

      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const data = await response.json()
        console.error("[v0] Login failed:", data)
        throw new Error(data.detail || "Invalid credentials")
      }

      const data = await response.json()
      console.log("[v0] Login successful")

      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/dashboard")
    } catch (err: any) {
      console.error("[v0] Login error:", err)

      if (err.message === "Failed to fetch") {
        setError("Cannot connect to server. Make sure the backend is running on http://localhost:8000")
      } else {
        setError("Login failed. Please check your credentials.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </form>
  )
}
