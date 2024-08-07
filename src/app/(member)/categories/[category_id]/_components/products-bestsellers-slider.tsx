"use client";

import Loader from "@/components/loader";
import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cleanUp } from "@/lib/RTK/slices/member/categories-slice";
import { getProducts_member } from "@/lib/RTK/slices/member/products-slice";
import { useEffect } from "react";

export default function ProductsBestSellers({
  category_id,
  data,
  loading,
}: {
  data: any;
  loading: boolean;
  category_id: string;
}) {
  // const dispatch = useAppDispatch();
  // const { productsByMainCategoryForBestsellersSlider, loading } =
  //   useAppSelector((state) => state.member_products);

  // useEffect(() => {
  //   if (params && category_id) {
  //     dispatch(
  //       getProducts_member({
  //         ...params,
  //         mainCategory: category_id?.replaceAll("-", " "),
  //       })
  //     );
  //   }
  //   return () => {
  //     dispatch(cleanUp());
  //   };
  // }, [category_id, dispatch, params]);

  return (
    <>
     {loading && <Loader />}
      <ProductsSlider
        data={data?.products}
        loading={loading}
        title={category_id?.replaceAll("-", " ") + " bestsellers"}
        viewAllLink={{
          pathname: "/categories/" + category_id + "/products",
          query: { role: "bestsellers" },
        }}
      />
    </>
  );
}
