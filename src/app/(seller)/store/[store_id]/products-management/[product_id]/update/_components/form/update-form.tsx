"use client";
import SectionTitle from "@/components/section-title";
import ProductDetailsHeader from "../product-details-header";
import ItemConditionForm from "./condition-form";
import PriceForm from "./price-form";
import WarrantyForm from "./warranty-form";
import ImageForm from "./image-form/image-form";
import BasicForm from "./basic-form";
import DetailsForm from "./details-form";
import ShippingForm from "./shipping-form";
import OfferForm from "./offer-form";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { resetForm } from "@/lib/RTK/slices/seller/products-slice";
import useProductSeller from "@/hooks/seller/use-product_seller";

export default function UpdateForm() {
  const { store_id, product_id } = useParams();
  const { data, loading } = useProductSeller();
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div>
      <ProductDetailsHeader
        data={data}
        loading={loading}
        store_id={store_id}
        product_id={product_id}
        isPublished={isPublished}
        setIsPublished={setIsPublished}
      />
      <div className="rounded-sm border ">
        <div className="flex sm:items-center sm:flex-row flex-col items-start gap-2 p-3 border-b">
          <SectionTitle
            title="Product Details"
            className="text-[16px]  sm:text-[16px]"
          />
          <p className="text-[11px] text-shade  ">
            Fill all details to get your products online
          </p>
        </div>
        <PriceForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <OfferForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <ImageForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <BasicForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <DetailsForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <ItemConditionForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <WarrantyForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
        <ShippingForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
          setIsPublished={setIsPublished}
        />
      </div>
    </div>
  );
}
