import { useParams } from "next/navigation";
import CategoryFilters from "./category-filters";
import { GroupFilters } from "@/types";

export default function FilterSidebar({
  groupFilters,
  loading,
}: {
  loading: boolean;

  groupFilters: null | GroupFilters | any;
}) {
  return (
    <div className="w-[250px] p-3">
      <CategoryFilters category={groupFilters?.category}/>
    </div>
  );
}
