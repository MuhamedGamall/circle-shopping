import React from "react";

import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";
import Image from "next/image";

export default function ImagesSection({ images }: { images: string[] }) {
  return (
    <div className="p-5 border-b">
      <SectionTitle
        title="Product Images."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
        <div className="p-3 border rounded-sm text-black text-sm font-normal">
          <div className="py-3 hide-scroll flex items-center sm:justify-start justify-center flex-wrap gap-5 w-full sm:max-h-full max-h-[480px] sm:overflow-y-visible overflow-y-auto">
            {images?.length
              ? images?.map((image, i) => (
                  <Image
                    key={i}
                    src={image}
                    alt="product-image"
                    width={480}
                    height={300}
                    loading="lazy"
                    objectFit="contain"
                    className="w-full max-w-[140px] h-[230px] object-contain rounded-sm shadow-md"
                  />
                ))
              : "No Set"}
          </div>
        </div>
      </Label>
    </div>
  );
}
