import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { MinusSquare, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const TreeNode = ({ node }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const { category_id, sub_category_id } = useParams();
  const mainIsActive = category_id === node?.name?.replaceAll(" ", "-");
  const subIsActive = (name: string) =>
    sub_category_id === name?.replaceAll(" ", "-");
  return (
    <div className="text-sm text-slate-900 capitalize">
      <div className="flex items-center hover:opacity-[0.6] transition-all">
        <Button
          onClick={handleToggle}
          className="w-4 h-4 p-0 bg-white  hover:bg-transparent"
        >
          {isOpen ? (
            <MinusSquare className="h-4 w-4  text-shade" />
          ) : (
            <PlusSquare className="h-4 w-4 text-shade" />
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
        <ul className="mt-2">
          <li className="ml-7 ">{node?.subLink} </li>
          <ul className="ml-12  my-2">
            {node?.children?.map((childNode: any, i: number) => (
              <li key={i} className="last:m-0 mb-2">
                <Link
                  href={""}
                  className={cn({
                    "text-black font-semibold": subIsActive(childNode?.name),
                  })}
                >
                  {childNode?.name}
                </Link>
              </li>
            ))}
          </ul>
        </ul>
      )}
    </div>
  );
};

const CategoryFilters = ({ category }: { category: Category | Category[] }) => {
  const categoryData = Array.isArray(category) ? category : [category];
  const categoryTree = categoryData?.map((el) => ({
    name: el?.main_category?.name,
    subLink: "All " + el?.main_category?.name,
    children: el?.sub_categories?.map((el) => ({ name: el?.name })),
  }));

  return (
    <div className="">
      {categoryTree.map((rootNode, i) => (
        <TreeNode key={i} node={rootNode} />
      ))}
    </div>
  );
};

export default CategoryFilters;
