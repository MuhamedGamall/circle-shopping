import React from "react";
import FormFields from "./_components/form-fileds";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

export default function CreateStorePage() {
  return (
    <div className="create-store-img">
      <MaxWidthWrapper>
        <section className="  w-full max-w-[600px] gap-5 mx-auto p-8 ">
          <div className="flex flex-col gap-1 mb-5">
            <SectionTitle title="Circle Store Details" />
            <span className="font-[400] text-[#7e859b] text-sm">
              Please fill the below information to create your circle store
            </span>
          </div>
          <FormFields />
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
