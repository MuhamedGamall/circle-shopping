import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { truncateText } from "@/utils/truncate-text";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsChevronRight } from "react-icons/bs";
import HeaderLoading from "./header-loading";

export default function ProductDetailsHeader({
  data,
  loading,
  store_id,
  product_id,
  isPublished,
  setIsPublished,
}: {
  data: Product | null;
  loading: boolean;
  store_id: string | string[];
  product_id: string | string[];
  isPublished: boolean;
  setIsPublished: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setIsPublished(data?.is_published || false);
  }, [data?.is_published, setIsPublished]);

  const togglePublishState = async () => {
    try {
      setIsSubmitting(true);
      isPublished
        ? await axios.patch(`/api/unpublish-product`, { store_id, product_id })
        : await axios.patch(
            `/api/store/${store_id}/products/${product_id}/${
              isPublished ? "unpublish" : "publish"
            }`
          );

      setIsPublished(!isPublished);
      toast.success(
        `Product ${isPublished ? "unpublished" : "published"} successfully`
      );
      setIsSubmitting(false);
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.error("Please fill all fields before saving");
      else toast.error("Uh oh! Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-[#eff3fd] px-2 py-1 flex items-center justify-between w-full gap-2">
        {loading ? (
          <HeaderLoading />
        ) : (
          <div className="flex items-center   gap-2">
            {data?.images?.[0] ? (
              <Image
                src={data?.images?.[0]}
                alt="image"
                width={600}
                height={819}
                loading="lazy"
                className="mx-auto  w-[42px] h-[58px] object-cover"
              />
            ) : (
              <div className="mx-auto w-[42px] h-[58px] bg-[#f7f6fb] flex items-center justify-center text-sm">
                <div className="opacity-[.7]">
                  <Icons.logo h="15" w="15" />
                </div>
              </div>
            )}
            <div className="hidden  sm:flex flex-col gap-2 justify-center">
              <div className="flex gap-2 items-center ">
                <span className="font-bold text-sm capitalize ">
                  {truncateText(data?.category?.brand || "", 20)}
                </span>
                <span className="font-bold text-[11px] text-[#65727d] ">
                  {truncateText(data?.title || "", 20) || "--"}
                </span>
              </div>
              <div className="sm:flex hidden items-center gap-1 text-[#65727d] [&>span]:text-[11px]">
                <span >{data?.category?.main_category}</span>
                <BsChevronRight className="h-2 w-2 mt-1" />
                <span>{data?.category?.sub_category}</span>
                <BsChevronRight className="h-2 w-2 mt-1" />
                <span>{data?.category?.brand}</span>
              </div>
            </div>
          </div>
        )}
        <Button
          onClick={togglePublishState}
          variant={"blue"}
          disabled={isSubmitting || loading}
          className="rounded-sm px-5 text-[12px]"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
