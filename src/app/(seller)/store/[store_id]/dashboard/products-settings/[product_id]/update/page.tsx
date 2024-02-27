import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import ProductDetailsHeader from "./_components/product-details-header";
import SectionTitle from "@/components/section-title";

export default function UpdateProductPage() {
  return (
    <MaxWidthWrapper className="mx-0">
      <section className="p-5 shadow-section w-full ">
        <SectionTitle title="Update product" className="mb-5" />
        <ProductDetailsHeader />
      </section>
    </MaxWidthWrapper>
  );
}
