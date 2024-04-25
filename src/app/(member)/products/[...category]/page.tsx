"use client";

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
  console.log(category);

  // console.log([main_category?.trim(), sub_category?.trim()]);

  return <div>MainCategoryPage</div>;
}
