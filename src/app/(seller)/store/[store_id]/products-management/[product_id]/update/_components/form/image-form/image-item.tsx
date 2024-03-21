import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getPublicId } from "@/utils/format";
import { X } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { TbReplace } from "react-icons/tb";

export default function ImageItem({
  src,
  idx,
  imageValue,
  setImageValue,
  setIdsForDeleteFromCloudinary,
}: {
  src: string;
  idx: number;
  imageValue: string[];
  setImageValue: Dispatch<SetStateAction<string[]>>;
  setIdsForDeleteFromCloudinary: Dispatch<SetStateAction<string[]>>;
}) {
  const onDelete = async () => {
    const id = getPublicId(imageValue[idx]);
    if (id) setIdsForDeleteFromCloudinary((curr) => [...curr, id]);
    setImageValue((curr) => curr.filter((el, i) => i !== idx));
  };

  const onUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: File | undefined = e.target.files?.[0];
    if (!image) return;

    if (!["image/jpg", "image/png", "image/jpeg"].includes(image.type))
      return toast.error("We do not support this file type");

    if (image?.size > 10 * 1024 * 1024)
      return toast.error("This file is larger than 10MB");

    const isValidImage = await checkImageDimensions(image);
    if (isValidImage) {
      readerImage(image);
    } else {
      toast.error(
        "Image dimensions should be at least 660px width and 900px height."
      );
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
      setImageValue((prevImages) => {
        const newArr = [...prevImages];
        //- caching image id for deleting from cloudinary
        const id = getPublicId(newArr[idx]);
        if (id) setIdsForDeleteFromCloudinary((curr) => [...curr, id]);
        //-
        newArr[idx] = reader.result as string;
        return newArr;
      });
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="relative ">
      <Image
        src={src}
        alt="image"
        height={900}
        width={660}
        className={cn(
          "w-full min-w-[140px] max-w-[140px] h-[230px] object-cover rounded-sm shadow-md"
        )}
      />
      <Label htmlFor={"image-" + idx}>
        <Input
          onChange={onUpdate}
          id={"image-" + idx}
          className="hidden"
          type="file"
          accept=".jpg,.jpeg,.png,"
        />
        <TbReplace className="cursor-pointer absolute shadow-md -top-3 right-5 h-6 w-6 text-slate-100 bg-slate-600 p-1 rounded-full" />
      </Label>
      <X
        onClick={onDelete}
        className="cursor-pointer  absolute shadow-md -top-3 -right-2 h-6 w-6 text-slate-100 bg-red-600 p-1 rounded-full"
      />
    </div>
  );
}
