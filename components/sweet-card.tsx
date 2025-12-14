"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Loader2 } from "lucide-react"

interface Sweet {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  description: string
  image_url: string
}

interface SweetCardProps {
  sweet: Sweet
  onUpdate: () => void
}

export function SweetCard({ sweet, onUpdate }: SweetCardProps) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/sweets/${sweet.id}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      })

      if (response.ok) {
        onUpdate()
      } else {
        const data = await response.json()
        alert(data.detail || "Purchase failed")
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square bg-muted relative">
          <img
            src={`${sweet.image_url}&query=${encodeURIComponent(sweet.name)}`}
            alt={sweet.name}
            className="w-full h-full object-cover"
          />
          {sweet.quantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif font-semibold text-lg">{sweet.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {sweet.category}
            </Badge>
          </div>
          <p className="font-bold text-xl text-primary">${sweet.price.toFixed(2)}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{sweet.description}</p>

        <p className="text-sm text-muted-foreground">
          Stock: <span className="font-medium">{sweet.quantity}</span>
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={sweet.quantity === 0 || loading} onClick={handlePurchase}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Purchase
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
