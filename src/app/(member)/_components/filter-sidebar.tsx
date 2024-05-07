import LoaderLayout from "@/components/loader-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GroupFilters } from "@/types";
import SelectCategory from "./select-category";
import { SelectForm } from "./select-form";
import { SelectPrice } from "./select-price";
import { SelectColour } from "./select-color";
export default function FilterSidebar({
  groupFilters,
  loading,
}: {
  loading: boolean;
  groupFilters: null | GroupFilters;
}) {
  const arrayOfFilter = [
    { data: groupFilters?.filterByBrands, label: "brand" },
    { data: groupFilters?.filterByCondition, label: "condition" },
    { data: groupFilters?.filterByDeals, label: "deal" },
    { data: groupFilters?.filterBySellers, label: "seller" },
  ];
  return (
    <div className="w-[250px] p-3 h-[100%] relative">
      <LoaderLayout loadingCondition={loading} />
      <Accordion 
        type="multiple"
        defaultValue={[
          "category",
          "brand",
          "colour",
          "condition",
          "deal",
          "seller",
          "price"
        ]}
        className="w-full"
      >
        <AccordionItem value="category">
          <AccordionTrigger className="font-bold text-[15px]  hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <SelectCategory category={groupFilters?.category || []} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"price"}>
          <AccordionTrigger className="font-bold text-[15px] hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <SelectPrice
              data={{
                maxPrice: groupFilters?.maximumPrice || 0,
                minPrice: groupFilters?.minimumPrice || 0,
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"colour"}>
          <AccordionTrigger className="font-bold text-[15px] hover:no-underline">
            Colour
          </AccordionTrigger>
          <AccordionContent>
            <SelectColour data={groupFilters?.filterByColour || []} />
          </AccordionContent>
        </AccordionItem>
        {arrayOfFilter?.map((el, i) => (
          <AccordionItem key={i} value={el?.label}>
            <AccordionTrigger className="font-bold  text-[15px] hover:no-underline">
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
