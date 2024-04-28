import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import SubCategoriesSlider from "./_components/sub-categories-slider";
import SectionTitle from "@/components/section-title";
import Navbar from "../../_components/navbar";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";

export default function CategoryPage({
  params: { main_category_id },
}: {
  params: { main_category_id: string };
}) {
  return (
    <>
      <CategoriesNavigation />
      <div className="p-5">
        <MaxWidthWrapper>
          <SectionTitle className="my-2" title="Shop by category" />
          <SubCategoriesSlider main_category_id={main_category_id} />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
