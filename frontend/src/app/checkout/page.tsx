"use client";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [basket, setBasket] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/basket")
      .then((res) => res.json())
      .then(setBasket);
  }, []);

  const removeItem = async (name: string) => {
    await fetch("http://localhost:5000/basket", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setBasket(basket.filter((item) => item.name !== name));
  };

  return (
    <div>
      <h1>Checkout</h1>
      {basket.map((item, idx) => (
        <div key={idx}>
          <span>
            {item.name} - £{item.price}
          </span>
          <button onClick={() => removeItem(item.name)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
