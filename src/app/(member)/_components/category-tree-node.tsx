import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusSquare, PlusSquare } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";
export const TreeNode = ({ node }: { node: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const { category_id, sub_category_id } = useParams() as any;

  const [selectValue, setSelectValue] = useState<any>(null);

  useEffect(() => {
    if (category_id || sub_category_id) {
      setSelectValue({
        mainCategory: category_id?.replaceAll("-", " ") || "",
        subCategory: sub_category_id?.replaceAll("-", " ") || "",
      });
    }
  }, [category_id, sub_category_id]);

  const router = useRouter();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { q, ...data } = qs.parse(location?.search ? location?.search : "", {
    arrayFormat: "comma",
  });
  const params = qs.stringify(data, {
    arrayFormat: "comma",
  });

  const handleSelectMainCategory = (value: string) => {
    
    const url =
    selectValue?.mainCategory === value
    ? `/products?${params}`
    : `/categories/${value?.replaceAll(" ", "-")}/products?${params}`;
    console.log(url);
    setSelectValue((curr: any) => ({
      subCategory: "",
      mainCategory: curr?.mainCategory === value ? "" : value,
    }));

    router.push(url);
  };

  const handleSelectSubcategory = (value: any) => {
    const url =
      selectValue?.subCategory === value?.subCategory
        ? `/categories/${value?.mainCategory?.replaceAll(
            " ",
            "-"
          )}/products?${params}`
        : `/categories/${value?.mainCategory?.replaceAll(
            " ",
            "-"
          )}/${value?.subCategory?.replaceAll(" ", "-")}/products?${params}`;
    setSelectValue((curr: any) => ({
      mainCategory: value?.mainCategory,
      subCategory:
        curr?.subCategory === value?.subCategory ? "" : value?.subCategory,
    }));
    router.push(url);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const activeLink = (categoryName: any, valueSelected: string) =>
    categoryName?.replaceAll("-", " ") === valueSelected;
  return (
    <div className="text-sm text-slate-900 ">
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
          onClick={() => handleSelectMainCategory(node?.name)}
          className={cn("ml-2 underline capitalize", {
            "text-black font-bold": activeLink(category_id, node?.name),
          })}
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
                  className="last:m-0 mb-2 hover:underline hover:opacity-[0.6] transition-all "
                  onClick={() =>
                    handleSelectSubcategory({
                      mainCategory: node?.name,
                      subCategory: childNode?.name,
                    })
                  }
                >
                  <button
                    type="button"
                    className={cn(
                      " hover:underline hover:opacity-[0.8] transition-all capitalize",
                      {
                        "text-black font-bold": activeLink(
                          sub_category_id,
                          childNode?.name
                        ),
                      }
                    )}
                  >
                    {childNode?.name}
                  </button>
                </li>
              ))}
          </ul>

          <button
            className={cn(
              " w-fit text-sm text-blue ml-7 underline cursor-pointer",
              {
                hidden: node?.children?.length < 10,
              }
            )}
            onClick={toggleShowAll}
          >
            {showAll ? "See less" : "See all"}
          </button>
        </>
      )}
    </div>
  );
};
