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
    setSelectValue((prevValue) => (prevValue === value ? "" : value));
  };

  const category = (node?.name + "/" + selectValue).replaceAll(" ", "-");
  useEffect(() => {
    setFilterData((curr) => ({
      ...curr,
      category,
    }));
  }, [category, selectValue, setFilterData]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const { category_id, sub_category_id } = useParams();
  const mainIsActive = category_id === node?.name?.replaceAll(" ", "-");
  const subIsActive = category === category_id + "/" + sub_category_id;

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
        <Link
          href={""}
          className={cn("ml-2 ", { "text-black font-bold": mainIsActive })}
        >
          {node?.name}
        </Link>
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
                  <Link
                    href={""}
                    className={cn({
                      "text-black font-bold":
                        selectValue === childNode?.name || subIsActive,
                    })}
                  >
                    {childNode?.name}
                  </Link>
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
