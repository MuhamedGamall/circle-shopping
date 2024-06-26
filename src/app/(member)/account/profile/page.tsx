import SectionTitle from "@/components/section-title";
import FormFields from "./_components/form-fields";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

export default function ProfilePage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <div className="">
        <SectionTitle
          title="Profile settings"
          className="mb-5 text-[19px] sm:text-[22px] w-fit"
        />
        <section className=" bg-white py-6 px-8 shadow-section relative">
          <SectionTitle
            title="Profile info"
            className="mb-5 text-[17px] sm:text-[19px]"
          />
          <FormFields />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
