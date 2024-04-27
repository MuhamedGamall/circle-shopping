import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomField from "@/components/custom-field";
import CustomSelectField from "@/components/custom-select-field";
import LoaderLayout from "@/components/loader-layout";
import { useAppDispatch } from "@/hooks/redux";
import useCategories from "@/hooks/use-categories";
import { updateProduct_seller } from "@/lib/RTK/slices/seller/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categoryForm } from "../../schema";

export default function CategoryForm({
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
  const { data: categories } = useCategories();
  const dispatch = useAppDispatch();

  const [subCategory, setSubCategory] = useState<string>("");
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<string[]>(
    []
  );

  const mainCategories = categories.map((el) => el?.main_category?.name);

  const form = useForm<z.infer<typeof categoryForm>>({
    resolver: zodResolver(categoryForm),
    defaultValues: {
      category: {
        main_category: "",
        brand: "",
        sub_category: "",
      },
    },
    values: {
      category: {
        brand: data?.category?.brand || "",
        main_category: data?.category?.main_category || "",
        sub_category: subCategory || "",
      },
    },
  });

  useEffect(() => {
    const findSubCategories =
      categories
        ?.find(
          (el) =>
            el?.main_category?.name === form.getValues("category.main_category")
        )
        ?.sub_categories?.map((el) => el?.name) || [];

    setSubCategoriesOptions(findSubCategories);
    form.setValue("category.sub_category", "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ form.watch("category.main_category")]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSubCategory(data?.category?.sub_category || "");
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [data?.category?.sub_category]);

  async function onSubmit(values: z.infer<typeof categoryForm>) {
    const update = await dispatch(
      updateProduct_seller({
        data: values,
        store_id,
        product_id,
      })
    );
    if (update?.meta?.requestStatus === "fulfilled") setIsPublished(false);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <LoaderLayout loadingCondition={isSubmitting || loading} />
        <div className="  p-5 border-b">
          <SectionTitle
            title="Categories."
            className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
          />
          <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
            <CustomSelectField
              name={"category.main_category"}
              labelClassName={"text-shade text-[12px]"}
              label="Main category *"
              form={form}
              selectData={mainCategories || []}
            />
            <CustomSelectField
              name={"category.sub_category"}
              labelClassName={"text-shade text-[12px]"}
              label="Sub category *"
              form={form}
              selectData={subCategoriesOptions || []}
            />
            <CustomField
              label="Brand *"
              labelClassName={"text-shade text-[12px]"}
              form={form}
              disabled={isSubmitting || loading}
              name="category.brand"
              type={"text"}
              className={"w-full"}
              placeholder="Brand"
            />
          </div>

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
