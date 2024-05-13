"use client";

import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomSelectField from "@/components/custom-select-menu";
import LoaderLayout from "@/components/loader-layout";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productDetailsSchema } from "../../schema";
import AddDetails from "./add-details";
import { useAppDispatch } from "@/hooks/redux";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";
const coloursOptions = [
  "beige",
  "black",
  "blue",
  "brown",
  "clear",
  "gold",
  "green",
  "grey",
  "multicolour",
  "orange",
  "pink",
  "purple",
  "red",
  "silver",
  "white",
  "yellow",
];
export default function DetailsForm({
  data,
  loading,
  store_id,
  product_id,
  setIsPublished,
}: {
  data: Product | null;
  loading: boolean;
  store_id: string | string[];
  product_id: string | string[];
  setIsPublished: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const [errorSpecifications, setErrorSpecifications] = useState<boolean[]>([]);
  const [errorHighlights, setErrorHighlights] = useState<boolean[]>([]);

  const [specifications, setSpecifications] = useState<string[]>([""]);
  const [highlights, setHighlights] = useState<string[]>([""]);

  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: {
      box_details: "",
      colour: "",
      highlights: [],
      max_purchase_quantity: 0,
      model_height: "",
      model_name: "",
      quantity_in_stock: 0,
      specifications: [],
    },
    values: {
      box_details: data?.box_details || "",
      colour: data?.colour || "",
      highlights: [],
      max_purchase_quantity: data?.max_purchase_quantity || 1,
      model_height: data?.model_height || "",
      model_name: data?.model_name || "",
      quantity_in_stock: data?.quantity_in_stock || 0,
      specifications: [],
    },
  });

  useEffect(() => {
    if (data) {
      const highlights = data.highlights;
      const specifications = data.specifications;

      setHighlights((curr) => {
        const unique: any = new Set([...highlights, ...curr]);
        return [...unique];
      });
      setSpecifications((curr) => {
        const unique: any = new Set([...specifications, ...curr]);
        return [...unique];
      });
    }
  }, [data, data?.highlights, data?.specifications]);

  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    if (errorHighlights.includes(true))
      return toast.error("Fixing highlights fields for submitting");

    if (errorSpecifications.includes(true))
      return toast.error("Fixing specifications fields for submitting");

    const removeRepeateValue = {
      specifications: [...(new Set(specifications) as any)],
      highlights: [...(new Set(highlights) as any)],
    };

    const update = await dispatch(
      updateProduct_seller({
        data: {
          ...values,
          ...removeRepeateValue,
        },
        store_id,
        product_id,
      })
    );
    if (update?.meta?.requestStatus == "fulfilled") setIsPublished(false);
  }
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Product Details."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 items-baseline">
            <CustomField
              label="Box Details *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="box_details"
              type={"text"}
              className={"w-full"}
              placeholder="Box Details"
            />
            <CustomField
              label="max purchase quantity *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="max_purchase_quantity"
              type={"number"}
              className={"w-full"}
              placeholder="max_purchase_quantity"
            />
            <CustomField
              label="model height *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="model_height"
              type={"text"}
              className={"w-full"}
              placeholder="Model Height"
            />
            <CustomField
              label="model name *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="model_name"
              type={"text"}
              className={"w-full"}
              placeholder="Model Name"
            />
            <CustomField
              label="quantity in stock *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="quantity_in_stock"
              type={"number"}
              className={"w-full"}
              placeholder="quantity in stock"
            />
            <CustomSelectField
              name={"colour"}
              labelClassName={"text-shade text-[12px]"}
              label="Colour *"
              form={form}
              selectData={coloursOptions}
            />
          </div>
          <AddDetails
            setErrorMessages={setErrorSpecifications}
            errorMessages={errorSpecifications}
            data={specifications}
            setData={setSpecifications}
            name={"specifications"}
            label={"specifications"}
          />
          <AddDetails
            setErrorMessages={setErrorHighlights}
            errorMessages={errorHighlights}
            data={highlights}
            setData={setHighlights}
            name={"highlights"}
            label={"highlights"}
          />
          <Button
            type="submit"
            className="text-[11px] my-3 h-[30px] rounded-sm  "
            // disabled={loading || isSubmitting || !isValid}
            variant={"blue"}
            size={"sm"}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
