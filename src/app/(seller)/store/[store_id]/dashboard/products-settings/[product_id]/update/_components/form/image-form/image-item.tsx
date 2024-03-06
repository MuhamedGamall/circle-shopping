import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { TbReplace } from "react-icons/tb";

export default function ImageItem({ src }: { src: string }) {
  return (
    <div className="relative ">
      <Image
        src={src}
        alt="image"
        height={200}
        width={200}
        className="min-w-[140px] w-[140px] h-[230px] object-cover rounded-sm shadow-md"
      />
      <TbReplace className="cursor-pointer absolute shadow-md -top-3 right-5 h-6 w-6 text-slate-100 bg-slate-600 p-1 rounded-full" />
      <X className="cursor-pointer absolute shadow-md -top-3 -right-2 h-6 w-6 text-slate-100 bg-red-600 p-1 rounded-full" />
    </div>
  );
}
