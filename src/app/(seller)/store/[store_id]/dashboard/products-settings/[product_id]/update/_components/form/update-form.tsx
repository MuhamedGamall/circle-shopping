"use client";
import SectionTitle from "@/components/section-title";
import useProduct from "@/hooks/use-product";

import ProductDetailsHeader from "../product-details-header";
import ItemConditionForm from "./condition-form";
import PriceForm from "./price-form";
import WarrantyForm from "./warranty-form";
import ImageForm from "./image-form/image-form";
import BasicForm from "./basic-form";
import DetailsForm from "./details-form";

export default function UpdateForm() {
  const { data, loading } = useProduct();

  return (
    <div>
      <ProductDetailsHeader />
      <div className="rounded-sm border ">
        <div className="flex items-center gap-2 p-3 border-b">
          <SectionTitle
            title="Product Details"
            className="text-[16px]  sm:text-[16px]"
          />
          <p className="text-[11px] text-shade ">
            Fill all details to get your products online
          </p>
        </div>
        <div>
          <PriceForm data={data} loading={loading} />
          <ImageForm data={data} loading={loading} />
          <BasicForm data={data} loading={loading} />
          <DetailsForm data={data} loading={loading} />
          <ItemConditionForm data={data} loading={loading} />
          <WarrantyForm data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
}
