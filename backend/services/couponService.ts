const coupons: { [key: string]: number } = {
  SAVE10: 0.1,
};

export function validateCoupon(code: string): number | null {
  return coupons[code] ?? null;
}
