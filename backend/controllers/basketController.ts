import { Request, Response } from "express";
import * as basketService from "../services/basketService";

export const getBasket = (_req: Request, res: Response) => {
  res.json(basketService.getBasket());
};

export const addToBasket = (req: Request, res: Response) => {
  const { name, color, price, img } = req.body;
  if (!name || !color || !price || !img) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  const updatedBasket = basketService.addToBasket({ name, color, price, img });
  res
    .status(201)
    .json({ message: "Item added to basket", basket: updatedBasket });
};

export const removeFromBasket = (req: Request, res: Response) => {
  const { name } = req.body;
  const updatedBasket = basketService.removeFromBasket(name);
  res
    .status(200)
    .json({ message: "Item removed from basket", basket: updatedBasket });
};