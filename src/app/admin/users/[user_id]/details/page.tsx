import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import DetialsSection from "./_components/details-section";

export default function UsersPage({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title={"User"} className="mb-1" />
          <p className="mb-5 text-[13px] text-shade">{user_id}</p>
          <DetialsSection user_id={user_id} />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
