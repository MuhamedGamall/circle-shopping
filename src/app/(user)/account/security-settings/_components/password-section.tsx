'use client'
import SectionTitle from "@/components/section-title";

import { ChangePassword } from "./change-password-dialog";

export default function PasswordSection() {
  return (
    <section className="bg-white p-6 px-8 mb-10 shadow-section">
      <SectionTitle
        title="Security"
        className="mb-5 text-[17px] sm:text-[19px]"
      />
      <ChangePassword />
    </section>
  );
}
