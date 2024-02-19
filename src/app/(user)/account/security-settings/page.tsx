"use client";
import SectionTitle from "@/components/section-title";
import React from "react";
import PasswordSection from "./_components/password-section";
import DeleteAccountSection from "./_components/delete-account-section";

export default function SecuritySettingsPage() {
  return (
    <div className="">
      <SectionTitle
        title="Security settings"
        className="mb-5 text-[19px] sm:text-[22px] w-fit"
      />
      <PasswordSection />
      <DeleteAccountSection />
    </div>
  );
}
