"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Catalog from "@/components/catalog"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("todos")

  return (
    <main className="min-h-screen bg-background">
      <Header onCategoryChange={setActiveCategory} />
      <Hero />
      <Catalog activeCategory={activeCategory} />
    </main>
  )
}
