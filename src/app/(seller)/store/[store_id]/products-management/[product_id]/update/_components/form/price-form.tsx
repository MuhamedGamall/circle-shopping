import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LoaderLayout from "@/components/loader-layout";
import axios from "axios";
import toast from "react-hot-toast";
import { priceSchema } from "../../schema";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products-slice";

export default function PriceForm({
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

  const form = useForm<z.infer<typeof priceSchema>>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: {
        base_price: 0.01,
      },
    },
    values: {
      price: {
        base_price: data?.price?.base_price || 0.01,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof priceSchema>) {
    dispatch(
      updateProduct_seller({
        data: { "price.base_price": values.price.base_price },
        store_id,
        product_id,
      })
    );
    setIsPublished(false);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Pricing."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="">
            <CustomField
              label="Base price *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="price.base_price"
              type={"number"}
              className={"w-full"}
              placeholder="Base price in US $"
            />
          </div>
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
