"use client";
import LoaderLayout from "@/components/loader-layout";
import { Button } from "@/components/ui/button";
import useAdminCategories from "@/hooks/admin/use-admin-categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getCategory_admin,
  resetForm,
  updateCategory,
} from "@/lib/RTK/slices/admin/categories-slice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainCategoryForm from "./sections/main-category-form";
import SubCategortiesForm from "./sections/sub-categories-form";
import Loader from "@/components/loader";
export default function SubmitData() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { category_id } = useParams();
  const { data: categories, loading } = useAdminCategories();
  const { category } = useAppSelector((state) => state.admin_categories);

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
    dispatch(getCategory_admin(category_id));
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

  const filterRepeatedSubCateValues = filterSubCate.filter(
    (obj, index, arr) =>
      arr.findIndex((item) => item.name === obj.name) === index
  );

  const findSameMainCate = categories?.find(
    (cate) =>
      cate?.main_category?.name === mainCateValues?.name &&
      cate?._id !== category_id
  );

  const onSubmit = async () => {
    if (findSameMainCate)
      return toast.error("Main category label already exists in the database.");

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
    const update = await dispatch(
      updateCategory({
        main_category: trimMainCateVlues,
        sub_categories: filterRepeatedSubCateValues,
        categoriesIdsForDeleteFromCloudinary,
        category_id,
      })
    );

    setIsSubmitting(false);
    if (update?.meta?.requestStatus == "fulfilled") {
      router.replace("/admin/categories");
    }
  };

  return (
    <div className="w-full ">
      {loading && <Loader />}
      <LoaderLayout loading={isSubmitting} />
      <div className="flex justify-end items-center my-5">
        <Button disabled={isSubmitting} onClick={onSubmit} variant={"blue"}>
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
