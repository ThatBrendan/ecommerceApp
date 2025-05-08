"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const [basket, setBasket] = useState<
    { name: string; price: number; color: string; img: string }[]
  >([]);
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
    setBasket(basket.filter((item) => item.name !== name));
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

  const router = useRouter();
  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);
  const discountedPrice = totalPrice * (1 - discount);

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
      amount: discountedPrice,
    };

    const res = await fetch("http://localhost:5000/payment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setBasket([]);
      router.push("/confirmation?txn=" + data.transactionId);
    } else {
      setPaymentError(data.error ?? "Payment failed");
    }
  };

  return (
    <div className="row no-gutter">
      <h1>Checkout</h1>
      <div className="col-lg-6 checkout-product-container">
        {basket.map((item, idx) => (
          <div key={idx} className="row no-gutter checkout-product-box">
            <div className="col-2">
              <Image
                src={item.img}
                alt={`${item.name} image`}
                width={50}
                height={50}
                className="col-4 checkout-image"
              />
            </div>

            <div className="col-9 checkout-product-text">
              <span className="green-text bold">{item.name}</span>
              <span>
                {item.color} <br /> £{item.price}
              </span>
            </div>
            <div className="col-1 remove-button-container">
              <button
                onClick={() => removeItem(item.name)}
                className="col-2 remove-button"
              >
                x
              </button>
            </div>
          </div>
        ))}

        <div className="coupon-container row no-gutter">
          <div className="col-9">
            <input
              type="text"
              className=" coupon-input"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <div className="col-1"></div>
          <div className="col-2">
            <button className="coupon-button" onClick={applyCoupon}>
              Apply
            </button>
          </div>
        </div>
        <p className="bold text-end">Full Price: £{totalPrice.toFixed(2)}</p>
        {discount > 0 && (
          <p className="bold red-text text-end">
            Savings: - £{(totalPrice - discountedPrice).toFixed(2)}
          </p>
        )}
        <p className="bold text-end">
          Total to pay: £{discountedPrice.toFixed(2)}
        </p>
        {errorMessage && <p className="red-text">{errorMessage}</p>}
      </div>

      <div className="col-lg-6 card-payment-container">
        <form onSubmit={handlePayment}>
          <div className="row no-gutter payment-details">
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
            <div className="col-2 "></div>
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
            <div className="col-2 hide-mobile"></div>
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
          </div>
        </form>
      </div>
    </div>
  );
}
