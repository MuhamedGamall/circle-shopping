"use client";

import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct_member } from "@/lib/RTK/slices/member/products-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ImagesSection from "./images-section";
import LoaderLayout from "@/components/loader-layout";

export default function ProductContent() {
  const { product_id } = useParams();
  const dispatch = useAppDispatch();

  const { product, loading } = useAppSelector((state) => state.member_products);

  useEffect(() => {
    if (product_id) {
      dispatch(getProduct_member(product_id));
    }
  }, [dispatch, product_id]);

  return (
    <MaxWidthWrapper className="relative">
      <LoaderLayout loading={loading} />
      <div className="bg-red-200 w-full flex">
        <ImagesSection images={product?.images} />
      </div>
    </MaxWidthWrapper>
  );
}
