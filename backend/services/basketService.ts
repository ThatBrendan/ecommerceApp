import { Product } from "../types/products";

let basket: Product[] = [];

export function getBasket(): Product[] {
  return basket;
}

export function addToBasket(product: Product): Product[] {
  basket.push(product);
  return basket;
}

export function removeFromBasket(name: string): Product[] {
  basket = basket.filter((item) => item.name !== name);
  return basket;
}
