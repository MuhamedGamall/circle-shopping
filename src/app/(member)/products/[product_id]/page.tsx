import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import ProductContent from "./_components/product-content";
import "./local.css";
import MobileProductContent from "./_components/mobile-product-content";
import getProduct from "./actions/get-product";
export default async function ProductPage({
  params: { product_id },
}: {
  params: { product_id: string };
}) {
const {data,loading} = await getProduct({product_id})

  return (
    <div className="bg-[#f7f7fa] pb-1">
      <CategoriesNavigation />
      <div className=" xs:block hidden ">
        <ProductContent product={data} loading={loading} />
      </div>
      <div className=" xs:hidden block ">
        <MobileProductContent product={data} loading={loading} />
      </div>
    </div>
  );
}
