"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function BestSellersContent({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { productsByMainCategoryForBestsellers, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", "%20"),
        params: { role:'bestsellers' },
      })
    );
  }, [category_id, dispatch]);
  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      <FilterSidebar
        groupFilters={productsByMainCategoryForBestsellers?.groupFilters }
        loading={loading}
      />
      <div>content</div>
    </div>
  );
}
