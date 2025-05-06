import { Request, Response } from "express";
import * as couponService from "../services/couponService";

export const applyCoupon = (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Coupon code required" });
  }

  const discount = couponService.validateCoupon(code);

  if (!discount) {
    return res.status(400).json({ error: "Invalid coupon code" });
  }

  res.json({ message: "Coupon applied successfully", discount });
};
