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
    <div className="bg-[#f7f7fa] p-5">
      <MaxWidthWrapper>
        <div className="products-container ">
          {products?.map((el, i) => (
            <ProductCard key={i} {...el} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
