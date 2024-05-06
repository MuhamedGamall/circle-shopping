import LoaderLayout from "@/components/loader-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GroupFilters } from "@/types";
import SelectCategory from "./select-category";
import { SelectForm } from "./select-brand";
export default function FilterSidebar({
  groupFilters,
  loading,
}: {
  loading: boolean;
  groupFilters: null | GroupFilters;
}) {
  const arrayOfFilter = [
    { data: groupFilters?.filterByBrands, label: "brand" },
    { data: groupFilters?.filterByColour, label: "colour" },
    { data: groupFilters?.filterByCondition, label: "condition" },
    { data: groupFilters?.filterByDeals, label: "deal" },
    { data: groupFilters?.filterBySellers, label: "seller" },
  ];
  return (
    <div className="w-[250px] p-3 h-[100%] relative">
      <LoaderLayout loadingCondition={loading} />
      <Accordion
        type="multiple"
        defaultValue={["category", "brand","colour","condition","deal","seller"]}
        className="w-full"
      >
        <AccordionItem  value="category">
          <AccordionTrigger className="font-bold text-[16px] hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <SelectCategory category={groupFilters?.category || []} />
          </AccordionContent>
        </AccordionItem>
        {arrayOfFilter?.map((el, i) => (
          <AccordionItem key={i} value={el?.label}>
            <AccordionTrigger className="font-bold text-[16px] hover:no-underline">
              {el?.label}
            </AccordionTrigger>
            <AccordionContent>
              <SelectForm data={el?.data || []} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
