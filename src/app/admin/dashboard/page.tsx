import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import Sections from "./_components/sections";
import { GetDataByDate } from "./_components/get-data-by-date";

export default function AdminDashboardPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <div className="mb-5 flex justify-between flex-wrap items-center gap-2">
            <SectionTitle title="Dashboard"  />
            <GetDataByDate/>
          </div>
          <Sections />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
