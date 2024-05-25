"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import FilterTopbar from "@/app/(member)/_components/filter-topbar";
import SortBySheet from "@/app/(member)/_components/sortby-sheet";
import ProductCard from "@/components/product-curd/product-card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { Separator } from "@radix-ui/react-menubar";
import { useParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
export default function ProductsCategoryContent() {
  const { category_id, sub_category_id } = useParams() as any;

  const dispatch = useAppDispatch();

  const { productsByMainCategory, loading } = useAppSelector(
    (state) => state.member_categories
  );

  const [searchParams, setSearchParams] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = qs.parse(window.location.search, {
        arrayFormat: "comma",
        parseNumbers: true,
        
      });
      queryParams && setSearchParams(queryParams);
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     dispatch(cleanUp());
  //   };
  // }, [dispatch]);
  
  useEffect(() => {
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", " "),
        params: searchParams,
      })
    );
  }, [category_id, dispatch, searchParams]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      <div className="md:block hidden">
        <FilterSidebar
          groupFilters={productsByMainCategory?.groupFilters}
          loading={loading}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <div className="md:hidden flex gap-2 items-center fixed  h-fit z-[1010] bottom-16 left-[50%] -translate-x-[50%] rounded-full bg-blue px-5 py-2 ">
        <Sheet>
          <SheetTrigger>
            <div className="flex gap-1 items-center text-white whitespace-nowrap">
              Sort By
              <BiSort className=" h-5 w-5" />
            </div>
          </SheetTrigger>
          <SheetContent
            side={"bottom"}
            className="pb-0  z-[1050] rounded-t-[30px]"
          >
            <SortBySheet
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </SheetContent>
        </Sheet>
        <Separator className="h-5 w-[1px] bg-white" />
        <Sheet>
          <SheetTrigger>
            <div className="flex gap-1 items-center text-white whitespace-nowrap">
              Filter
              <LuFilter className=" h-5 w-5" />
            </div>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="pb-0 w-fit overflow-y-auto z-[1050]"
          >
            <FilterSidebar
              groupFilters={productsByMainCategory?.groupFilters}
              loading={loading}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full ">
        <FilterTopbar
          resultsLength={productsByMainCategory?.products?.length}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <div className="products-container">
          {productsByMainCategory?.products?.map((el, i) => (
            <ProductCard key={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}
