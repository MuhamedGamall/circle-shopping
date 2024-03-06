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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { productDeitalsSchema } from "../../schema";
import AddDetails from "./add-details";
import { useState } from "react";

export default function DetailsForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const [specifications, setSpecifications] = useState<string[]>([""]);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const form = useForm<z.infer<typeof productDeitalsSchema>>({
    resolver: zodResolver(productDeitalsSchema),
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
      highlights: data?.highlights || [],
      max_purchase_quantity: data?.max_purchase_quantity || 1,
      model_height: data?.model_height || "",
      model_name: data?.model_name || "",
      quantity_in_stock: data?.quantity_in_stock || 1,
      specifications: data?.specifications || [],
    },
  });

  async function onSubmit(values: z.infer<typeof productDeitalsSchema>) {
    console.log({ ...values, specifications, highlights });
  }
  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Product Details."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-3 gap-x-5 sm:grid-cols-2 items-baseline">
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
            <FormField
              control={form.control}
              name={"colour"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={"text-shade text-[12px]"}>
                    Colour *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-sm py-5">
                        <SelectValue placeholder="Select Colour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Colours</SelectLabel>
                          <SelectItem value="Beige">Beige</SelectItem>
                          <SelectItem value="Black">Black</SelectItem>
                          <SelectItem value="Blue">Blue</SelectItem>
                          <SelectItem value="Brown">Brown</SelectItem>
                          <SelectItem value="Clear">Clear</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Green">Green</SelectItem>
                          <SelectItem value="Grey">Grey</SelectItem>
                          <SelectItem value="Multicolour">
                            Multicolour
                          </SelectItem>
                          <SelectItem value="Orange">Orange</SelectItem>
                          <SelectItem value="Pink">Pink</SelectItem>
                          <SelectItem value="Purple">Purple</SelectItem>
                          <SelectItem value="Red">Red</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="White">White</SelectItem>
                          <SelectItem value="Yellow">Yellow</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <AddDetails
            form={form}
            data={specifications}
            setData={setSpecifications}
            name={"specifications"}
            label={"specifications"}
          />
          <AddDetails
            form={form}
            data={highlights}
            setData={setHighlights}
            name={"highlights"}
            label={"highlights"}
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
