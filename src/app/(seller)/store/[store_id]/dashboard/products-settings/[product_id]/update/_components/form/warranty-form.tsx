import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
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
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { warrantySchema } from "../../schema";

export default function WarrantyForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof warrantySchema>>({
    resolver: zodResolver(warrantySchema),
    defaultValues: {
      warranty: "No Warranty",
    },
    values: {
      warranty: data?.item_condition || "No Warranty",
    },
  });

  async function onSubmit(values: z.infer<typeof warrantySchema>) {
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Additional Info."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <FormField
            control={form.control}
            name={"warranty"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={""}>Warranty</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=" ">
                      <SelectValue placeholder="Warranty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Warranty</SelectLabel>
                        <SelectItem value="No Warranty">No Warranty</SelectItem>
                        <SelectItem value="1 Month Warranty">
                          1 Month Warranty
                        </SelectItem>
                        <SelectItem value="2 Month Warranty">
                          2 Month Warranty
                        </SelectItem>
                        <SelectItem value="3 Month Warranty">
                          3 Month Warranty
                        </SelectItem>
                        <SelectItem value="6 Month Warranty">
                          6 Month Warranty
                        </SelectItem>
                        <SelectItem value="1 Year Warranty">
                          1 Year Warranty
                        </SelectItem>
                        <SelectItem value="2 Year Warranty">
                          2 Year Warranty
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
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
