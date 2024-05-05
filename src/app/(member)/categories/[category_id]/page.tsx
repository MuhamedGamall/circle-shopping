import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import SectionTitle from "@/components/section-title";
import ProductsBestSellers from "./_components/products-best-sellers-slider";
import ProductsByCategory from "./_components/products-by-category";
import ProductsDeal from "./_components/products-deals-slider";
import SubCategoriesSlider from "./_components/sub-categories-slider";

export default function CategoryPage({
  params: { category_id },
}: {
  params: { category_id: string };
}) {
  return (
    <>
      <CategoriesNavigation />
      <div className="p-5">
        <MaxWidthWrapper>
          <div>
            <SectionTitle className="my-2" title="Shop by category" />
            <SubCategoriesSlider category_id={category_id} />
          </div>
          <div>
            <ProductsBestSellers
              category_id={category_id}
              params={{ limit: 50, role: "bestsellers" }}
            />
          </div>
          <div>
            <ProductsDeal
              category_id={category_id}
              params={{ limit: 50, role: "deals" }}
            />
          </div>
          <div>
            <ProductsByCategory category_id={category_id} />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
