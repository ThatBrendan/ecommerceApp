interface OrderSummaryProps {
  readonly totalPrice: number;
  readonly discountedPrice: number;
  readonly discount: number;
}

export default function OrderSummary({
  totalPrice,
  discountedPrice,
  discount,
}: OrderSummaryProps) {
  return (
    <>
      <p className="bold text-end">Full Price: £{totalPrice.toFixed(2)}</p>
      {discount > 0 && (
        <p className="bold red-text text-end">
          Savings: - £{(totalPrice - discountedPrice).toFixed(2)}
        </p>
      )}
      <p className="bold text-end">
        Total to pay: £{discountedPrice.toFixed(2)}
      </p>
    </>
  );
}
