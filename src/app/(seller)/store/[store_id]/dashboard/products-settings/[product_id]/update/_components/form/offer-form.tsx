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
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { offerSchema } from "../../schema";

export default function OfferForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const { store_id, product_id } = useParams();
  const dateAfterFormating = (date: any): any => {
    return date ? formatDate(date, "yyyy-MM-dd") : null;
  };
  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offer: {
        start_date: null,
        end_date: null,
        discount_percentage: 0,
      },
    },
    values: {
      offer: {
        start_date: dateAfterFormating(data?.price?.offer?.start_date) || null,
        end_date: dateAfterFormating(data?.price?.offer?.end_date) || null,
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

    if (startDate < dateNow) {
      toast.error(
        "The Start Date must be greater than or equal to today's date"
      );
      return;
    }

    if (startDate >= endDate) {
      toast.error("Schedule the offer start date before the end date");
      return;
    }

    try {
      await axios.patch("/api/store/" + store_id + "/products/" + product_id, {
        "price.offer": values.offer,
      });
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
            disabled={loading || isSubmitting || !isValid}
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
