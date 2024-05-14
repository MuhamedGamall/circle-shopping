import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import BestSellersContent from "./_components/best-sellers-content";

export default function BestSellersPage({
  params: { category_id },

}: {
  params: { category_id: string };

}) {

  return (
    <div>
      <CategoriesNavigation />
      <BestSellersContent category_id={category_id} />
    </div>
  );
}
