import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { itemConditionSchema } from "../../schema";
import axios from "axios";
import toast from "react-hot-toast";
import LoaderLayout from "@/components/loader-layout";
import CustomSelectField from "@/components/custom-select-field";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";

export default function ItemConditionForm({
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
    const update = await dispatch(
      updateProduct_seller({
        data: values,
        store_id,
        product_id,
      })
    );
    if (update?.meta?.requestStatus == "fulfilled") setIsPublished(false);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={isSubmitting || loading} />
        <div className="  p-5 border-b">
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
