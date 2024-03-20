"use client";

import CustomField from "@/components/custom-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageForm from "../../../_components/image-form";

export const schema = z.object({
  main_category: z
    .string()
    .trim()
    .min(2, { message: "Main category should be minimum 2 characters." })
    .max(50, { message: "Main category should be maximum 50 characters." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Main category must contain only English letters.",
    }),
});

export default function MainCategoryForm({
  setMainCateValues,
  mainCateValues,
}: {
  setMainCateValues: Dispatch<SetStateAction<{ image: any; name: string }>>;
  mainCateValues: { image: any; name: string };
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      main_category: "",
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    const unsubscribe = () =>
      form.watch((values: any) => {
        onChange(values);
      });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const onChange = async (values: z.infer<typeof schema>) => {
    try {
      await form.trigger();
      setMainCateValues((curr) => ({ ...curr, name: values.main_category }));
    } catch (error) {
      form.setError("main_category", {
        type: "onChange",
        message: errors?.main_category?.message,
      });
    }
  };
  const readerImage = (image: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainCateValues((curr) => ({ ...curr, image: reader.result }));
    };
    reader.readAsDataURL(image);
  };
  return (
    <div className="">
      <ImageForm
        id={"main-category"}
        readerImage={readerImage}
        imageValue={mainCateValues.image}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="gap-5 flex flex-col items-center justify-center"
        >
          <CustomField
            label="Main category *"
            labelClassName={"text-slate-700"}
            form={form}
            name="main_category"
            required={true}
            minLength={2}
            maxLength={50}
            type={"text"}
            className={"rounded-sm"}
            placeholder="Main Category"
          />
        </form>
      </Form>
    </div>
  );
}
