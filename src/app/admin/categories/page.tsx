import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full  ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Categories" className="mb-5" />
          <Link href={"/admin/categories/create"}>create</Link>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
