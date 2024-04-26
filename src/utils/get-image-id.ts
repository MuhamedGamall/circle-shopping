export function getPublicId(image: string) {
  const startIndex = image.indexOf("circle-shopping/");
  const endIndex = image.lastIndexOf(".");
  return image.slice(startIndex, endIndex);
}
