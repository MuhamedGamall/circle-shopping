import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";

import Image from "next/image";
import { TbReplace } from "react-icons/tb";

export default function ImageForm({
  id,
  imageValue,
  readerImage,
  imageClassName,
}: {
  id: any;
  imageValue: string;
  readerImage: (image: File, idx?: any) => void;
  imageClassName?: string;
}) {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: File | undefined = e.target.files?.[0];
    if (!image) return;
    if (!["image/jpg", "image/png", "image/jpeg"].includes(image.type))
      return toast.error("We do not support this file type");

    if (image?.size > 10 * 1024 * 1024)
      return toast.error("This file is larger than 10MB");

      const checkImageDimensions = async (image: File): Promise<boolean> => {
        return new Promise((resolve) => {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(image);
          img.onload = () => {
            resolve(img.width >= 660 && img.height >= 900);
          };
        });
      };

      const isValidImage = await checkImageDimensions(image);
      if (isValidImage) {
    readerImage(image, id);
      } else {
        toast.error(
          "Image dimensions should be at least 660px width and 900px height."
        );
      }
  };

  return (
    <div className=" mb-5">
      <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="mb-5">
          <span className="text-[10px] text-shade mb-2 block whitespace-nowrap">
            Upload image *
          </span>

          <div
            className={cn(
              "relative  min-w-[62px] max-w-[62px] h-[62px] bg-[#eff3fd]",
              {
                hidden: !imageValue,
              }
            )}
          >
            <label
              htmlFor={"upload-" + id}
              className={cn("cursor-pointer absolute -top-3 -right-5  ")}
            >
              <TbReplace className=" h-6 w-6 text-slate-100 bg-slate-600 p-1 rounded-full" />
            </label>
            <Image
              src={imageValue || "/"}
              alt="image"
              height={900}
              width={660}
              className={cn("w-full h-full object-cover shadow-md")}
            />
          </div>

          <label
            htmlFor={"upload-" + id}
            className={cn(
              "flex items-center justify-center cursor-pointer min-w-[62px] max-w-[62px] h-[62px] bg-[#eff3fd]",
              {
                hidden: imageValue,
              }
            )}
          >
            <Input
              onChange={onChange}
              type="file"
              id={"upload-" + id}
              className="hidden"
              accept=".png,.jpg,.jpeg"
            />
            <FaCirclePlus
              className={cn("text-slate-500 h-4 w-4", { hidden: imageValue })}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
