"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl font-bold text-primary mb-2">Sweet Shop</h1>
          <p className="text-muted-foreground text-lg">Delightful treats for every taste</p>
        </div>

        <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden">
          <div className="flex border-b border-border">
            <button
              onClick={() => setShowLogin(true)}
              className={`flex-1 py-3 font-medium transition-colors ${
                showLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`flex-1 py-3 font-medium transition-colors ${
                !showLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-6">{showLogin ? <LoginForm /> : <RegisterForm />}</div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">Demo accounts: admin/admin123 or user/user123</p>
      </div>
    </div>
  )
}
