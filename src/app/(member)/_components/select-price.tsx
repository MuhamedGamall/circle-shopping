import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterDataState } from "./filter-sidebar";

export const SelectPrice = ({
  data,
  setFilterData,
  filterData,
}: {
  data: { max: number; min: number };
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
}) => {
  const [values, setValues] = useState<{
    maxPrice: number;
    minPrice: number;
  } | null>(null);

  useEffect(() => {
    setFilterData((curr) => ({
      ...curr,
      ...values,
    }));
  }, [setFilterData, values]);

  return (
    <div className="flex gap-1 justify-center items-center">
      <Input
        onChange={(e) =>
          setValues((curr: any) => ({
            ...curr,
            minPrice: Math.max(parseInt(e.target.value), 0),
          }))
        }
        defaultValue={data?.min}
        className="rounded-none border w-full  p-1 h-9 placeholder:text-[12px]"
        placeholder="Min price"
        type="number"
        min={0}
      />
      <span className="text-slate-400 ">TO</span>
      <Input
        defaultValue={data?.max}
        className="rounded-none border w-full p-1 h-9 placeholder:text-[12px]"
        placeholder="Max price"
        type="number"
        onChange={(e) =>
          setValues((curr: any) => ({
            ...curr,
            maxPrice: Math.max(parseInt(e.target.value), 0),
          }))
        }
        min={0}
      />
    </div>
  );
};
