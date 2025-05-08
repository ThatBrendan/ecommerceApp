import { PaymentRequest, PaymentResponse } from "../types/products";

export function processPayment(data: PaymentRequest): PaymentResponse {
  const isValid =
    data.email &&
    data.firstName &&
    data.lastName &&
    /^\d{16}$/.test(data.cardNumber) &&
    /^\d{2}\/\d{2}$/.test(data.expiryDate) &&
    /^\d{3,4}$/.test(data.cvv) &&
    data.amount > 0;

  if (!isValid) {
    return {
      transactionId: "",
      status: "failure",
      message: "Invalid payment data",
    };
  }
  // Return dummy success
  return {
    transactionId: "txn_" + Math.random().toString(36).substring(2, 11),
    status: "success",
    message: "Payment processed successfully",
    email: data.email
  };
}
