import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import SectionTitle from "@/components/section-title";
import ProductsBestSellers from "./_components/products-best-sellers";
import ProductsByCategory from "./_components/products-by-category";
import ProductsDeal from "./_components/products-deals";
import SubCategoriesSlider from "./_components/sub-categories-slider";

export default function CategoryPage({
  params: {  category-id },
}: {
  params: {  category-id: string };
}) {
  return (
    <>
      <CategoriesNavigation />
      <div className="p-5">
        <MaxWidthWrapper>
          <div>
            <SectionTitle className="my-2" title="Shop by category" />
            <SubCategoriesSlider  category-id={ category-id} />
          </div>
          <div>
            <ProductsBestSellers
               category-id={ category-id}
              params={{ limit: 50 }}
            />
          </div>
          <div>
            <ProductsDeal  category-id={ category-id} params={{ limit: 50 }} />
          </div>
          <div>
            <ProductsByCategory  category-id={ category-id} />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
