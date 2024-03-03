"use client";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import React, { FormEvent, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import ImageInstructions from "./image-instructions";

export default function ImageForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const [imageValue, setImageValue] = useState<null | any>(null);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("values", imageValue.target);
  }

  return (
    <div className="image-section p-5 border-b">
      <SectionTitle
        title="Product Images."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <form action="" onSubmit={onSubmit}>
        <div className="mb-5 ">
          <span className="mb-3 text-[10px] text-shade sm:text-left text-center block">
            Upload image/s
          </span>

          <div className="flex items-center sm:justify-start justify-center flex-wrap gap-5 w-full ">
            <Label
              htmlFor="upload"
              className="flex items-center justify-center gap-3 flex-col text-[9px]  cursor-pointer min-w-[140px] w-[140px] h-[230px] border-[#3866df] border rounded-md bg-[#eff3fd]"
            >
              <FaCirclePlus className="text-[#3866df] h-5 w-5" />
              Add image/s
            </Label>
          </div>
          <Input
            onChange={setImageValue}
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            maxLength={10}
            multiple
            
          />
        </div>
        <ImageInstructions />
        <Button
          className="text-[11px] my-3 h-[30px] rounded-sm  "
          disabled={loading}
          variant={"blue"}
          size={"sm"}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
