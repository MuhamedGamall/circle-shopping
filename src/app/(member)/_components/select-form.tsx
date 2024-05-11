import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterItem } from "@/types";
import { formatNumber } from "@/utils/format";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterDataState } from "./filter-sidebar";

export const SelectForm = ({
  data,
  setFilterData,
  filterData,
  formName,
}: {
  data: FilterItem[];
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
  formName: "brand" | "condition" | "seller" | "deal";
}) => {
  const formatValues: any = Array.isArray(filterData?.[formName])
    ? filterData?.[formName]
    : [filterData?.[formName]];

  const [values, setValues] = useState<string[]>(formatValues);
  const [showAll, setShowAll] = useState(false);

  const handleCheckboxChange = (checked: boolean, _id: string) => {
    if (checked) {
      setValues((prevValues) => [...prevValues, _id]);
    } else {
      setValues((prevValues) => prevValues?.filter((value) => value !== _id));
    }
  };
  useEffect(() => {
    setFilterData((curr) => ({
      ...curr,
      [formName]: values,
    }));
  }, [formName, setFilterData, values]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div className="flex flex-col gap-3 justify-center">
      <button
        className=" w-fit text-sm text-blue cursor-pointer"
        onClick={() => setValues([])}
      >
        clear
      </button>
      {data?.slice(0, showAll ? data?.length : 9)?.map((el, i) => (
        <Label
          key={i}
          className="group cursor-pointer flex items-center  justify-between text-slate-400"
        >
          <div className="flex items-center gap-1 font-normal text-[12px]  group-hover:text-blue capitalize">
            <Checkbox
              className="data-[state=checked]:bg-blue rounded-[3px]  border-shade  h-3.5 w-3.5 "
              checked={values.includes(el._id)}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(checked, el._id)
              }
              value={el?._id}
            />
            {el?._id}
          </div>
          <span className="group-hover:text-blue text-[12px]">
            ({formatNumber(el?.count)})
          </span>
        </Label>
      ))}
      {data?.length >= 10 && (
        <button
          className=" w-fit text-sm text-blue underline cursor-pointer"
          onClick={toggleShowAll}
        >
          {showAll ? "See less" : "See all"}
        </button>
      )}
    </div>
  );
};
