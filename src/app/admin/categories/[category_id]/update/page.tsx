import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";

import Banner from "@/components/banner";
import SubmitData from "./_components/submit-data";

export default function CategoriesPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="w-full relative">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Create Category" className="mb-5" />
          <Banner
            title="Image Instructions"
            instructions={[
              "660 x 900 or more recommended",
              "Image height should be greater than 900px",
              "Image width should be greater than 660px",
              "File size should be less than 10MB",
              "Non-backward images are recommended for the product to appear clearly",
            ]}
          />

          <SubmitData />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
