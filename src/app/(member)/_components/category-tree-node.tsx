import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterDataState } from "@/types";
import { MinusSquare, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
export const TreeNode = ({
  node,
  setFilterData,
  filterData,
}: {
  node: any;
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    const category = (node?.name + "/" + selectValue).replaceAll(" ", "-");
    setSelectValue((prevValue) => (prevValue === value ? "" : value));
  };

  useEffect(() => {
    setFilterData((curr) => ({
      ...curr,
      category: selectValue,
    }));
  }, [selectValue, setFilterData]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const { category_id, sub_category_id } = useParams();

  return (
    <div className="text-sm text-slate-900 capitalize">
      <div className="flex items-center hover:opacity-[0.6] transition-all">
        <Button
          onClick={handleToggle}
          className="w-4 h-4 p-0 bg-white  hover:bg-transparent"
        >
          {isOpen ? (
            <MinusSquare className="h-4 w-4  text-slate-400" />
          ) : (
            <PlusSquare className="h-4 w-4 text-slate-400" />
          )}
        </Button>
        <button
          type="button"
          // href={""}
          // className={cn("ml-2 ", { "text-black font-bold": mainIsActive })}
        >
          {node?.name}
        </button>
      </div>

      {isOpen && node?.children && (
        <>
          <ul className="ml-10  my-2">
            {node?.children
              ?.slice(0, showAll ? node?.children?.length : 9)
              ?.map((childNode: any, i: number) => (
                <li
                  key={i}
                  className="last:m-0 mb-2"
                  onClick={() => handleSelect(childNode?.name)}
                >
                  <button
                    // href={""}
                    type="button"
                  >
                    {childNode?.name}
                  </button>
                </li>
              ))}
          </ul>

          <button
            className={cn(" w-fit text-sm text-blue underline cursor-pointer", {
              hidden: node?.children < 10,
            })}
            onClick={toggleShowAll}
          >
            {showAll ? "See less" : "See all"}
          </button>
        </>
      )}
    </div>
  );
};
