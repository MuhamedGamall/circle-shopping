import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import { DataTable } from "./_components/table/table-products";

export default function ProductsSettingsPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full  ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Products" className="mb-5" />
          <DataTable />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
