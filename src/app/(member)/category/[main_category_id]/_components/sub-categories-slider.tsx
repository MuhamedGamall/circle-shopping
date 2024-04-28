"use client";

import CategoriesImagesWrapper from "@/components/wrappers/categorias-images-wrapper";
import useCategories from "@/hooks/use-categories";
import CategoryImg from "./category-img";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import {
  cleanUp,
  getSubCategories,
} from "@/lib/RTK/slices/search-by-category-slice";

export default function SubCategoriesSlider({
  main_category_id,
}: {
  main_category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { subCategories, loading } = useAppSelector(
    (state) => state.searchByCategory
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getSubCategories(main_category_id));
  }, [main_category_id, dispatch]);

  return (
    <>
      <CategoriesImagesWrapper loading={loading} className="p-0">
        {subCategories?.sub_categories?.map((el: any, i: number) => (
          <CategoryImg key={i} {...el} main_category_id={main_category_id} />
        ))}
      </CategoriesImagesWrapper>
    </>
  );
}
