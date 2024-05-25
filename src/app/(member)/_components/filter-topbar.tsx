import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterDataState } from "@/types";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const selectItems = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Best Rated", value: "best-rated" },
];
export default function FilterTopbar({
  resultsLength,
  searchParams,
  setSearchParams,
}: {
  searchParams: FilterDataState;
  setSearchParams: Dispatch<SetStateAction<FilterDataState>>;
  resultsLength: number;
}) {
  const { category_id, sub_category_id } = useParams<any>();

  const router = useRouter();


  const [value, setValue] = useState<any>("");

  const categoryName = (
    sub_category_id ? category_id + " / " + sub_category_id : category_id
  ).replaceAll("-", " ");

  useEffect(() => {
    if (searchParams?.sortBy) {
      setValue(searchParams?.sortBy);
    }
  }, [searchParams?.sortBy]);


  const handleSelect = (val: string) => {
    if (val) setValue(val);

    const newSearchParams = {
      ...searchParams,
      category:null,
      sortBy: val,
    };
  
    setSearchParams(newSearchParams);

    const url = qs.stringifyUrl(
      {
        url: window?.location?.href,
        query: newSearchParams,
      },
      { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
    );

    router.push(url);

  };
  return (
    <div className="flex justify-between gap-2 items-center p-5 ">
      <div className="flex items-center gap-1">
        <span>{resultsLength}</span>
        <span>Results for</span>
        <span className=" capitalize font-semibold">
          &#34;{categoryName || "category name"}&#34;
        </span>
      </div>
      <div className=" md:flex  gap-2 items-center hidden">
        <span className=" font-semibold text-[12px] text-slate-400 whitespace-nowrap">
          SORT BY
        </span>
        <Select
          onValueChange={handleSelect}
          value={value}
          defaultValue="best-rated"
        >
          <SelectTrigger className=" capitalize min-w-[150px] rounded-none font-bold">
            <SelectValue placeholder={value || "Sort by"} />
          </SelectTrigger>
          <SelectContent className="max-h-[350px] overflow-y-auto">
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              {selectItems.map((el, i) => (
                <SelectItem key={i} value={el.value}>
                  {el.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
