import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import React from "react";
import SelectSection from "./_components/select-section";

export default function CategoriesPage() {
  return (
    <div className="bg-[#f2f3f8] p-[15px]">
      <div className="bg-white p-[15px] w-full  shadow-section">
        <MaxWidthWrapper>
          <section className="">
            <SelectSection />
          </section>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
