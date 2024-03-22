"use client";
import LoaderLayout from "@/components/loader-layout";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getCategory,
  resetForm,
  updateCategory,
} from "@/lib/RTK/slices/categories-slice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainCategoryForm from "./sections/main-category-form";
import SubCategortiesForm from "./sections/sub-categories-form";
export default function SubmitData() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { category_id } = useParams();
  const { category, loading } = useAppSelector((state) => state.categories);

  const [
    categoriesIdsForDeleteFromCloudinary,
    setCategoriesIdsForDeleteFromCloudinary,
  ] = useState<string[]>([]);

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

  useEffect(() => {
    dispatch(getCategory(category_id));
  }, [category_id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setSubCateValues((curr) => [
        ...category?.sub_categories,
        { name: "", image: "" },
      ]);
      setMainCateValues(category?.main_category);
    }
  }, [category, dispatch]);

  const trimMainCateVlues = {
    ...mainCateValues,
    name: mainCateValues.name.trim(),
  };

  const cateIsValid = (val: string): boolean => /^[A-Za-z\s]{2,50}$/.test(val);

  const filterSubCate = trimSubCateVlues?.filter(
    (el) => Object.values(el).every(Boolean) && cateIsValid(el?.name)
  );

  const onSubmit = async () => {
    console.log({
      main_category: trimMainCateVlues,
      sub_categories: filterSubCate,
      categoriesIdsForDeleteFromCloudinary,
    });

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
    setIsSubmitting(true);
    await dispatch(
      updateCategory({
        main_category: trimMainCateVlues,
        sub_categories: filterSubCate,
        categoriesIdsForDeleteFromCloudinary,
        category_id,
      })
    );
    setIsSubmitting(false);
    router.replace("/admin/categories");
  };

  return (
    <div className="w-full ">
      <LoaderLayout loadingCondition={isSubmitting || loading} />
      <div className="flex justify-end items-center my-5">
        <Button
          disabled={isSubmitting}
          onClick={onSubmit}
          variant={"blue"}
        >
          Update
        </Button>
      </div>
      <div>
        <MainCategoryForm
          setCategoriesIdsForDeleteFromCloudinary={
            setCategoriesIdsForDeleteFromCloudinary
          }
          setMainCateValues={setMainCateValues}
          mainCateValues={mainCateValues}
        />
        <SubCategortiesForm
          setCategoriesIdsForDeleteFromCloudinary={
            setCategoriesIdsForDeleteFromCloudinary
          }
          setSubCateValues={setSubCateValues}
          subCateValues={subCateValues}
        />
      </div>
    </div>
  );
}
