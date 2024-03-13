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
import useProduct from "@/hooks/use-product";

export default function UpdateForm() {
  const { store_id, product_id } = useParams();
  const { data, loading } = useProduct();
  return (
    <div>
      <ProductDetailsHeader data={data} loading={loading} />
      <div className="rounded-sm border ">
        <div className="flex items-center gap-2 p-3 border-b">
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
        />
        <OfferForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <ImageForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <BasicForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <DetailsForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <ItemConditionForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <WarrantyForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
        <ShippingForm
          data={data}
          loading={loading}
          store_id={store_id}
          product_id={product_id}
        />
      </div>
    </div>
  );
}
