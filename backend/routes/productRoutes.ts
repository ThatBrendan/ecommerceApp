import { Router } from "express";
import { allProducts, headphones } from "../controllers/productController";

const router = Router();

router.get("/all-products", allProducts);
router.get("/headphones", headphones);

export default router;
