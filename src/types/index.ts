export type Category =
  | "engagement-rings"
  | "necklaces"
  | "bracelets"
  | "brooches"
  | "custom";

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  featured?: boolean;
  trending?: boolean;
  inStock: boolean;
  metal?: string;
  gemstone?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  image: string;
}
