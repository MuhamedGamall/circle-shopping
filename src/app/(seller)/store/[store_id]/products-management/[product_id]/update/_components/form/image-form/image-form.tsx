import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";

import ImageItem from "./image-item";
import axios from "axios";

import LoaderLayout from "@/components/loader-layout";
import Banner from "@/components/banner";
import { useAppDispatch } from "@/hooks/redux";
import {
  deleteProductImages_seller,
  updateProductImages_seller,
} from "@/lib/RTK/slices/seller/products";

export default function ImageForm({
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
  const dispatch = useAppDispatch();

  const [imageValue, setImageValue] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [idsForDeleteFromCloudinary, setIdsForDeleteFromCloudinary] = useState<
    string[]
  >([]);
  const isValid =
    imageValue.length === 0 && idsForDeleteFromCloudinary.length === 0;

  useEffect(() => {
    setImageValue(data?.images || []);
  }, [data?.images]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images: FileList | null = e.target.files;
    if (!images) return;

    const filteredImages = Array.from(images).filter(
      (file) =>
        file.size <= 10 * 1024 * 1024 &&
        ["image/jpg", "image/png", "image/jpeg"].includes(file.type)
    );

    if (images.length !== filteredImages.length)
      return toast.error("Some files are not images or exceed 10MB");

    const numUploadedImages = imageValue?.length + filteredImages.length;

    if (numUploadedImages > 10)
      return toast.error("You can only upload up to 10 images.");

    for (const image of filteredImages) {
      const isValidImage = await checkImageDimensions(image);
      if (true) {
        readerImage(image);
      } else {
        toast.error(
          "Image dimensions should be at least 660px width and 900px height."
        );
      }
    }
  };

  const checkImageDimensions = async (image: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        resolve(img.width >= 660 && img.height >= 900);
      };
    });
  };

  const readerImage = (image: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageValue((prevImages) => [...prevImages, reader.result as string]);
    };
    reader.readAsDataURL(image);
  };

  const onSubmit = async () => {
    if (isValid) return toast.error("Please enter a valid image url.");
    try {
      setIsSubmitting(true);
      const update = await dispatch(
        updateProductImages_seller({
          data: imageValue,
          store_id,
          product_id,
        })
      );

      if (update?.meta?.requestStatus !== "fulfilled") return;
      setIsPublished(false);

      // get the image list urls again after submitting
      const product: Product = (
        await axios.get("/api/store/" + store_id + "/products/" + product_id)
      ).data;

      setImageValue(product?.images);

      if (idsForDeleteFromCloudinary.length) {
        const update = await dispatch(
          deleteProductImages_seller({
            store_id,
            product_id,
            idsForDeleteFromCloudinary,
          })
        );
        if (update?.meta?.requestStatus == "fulfilled")
          setIdsForDeleteFromCloudinary([]);
      }
    } catch (error) {
      toast.error("Uh oh! Something went wrong with updating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="image-section p-5 border-b relative">
      <LoaderLayout loadingCondition={isSubmitting || loading} />
      <SectionTitle
        title="Product Images."
        className="text-[16px] sm:text-[16px] text-slate-700 my-3"
      />
      <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <Banner
          title={"Image Instructions"}
          details={[
            "Image dimensions should be 660 x 900 or more recommended",
            "Image dimensions should be height should be greater than 900px",
            "Image dimensions should be width should be greater than 660px",
            "File size should be less than 10MB",
            "Non-backward images are recommended for the product to appear clearly",
          ]}
        />
        <div className="mb-5">
          <span className="text-[10px] text-shade sm:text-left text-center block">
            Upload image/s
          </span>
          <div className="py-3 hide-scroll flex items-center sm:justify-start justify-center flex-wrap gap-5 w-full sm:max-h-full max-h-[480px] sm:overflow-y-visible overflow-y-auto">
            <label
              htmlFor="upload"
              className={cn(
                "flex items-center justify-center gap-3 flex-col text-[9px] cursor-pointer min-w-[140px] w-[140px] h-[230px] border-blue border rounded-md bg-[#eff3fd]",
                {
                  "opacity-[.5] cursor-not-allowed":
                    imageValue?.length === 10 || isSubmitting || loading,
                }
              )}
            >
              <FaCirclePlus className="text-blue h-5 w-5" />
              Add image/s
            </label>
            {imageValue?.map((el, i) => (
              <ImageItem
                key={i}
                src={el}
                idx={i}
                imageValue={imageValue}
                setImageValue={setImageValue}
                setIdsForDeleteFromCloudinary={setIdsForDeleteFromCloudinary}
              />
            ))}
          </div>
          <Input
            onChange={onChange}
            type="file"
            id="upload"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            multiple
            disabled={imageValue?.length === 10 || isSubmitting || loading}
          />
          <span className="text-red-700 text-[11px] font-semibold">
            {isValid && "Image  field is required"}
          </span>
        </div>
        <Button
          onClick={onSubmit}
          className="text-[11px] my-3 h-[30px] rounded-sm"
          disabled={loading || imageValue?.length > 10 || isSubmitting}
          variant="blue"
          size="sm"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
