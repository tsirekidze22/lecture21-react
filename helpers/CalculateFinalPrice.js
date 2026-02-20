export const CalculateFinalPrice = (
  productPrice,
  discountPercentage,
  isPremiumUser,
) => {
  // 100, 20%, true
  let discountInPrice = productPrice * (discountPercentage / 100);
  let finalPrice = productPrice - discountInPrice;

  if (isPremiumUser) finalPrice = finalPrice * 0.95;

  return Number(finalPrice.toFixed(2));
};
