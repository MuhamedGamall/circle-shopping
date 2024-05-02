"use client";
import LoaderLayout from "@/components/loader-layout";
import ProductsSlider from "@/components/products-slider/products-container";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProductsByCategory_member } from "@/lib/RTK/slices/member/categories-slice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductsByCategory({
   category-id,
}: {
   category-id: string;
}) {
  const dispatch = useAppDispatch();
  const { productsByCategory, loading } = useAppSelector(
    (state) => state.member_categories
  );
  useEffect(() => {
    dispatch(getProductsByCategory_member( category-id));
  }, [ category-id, dispatch]);

  return productsByCategory?.map((category, i) => (
    <ProductsSlider
      key={i}
      data={category?.products}
      title={category?._id?.sub_category}
      loading={loading}
      viewAllLink={
        "/categories/" +
         category-id?.replaceAll(" ", "-") +
        "/" +
        category?._id?.sub_category?.replaceAll(" ", "-")
      }
    />
  ));
}
