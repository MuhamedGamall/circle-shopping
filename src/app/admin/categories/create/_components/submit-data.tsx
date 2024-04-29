"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import MainCategoryForm from "./sections/main-category-form";
import SubCategortiesForm from "./sections/sub-categories-form";

import LoaderLayout from "@/components/loader-layout";
import useAdminCategories from "@/hooks/admin/use-admin-categories";
import { useAppDispatch } from "@/hooks/redux";
import { createCategory } from "@/lib/RTK/slices/admin/categories-slice";
export default function SubmitData() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useAdminCategories();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subCateValues, setSubCateValues] = useState<
    { image: any; name: string }[]
  >([{ name: "", image: "" }]);

  const [mainCateValues, setMainCateValues] = useState<{
    image: any;
    name: string;
  }>({ name: "", image: "" });

  const trimSubCateVlues = subCateValues.map((el) => ({
    ...el,
    name: el.name.trim(),
  }));

  const trimMainCateVlues = {
    ...mainCateValues,
    name: mainCateValues.name.trim(),
  };

  const cateIsValid = (val: string): boolean => /^[A-Za-z\s]{2,50}$/.test(val);

  const filterSubCate = trimSubCateVlues?.filter(
    (el) => Object.values(el).every(Boolean) && cateIsValid(el?.name)
  );

  const filterRepeatedSubCateValues = filterSubCate.filter(
    (obj, index, arr) =>
      arr.findIndex((item) => item.name === obj.name) === index
  );

  const findSameMainCate = data?.find(
    (el) => el?.main_category?.name === mainCateValues.name
  );
  const onSubmit = async () => {
    if (findSameMainCate) return toast.error("This category already exists.");

    if (!Object.values(trimMainCateVlues).every(Boolean))
      return toast.error(
        "Please complete the incomplete fields in main category section."
      );

    if (!cateIsValid(trimMainCateVlues?.name))
      return toast.error(
        "Main category name must be 2-50 characters long, containing only English letters."
      );

    if (filterSubCate.length === 0)
      return toast.error(
        "At least one sub category must be added and completed."
      );
    setIsSubmitting(true);
    const create = await dispatch(
      createCategory({
        main_category: trimMainCateVlues,
        sub_categories: filterRepeatedSubCateValues,
      })
    );
    setIsSubmitting(false);
    if (create.meta?.requestStatus === "fulfilled")
      router.replace("/admin/categories");
  };

  return (
    <div className="w-full ">
      <LoaderLayout loadingCondition={isSubmitting} />
      <div className="flex justify-end items-center my-5">
        <Button disabled={isSubmitting} onClick={onSubmit} variant={"blue"}>
          Create
        </Button>
      </div>
      <div>
        <MainCategoryForm
          setMainCateValues={setMainCateValues}
          mainCateValues={mainCateValues}
        />
        <SubCategortiesForm
          setSubCateValues={setSubCateValues}
          subCateValues={subCateValues}
        />
      </div>
    </div>
  );
}
