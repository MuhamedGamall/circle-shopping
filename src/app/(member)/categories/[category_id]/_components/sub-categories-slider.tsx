"use client";

import CategoriesImagesWrapper from "@/components/wrappers/categorias-images-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getCategory_member
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";
import CategoryImg from "./sub-category-img";

export default function SubCategoriesSlider({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { category, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getCategory_member(category_id));
  }, [category_id, dispatch]);

  return (
    <CategoriesImagesWrapper loading={loading} className="p-0">
      {category?.sub_categories?.map((el: any, i: number) => (
        <CategoryImg key={i} {...el} category_id={category_id} />
      ))}
    </CategoriesImagesWrapper>
  );
}
