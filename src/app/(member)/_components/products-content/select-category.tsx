import { Category, FilterDataState } from "@/types";
import { TreeNode } from "./category-tree-node";
import { Dispatch, SetStateAction, useState } from "react";

const SelectCategory = ({
  categories,
  setFilterData,
  filterData,
}: {
  categories: Category[];
  setFilterData: Dispatch<SetStateAction<FilterDataState>>;
  filterData: FilterDataState;
}) => {
  const [showAll, setShowAll] = useState(false);
  const categoryTree = categories?.map((el) => ({
    name: el?.main_category?.name,
    children: el?.sub_categories?.map((el) => ({ name: el?.name })),
  }));
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div className=" flex flex-col justify-center gap-5">
      {categoryTree
        ?.slice(0, showAll ? categoryTree?.length : 9)
        .map((rootNode, i) => (
          <TreeNode key={i} node={rootNode} />
        ))}
      {categoryTree?.length >= 10 && (
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

export default SelectCategory;
