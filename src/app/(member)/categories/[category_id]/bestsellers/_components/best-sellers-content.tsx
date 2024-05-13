"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import qs from "query-string";
import { useEffect, useState } from "react";

export default function BestSellersContent({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { productsByMainCategoryForBestsellers, loading } = useAppSelector(
    (state) => state.member_categories
  );

  let params: any;
  if (typeof window !== "undefined") {
    const queryParams = qs.parse(window.location.search, {
      arrayFormat: "bracket",
    });
    params = { ...queryParams, role: "bestsellers" };
  }

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", "%20"),
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
      <div>content</div>
    </div>
  );
}
