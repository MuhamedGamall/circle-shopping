import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const selectItems = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Best Rated", value: "best-rated" },
];
const TotalResult = ({
  resultsLength,
  searchParams,
  categoryName,
}: {
  resultsLength: number;
  searchParams: any;
  categoryName: string;
}) => {
  const search = useSearchParams()
  let title;
  if (searchParams?.role && !categoryName && !search.get('q')) {
    title = searchParams?.role === 'all_products' ? "All Products" : searchParams?.role 
  } else if (search.get('q')) {
    title = search.get('q');
  } else if (categoryName) {
    title = categoryName;
  } 

  return (
    <div className="flex items-center gap-1">
      <span>{resultsLength}</span>
      <span>Results </span>
      {title && (
        <>
          for
          <span className=" capitalize font-semibold">
            &#34;{title}
            &#34;
          </span>
        </>
      )}
    </div>
  );
};
export default function ProductsTopbar({
  resultsLength,
  searchParams,
  setSearchParams,
}: {
  searchParams: any;
  setSearchParams: Dispatch<SetStateAction<any>>;
  resultsLength: number;
}) {
  const { category_id, sub_category_id } = useParams<any>();
  const router = useRouter();

  const [value, setValue] = useState<any>("");

  const categoryName = (
    sub_category_id ? category_id + " & " + sub_category_id : category_id
  )?.replaceAll("-", " ");

  useEffect(() => {
    if (searchParams?.sortBy) {
      setValue(searchParams?.sortBy);
    }
  }, [searchParams?.sortBy]);

  const handleSelect = (val: string) => {
    if (val) setValue(val);

    const newSearchParams = {
      ...searchParams,
      category: null,
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
      <TotalResult
        categoryName={categoryName}
        resultsLength={resultsLength}
        searchParams={searchParams}
      />
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
