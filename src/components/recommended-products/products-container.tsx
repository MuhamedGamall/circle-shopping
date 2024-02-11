"use client";

import SectionTitle from "../seection-title";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import ProductCard from "./product-card";
const products = [
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    price: 12,
    title:
      "  earum, qui incidunt suscipit tempora quisquam perferendis aut deserunt, odit perspiciatis obcaecati nisi consectetur quidem, consequatur ad blanditiis!",
  },
];
export default function ProductsContainer() {
  return (
    <div className="bg-slate-100 p-3">
      <SectionTitle title="Recommended for you" />
      <SliderWrapper>
        {products.map((el) => (
          <ProductCard key={el.image} {...el} height={200} width={200} />
        ))}
      </SliderWrapper>
    </div>
  );
}
