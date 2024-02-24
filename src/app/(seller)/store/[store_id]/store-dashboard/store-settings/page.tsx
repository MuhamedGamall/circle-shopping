import React from "react";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import FormFields from "./_components/form-fields";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import LinkBackTo from "@/components/link-back-to";

export default function UpdateStorePage({
  params: { store_id },
}: {
  params: { store_id: string };
}) {
  return (
    <div className="create-store-img">
      <MaxWidthWrapper>
        <section className="  w-full max-w-[600px]  mx-auto p-8 ">
  
          <LinkBackTo   href={"/store/store-dashboard/" + store_id} label="Back to store dashboard"/>
          <div className="flex flex-col gap-1 mb-5">
            <SectionTitle title="Circle Store Details" />
            <span className="font-[400] text-[#7e859b] text-sm">
              Please fill the below information to update your circle store
            </span>
          </div>

          <FormFields />
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
