"use client";

import LoaderLayout from "@/components/loader-layout";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct_member } from "@/lib/RTK/slices/member/products-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductActionsSection from "./product-actions-section";
import ProductDetailsSection from "./product-details-section";
import ProductImagesSection from "./product-images-section";
import ButtonsActions from "./buttons-actions";
import Loader from "@/components/loader";

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
      {loading && <Loader />}
      <div className="w-full flex bg-white p-8 gap-8">
        <div className="w-full  flex flex-[0_0_70%] gap-8">
          <div className="md:flex-1 w-[40%]">
            <ProductImagesSection images={product?.images} />
            <div className=" mt-5 md:hidden block">
              <ButtonsActions
                quantity_in_stock={product?.quantity_in_stock || 0}
                sizes={product?.sizes || []}
                max_purchase_quantity={product?.max_purchase_quantity || 1}
              />
            </div>
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
