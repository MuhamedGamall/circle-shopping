"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MainCategoryForm from "./sections/main-category-form";
import SubCategortiesForm from "./sections/sub-categories-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import LoaderLayout from "@/components/loader-layout";
export default function SubmitData() {
  const router = useRouter();

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
  if (!Object.values(trimMainCateVlues).every(Boolean))
    return toast.error(
      "Please complete the incomplete fields in main category section."
    );

  if (!cateIsValid(trimMainCateVlues?.name))
    return toast.error(
      " Main category name must be 2-50 characters long, containing only English letters."
    );

  if (filterSubCate.length === 0)
    return toast.error(
      "At least one sub category must be added and completed."
    );
  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/admin/categories/create", {
        main_category: trimMainCateVlues,
        sub_categories: filterSubCate,
      });
      setIsSubmitting(false);
      toast.success("Category created successfully.");
      router.replace("/admin/categories");
    } catch (error) {
      toast.error("Uh oh! Something went wrong with your request.");
    }
  };

  return (
    <div className="w-full ">
      <LoaderLayout loadingCondition={isSubmitting} />
      <div className="flex justify-end items-center my-5">
        <Button
          disabled={isSubmitting}
          onClick={onSubmit}
          className="font-bold rounded-sm bg-[#004e92] hover:bg-[#004e92]/90"
        >
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
