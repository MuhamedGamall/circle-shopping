"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getCategory_member,
  getProductsBySubCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function BestSellersContent({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { productsBySubCategory, category, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getProductsBySubCategory_member({ category_id }));
    dispatch(getCategory_member(category_id));
  }, [category_id, dispatch]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] h-screen">
      <FilterSidebar
        groupFilters={{ ...productsBySubCategory?.groupFilters, category }}
        loading={loading}
      />
      <div>content</div>
    </div>
  );
}
