import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import SubCategoriesSlider from "./_components/sub-categories-slider";
import SectionTitle from "@/components/section-title";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import ProductsBestSellers from "./_components/products-best-sellers";

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
          <div>
            <SectionTitle className="my-2" title="Shop by category" />
            <SubCategoriesSlider main_category_id={main_category_id} />
          </div>
          <div>
            <ProductsBestSellers main_category_id={main_category_id} />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
