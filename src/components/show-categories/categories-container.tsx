import Link from "next/link";
import SectionTitle from "../section-title";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import CategoryCard from "./category-card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const products = [
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N40633047A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N41247610A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N43241184A_1.avif",
    href: "/",
    title: "lorem lorem lorem",
  },
  {
    image: "/products/N53346840A_1.jpg",
    href: "/",
    title: "lorem lorem lorem",
  },
];
export default function ShowCategories() {
  return (
    <div className=" pb-3 px-4">
      <div className="flex justify-between items-center">
        <SectionTitle title="Category title" className=" pb-6 pt-2" />
        <Link
          href={"/"}
          className={cn(
            buttonVariants({
              variant: "outline",
              className:
                " text-[11px] sm:text-sm rounded-none sm:px-4 px-2 sm:h-[40px]  h-[30px] border-slate-700",
            })
          )}
        >
          VIEW ALL
        </Link>
      </div>
      <SliderWrapper>
        {products.map((el) => (
          <CategoryCard key={el.image} {...el} height={200} width={200} />
        ))}
      </SliderWrapper>
    </div>
  );
}
