export function formatPrice(price: number) {
  const isIntegerPrice = Number.isInteger(price);
  const maximumFractionDigits = isIntegerPrice ? 0 : 1;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits,
    currency: "USD",
  });

  if (price >= 1e9) return formatter.format(price / 1e9) + "b";
  if (price >= 1e6) return formatter.format(price / 1e6) + "m";
  if (price >= 1e3) return formatter.format(price / 1e3) + "k";
  return formatter.format(price);
}
export function formatNumber(number: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits:2
  });

  if (number >= 1e9) return formatter.format(number / 1e9) + "b";
  if (number >= 1e6) return formatter.format(number / 1e6) + "m";
  if (number >= 1e3) return formatter.format(number / 1e3) + "k";
  return formatter.format(number);
}
export function getPublicId(image: string) {
  const startIndex = image.indexOf("circle-shopping/");
  const endIndex = image.lastIndexOf(".");
  return image.slice(startIndex, endIndex);
}
