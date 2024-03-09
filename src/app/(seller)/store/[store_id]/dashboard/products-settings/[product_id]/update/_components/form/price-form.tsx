import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { priceSchema } from "../../schema";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function PriceForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const { store_id, product_id } = useParams();

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
    try {
        await axios.patch(
          "/api/store/" + store_id + "/products/" + product_id+'/price',
          values
        );

      toast.success("Product Updated successfully");
    } catch (error) {
      toast.error("Uh oh! Something went wrong");
    }
  }

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
              placeholder="Base price in US $"
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
