"use client";
import { TbBuildingWarehouse } from "react-icons/tb";
import { BsChevronRight } from "react-icons/bs";
import SelectCategory from "./select-category";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useStore from "@/hooks/use-store";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
const categories: { title: string }[] = [
  {
    title: "Alert Dialog",
  },
  {
    title: "Hover Card",
  },
  {
    title: "Progress",
  },
  {
    title: "Scroll-area",
  },
  {
    title: "Tabs",
  },
  {
    title: "Tooltip",
  },
];
export default function SelectSection() {
  const { store_id } = useParams();
  const router = useRouter();
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");

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
      try {
        const data = (
          await axios.post("/api/store/" + store_id + "/products", fullData)
        ).data;
        router.replace(
          `/store/${store_id}/dashboard/products-management/${data?._id}/update`
        );
        toast.success("Product created successfully");
      } catch (error) {
        toast.error("Uh oh! Something went wrong");
      }
    }
  };
  return (
    <div className="max-w-[650px] w-full  mx-auto p-5">
      <div className="w-full sm:flex hidden justify-end">
        <Button
          onClick={onSubmit}
          className="font-bold mb-5 bg-[#004e92] hover:bg-[#004e92]/90"
          disabled={!checkData}
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
          <div className=" sm:flex hidden mt-5  items-center gap-2 sm:flex-row flex-wrap sm:justify-start justify-center mb-3">
            <span className="text-[12px] text-[#888888] mb-1 block whitespace-nowrap">
              Categories selected
            </span>
            <div className="[&>span]:whitespace-nowrap   flex items-center gap-1 [&>span]:text-sky-700 [&>span]:text-sm w-[90%] border-slate-200 border py-1 px-3 rounded-md">
              <span>{mainCategory}</span>
              <BsChevronRight className="h-3 w-3 text-[#888888] mt-1" />
              <span>{subCategory}</span>
              <BsChevronRight className="h-3 w-3 text-[#888888] mt-1" />
              <span>{productBrand}</span>
            </div>
          </div>
        )}

        <SelectCategory
          data={categories}
          label={"Select category"}
          setValue={setMainCategory}
          value={mainCategory}
        />
        <SelectCategory
          data={categories}
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
              "This filed must not exceed 50 characters!"}
          </span>
          <div className="w-full flex  justify-end">
            <Button
              onClick={onSubmit}
              className="font-bold my-5 w-full sm:hidden block bg-[#004e92] hover:bg-[#004e92]/90"
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
