import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import DetialsSection from "./_components/details-section";

export default function UsersPage({
  params: { user_email },
}: {
  params: { user_email: string};
}) {
  const formatEmail =user_email.replaceAll('%40','@')
  return (
    <MaxWidthWrapper>
      <div className="relative w-full ">
        <section className="p-5 shadow-section w-full ">
          
          <SectionTitle title={"Users"} className="mb-1" />
          <p className="mb-5 text-[13px] text-shade">{formatEmail}</p>
          <DetialsSection  userEmail={user_email}/>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
