"use client";

import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { productBasicSchema } from "../../schema";
import CustomTextarea from "@/components/custom-textarea";
import { SizesDropdownMenu } from "./select-sizes";
import axios from "axios";
import toast from "react-hot-toast";
import LoaderLayout from "@/components/loader-layout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [selectSizes, setSelectSizes] = useState<string[]>([]);
  const form = useForm<z.infer<typeof productBasicSchema>>({
    resolver: zodResolver(productBasicSchema),
    defaultValues: {
      title: "",
      description: "",
      item_pack_quantity: 1,
      model_number: "",
      sizes: [],
    },
    values: {
      title: data?.title || "",
      description: data?.description || "",
      item_pack_quantity: data?.item_pack_quantity || 1,
      model_number: data?.model_number || "",
      sizes: [],
    },
  });
  useEffect(() => {
    const sizes = data?.sizes || [];
    setSelectSizes((prevSizes) => {
      const uniqueSizes: any = new Set([...prevSizes, ...sizes]);
      return [...uniqueSizes];
    });
  }, [data?.sizes, setSelectSizes]);

  async function onSubmit(values: z.infer<typeof productBasicSchema>) {
    try {
      await axios.patch("/api/store/" + store_id + "/products/" + product_id, {
        ...values,
        sizes: selectSizes,
      });
      setIsPublished(false);
      toast.success("Product Updated successfully");
    } catch (error) {
      toast.error("Uh oh! Something went wrong");
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={isSubmitting || loading} />
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Basic."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-3 gap-x-5 sm:grid-cols-2 items-baseline">
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

            <SizesDropdownMenu
              selectSizes={selectSizes}
              setSelectSizes={setSelectSizes}
              disabled={isSubmitting || loading}
            />
          </div>
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
