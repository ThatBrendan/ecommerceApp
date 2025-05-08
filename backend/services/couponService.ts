const coupons: { [key: string]: number } = {
  save10: 0.1,
};

export function validateCoupon(code: string): number | null {
  return coupons[code.toLowerCase()] ?? null;
}
