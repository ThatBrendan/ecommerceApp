import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  readonly amount: number;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      email,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvv,
      amount,
    };
    const res = await fetch("http://localhost:5000/payment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      router.push(
        `/confirmation?txn=${data.transactionId}&email=${encodeURIComponent(
          data.email
        )}`
      );
    } else {
      setPaymentError(data.error ?? "Payment failed");
    }
  };

  return (
    <form onSubmit={handlePayment} className="row no-gutter payment-details">
      <div className="col-12">
        <input
          type="email"
          placeholder="Please enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="col-5">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="col-2"></div>
      <div className="col-5">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="col-5">
        <input
          type="text"
          placeholder="Expiry Date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      <div className="col-2"></div>
      <div className="col-5">
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <div className="col-12">
        <button className="payment-button" type="submit">
          Make Payment
        </button>
        {paymentError && <p className="red-text">{paymentError}</p>}
      </div>
    </form>
  );
}
