import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import { SellersTable } from "./_components/table/sellers-table";


export default function SellersPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Sellers" className="mb-5" />
          <SellersTable />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
