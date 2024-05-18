import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/redux";
import { getProductsByMainCategory_member } from "@/lib/RTK/slices/member/categories-slice";
import { useParams, usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";
export default function FilterTopbar({
  resultsLength,
}: {
  resultsLength: number;
}) {
  // const { category_id, sub_category_id } = useParams<any>();

  // const pathname = usePathname();
  // const router = useRouter();

  // const dispatch = useAppDispatch();

  // const [searchParams, setSearchParams] = useState<any>(null);
  // const [value, setValue] = useState<any>("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const queryParams = qs.parse(window.location.search, {
  //       arrayFormat: "comma",
  //       parseNumbers: true,
  //     });
  //     setSearchParams(queryParams);
  //     setValue(queryParams.sortBy);
  //   }
  // }, []);
  // // let params: any;
  // // if (typeof window !== "undefined") {
  // //   const queryParams = qs.parse(window.location.search, {
  // //     arrayFormat: "comma",
  // //     parseNumbers: true,
  // //   });
  // //   params = { ...queryParams, role: "bestsellers" };
  // // }

  // const categoryName = (
  //   sub_category_id ? category_id + " / " + sub_category_id : category_id
  // ).replaceAll("-", " ");

  // const handleSelect = (val: string) => {
  //   setValue(val);

  //   const newSearchParams = {
  //     ...searchParams,
  //     sortBy: val,
  //     role:
  //       pathname?.includes("bestsellers") || pathname?.includes("deals")
  //         ? pathname.includes("bestsellers")
  //           ? "bestsellers"
  //           : "deals"
  //         : "",
  //   };

  //   setSearchParams(newSearchParams);

  //   const url = qs.stringifyUrl(
  //     {
  //       url: window?.location?.href ,
  //       query: newSearchParams,
  //     },
  //     { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
  //   );

  //   router.push(url);

  //   dispatch(
  //     getProductsByMainCategory_member({
  //       category_id: category_id.replaceAll("-", " "),
  //       params: newSearchParams,
  //     })
  //   );
  // };
  return (
    <div className="flex justify-between gap-2 items-center p-5 ">
      {/* <div className="flex items-center gap-1">
        <span>{resultsLength }</span>
        <span>Results for</span>
        <span className=" capitalize font-semibold">
          &#34;{categoryName || "category name"}&#34;
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span className=" font-semibold text-[12px] text-slate-400 whitespace-nowrap">
          SORT BY
        </span>
        <Select
          onValueChange={handleSelect}
          value={value}
          defaultValue="newest"
        >
          <SelectTrigger className=" capitalize min-w-[150px] rounded-none font-bold">
            <SelectValue placeholder={value || "Sort by"} />
          </SelectTrigger>
          <SelectContent className="max-h-[350px] overflow-y-auto">
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="newest" className="capitalize">
                Newest
              </SelectItem>
              <SelectItem value="asc" className="capitalize">
                price: low to high
              </SelectItem>
              <SelectItem value="desc" className="capitalize">
                price: high to low
              </SelectItem>
              <SelectItem value="best-rated" className="capitalize">
                best rated
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}
