import React from "react";
import { DataTable } from "./_components/table/table-products";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";

export default function ProductsSettingsPage() {
  return (
      <section className="p-5 shadow-section w-full px-5">
        <SectionTitle title="Products settings" className="mb-5" />
        <DataTable />
      </section>
  );
}
