export interface Product {
  name: string;
  color: string;
  price: number;
  img: string;
}

export interface PaymentRequest {
  email: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

export interface PaymentResponse {
  transactionId: string;
  status: "success" | "failure";
  message: string;
}
