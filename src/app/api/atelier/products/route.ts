import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getCatalog, saveCatalog, generateId } from "@/lib/db";
import { Product } from "@/types";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  return NextResponse.json(getCatalog().products);
}

export async function POST(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const catalog = getCatalog();

  const product: Product = {
    id: generateId("prod"),
    sku: body.sku,
    name: body.name,
    slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
    category: body.category,
    price: Number(body.price),
    description: body.description,
    shortDescription: body.shortDescription || body.description?.slice(0, 120),
    image: body.image,
    images: body.images || [body.image],
    featured: body.featured ?? false,
    trending: body.trending ?? false,
    inStock: body.inStock ?? true,
    metal: body.metal,
    gemstone: body.gemstone,
  };

  catalog.products.push(product);
  saveCatalog(catalog);
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const catalog = getCatalog();
  const index = catalog.products.findIndex((p) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  catalog.products[index] = { ...catalog.products[index], ...body, id: catalog.products[index].id };
  saveCatalog(catalog);
  return NextResponse.json(catalog.products[index]);
}

export async function DELETE(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const catalog = getCatalog();
  catalog.products = catalog.products.filter((p) => p.id !== id);
  saveCatalog(catalog);
  return NextResponse.json({ success: true });
}
