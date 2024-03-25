"use client";

import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import toast from "react-hot-toast";
import { storeSchema } from "../schema";
import useStore from "@/hooks/seller/use-store_seller";
import LoaderLayout from "@/components/loader-layout";
import { useAppDispatch } from "@/hooks/redux";
import { UpdateStore_seller } from "@/lib/RTK/slices/seller/store";

export default function FormFields() {
  const dispatch = useAppDispatch();
  const { data, loading } = useStore();
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      display_name: "",
      business_email: "",
      finance_email: "",
      store_phone_number: "",
    },
    values: {
      display_name: data?.display_name || "",
      business_email: data?.business_email || "",
      finance_email: data?.finance_email || "",
      store_phone_number: data?.store_phone_number || "",
    },
  });

  async function onSubmit(values: z.infer<typeof storeSchema>) {
    dispatch(
      UpdateStore_seller({
        data: values,
        _id: data?._id,
      })
    );
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col items-center justify-center "
      >
        <LoaderLayout loadingCondition={loading || isSubmitting} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 w-full ">
          <CustomField
            label="Display name *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="display_name"
            type={"text"}
            minLength={1}
            maxLength={30}
            className={"  w-full"}
            placeholder="Display name "
          />
          <CustomField
            label="Business email *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="business_email"
            type={"email"}
            className={"  w-full"}
            placeholder="Business email "
          />
          <CustomField
            label="Finance email *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="finance_email"
            type={"email"}
            className={"  w-full"}
            placeholder="Finance email "
          />
          <CustomField
            label="Store phone number *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="store_phone_number"
            type={"text"}
            className={"  w-full"}
            placeholder="Store phone number"
          />
        </div>
        <Button
          type="submit"
          className="mr-auto  "
          disabled={isSubmitting || loading}
          variant={"blue"}
        >
          SAVE CHANGES
        </Button>
      </form>
    </Form>
  );
}
