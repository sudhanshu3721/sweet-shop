"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash, Package, Loader2 } from "lucide-react"

interface Sweet {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  description: string
  image_url: string
}

export function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image_url: "/placeholder.svg?height=200&width=200",
  })

  const fetchSweets = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8000/api/sweets", {
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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    const body = {
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      quantity: Number.parseInt(formData.quantity),
      description: formData.description,
      image_url: formData.image_url,
    }

    try {
      if (editingId) {
        // Update
        await fetch(`http://localhost:8000/api/sweets/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
      } else {
        // Create
        await fetch("http://localhost:8000/api/sweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image_url: "/placeholder.svg?height=200&width=200",
      })
      setEditingId(null)
      setShowAddForm(false)
      fetchSweets()
    } catch (error) {
      console.error("Failed to save sweet:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sweet?")) return

    const token = localStorage.getItem("token")
    try {
      await fetch(`http://localhost:8000/api/sweets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchSweets()
    } catch (error) {
      console.error("Failed to delete sweet:", error)
    }
  }

  const handleRestock = async (id: number) => {
    const quantity = prompt("Enter quantity to add:")
    if (!quantity || isNaN(Number.parseInt(quantity))) return

    const token = localStorage.getItem("token")
    try {
      await fetch(`http://localhost:8000/api/sweets/${id}/restock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: Number.parseInt(quantity) }),
      })
      fetchSweets()
    } catch (error) {
      console.error("Failed to restock sweet:", error)
    }
  }

  const handleEdit = (sweet: Sweet) => {
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      description: sweet.description || "",
      image_url: sweet.image_url,
    })
    setEditingId(sweet.id)
    setShowAddForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold">Admin Panel</h2>
          <p className="text-muted-foreground">Manage your sweet inventory</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sweet
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Sweet" : "Add New Sweet"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingId ? "Update" : "Create"}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingId(null)
                    setFormData({
                      name: "",
                      category: "",
                      price: "",
                      quantity: "",
                      description: "",
                      image_url: "/placeholder.svg?height=200&width=200",
                    })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {sweets.map((sweet) => (
          <Card key={sweet.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={`${sweet.image_url}&query=${encodeURIComponent(sweet.name)}`}
                    alt={sweet.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-serif font-semibold text-xl">{sweet.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{sweet.category}</p>
                    <p className="text-sm mb-2">{sweet.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="font-medium">Price: ${sweet.price.toFixed(2)}</span>
                      <span className="font-medium">Stock: {sweet.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(sweet)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleRestock(sweet.id)}>
                    <Package className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(sweet.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
