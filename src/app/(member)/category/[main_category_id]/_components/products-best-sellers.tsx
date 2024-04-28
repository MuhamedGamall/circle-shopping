"use client";

import CategoriesImagesWrapper from "@/components/wrappers/categorias-images-wrapper";
import useCategories from "@/hooks/use-categories";
import CategoryImg from "./sub-category-img";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import {
  cleanUp,
  getProductsBestSellers,
  getSubCategories,
} from "@/lib/RTK/slices/search-by-category-slice";
import SectionTitle from "@/components/section-title";
import { SliderWrapper } from "@/components/wrappers/slider-wrapper";
import ProductCard from "@/components/products-slider/product-card";
import ProductsSlider from "@/components/products-slider/products-container";

export default function ProductsBestSellers({
  main_category_id,
}: {
  main_category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { bestSellers, loading } = useAppSelector(
    (state) => state.searchByCategory
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getProductsBestSellers(main_category_id));
  }, [main_category_id, dispatch]);

  return (
    <ProductsSlider data={bestSellers} loading={loading} title="Bestsellers" />
  );
}
