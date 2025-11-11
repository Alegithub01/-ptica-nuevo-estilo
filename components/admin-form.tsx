"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const categories = ["todos", "mujer", "varon", "infantil", "deportivos", "sobrelentes"]
const brands = ["rayban", "dior", "gucci", "prada", "versace", "tomford", "dioptik"]

interface ProductFormData {
  name: string
  price: number
  discount: number
  category: string
  brand: string
  image: File | null
}

interface AdminFormProps {
  onAddProduct: (product: any) => void
}

export default function AdminForm({ onAddProduct }: AdminFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    discount: 0,
    category: "varon",
    brand: "dioptik",
    image: null,
  })

  const [preview, setPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discount" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateFinalPrice = (): string => {
    const price = Number(formData.price) || 0
    const discount = Number(formData.discount) || 0
    return (price * (1 - discount / 100)).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || formData.price <= 0) {
      alert("Por favor completa los campos requeridos")
      return
    }

    setLoading(true)

    try {
      const form = new FormData()
      form.append("name", formData.name)
      form.append("price", formData.price.toString())
      form.append("discount", formData.discount.toString())
      form.append("category", formData.category)
      form.append("brand", formData.brand)
      if (formData.image) {
        form.append("image", formData.image)
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        throw new Error("Error al agregar producto")
      }

      const newProduct = await response.json()
      onAddProduct(newProduct)

      setFormData({
        name: "",
        price: 0,
        discount: 0,
        category: "varon",
        brand: "dioptik",
        image: null,
      })
      setPreview("")
    } catch (error) {
      console.error("[v0] Error submitting product:", error)
      alert("Error al agregar el producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Nombre del Producto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Ray-Ban Classic"
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Precio Base (Bs.)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          min="0"
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Discount */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Descuento (%)</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="0"
          step="1"
          min="0"
          max="100"
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Final Price Display */}
      {formData.price > 0 && (
        <div className="bg-accent/10 border border-primary/30 rounded-md p-3">
          <p className="text-sm text-muted-foreground mb-1">Precio Final:</p>
          <p className="text-2xl font-bold text-primary">Bs.{calculateFinalPrice()}</p>
          {formData.discount > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              (Ahorro: Bs.{(formData.price * (formData.discount / 100)).toFixed(2)})
            </p>
          )}
        </div>
      )}

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Marca</label>
        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Imagen del Producto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        {preview && (
          <div className="mt-3 relative w-full h-32 rounded-md overflow-hidden border border-border">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        <Plus className="w-4 h-4" />
        {loading ? "Agregando..." : "Agregar Producto"}
      </Button>
    </form>
  )
}
