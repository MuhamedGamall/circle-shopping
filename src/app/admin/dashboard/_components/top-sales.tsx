import { Product } from "@/types";
import Image from "next/image";

export default function TopSales({ data }: any) {
  return (
    <div className=" flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold">Top Selling Products</h2>
      </div>
      {data?.length ? (
        <ul className="mx-auto w-full h-full flex flex-col gap-2">
          {data?.map((el: Product, i: number) => (
            <li key={i}>
              <Image src={el?.images?.[0]} alt="product Image"  className="object-contain w-[60px] h-[80px]" width={60} height={80} />
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-slate-300 text-[20px] md:text-[40px] h-[400px] flex items-center justify-center">
          No Sales yet
        </span>
      )}
    </div>
  );
}
