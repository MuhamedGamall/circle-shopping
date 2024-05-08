import LoaderLayout from "@/components/loader-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GroupFilters } from "@/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import SelectCategory from "./select-category";
import { SelectColour } from "./select-color";
import { SelectForm } from "./select-form";
import { SelectPrice } from "./select-price";

export type FilterDataState = {
  category: string;
  sortBy: string[];
  colour: string[];
  brand: string[];
  condition: string[];
  seller: string[];
  deal: string[];
  minPrice: number | null;
  maxPrice: number | null;
};
export default function FilterSidebar({
  groupFilters,
  loading,
}: {
  loading: boolean;
  groupFilters: null | GroupFilters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { category_id, sub_category_id } = useParams();
  const [filterData, setFilterData] = useState<FilterDataState>({
    category: "",
    sortBy: [],
    colour: [],
    brand: [],
    condition: [],
    seller: [],
    deal: [],
    minPrice: null,
    maxPrice: null,
  });
  const { category, ...queryData } = filterData;
  console.log(queryData);
  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: queryData || null,
    },
    { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
  );

  const applyButton = async () => {
    const refactorUrl = url.replace(
      String(category_id + "/" + (sub_category_id || "")),
      category + "/"
    );
    router.push(refactorUrl);
  };
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
          "price",
        ]}
        className="w-full"
      >
        <AccordionItem value="category" className=" border-0">
          <AccordionTrigger className="font-bold text-[15px]  hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <SelectCategory
              category={groupFilters?.category || []}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"price"} className=" border-0">
          <AccordionTrigger className="font-bold text-[15px] hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <SelectPrice
              data={{
                max: groupFilters?.maxPrice || 0,
                min: groupFilters?.minPrice || 0,
              }}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"colour"} className=" border-0">
          <AccordionTrigger className="font-bold text-[15px] hover:no-underline">
            Colour
          </AccordionTrigger>
          <AccordionContent>
            <SelectColour
              data={groupFilters?.filterByColour || []}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </AccordionContent>
        </AccordionItem>
        {arrayOfFilter?.map((el, i) => (
          <AccordionItem key={i} value={el?.label} className=" border-0">
            <AccordionTrigger className="font-bold  text-[15px] hover:no-underline">
              {el?.label}
            </AccordionTrigger>
            <AccordionContent>
              <SelectForm
                data={el?.data || []}
                setFilterData={setFilterData}
                filterData={filterData}
                formName={el?.label}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type="button"
        onClick={applyButton}
        variant={"blue"}
        className="my-5 w-full px-2 py-0"
      >
        Apply
      </Button>
    </div>
  );
}
