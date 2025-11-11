"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  discount: number
  category: string
  brand: string
  image: string
}

export default function Catalog({ activeCategory }: { activeCategory: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "todos") return true
    if (activeCategory.startsWith("marca-")) {
      const brand = activeCategory.replace("marca-", "")
      return product.brand === brand
    }
    return product.category === activeCategory
  })

  const calculateFinalPrice = (price: number, discount: number) => {
    return (price * (1 - discount / 100)).toFixed(2)
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-12 text-center">
          {activeCategory === "todos"
            ? "Nuestro Catálogo"
            : `Categoría: ${activeCategory.replace("marca-", "").toUpperCase()}`}
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-secondary overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      Bs.{calculateFinalPrice(product.price, product.discount)}
                    </p>
                    {product.discount > 0 && (
                      <p className="text-xs text-muted-foreground line-through">Bs.{product.price}</p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  )
}
