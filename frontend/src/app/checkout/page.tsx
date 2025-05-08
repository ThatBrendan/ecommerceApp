"use client";
import { useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import CouponForm from "./CouponForm";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";

type ItemType = { name: string; price: number; color: string; img: string };

export default function CheckoutPage() {
  const [basket, setBasket] = useState<ItemType[]>([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/basket/")
      .then((res) => res.json())
      .then(setBasket);
  }, []);

  const removeItem = async (name: string) => {
    await fetch("http://localhost:5000/basket/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setBasket((prev) => prev.filter((item) => item.name !== name));
  };

  const applyCoupon = async () => {
    const res = await fetch("http://localhost:5000/coupon/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode }),
    });
    const data = await res.json();
    if (res.ok) {
      setDiscount(data.discount);
      setErrorMessage("");
    } else {
      setErrorMessage(data.error);
    }
  };

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);
  const discountedPrice = totalPrice * (1 - discount);

  return (
    <div className="row no-gutter">
      <h1>Checkout</h1>
      <div className="col-lg-6 checkout-product-container">
        {basket.map((item) => (
          <BasketItem key={item.name} item={item} onRemove={removeItem} />
        ))}

        <CouponForm
          couponCode={couponCode}
          onChange={setCouponCode}
          onApply={applyCoupon}
          errorMessage={errorMessage}
        />

        <OrderSummary
          totalPrice={totalPrice}
          discountedPrice={discountedPrice}
          discount={discount}
        />
      </div>

      <div className="col-lg-6 card-payment-container">
        <PaymentForm amount={discountedPrice} onSuccess={() => setBasket([])} />
      </div>
    </div>
  );
}
