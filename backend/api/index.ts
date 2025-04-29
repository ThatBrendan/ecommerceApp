import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sampleData from "./sampleData";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let basket: Array<{ name: string; color: string; price: number }> = [];

app.get("/headphones", (req: Request, res: Response) => {
  let data = [...sampleData];

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;

  // Filters
  const min = req.query.min ? parseFloat(req.query.min as string) : undefined;
  const max = req.query.max ? parseFloat(req.query.max as string) : undefined;

  if (min != null && max != null) {
    data = data.filter((p) => p.price >= min && p.price <= max);
  } else if (min != null) {
    data = data.filter((p) => p.price >= min);
  }

  // Sort
  const sort = req.query.sort;
  if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") data.sort((a, b) => b.price - a.price);

  const total = data.length;
  const paged = data.slice((page - 1) * limit, page * limit);

  res.json({ page, total, limit, items: paged });
});

app.get("/basket", (req: Request, res: Response) => res.json(basket));

app.post("/basket", (req: Request, res: Response) => {
  const { name, color, price } = req.body;
  if (!name || !color || !price) {
    return res.status(400).json({ error: "Invalid headphone data" });
  }
  basket.push({ name, color, price });
  res.status(201).json({ message: "Headphone added to basket", basket });
});

app.delete("/basket", (req: Request, res: Response) => {
  const { name } = req.body;
  basket = basket.filter((item) => item.name !== name);
  res.status(200).json({ message: "Removed", basket });
});

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to the Headphones API!")
);

app.listen(PORT, () => {
  console.log(`Adventure has started on http://localhost:${PORT}`);
});
