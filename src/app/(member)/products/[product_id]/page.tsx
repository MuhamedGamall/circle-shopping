import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import ProductContent from "./_components/product-content";
import "./local.css";
import MobileProductContent from "./_components/mobile-product-content";
export default function ProductPage() {
  return (
    <div className="bg-[#f7f7fa] ">
      <CategoriesNavigation />
      <div className=" xs:block hidden ">
        <ProductContent />
      </div>
      <div className=" xs:hidden block ">
        <MobileProductContent />
      </div>
    </div>
  );
}
