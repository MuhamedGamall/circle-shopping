"use client";

import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { productBasicSchema } from "../../schema";
import CustomTextarea from "@/components/custom-textarea";
import { SizesDropdownMenu } from "./select-sizes";

export default function BasicForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
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
      sizes: data?.sizes || [],
    },
  });

  async function onSubmit(values: z.infer<typeof productBasicSchema>) {
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
            <SizesDropdownMenu form={form} />
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
