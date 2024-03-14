import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import UpdateForm from "./_components/form/update-form";

export default function UpdateProductPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <section className="p-5 shadow-section w-full ">
        <SectionTitle title="Update product" className="mb-5" />
        <UpdateForm/>
      </section>
    </MaxWidthWrapper>
  );
}
