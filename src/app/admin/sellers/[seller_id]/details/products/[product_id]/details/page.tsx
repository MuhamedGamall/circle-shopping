import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import ViewDetailsSection from "./_components/details-section";

export default function SellerPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title={"Product"} className="mb-1" />
          <ViewDetailsSection />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
