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
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import LoaderLayout from "@/components/loader-layout";
import CustomSelectField from "@/components/custom-select-field";

export default function ItemConditionForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const { store_id, product_id } = useParams();

  const form = useForm<z.infer<typeof itemConditionSchema>>({
    resolver: zodResolver(itemConditionSchema),
    defaultValues: {
      item_condition: "",
    },
    values: {
      item_condition: data?.item_condition || "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemConditionSchema>) {
    console.log(values);

    try {
      await axios.patch(
        "/api/store/" + store_id + "/products/" + product_id,
        values
      );
      toast.success("Product Updated successfully");
    } catch (error) {
      toast.error("Uh oh! Something went wrong");
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={isSubmitting || loading} />
        <div className="pricing-section p-5 border-b">
          <SectionTitle
            title="Item Condition."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <CustomSelectField
            name={"item_condition"}
            labelClassName={"text-shade text-[12px]"}
            label="Item Condition *"
            form={form}
            selectData={["New", "Used"]}
          />
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
