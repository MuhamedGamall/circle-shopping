"use client";

import ProductCard from "@/components/product-curd/product-card";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { SliderWrapper } from "@/components/wrappers/slider-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProductsByCategory } from "@/lib/RTK/slices/products-slice";
import { useEffect } from "react";

export default function CategoryPage({
  params: { category },
}: {
  params: { category: string | string[] };
}) {
  const { products } = useAppSelector((state) => state.allProducts);
  const dispatch = useAppDispatch();

  let [main_category, sub_category = ""] = Array.isArray(category)
    ? category
    : [category];

  useEffect(() => {
    dispatch(getProductsByCategory({ main_category, sub_category }));
  }, [category, dispatch, main_category, sub_category]);

  return (
    <MaxWidthWrapper>
      <div className="grid gap-5  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products?.map((el, i) => (
          <ProductCard key={i} {...el} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
