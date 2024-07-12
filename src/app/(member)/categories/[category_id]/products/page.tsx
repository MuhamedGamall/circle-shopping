import ProductsContent from "@/app/(member)/_components/products-content/products-content";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";

export default function ProductsCategoryPage() {
  return (
    <div>
      <CategoriesNavigation />
      <ProductsContent />
    </div>
  );
}
