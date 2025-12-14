"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchFiltersProps {
  onSearch?: (filters: {
    name: string
    category: string
    minPrice: string
    maxPrice: string
  }) => void
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ name, category, minPrice, maxPrice })
    }
  }

  const handleReset = () => {
    setName("")
    setCategory("")
    setMinPrice("")
    setMaxPrice("")
    if (onSearch) {
      onSearch({ name: "", category: "", minPrice: "", maxPrice: "" })
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" />
        Search & Filter
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input placeholder="Search by name..." value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Filter by category..." value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input type="number" placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <Input type="number" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSearch}>Apply Filters</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
