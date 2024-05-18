import LoaderLayout from "@/components/loader-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GroupFilters } from "@/types";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import SelectCategory from "./select-category";
import { SelectColour } from "./select-colour";
import { SelectForm } from "./select-form";
import { SelectPrice } from "./select-price";
type QueryItem = string | number | (string | number | null)[] | null;
export type FilterDataState = {
  category: QueryItem;
  sortBy: QueryItem;
  colour: QueryItem;
  brand: QueryItem;
  condition: QueryItem;
  seller: QueryItem;
  deal: QueryItem;
  minPrice: QueryItem | undefined;
  maxPrice: QueryItem | undefined;
};

export default function FilterSidebar({
  groupFilters,
  loading,
  searchParams,
  setSearchParams,
}: {
  loading: boolean;
  groupFilters: null | GroupFilters;
  searchParams: any;
  setSearchParams: any;
}) {
  const router = useRouter();
  const { category_id, sub_category_id } = useParams<any>();

  // const [searchParams, setSearchParams] = useState<any>({});
  const [filterData, setFilterData] = useState<FilterDataState>({
    category: "",
    sortBy: "",
    colour: [],
    brand: [],
    condition: [],
    seller: [],
    deal: [],
    minPrice: 0,
    maxPrice: 0,
  });
  
  useEffect(() => {
    setFilterData({
      category: `${category_id}/${sub_category_id || ""}`,
      sortBy: searchParams?.sortBy || "newest",
      colour: searchParams?.colour || [],
      brand: searchParams?.brand || [],
      condition: searchParams?.condition || [],
      seller: searchParams?.seller || [],
      deal: searchParams?.deal || [],
      minPrice: searchParams?.minPrice || groupFilters?.minPrice,
      maxPrice: searchParams?.maxPrice || groupFilters?.maxPrice,
    });
  }, [
    category_id,
    sub_category_id,
    groupFilters,
    searchParams
  ]);

  const { category, ...queryData } = filterData;

  const applyButton = async () => {
    setSearchParams(filterData);
    const url = qs.stringifyUrl(
      {
        url: window?.location?.href,
        query: queryData,
      },
      { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
    );

    const refactorUrl = url.replace(
      category_id + "/" + (sub_category_id || ""),
      category + "/"
    );

    router.push(refactorUrl);
  };

  const arrayOfFilter = [
    { data: groupFilters?.filterByBrands, label: "brand" },
    { data: groupFilters?.filterByCondition, label: "condition" },
    { data: groupFilters?.filterByDeals, label: "deal" },
    { data: groupFilters?.filterBySellers, label: "seller" },
  ] as any[];

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
