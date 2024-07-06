import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterDataState, GroupFilters } from "@/types";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectCategory from "./select-category";
import { SelectColour } from "./select-colour";
import { SelectForm } from "./select-form";
import { SelectPrice } from "./select-price";
import { handleDiscountPercentage } from "@/utils/format";

export default function FilterSidebar({
  groupFilters,
  searchParams,
  setSearchParams,
}: {
  groupFilters: null | GroupFilters;
  searchParams: FilterDataState;
  setSearchParams: Dispatch<SetStateAction<FilterDataState>>;
}) {
  const router = useRouter();

  const [filterData, setFilterData] = useState<FilterDataState>({
    sortBy: "",
    colour: [],
    brand: [],
    condition: [],
    seller: [],
    deal: [],
    minPrice: 0,
    maxPrice: 0,
    delivery: "",
  });
  useEffect(() => {
    setFilterData({
      sortBy: searchParams?.sortBy || "best-rated",
      colour: searchParams?.colour || [],
      brand: searchParams?.brand || [],
      condition: searchParams?.condition || [],
      seller: searchParams?.seller || [],
      deal: searchParams?.deal || [],
      minPrice: searchParams?.minPrice ?? groupFilters?.minPrice,
      maxPrice: searchParams?.maxPrice ?? groupFilters?.maxPrice,
      delivery: searchParams?.delivery || "",
    });
  }, [
    groupFilters?.maxPrice,
    groupFilters?.minPrice,
    searchParams?.brand,
    searchParams?.colour,
    searchParams?.condition,
    searchParams?.deal,
    searchParams?.delivery,
    searchParams?.maxPrice,
    searchParams?.minPrice,
    searchParams?.seller,
    searchParams?.sortBy,
  ]);

  const applyButton = () => {
    setSearchParams((curr) => ({ ...curr, ...filterData }));
    const handleUrl = window?.location?.href?.replace("/search", "/products");
    const url = qs.stringifyUrl(
      {
        url: handleUrl,
        query: filterData,
      },
      { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
    );

    router.push(url);
  };

  const arrayOfFilter = [
    { data: groupFilters?.filterByBrands, label: "brand" },
    { data: groupFilters?.filterByCondition, label: "condition" },
    { data: groupFilters?.filterByDeals, label: "deal" },
    { data: groupFilters?.filterBySellers, label: "seller" },
  ] as any[];

  const handleCheckboxChange = (checked: boolean) => {
    setFilterData((curr) => ({
      ...curr,
      delivery: checked ? "free" : "",
    }));
  };

  return (
    <div className="w-[250px] p-3 h-[100%] relative">

      <Label className="flex cursor-pointer items-center gap-1 font-normal text-[12px]  group-hover:text-blue capitalize">
        <Checkbox
          className="data-[state=checked]:bg-blue rounded-[3px]  border-shade  h-3.5 w-3.5 "
          checked={filterData.delivery === "free"}
          onCheckedChange={handleCheckboxChange}
        />
        Free delivery
      </Label>

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
              categories={groupFilters?.categories || []}
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
            <AccordionTrigger className="font-bold capitalize  text-[15px] hover:no-underline">
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
