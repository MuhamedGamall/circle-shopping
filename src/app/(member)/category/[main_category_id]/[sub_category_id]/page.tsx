import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
// import CategoriesProducts from "./_components/products";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";

export default function CategoryPage({
  params: { category },
}: {
  params: { category: string | string[] };
}) {
  return (
    <>
      <CategoriesNavigation />
      <div className="bg-[#f7f7fa] p-4">
        {/* <MaxWidthWrapper>
          <CategoriesProducts category={category} />
        </MaxWidthWrapper> */}
      </div>
    </>
  );
}
