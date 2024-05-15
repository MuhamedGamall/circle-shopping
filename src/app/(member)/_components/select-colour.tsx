import { cn } from "@/lib/utils";
import { FilterItem } from "@/types";
import { formatNumber } from "@/utils/format";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterDataState } from "./filter-sidebar";

const colourMap: Record<string, string> = {
  blue: "/colours-imgs/blue.png",
  black: "/colours-imgs/black.png",
  silver: "/colours-imgs/silver.png",
  grey: "/colours-imgs/grey.png",
  white: "/colours-imgs/white.png",
  multicolour: "/colours-imgs/multicolour.png",
  green: "/colours-imgs/green.png",
  brown: "/colours-imgs/brown.png",
  beige: "/colours-imgs/beige.png",
  red: "/colours-imgs/red.png",
  pink: "/colours-imgs/pink.png",
  yellow: "/colours-imgs/yellow.png",
  purple: "/colours-imgs/purple.png",
  gold: "/colours-imgs/gold.png",
  orange: "/colours-imgs/orange.png",
  clear: "/colours-imgs/clear.png",
};

export const SelectColour = ({
  data,
  setFilterData,
  filterData,
}: {
  data: FilterItem[];
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
}) => {
  const [showAll, setShowAll] = useState(false);
  const formatValues: any = Array.isArray(filterData?.colour)
    ? filterData?.colour
    : [filterData?.colour];

  const [values, setValues] = useState<string[]>(formatValues || []);

  const handleSelect = (_id: string) => {
    if (values?.includes(_id)) {
      setValues((prevValues) => prevValues.filter((value) => value !== _id));
    } else setValues((prevValues) => [...prevValues, _id]);
  };
  
  useEffect(() => {
    setFilterData((curr) => ({
      ...curr,
      colour: values,
    }));
  }, [setFilterData, values]);

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
      <div className="grid grid-cols-2 gap-y-1 gap-x-0.5 ">
        {data?.slice(0, showAll ? data?.length : 9)?.map((el, i) => (
          <div
            key={i}
            className={
              "flex gap-2  cursor-pointer  items-center p-1.5 bg-white "
            }
            onClick={() => handleSelect(el?._id)}
          >
            <Image
              src={colourMap?.[el?._id]}
              alt={`${el._id} image`}
              width={50}
              height={50}
              className={cn("w-[25px] h-[25px] border", {
                "border-transparent outline-blue outline-1 border-2 outline":
                  values?.includes(el?._id),
              })}
            />
            <div className="text-[12px] leading-[1] flex flex-col justify-center-center ">
              <span className=""> {el?._id}</span>
              <span className=" text-slate-400">
                ({formatNumber(el?.count)})
              </span>
            </div>
          </div>
        ))}
      </div>
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
