interface CouponFormProps {
  couponCode: string;
  onChange: (code: string) => void;
  onApply: () => void;
  errorMessage: string;
}

export default function CouponForm({
  couponCode,
  onChange,
  onApply,
  errorMessage,
}: CouponFormProps) {
  return (
    <>
      <div className="coupon-container row no-gutter">
        <div className="col-9">
          <input
            type="text"
            className="coupon-input"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onApply();
              }
            }}
          />
        </div>
        <div className="col-1"></div>
        <div className="col-2">
          <button className="coupon-button" onClick={onApply}>
            Apply
          </button>
        </div>
      </div>
      {errorMessage && <p className="red-text">{errorMessage}</p>}
    </>
  );
}
