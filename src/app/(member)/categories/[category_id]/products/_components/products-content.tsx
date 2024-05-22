"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import FilterTopbar from "@/app/(member)/_components/filter-topbar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
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

  useEffect(() => {
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id.replaceAll("-", " "),
        params: searchParams,
      })
    );
    return () => {
      dispatch(cleanUp());
    };
  }, [category_id, dispatch, searchParams]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      <FilterSidebar
        groupFilters={productsByMainCategory?.groupFilters}
        loading={loading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="w-full">
        <FilterTopbar
          resultsLength={productsByMainCategory?.products?.length}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}