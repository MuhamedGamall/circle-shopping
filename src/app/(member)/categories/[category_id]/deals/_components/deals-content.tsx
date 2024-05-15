"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function DealsContent({ category_id }: { category_id: string }) {
  const dispatch = useAppDispatch();
  const { productsByMainCategoryForDeals, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", " "),
        params: { role: "deals" },
      })
    );
  }, [category_id, dispatch]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] h-screen">
      <FilterSidebar
        groupFilters={productsByMainCategoryForDeals?.groupFilters}
        loading={loading}
      />
      <div>content</div>
    </div>
  );
}
