import ProductsContent from "@/app/(member)/_components/products-content/products-content";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";

export default function ProductsPage() {
  return (
    <div>
      <CategoriesNavigation />
      <ProductsContent />
    </div>
  );
}
