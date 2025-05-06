import sampleData from "../data/sampleData";
import { Product } from "../types/products";

let product: Product[] = [...sampleData];

export function getAll(): Product[] {
  return product;
}

export function search(
  q: string,
  min?: number,
  max?: number,
  sort?: "price_asc" | "price_desc"
): Product[] {
  let result = product.filter((p) => p.name.toLowerCase().includes(q));
  if (min != null) result = result.filter((p) => p.price >= min);
  if (max != null) result = result.filter((p) => p.price <= max);
  if (sort === "price_asc") result = result.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") result = result.sort((a, b) => b.price - a.price);

  return result;
}
