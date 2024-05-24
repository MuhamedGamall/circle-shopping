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
import { FilterDataState } from "@/types";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const selectItems = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Best Rated", value: "best-rated" },
];

export default function SortBySheet({
  searchParams,
  setSearchParams,
}: {
  searchParams: FilterDataState;
  setSearchParams: Dispatch<SetStateAction<FilterDataState>>;
}) {
  const { category_id, sub_category_id } = useParams<any>();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<any>("");

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

    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id.replaceAll("-", " "),
        params: newSearchParams,
      })
    );
  };
  return (
    <RadioGroup
      onValueChange={handleSelect}
      value={value}
      defaultValue="best-rated"
      className="w-full"
    >
      <Label className=" text-[20px] px-[15px] font-bold">Sort by</Label>
      {selectItems.map((el, i) => (
        <ul
          key={i}
          className={cn("", {
            "text-black font-bold": el?.value === value,
          })}
        >
          <li >
            <Label
              htmlFor={"r" + i}
              className={cn(
                "text-lg cursor-pointer py-[12px] px-[15px] text-shade flex items-center justify-between",
                {
                  "text-black font-bold": el?.value === value,
                }
              )}
            >
              {el.label}
              <RadioGroupItem
                value={el.value}
                id={"r" + i}
                className="text-blue  h-4 w-4"
              />
            </Label>
          </li>
        </ul>
      ))}
    </RadioGroup>
  );
}
