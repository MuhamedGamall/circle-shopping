import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { shippingSchema } from "../../schema";

export default function ShippingForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      shipping: {
        shipping_height: { size: 0, size_type: "" },
        shipping_weight: { size: 0, size_type: "" },
        shipping_length: { size: 0, size_type: "" },
        shipping_width_depth: { size: 0, size_type: "" },
      },
    },
    values: {
      shipping: {
        shipping_height: data?.shipping?.shipping_height || {
          size: 0,
          size_type: "",
        },
        shipping_weight: data?.shipping?.shipping_weight || {
          size: 0,
          size_type: "",
        },
        shipping_length: data?.shipping?.shipping_length || {
          size: 0,
          size_type: "",
        },
        shipping_width_depth: data?.shipping?.shipping_length || {
          size: 0,
          size_type: "",
        },
      },
    },
  });

  async function onSubmit(values: z.infer<typeof shippingSchema>) {}

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Pricing."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-3 gap-x-5 sm:grid-cols-2 mb-5 items-baseline">
            <div>
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
            </div>
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
