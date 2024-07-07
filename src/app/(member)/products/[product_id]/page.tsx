import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import ProductContent from "./_components/product-content";
import "./local.css";
export default function ProductPage() {
  return (
    <div className="bg-[#f7f7fa] ">
      <CategoriesNavigation />
      <ProductContent />
    </div>
  );
}
