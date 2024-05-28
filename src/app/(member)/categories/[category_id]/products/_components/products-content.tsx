"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import FilterTopbar from "@/app/(member)/_components/filter-topbar";
import FiltersSheetTrigger from "@/app/(member)/_components/sheet-trigger";
import ProductCard from "@/components/product-curd/product-card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProductsByMainCategory_member } from "@/lib/RTK/slices/member/categories-slice";
import { useParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
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
    if (category_id && searchParams) {
      const formattedCategoryId = category_id?.replaceAll("-", " ");
      dispatch(
        getProductsByMainCategory_member({
          category_id: formattedCategoryId,
          params: searchParams,
        })
      );
    }
    console.log(searchParams);
    
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

      <FiltersSheetTrigger
        groupFilters={productsByMainCategory?.groupFilters}
        loading={loading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="w-full ">
        <FilterTopbar
          resultsLength={productsByMainCategory?.products?.length}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <div className="products-container my-5">
          {productsByMainCategory?.products?.map((el, i) => (
            <ProductCard key={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}
