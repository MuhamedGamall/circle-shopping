import { Category } from "@/types";
import { TreeNode } from "./category-tree-node";
import { Dispatch, SetStateAction } from "react";
import { FilterDataState } from "./filter-sidebar";

const SelectCategory = ({
  category,
  setFilterData,
  filterData,
}: {
  category: Category | Category[];
  setFilterData: Dispatch<SetStateAction<FilterDataState >>;
  filterData: FilterDataState ;
}) => {
  const categoryData = Array.isArray(category) ? category : [category];
  const categoryTree = categoryData?.map((el) => ({
    name: el?.main_category?.name,
    children: el?.sub_categories?.map((el) => ({ name: el?.name })),
  }));

  return (
    <div>
      {categoryTree.map((rootNode, i) => (
        <TreeNode
          key={i}
          node={rootNode}
          setFilterData={setFilterData}
          filterData={filterData}
        />
      ))}
    </div>
  );
};

export default SelectCategory;
