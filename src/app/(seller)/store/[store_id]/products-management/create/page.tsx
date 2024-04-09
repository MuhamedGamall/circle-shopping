import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import React from "react";
import SelectSection from "./_components/select-section";
import SectionTitle from "@/components/section-title";

export default function CategoriesPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <section className="p-5 shadow-section relative w-full">
        <SectionTitle title="Create product" className="mb-5" />
        <SelectSection />
      </section>
    </MaxWidthWrapper>
  ) 
}
