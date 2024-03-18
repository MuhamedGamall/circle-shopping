import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";

export default function CategoriesPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full mr-[50px]">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Create Category" className="mb-5" />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
