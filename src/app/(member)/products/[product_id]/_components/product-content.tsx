"use client";

import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductImagesSection from "./product-images-section";
import LoaderLayout from "@/components/loader-layout";
import { getProduct_member } from "@/lib/RTK/slices/member/products-slice";
import ProductDetailsSection from "./product-details-section";
import ProductActionsSection from "./product-actions-section";

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
        <div className="w-full flex flex-[0_0_70%] gap-8">
          <div className="flex-1">
            <ProductImagesSection images={product?.images} />
          </div>
          <div className="flex-[0_0_50%]">
            <ProductDetailsSection {...product} />
          </div>
        </div>
        <div className="flex-1">
          <ProductActionsSection {...product} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
