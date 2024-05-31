"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import ProductsTopbar from "@/app/(member)/_components/products-topbar";
import FiltersSheetTrigger from "@/app/(member)/_components/sheet-trigger";
import ProductCard from "@/components/product-curd/product-card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProducts_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
export default function ProductsContent() {
  const { category_id, sub_category_id } = useParams() as any;

  const dispatch = useAppDispatch();

  const { products, loading } = useAppSelector(
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

  useEffect(() => {
    const newParams = {
      ...(category_id && {
        mainCategory: category_id?.replaceAll("-", " "),
      }),
      ...(sub_category_id && {
        subCategory: sub_category_id?.replaceAll("-", " "),
      }),
      ...searchParams,
    };
    if ( searchParams) {
      dispatch(getProducts_member(newParams));
    }
    return () => {
      dispatch(cleanUp());
    };
  }, [category_id, dispatch, searchParams, sub_category_id]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      <div className="md:block hidden">
        <FilterSidebar
          groupFilters={products?.groupFilters}
          loading={loading}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <FiltersSheetTrigger
        groupFilters={products?.groupFilters}
        loading={loading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="w-full ">
        <ProductsTopbar
          resultsLength={products?.products?.length}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <div className="products-container my-5">
          {products?.products?.map((el, i) => (
            <ProductCard key={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}
