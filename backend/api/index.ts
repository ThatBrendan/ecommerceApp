import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sampleData from "./sampleData";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let basket: Array<{ name: string; color: string; price: number; img: string }> =
  [];
let allProducts: Array<{
  name: string;
  color: string;
  price: number;
  img: string;
}> = [...sampleData];

const coupons: { [key: string]: number } = {
  SAVE10: 0.1,
};

app.get("/all-products", (req: Request, res: Response) =>
  res.json(allProducts)
);

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

  //Search
  const query = req.query.q?.toString().toLowerCase();
  if (query && query.length >= 3) {
    data = data.filter((product) => product.name.toLowerCase().includes(query));
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
  const { name, color, price, img } = req.body;
  if (!name || !color || !price || !img) {
    return res.status(400).json({ error: "Invalid headphone data" });
  }
  basket.push({ name, color, price, img });
  res.status(201).json({ message: "Headphone added to basket", basket });
});
app.get("/search", (req: Request, res: Response) => {
  const query = req.query.q?.toString().toLowerCase();
  if (!query || query.length < 3) {
    return res.status(400).json({ error: "Search query required" });
  }

  const results = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  res.json(results);
});

app.post("/apply-coupon", (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Coupon code required" });
  }

  const discount = coupons[code];

  if (!discount) {
    return res.status(400).json({ error: "Invalid coupon code" });
  }

  res.json({ message: "Coupon applied successfully", discount });
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
