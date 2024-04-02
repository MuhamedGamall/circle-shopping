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
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import { offerSchema } from "../../schema";
import { Dispatch, SetStateAction, useEffect } from "react";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";
import { useAppDispatch } from "@/hooks/redux";

export default function OfferForm({
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
  const dateFormating = (date: any): any => {
    return date ? formatDate(date, "yyyy-MM-dd") : "";
  };

  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offer: {
        start_date: "",
        end_date: "",
        discount_percentage: 0,
      } as any,
    },
    values: {
      offer: {
        start_date: dateFormating(data?.price?.offer?.start_date) || "",
        end_date: dateFormating(data?.price?.offer?.end_date) || "",
        discount_percentage: data?.price?.offer?.discount_percentage || 0,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof offerSchema>) {
    if (!Object.values(values.offer).every(Boolean)) {
      return;
    }

    const endDate = new Date(values?.offer?.end_date as Date)?.setHours(
      0,
      0,
      0,
      0
    );
    const startDate = new Date(values?.offer?.start_date as Date)?.setHours(
      0,
      0,
      0,
      0
    );
    const dateNow = new Date().setHours(0, 0, 0, 0);

    if (startDate < dateNow)
      return toast.error(
        "The Start Date must be greater than or equal to today's date"
      );

    if (startDate >= endDate)
      return toast.error("Schedule the offer start date before the end date");

    const update = await dispatch(
      updateProduct_seller({
        data: { "price.offer": values.offer },
        store_id,
        product_id,
      })
    );
    if (update?.meta?.requestStatus == "fulfilled") setIsPublished(false);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Pricing Offer."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
            <CustomField
              label="Offer Discount percentage *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="offer.discount_percentage"
              type={"number"}
              className={"w-full"}
              placeholder="Discount percentage "
            />
            <CustomField
              label="offer Start date *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="offer.start_date"
              type={"date"}
              className={"w-full"}
              placeholder="Start date"
            />
            <CustomField
              label="offer End date *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="offer.end_date"
              type={"date"}
              className={"w-full"}
              placeholder="End date"
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
