import { FilterItem } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export const SelectForm = ({ data }: { data: FilterItem[] }) => {
  const [values, setValues] = useState<string[]>([]);

  const handleCheckboxChange = (checked: boolean, _id: string) => {
    if (checked) {
      setValues((prevValues) => [...prevValues, _id]);
    } else {
      setValues((prevValues) => prevValues.filter((value) => value !== _id));
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center">
      <div
        className=" text-sm text-blue cursor-pointer"
        onClick={() => setValues([])}
      >
        clear
      </div>
      {data?.map((brand, i) => (
        <Label
          key={i}
          className="group flex items-center  justify-between text-shade"
        >
          <div className="flex items-center gap-1 font-normal text-[12px]  group-hover:text-blue capitalize">
            <Checkbox
              className="data-[state=checked]:bg-blue rounded-[3px]  border-shade  h-3.5 w-3.5 "
              checked={values.includes(brand._id)}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(checked, brand._id)
              }
              value={brand?._id}
            />
            {brand?._id}
          </div>
          <span className="group-hover:text-blue text-[12px]">
            ({brand?.count})
          </span>
        </Label>
      ))}
    </div>
  );
};
