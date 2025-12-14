"use client"

import { useEffect, useState } from "react"
import { SweetCard } from "@/components/sweet-card"
import { Loader2 } from "lucide-react"

interface Sweet {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  description: string
  image_url: string
}

interface SweetGridProps {
  filters?: {
    name: string
    category: string
    minPrice: string
    maxPrice: string
  }
}

export function SweetGrid({ filters }: SweetGridProps) {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSweets = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")

      const params = new URLSearchParams()
      if (filters?.name) params.append("name", filters.name)
      if (filters?.category) params.append("category", filters.category)
      if (filters?.minPrice) params.append("min_price", filters.minPrice)
      if (filters?.maxPrice) params.append("max_price", filters.maxPrice)

      const url = params.toString()
        ? `http://localhost:8000/api/sweets/search?${params}`
        : "http://localhost:8000/api/sweets"

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSweets(data)
      }
    } catch (error) {
      console.error("Failed to fetch sweets:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [filters])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (sweets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No sweets available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet) => (
        <SweetCard key={sweet.id} sweet={sweet} onUpdate={fetchSweets} />
      ))}
    </div>
  )
}
