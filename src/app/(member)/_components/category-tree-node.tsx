import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusSquare, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export const TreeNode = ({ node }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>("");
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectValue((prevValue) => (prevValue === value ? "" : value));
  };

  const { category_id, sub_category_id } = useParams();
  const mainIsActive = category_id === node?.name?.replaceAll(" ", "-");

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
          <ul className="ml-10  my-2">
            {node?.children?.map((childNode: any, i: number) => (
              <li
                key={i}
                className="last:m-0 mb-2"
                onClick={() => handleSelect(childNode?.name)}
              >
                <Link
                  href={""}
                  className={cn({
                    // "text-black font-semibold": subIsActive(childNode?.name),
                    "text-black font-bold": selectValue === childNode?.name,
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