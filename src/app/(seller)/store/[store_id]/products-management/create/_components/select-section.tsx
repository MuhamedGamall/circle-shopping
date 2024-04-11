"use client";
import { TbBuildingWarehouse } from "react-icons/tb";
import { BsChevronRight } from "react-icons/bs";
import SelectCategory from "./select-category";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { createProduct_seller } from "@/lib/RTK/slices/seller/products";
import useCategories from "@/hooks/use-categories";
import LoaderLayout from "@/components/loader-layout";

export default function SelectSection() {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, loading } = useCategories();
  const router = useRouter();

  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");

  const mainCategories = data.map((el) => el?.main_category?.name);
  const subCategories = data
    ?.find((el) => el?.main_category?.name === mainCategory)
    ?.sub_categories?.map((el) => el?.name);

  const checkData =
    productBrand.trim() &&
    subCategory &&
    mainCategory &&
    productBrand.length <= 50;

  const fullData = {
    productBrand: productBrand.trim(),
    subCategory,
    mainCategory,
  };

  const onSubmit = async () => {
    if (checkData) {
      setIsSubmitting(true);
      const product = await dispatch(
        createProduct_seller({
          data: fullData,
          store_id,
        })
      );
      setIsSubmitting(false);
      if (product?.meta?.requestStatus === "fulfilled")
        router.replace(
          `/store/${store_id}/products-management/${product?.payload}/update`
        );
    }
  };
  return (
    <div className="max-w-[650px] w-full  mx-auto p-5">
      <LoaderLayout loadingCondition={isSubmitting} />
      <div className="w-full sm:flex hidden justify-end">
        <Button
          onClick={onSubmit}
          className="mb-5 "
          disabled={!checkData}
          variant={"blue"}
        >
          CREATE
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <TbBuildingWarehouse className="text-sky-800 h-6 w-6" />
        <h3 className="text-sky-800 text-sm font-[500]">Category</h3>
        <div className="text-[12px] text-slate-400 whitespace-nowrap">
          Your product category
        </div>
      </div>
      <div className="my-10 ">
        <h4 className="sm:text-start text-center">
          Lets start with categorizing your product
        </h4>
        {checkData && (
          <div className=" sm:flex hidden mt-5 items-center gap-2 sm:flex-row flex-wrap sm:justify-start justify-center mb-3">
            <span className="text-[12px] text-[#888888] mb-1 block whitespace-nowrap">
              Categories selected
            </span>
            <div className="[&>span]:whitespace-nowrap overflow-x-auto    flex items-center gap-1 [&>span]:text-sky-700 [&>span]:text-sm w-[90%] border-slate-200 border py-1 px-3 rounded-md">
              <span>{mainCategory}</span>
              <BsChevronRight className="min-h-3 min-w-3 text-[#888888] mt-1" />
              <span>{subCategory}</span>
              <BsChevronRight className="min-h-3 min-w-3 text-[#888888] mt-1" />
              <span>{productBrand}</span>
            </div>
          </div>
        )}

        <SelectCategory
          loading={loading}
          data={mainCategories}
          label={"Select main category"}
          setValue={setMainCategory}
          setSubCategory={setSubCategory}
          value={mainCategory}
        />
        <SelectCategory
          loading={false}
          data={subCategories}
          label={"Select sub category"}
          setValue={setSubCategory}
          value={subCategory}
        />
        <div className="w-full mx-auto ">
          <div className="flex flex-col  items-center justify-center">
            <BadgePercent
              size={28}
              strokeWidth={1.5}
              className="text-sky-800 h-6 w-6"
            />
            <h3 className="text-sky-800 text-sm font-[500]">Brand</h3>
            <div className="text-[12px] text-slate-400 whitespace-nowrap">
              Your product brand
            </div>
          </div>
          <Label>
            <h6 className="text-[16px] text-[#888888] my-2 "> Product brand</h6>
            <Input
              type="text"
              name="brand"
              value={productBrand}
              placeholder="Enter your product brand"
              onChange={(e) => setProductBrand(e.target.value)}
              maxLength={50}
              minLength={1}
            />
          </Label>
          <span className="text-red-500 text-[11px] mt-2">
            {(productBrand.length === 0 || productBrand.length < 1) &&
              "Brand field is required"}
            {productBrand.length > 50 &&
              "This  field must not exceed 50 characters!"}
          </span>
          <div className="w-full flex  justify-end">
            <Button
              onClick={onSubmit}
              className="my-5 w-full sm:hidden block "
              variant={"blue"}
              disabled={!checkData}
            >
              CREATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
