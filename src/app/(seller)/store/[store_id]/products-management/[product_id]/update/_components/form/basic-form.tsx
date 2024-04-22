"use client";

import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomTextarea from "@/components/custom-textarea";
import LoaderLayout from "@/components/loader-layout";
import { useAppDispatch } from "@/hooks/redux";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { productBasicSchema } from "../../schema";
import { DropdownMenuSelection } from "./select-values";
const sizesOptions = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "XXL",
  "XXXL",
  "XXXXL",
  "XXXXXL",
];
const coloursOptions = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Clear",
  "Gold",
  "Green",
  "Grey",
  "Multicolour",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];
export default function BasicForm({
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
  const [selectSizes, setSelectSizes] = useState<string[]>([]);
  const [selectColours, setSelectColours] = useState<string[]>([]);
  const form = useForm<z.infer<typeof productBasicSchema>>({
    resolver: zodResolver(productBasicSchema),
    defaultValues: {
      title: "",
      description: "",
      item_pack_quantity: 1,
      model_number: "",
      sizes: [],
      colours: [],
    },
    values: {
      title: data?.title || "",
      description: data?.description || "",
      item_pack_quantity: data?.item_pack_quantity || 1,
      model_number: data?.model_number || "",
      sizes: [],
      colours: [],
    },
  });

  useEffect(() => {
    const colours = data?.colours || [];
    const sizes = data?.sizes || [];
    setSelectColours(colours);
    setSelectSizes(sizes);
  }, [data?.colours, data?.sizes]);

  async function onSubmit(values: z.infer<typeof productBasicSchema>) {
    const update = await dispatch(
      updateProduct_seller({
        data: {
          ...values,
          sizes: selectSizes,
          colours: selectColours,
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
        <LoaderLayout loadingCondition={isSubmitting || loading} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Basic."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 items-baseline">
            <CustomField
              label="Title *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="title"
              type={"text"}
              className={"w-full"}
              placeholder="Title"
            />
            <CustomField
              label="Item Pack Quantity *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="item_pack_quantity"
              type={"number"}
              className={"w-full"}
              placeholder="Item Pack Quantity"
            />
            <CustomField
              label="Model Number"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="model_number"
              type={"text"}
              className={"w-full"}
              placeholder="Model Number"
            />

            <DropdownMenuSelection
              valuesSelected={selectSizes}
              setValuesSelected={setSelectSizes}
              disabled={isSubmitting || loading}
              label={"Sizes"}
              options={sizesOptions}
            />
          </div>

          <DropdownMenuSelection
            valuesSelected={selectColours}
            setValuesSelected={setSelectColours}
            disabled={isSubmitting || loading}
            label={"Colours"}
            options={coloursOptions}
            className="mt-5"
          />
          <CustomTextarea
            label="Long Description"
            labelClassName={"text-shade text-[12px] "}
            form={form}
            disabled={isSubmitting || loading}
            name="description"
            className={"w-full h-[200px] resize-none"}
            placeholder="Long Description"
          />
          <Button
            className="text-[11px] my-3 h-[30px] rounded-sm  "
            disabled={loading || isSubmitting}
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
