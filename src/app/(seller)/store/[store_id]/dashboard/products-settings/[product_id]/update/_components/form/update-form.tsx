"use client";
import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { Productschema } from "../../schema";
import useProduct from "@/hooks/use-product";

export default function UpdateForm() {
  const router = useRouter();
  const { data } = useProduct();

  const form = useForm<z.infer<typeof Productschema>>({
    resolver: zodResolver(Productschema),
    defaultValues: {
      is_live: data?.is_live || false,
      title: data?.title || "",
      image: data?.image || "",
      description: data?.description || "",
      department: data?.department || "",
      model_number: data?.model_number || "",
      model_name: data?.model_name || "",
      item_pack_quantity: data?.item_pack_quantity || 0,
      warranty: data?.warranty || "",
      item_condition: data?.item_condition || "",
      colour: data?.colour || "",
      box_details: data?.box_details || "",
      model_height: data?.model_height || "",
      sizes: data?.sizes || [],
      specifications: data?.specifications || [],
      highlights: data?.highlights || [],
      shipping: {
        shipping_length: {
          size: data?.shipping?.shipping_length?.size || 0,
          size_type: data?.shipping?.shipping_length?.size_type || "",
        },
        shipping_height: {
          size: data?.shipping?.shipping_height?.size || 0,
          size_type: data?.shipping?.shipping_height?.size_type || "",
        },
        shipping_width_depth: {
          size: data?.shipping?.shipping_width_depth?.size || 0,
          size_type: data?.shipping?.shipping_width_depth?.size_type || "",
        },
        shipping_weight: {
          size: data?.shipping?.shipping_weight?.size || 0,
          size_type: data?.shipping?.shipping_weight?.size_type || "",
        },
      },
      price: {
        base_price: data?.price?.base_price || 0.01,
        offer: {
          is_offered: data?.price?.offer?.is_offered || false,
          start_date: data?.price?.offer?.start_date,
          end_date: data?.price?.offer?.end_date,
          discount_percentage: data?.price?.offer?.discount_percentage || 0,
        },
      },
      quantity_in_stock: data?.quantity_in_stock || 0,
      max_purchase_quantity: data?.max_purchase_quantity || 1,
    },
  });

  async function onSubmit(values: z.infer<typeof Productschema>) {}

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col items-center justify-center"
      ></form>
    </Form>
  );
}
