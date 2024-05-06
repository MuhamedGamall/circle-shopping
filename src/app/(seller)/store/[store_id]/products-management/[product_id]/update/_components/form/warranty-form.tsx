import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomSelectField from "@/components/custom-select-menu";
import LoaderLayout from "@/components/loader-layout";
import axios from "axios";
import toast from "react-hot-toast";
import { warrantySchema } from "../../schema";
import { Dispatch, SetStateAction } from "react";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";
import { useAppDispatch } from "@/hooks/redux";

export default function WarrantyForm({
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
  const form = useForm<z.infer<typeof warrantySchema>>({
    resolver: zodResolver(warrantySchema),
    defaultValues: {
      warranty: "",
    },
    values: {
      warranty: data?.warranty || "",
    },
  });

  async function onSubmit(values: z.infer<typeof warrantySchema>) {
    const update = await dispatch(
      updateProduct_seller({
        data: values,
        store_id,
        product_id,
      })
    );
    if (update?.meta?.requestStatus == "fulfilled") setIsPublished(false);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Additional Info."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <CustomSelectField
            name={"warranty"}
            labelClassName={"text-shade text-[12px]"}
            label="Warranty *"
            form={form}
            selectData={[
              "No Warranty",
              "1 Month Warranty",
              "2 Month Warranty",
              "3 Month Warranty",
              "6 Month Warranty",
              "1 Year Warranty",
              "2 Year Warranty",
            ]}
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
