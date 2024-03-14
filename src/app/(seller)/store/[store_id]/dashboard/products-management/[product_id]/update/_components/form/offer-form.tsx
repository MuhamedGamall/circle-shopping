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
import resetOffer from "@/actions/reset-offer";

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
  // Reset the form when offer time expires
  useEffect(() => {
    resetOffer({
      data,
      form,
      store_id,
      product_id,
    });
  }, [data, form, product_id, store_id]);

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

    try {
      await axios.patch("/api/store/" + store_id + "/products/" + product_id, {
        "price.offer": values.offer,
      });
      setIsPublished(false);
      toast.success("Product Updated successfully");
    } catch (error) {
      toast.error("Uh oh! Something went wrong");
    }
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Pricing Offer."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-3 gap-x-5 sm:grid-cols-2 mb-5 items-baseline">
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
