export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function getPublicId(image: string) {
  const startIndex = image.indexOf("circle-shopping/");
  const endIndex = image.lastIndexOf(".");
  return image.slice(startIndex, endIndex);
}
