import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
  const publicIdForDelete = (image: string) => {
    const startIndex = image.indexOf("circle-shopping/");
    const endIndex = image.lastIndexOf(".");
    return image.slice(startIndex, endIndex);
  };

  const onDelete = async (idx: number) => {
    const id = publicIdForDelete(imageValue[idx]);
    if (!!id) setIdsForDeleteFromCloudinary((curr) => [...curr, id]);
    setImageValue((curr) => curr.filter((el, i) => i !== idx));
  };

  const onUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: File | undefined = e.target.files?.[0];
    if (!image) return;

    if (image.size > 10 * 1024 * 1024 || !image.type.startsWith("image/")) {
      toast.error(
        image.size > 10 * 1024 * 1024
          ? "File size should be less than 10MB"
          : "This type of image is not supported",
        { duration: 2000 }
      );
      return;
    }

    const isValidImage = await checkImageDimensions(image);
    if (isValidImage) {
      readerImage(image);
    } else {
      toast.error(
        "Image dimensions should be at least 660px width and 900px height.",
        { duration: 2000 }
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
        const id = publicIdForDelete(newArr[idx]);
        if (!!id) setIdsForDeleteFromCloudinary((curr) => [...curr, id]);
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
          "w-full max-w-[140px] h-[230px] object-cover rounded-sm shadow-md"
        )}
      />
      <Label htmlFor={"image-" + idx}>
        <Input
          onChange={onUpdate}
          id={"image-" + idx}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
        />
        <TbReplace className="cursor-pointer absolute shadow-md -top-3 right-5 h-6 w-6 text-slate-100 bg-slate-600 p-1 rounded-full" />
      </Label>
      <X
        onClick={() => onDelete(idx)}
        className="cursor-pointer  absolute shadow-md -top-3 -right-2 h-6 w-6 text-slate-100 bg-red-600 p-1 rounded-full"
      />
    </div>
  );
}
