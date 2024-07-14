import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import SectionTitle from "@/components/section-title";
import ProductsBestSellers from "./_components/products-bestsellers-slider";
import ProductsByCategory from "./_components/products-by-category";
import ProductsDeal from "./_components/products-deals-slider";
import SubCategoriesSlider from "./_components/sub-categories-slider";
import getProductsByCategory from "./actions/get-products-by-category";
import getProductsByRole from "./actions/get-products-by-role";
import getCategory from "./actions/get-category";

export default async function CategoryPage({
  params: { category_id },
}: {
  params: { category_id: string };
}) {
  const { data, loading } = await getProductsByCategory({
    category_id: category_id.replaceAll("-", " "),
  });
  const { data: dealsData, loading: dealsLoading } = await getProductsByRole({
    limit: 50,
    role: "deals",
    mainCategory: category_id?.replaceAll("-", " "),
  });
  const { data: bestSellersData, loading: bestSellersLoading } =
    await getProductsByRole({
      limit: 50,
      role: "bestsellers",
      mainCategory: category_id?.replaceAll("-", " "),
    });
  const { data: category, loading: categoryLoading } = await getCategory({
    category_id: category_id?.replaceAll("-", " "),
  });
  return (
    <>
      <CategoriesNavigation />
      <div className="p-5">
        <MaxWidthWrapper>
          <div>
            <SectionTitle className="my-2" title="Shop by category" />
            <SubCategoriesSlider
              category_id={category_id}
              category={category}
              loading={categoryLoading}
            />
          </div>
          <div>
            <ProductsBestSellers
              category_id={category_id}
              data={bestSellersData}
              loading={bestSellersLoading}
            />
          </div>
          <div>
            <ProductsDeal
              category_id={category_id}
              data={dealsData}
              loading={dealsLoading}
            />
          </div>
          <div>
            <ProductsByCategory
              category_id={category_id}
              data={data}
              loading={loading}
            />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
