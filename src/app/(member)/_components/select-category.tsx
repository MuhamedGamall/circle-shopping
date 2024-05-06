import { Category } from "@/types";
import { TreeNode } from "./category-tree-node";

const SelectCategory = ({ category }: { category: Category | Category[] }) => {
  const categoryData = Array.isArray(category) ? category : [category];
  const categoryTree = categoryData?.map((el) => ({
    name: el?.main_category?.name,
    children: el?.sub_categories?.map((el) => ({ name: el?.name })),
  }));

  return (
    <div>
      {categoryTree.map((rootNode, i) => (
        <TreeNode key={i} node={rootNode} />
      ))}
    </div>
  );
};

export default SelectCategory;
