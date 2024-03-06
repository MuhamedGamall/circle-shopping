import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { shippingSchema } from "../../schema";
import { Label } from "@/components/ui/label";
import CustomSelectField from "@/components/custom-select-field";

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

  async function onSubmit(values: z.infer<typeof shippingSchema>) {
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Shipping."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="flex flex-col gap-3 justify-center">
            <div>
              <Label className="text-shade text-[12px] mb-2 block">
                Shipping Length *
              </Label>
              <div className="flex items-center">
                <CustomField
                  form={form}
                  disabled={isSubmitting || loading}
                  name="shipping.shipping_length.size"
                  type={"number"}
                  className={"w-full flex-[3] space-y-0 py-0"}
                  placeholder="Shipping length"
                />
                <CustomSelectField
                  form={form}
                  disabled={isSubmitting || loading}
                  className={"flex-[1] py-0 space-y-0"}
                  name="shipping.shipping_length.size_type"
                  selectData={["mm", "cm", "in", "m", "ft"]}
                />
              </div>
            </div>
            <div>
              <Label className="text-shade text-[12px] mb-2 block">
                Shipping Height *
              </Label>
              <div className="flex items-center">
                <CustomField
                  form={form}
                  disabled={isSubmitting || loading}
                  name="shipping.shipping_height.size"
                  type={"number"}
                  className={"w-full flex-[3] space-y-0 py-0"}
                  placeholder="Shipping height"
                />
                <CustomSelectField
                  form={form}
                  disabled={isSubmitting || loading}
                  className={"flex-[1] py-0 space-y-0"}
                  name="shipping.shipping_height.size_type"
                  selectData={["mm", "cm", "in", "m", "ft"]}
                />
              </div>
            </div>
            <div>
              <Label className="text-shade text-[12px] mb-2 block">
                Shipping Width/Depth *
              </Label>
              <div className="flex items-center">
                <CustomField
                  form={form}
                  disabled={isSubmitting || loading}
                  name="shipping.shipping_width_depth.size"
                  type={"number"}
                  className={"w-full flex-[3] space-y-0 py-0"}
                  placeholder="Shipping width/depth"
                />
                <CustomSelectField
                  form={form}
                  disabled={isSubmitting || loading}
                  className={"flex-[1] py-0 space-y-0"}
                  name="shipping.shipping_width_depth.size_type"
                  selectData={["mm", "cm", "in", "m", "mg", "ft"]}
                />
              </div>
            </div>
            <div>
              <Label className="text-shade text-[12px] mb-2 block">
                Shipping Weight *
              </Label>
              <div className="flex items-center">
                <CustomField
                  form={form}
                  disabled={isSubmitting || loading}
                  name="shipping.shipping_weight.size"
                  type={"number"}
                  className={"w-full flex-[3] space-y-0 py-0"}
                  placeholder="Shipping length"
                />
                <CustomSelectField
                  form={form}
                  disabled={isSubmitting || loading}
                  className={"flex-[1] py-0 space-y-0"}
                  name="shipping.shipping_weight.size_type"
                  selectData={["g", "lb", "KG", "ft"]}
                />
              </div>
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
