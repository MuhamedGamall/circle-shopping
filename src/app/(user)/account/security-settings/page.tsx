'use client'
import SectionTitle from "@/components/section-title";
import React from "react";
import PasswordSection from "./_components/passord-section";
import DeleteAccountSection from "./_components/delete-account-section";
import Sidebar from "../../_components/sidebar";
import SidebarSheet from "../../_components/sidebar-sheet";
import useProfile from "@/hooks/user-profile";

export default function SecuritySettingsPage() {
  const {data}=useProfile()
  console.log(data);
  
  return (
    <div className="bg-slate-100 flex w-full border-t">
      <div className="md:block hidden">
        <Sidebar />
      </div>
      <div className="mt-5 md:mt-0 mx-8 w-full relative">
        <SectionTitle
          title="Security settings"
          className="text-[28px] my-8 w-fit"
        />

        <SidebarSheet
          className={"bg-white absolute top-[60px] right-8 px-5 py-3"}
        />
        <PasswordSection />
        <DeleteAccountSection />
      </div>
    </div>
  );
}
