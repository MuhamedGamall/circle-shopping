import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import Sections from "./_components/sections";


export default function AdminDashboardPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Dashboard" className="mb-5" />
          <Sections/>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
