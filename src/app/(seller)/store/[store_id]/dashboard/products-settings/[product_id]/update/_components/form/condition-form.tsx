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

import { itemConditionSchema } from "../../schema";

export default function ItemConditionForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof itemConditionSchema>>({
    resolver: zodResolver(itemConditionSchema),
    defaultValues: {
      item_condition: "",
    },
    values: {
      item_condition: data?.item_condition || "New",
    },
  });

  async function onSubmit(values: z.infer<typeof itemConditionSchema>) {
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Item Condition."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <FormField
            control={form.control}
            name={"item_condition"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={""}>Item condition</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=" ">
                      <SelectValue placeholder="Select Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Conditions</SelectLabel>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
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
