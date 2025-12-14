"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SweetGrid } from "@/components/sweet-grid"
import { SearchFilters } from "@/components/search-filters"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import { LogOut, ShoppingBag, Settings } from "lucide-react"

interface User {
  id: number
  email: string
  username: string
  is_admin: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!userData || !token) {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Sweet Shop</h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {user.username}
                {user.is_admin && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Admin</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user.is_admin && (
              <Button variant={showAdmin ? "default" : "outline"} onClick={() => setShowAdmin(!showAdmin)}>
                <Settings className="h-4 w-4 mr-2" />
                {showAdmin ? "Shop View" : "Admin Panel"}
              </Button>
            )}
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {showAdmin && user.is_admin ? (
          <AdminPanel />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold mb-2">Browse Our Collection</h2>
              <p className="text-muted-foreground">Discover delicious sweets for every occasion</p>
            </div>

            <SearchFilters onSearch={setFilters} />
            <SweetGrid filters={filters} />
          </>
        )}
      </main>
    </div>
  )
}
