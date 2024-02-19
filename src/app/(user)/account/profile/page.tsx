"use client";

import SectionTitle from "@/components/section-title";

import { useAppDispatch } from "@/hooks/redux";
import { editProfile } from "@/lib/RTK/slices/user-slice";
import FormFields from "./_components/form-fields";

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
    <div className="">
      <SectionTitle
        title="Profile settings"
        className="mb-5 text-[19px] sm:text-[22px] w-fit"
      />
      <section className=" bg-white py-6 px-8 ">
        <SectionTitle
          title="Profile info"
          className="mb-5 text-[17px] sm:text-[19px]"
        />
        <FormFields onSubmit={onSubmit} />
      </section>
    </div>
  );
}
