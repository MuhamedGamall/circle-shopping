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
import { useEffect } from "react";

export default function BestSellersContent() {
  const { category_id, sub_category_id } = useParams() as any;
  const dispatch = useAppDispatch();
  const { productsByMainCategoryForBestsellers, loading } = useAppSelector(
    (state) => state.member_categories
  );

  let params: any;
  if (typeof window !== "undefined") {
    const queryParams = qs.parse(window.location.search, {
      arrayFormat: "comma",
      parseNumbers: true,
    });
    params = { ...queryParams, role: "bestsellers" };
  }

  useEffect(() => {
    dispatch(cleanUp());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id.replaceAll("-", " "),
        params: params,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id, dispatch]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      <FilterSidebar
        groupFilters={productsByMainCategoryForBestsellers?.groupFilters}
        loading={loading}
      />
      <div className="w-full">
        <FilterTopbar
          resultsLength={productsByMainCategoryForBestsellers?.products?.length}
        />
      </div>
    </div>
  );
}
