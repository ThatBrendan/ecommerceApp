import { Request, Response } from "express";
import { processPayment } from "../services/paymentService";
import { resetBasket } from "../services/basketService";

export const makePayment = (req: Request, res: Response) => {
  const { email, firstName, lastName, cardNumber, expiryDate, cvv, amount } =
    req.body;
  const result = processPayment({
    email,
    firstName,
    lastName,
    cardNumber,
    expiryDate,
    cvv,
    amount,
  });
  if (result.status === "failure") {
    return res.status(400).json({ error: result.message });
  }
  resetBasket();
  return res.status(200).json(result);
};
