import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { priceSchema } from "../../schema";

export default function PriceForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
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

  async function onSubmit(values: z.infer<typeof priceSchema>) {}

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
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
              placeholder="Base price"
            />
            {/* <CustomField
              label="Offer Discount percentage *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="price.offer.discount_percentage"
              type={"number"}
              className={"w-full"}
              placeholder="Discount percentage "
            />
            <CustomField
              label="offer Start date *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="price.offer.start_date"
              type={"date"}
              className={"w-full"}
              placeholder="Start date"
            />
            <CustomField
              label="offer End date *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="price.offer.end_date"
              type={"date"}
              className={"w-full"}
              placeholder="End date"
            /> */}
          </div>
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
