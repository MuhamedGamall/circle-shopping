import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SelectPrice = ({
  data,
}: {
  data: { maxPrice: number; minPrice: number };
}) => {
  const [values, setValues] = useState<string[]>([]);

  const handleCheckboxChange = (checked: boolean, _id: string) => {
    if (checked) {
      setValues((prevValues) => [...prevValues, _id]);
    } else {
      setValues((prevValues) => prevValues.filter((value) => value !== _id));
    }
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <Input
        defaultValue={data?.minPrice}
        className="rounded-none border w-full  p-1 h-9 placeholder:text-[12px]"
        placeholder="Min price"
        type="number"
      />
      <span className="text-slate-400 ">TO</span>
      <Input
        defaultValue={data?.maxPrice}
        className="rounded-none border w-full p-1 h-9 placeholder:text-[12px]"
        placeholder="Max price"
        type="number"
      />
    </div>
  );
};
