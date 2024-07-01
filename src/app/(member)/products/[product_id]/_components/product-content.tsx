"use client";

import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductImagesSection from "./product-images-section";
import LoaderLayout from "@/components/loader-layout";
import { getProduct_member } from "@/lib/RTK/slices/member/products-slice";
import ProductDetailsSection from "./product-details-section";

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
    <MaxWidthWrapper className="relative ">
      <LoaderLayout loading={loading} />
      <div className="w-full flex bg-white p-8 gap-8">
        <ProductImagesSection images={product?.images} />
        <ProductDetailsSection {...product} />
      </div>
    </MaxWidthWrapper>
  );
}
