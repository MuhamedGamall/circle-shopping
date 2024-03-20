import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import React from "react";
import ViewDetailsSection from "./_components/details-section";

export default function DetailsProductPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full  ">
        <section className="p-5 shadow-section w-full  ">
          <SectionTitle title="product details" className="mb-5" />
          <ViewDetailsSection />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
