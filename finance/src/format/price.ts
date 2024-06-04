export function formatPrice(price: number): string {
  const formattedPrice = price.toFixed(2);
  return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
