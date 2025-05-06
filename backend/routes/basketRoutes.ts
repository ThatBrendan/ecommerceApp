import { Router } from "express";
import {
  getBasket,
  addToBasket,
  removeFromBasket,
} from "../controllers/basketController";

const router = Router();

router.get("/", getBasket);
router.post("/", addToBasket);
router.delete("/", removeFromBasket);

export default router;
