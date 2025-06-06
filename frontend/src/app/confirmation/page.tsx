"use client";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const txn = params.get("txn");
  const email = params.get("email");

  return (
    <div className="confirmation-container">
      <h1>Payment Successful</h1>
      <p>
        Your transaction ID is: <strong>{txn}</strong>
      </p>
      <p>
        Thank you for your purchase! You should receive an email shortly to{" "}
        <strong>{email}</strong>
      </p>
    </div>
  );
}
