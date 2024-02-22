"use client";

import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import toast from "react-hot-toast";
import { storeSchema } from "../schema";
import useStore from "@/hooks/use-store";

export default function FormFields() {
  const router = useRouter();

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
    
    try {
      const data = (await axios.patch("/api/store" , values)).data;
      toast.success("Store updated successfully");
      router.replace(`/store/store-dashboard/${data?._id}`);
    } catch (error) {
      toast.error("Uh oh! Something went wrong");
    }
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
            disabled={isSubmitting || loading}
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
            disabled={isSubmitting || loading}
            name="business_email"
            type={"email"}
            className={""}
            placeholder="Business email "
          />
          <CustomField
            label="Finance email *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="finance_email"
            type={"email"}
            placeholder="Finance email "
          />
          <CustomField
            label="Store phone number *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting || loading}
            name="store_phone_number"
            type={"text"}
            className={""}
            placeholder="Store phone number"
          />
        </div>
        <Button
          type="submit"
          className="w-full font-bold text-[11px]  bg-[#004e92] hover:bg-[#004e92]/90"
          disabled={isSubmitting || loading || !isValid}
        >
          SAVE CHANGES
        </Button>
      </form>
    </Form>
  );
}
