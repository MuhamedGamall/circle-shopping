import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import FormFields from "./_components/form-fields";

export default function StoreSettingsPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <section className="shadow-section p-5">
        <div className="flex flex-col gap-1 mb-5 ">
          <SectionTitle title="Circle Store Details" />
          <span className="font-[400] text-[#7e859b] text-sm">
            Please fill the below information to update your circle store
          </span>
        </div>
        <FormFields />
      </section>
    </MaxWidthWrapper>
  );
}
