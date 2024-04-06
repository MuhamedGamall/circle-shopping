import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import Users from "./_components/sections/new-users";
import TopSales from "./_components/sections/top-sales";


export default function AdminDashboardPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Dashboard" className="mb-5" />
          <TopSales/>
          <Users/>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
