"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "todos", label: "TODOS" },
  { id: "mujer", label: "MUJER" },
  { id: "varon", label: "VARÓN" },
  { id: "infantil", label: "INFANTIL" },
  { id: "deportivos", label: "DEPORTIVOS" },
  { id: "sobrelentes", label: "SOBRELENTES" },
  { id: "marcas", label: "MARCAS" },
]

const brands = ["Ray-Ban", "Dior", "Gucci", "Prada", "Versace", "Tom Ford"]

export default function Header({ onCategoryChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMarksDropdownOpen, setIsMarksDropdownOpen] = useState(false)

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId)
    setIsMobileMenuOpen(false)
    setIsMarksDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
                </svg>
              </div>
              <span className="hidden sm:block font-serif text-xl font-bold text-primary">DIOPTIK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <Button
                  variant="ghost"
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {category.label}
                </Button>

                {category.id === "marcas" && (
                  <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleCategoryClick(`marca-${brand.toLowerCase()}`)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border pb-4">
            {categories.map((category) => (
              <div key={category.id}>
                {category.id === "marcas" ? (
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => setIsMarksDropdownOpen(!isMarksDropdownOpen)}
                      className="w-full justify-start text-foreground text-sm font-medium"
                    >
                      {category.label}
                      <span className="ml-auto">{isMarksDropdownOpen ? "−" : "+"}</span>
                    </Button>
                    {isMarksDropdownOpen && (
                      <div className="pl-4 bg-accent/5">
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => handleCategoryClick(`marca-${brand.toLowerCase()}`)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-full justify-start text-foreground text-sm font-medium"
                  >
                    {category.label}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
