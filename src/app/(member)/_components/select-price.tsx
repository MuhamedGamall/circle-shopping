import { Input } from "@/components/ui/input";
import { FilterDataState } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const SelectPrice = ({
  data,
  setFilterData,
  filterData,
}: {
  data: { max: number; min: number };
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
}) => {
  const [values, setValues] = useState<any>({
    maxPrice: filterData?.maxPrice ?? 0,
    minPrice: filterData?.minPrice ?? 0,
  });

  useEffect(() => {
    setValues({
      maxPrice: filterData?.maxPrice ?? 0,
      minPrice: filterData?.minPrice ?? 0,
    });
  }, [filterData]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(e.target.value) || 0;
    setValues((curr: any) => ({ ...curr, minPrice }));
    setFilterData((curr) => ({ ...curr, minPrice }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(e.target.value) || 0;
    setValues((curr: any) => ({ ...curr, maxPrice }));
    setFilterData((curr) => ({ ...curr, maxPrice }));
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <Input
        onChange={handleMinPriceChange}
        value={values.minPrice}
        className="rounded-none border w-full p-1 h-9 placeholder:text-[12px]"
        placeholder="Min price"
        type="number"
        min={0}
      />
      <span className="text-slate-400">TO</span>
      <Input
        onChange={handleMaxPriceChange}
        value={values.maxPrice}
        className="rounded-none border w-full p-1 h-9 placeholder:text-[12px]"
        placeholder="Max price"
        type="number"
        min={0}
      />
    </div>
  );
};
