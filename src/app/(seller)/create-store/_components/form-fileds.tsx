"use client";

import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createStoreSchema } from "../schema";

export default function FormFields() {
  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      display_name: "",
      business_email: "",
      finance_email: "",
      store_phone_number: "",
    },
  });

  function onSubmit(values:any) {
    console.log(values);
    
  }


  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col items-center justify-center"
      >
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <CustomField
            label="Display name *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="display_name"
            type={"text"}
            minLength={1}
            maxLength={30}
            className={"rounded-sm "}
            placeholder="Display name "
          />
          <CustomField
            label="Business email *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="business_email"
            type={"email"}
            className={""}
            placeholder="Business email "
          />
          <CustomField
            label="Finance email *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="finance_email"
            type={"email"}
            placeholder="Finance email "
          />
          <CustomField
            label="Store phone number *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="store_phone_number"
            type={"text"}
            className={""}
            placeholder="Store phone number"
          />
        </div>
        <Button
          type="submit"
          className="w-full font-bold text-[11px]  bg-[#004e92] hover:bg-[#004e92]/90"
          disabled={isSubmitting || !isValid}
        >
          CREATE CIRCLE STORE
        </Button>
      </form>
    </Form>
  );
}
