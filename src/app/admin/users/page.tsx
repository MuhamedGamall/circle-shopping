import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";

import { UsersTable } from "./_components/table/users-table";

export default function UsersPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Users" className="mb-5" />
          <UsersTable />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
