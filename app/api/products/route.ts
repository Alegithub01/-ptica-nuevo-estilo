import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with a database later)
let products: any[] = [
  {
    id: 1,
    name: "DIOPTIK MT6764",
    price: 479,
    discount: 0,
    category: "varon",
    brand: "dioptik",
    image: "/eyeglasses-tortoise-frame.jpg",
  },
  {
    id: 2,
    name: "DIOPTIK XB2001 C5",
    price: 399,
    discount: 0,
    category: "mujer",
    brand: "dioptik",
    image: "/blue-round-eyeglasses.jpg",
  },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const discount = Number.parseFloat(formData.get("discount") as string) || 0
    const category = formData.get("category") as string
    const brand = formData.get("brand") as string
    const file = formData.get("image") as File

    if (!name || !price || !category || !brand) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    let imageUrl = "/placeholder.svg"

    if (file && file.size > 0) {
      const buffer = await file.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      const mimeType = file.type || "image/jpeg"
      imageUrl = `data:${mimeType};base64,${base64}`
    }

    const newProduct = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name,
      price,
      discount,
      category,
      brand,
      image: imageUrl,
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Error creando producto" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    products = products.filter((p) => p.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Error eliminando producto" }, { status: 500 })
  }
}
