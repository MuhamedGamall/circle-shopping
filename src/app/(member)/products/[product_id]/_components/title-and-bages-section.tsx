import { Product } from "@/types";
import Link from "next/link";
import { LuMousePointerClick } from "react-icons/lu";

export default function TitleAndBages({
  title,
  is_bestseller,
  category,
}: Product | any) {
  return (
    <div className=" flex flex-col gap-3 ">
      {!is_bestseller && (
        <Link
          href={`/products?role=bestsellers`}
          className="xs:flex hidden bg-slate-700 w-fit  rounded-[30px]  py-[2px] px-2   items-center gap-1 text-white"
        >
          <LuMousePointerClick className="rotate-90 h-5 w-50" />
          <span className="">Best Seller</span>
        </Link>
      )}
      <Link
        href={"/products?role=all_products&brand=" + category?.brand}
        className="bg-[#f3f4f8] p-2 rounded-[30px] w-full xs:w-fit uppercase font-bold text-black text-[15px]"
      >
        {category?.brand}
      </Link>
     
      <h1 className="text-[#404553]   capitalize font-semibold text-lg xs:text-[1.3em]">
        {title}
      </h1>
      {!is_bestseller && (
        <Link
          href={`/products?role=bestsellers`}
          className="xs:hidden flex font-bold bg-slate-700 w-fit  rounded-[30px]  py-[2px] mb-2 px-2   items-center gap-1 text-white"
        >
          <LuMousePointerClick className="rotate-90 h-5 w-50" />
          <span className="text-[12px]">Best Seller</span>
        </Link>
      )}
    </div>
  );
}
