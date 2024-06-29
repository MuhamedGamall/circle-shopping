"use client";
import useMemberCategories from "@/hooks/member/use-member-categories";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LoaderLayout from "../loader-layout";
import SectionTitle from "../section-title";
import { buttonVariants } from "../ui/button";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import CategoryCard from "./category-card";

export default function ShowCategories() {
  const { data, loading } = useMemberCategories();
  return (
    <div className={"relative"}>
      <div className={cn({ "h-[100px]": loading })}>
        <LoaderLayout loading={loading} />
      </div>
      {data?.map((category, i) => (
        <div key={i} className=" pb-3 px-4">
          <div className="flex justify-between items-center mt-2">
            <SectionTitle
              title={category?.main_category?.name}
              className=" pb-6 pt-2"
            />
            <Link
              href={
                "/categories/" +
                category?.main_category?.name?.replaceAll(" ", "-")
              }
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
            <CategoryCard
              sub_categories={category.sub_categories?.slice(0, 7)}
              main_category={category.main_category}
            />
          </SliderWrapper>
        </div>
      ))}
    </div>
  );
}
