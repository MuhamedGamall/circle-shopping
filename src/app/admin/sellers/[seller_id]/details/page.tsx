import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import DetialsSection from "./_components/details-section";

export default function SellerPage({
  params: { seller_id },
}: {
  params: { seller_id: string };
}) {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title={"Seller"} className="mb-1" />
          <p className="mb-5 text-[13px] text-shade">{seller_id}</p>
          <DetialsSection seller_id={seller_id} />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
