import { Request, Response } from "express";
import * as productService from "../services/productService";

export const allProducts = (_req: Request, res: Response) => {
  res.json(productService.getAll());
};

export const headphones = (req: Request, res: Response) => {
  const page = +req.query.page! || 1;
  const limit = +req.query.limit! || 10;
  const qs = (req.query.q as string) || "";
  const min = req.query.min ? +req.query.min : undefined;
  const max = req.query.max ? +req.query.max : undefined;
  const sort = req.query.sort as "price_asc" | "price_desc" | undefined;

  const filtered = productService.search(qs.toLowerCase(), min, max, sort);
  const total = filtered.length;
  const items = filtered.slice((page - 1) * limit, page * limit);

  res.json({ page, total, limit, items });
};
