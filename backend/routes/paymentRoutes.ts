import { Router } from "express";
import { makePayment } from "../controllers/paymentController";

const router = Router();

router.post("/", makePayment);

export default router;
