"use client";

import SectionTitle from "@/components/section-title";

import { useAppDispatch } from "@/hooks/redux";
import { editProfile } from "@/lib/RTK/slices/user-slice";
import FormFields from "./_components/form-fields";
import Sidebar from "../../_components/sidebar";
import SidebarSheet from "../../_components/sidebar-sheet";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  async function onSubmit(value: any) {
    const isValid = Object.values(value).every(Boolean);
    if (isValid) {
      const values = {
        ...value,
      };
      await dispatch(editProfile(values));
    }
  }

  return (
    <div className="bg-slate-100 flex w-full border-t">
      <div className="md:block hidden">
        <Sidebar />
      </div>

      <div className="mt-5 md:mt-0 mx-8 w-full relative">
        <SidebarSheet className={"bg-white absolute top-0 right-8 px-5 py-3"} />
        <section className="bg-white p-6 px-8 my-10 ">
          <SectionTitle
            title="Profile info"
            className="mb-5 text-[17px] sm:text-[19px]"
          />
          <FormFields onSubmit={onSubmit} />
        </section>
      </div>
    </div>
  );
}
