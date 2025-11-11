"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  discount: number
  category: string
  brand: string
  image: string
}

interface AdminProductsListProps {
  products: Product[]
  onDeleteProduct: (id: number) => void
  loading?: boolean
}

export default function AdminProductsList({ products, onDeleteProduct, loading = false }: AdminProductsListProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-6">Productos ({products.length})</h2>

      {products.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-lg">No hay productos agregados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => {
            const finalPrice = (product.price * (1 - product.discount / 100)).toFixed(2)

            return (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-secondary rounded-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.brand.toUpperCase()} • {product.category}
                        </p>
                      </div>

                      {/* Price Section */}
                      <div className="text-right">
                        {product.discount > 0 ? (
                          <div>
                            <p className="text-xs text-muted-foreground line-through">Bs.{product.price.toFixed(2)}</p>
                            <p className="text-xl font-bold text-primary">Bs.{finalPrice}</p>
                            <p className="text-xs text-destructive font-medium">-{product.discount}%</p>
                          </div>
                        ) : (
                          <p className="text-xl font-bold text-primary">Bs.{product.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar for Discount */}
                    {product.discount > 0 && (
                      <div className="w-full bg-background rounded-full h-2 mb-3">
                        <div
                          className="bg-destructive h-2 rounded-full transition-all duration-300"
                          style={{ width: `${product.discount}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Delete Button */}
                  <div className="flex sm:flex-col items-center justify-end gap-2 sm:gap-0">
                    <Button
                      onClick={() => onDeleteProduct(product.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
