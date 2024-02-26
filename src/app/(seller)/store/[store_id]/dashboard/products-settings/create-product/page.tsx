import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import React from "react";
import SelectSection from "./_components/select-section";
import SectionTitle from "@/components/section-title";

export default function CategoriesPage() {
  return (
    <div className="shadow-section p-5">
      <MaxWidthWrapper className="mx-0">
        <SectionTitle title="Create product" className="mb-5"/>
        <section>
          <SelectSection />
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
