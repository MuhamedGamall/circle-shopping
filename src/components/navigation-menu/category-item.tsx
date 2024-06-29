import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryItem({
  main_category,
  sub_categories,
}: Category) {
  const { category_id, sub_category_id } = useParams();
  
  const activeLink = (categoryName: any, valueSelected: string) =>
    categoryName?.replaceAll("-", " ") === valueSelected;
  return (
    <MenubarMenu>
      <MenubarTrigger
        className={cn(
          "hover:text-blue whitespace-nowrap border-none rounded-none hover:bg-white uppercase font-bold  py-2.5 px-2 hover:shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px] ",
          {
            "text-blue bg-white shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px]":
              activeLink(category_id, main_category?.name),
          }
        )}
      >
        {main_category?.name}
      </MenubarTrigger>
      <MenubarContent className="rounded-none ">
        <MenubarItem
          asChild
          className={cn("bg-slate-200 rounded-none capitalize cursor-pointer ")}
        >
          <Link
            href={
              "/categories/" +
          main_category?.name?.replaceAll(" ", "-") +
          "/"
  
            }
          >
            {main_category?.name}
          </Link>
        </MenubarItem>
        {sub_categories?.map((el: any, i: number) => (
          <MenubarItem
            key={i}
            asChild
            className={cn(
              "hover:text-blue  rounded-none capitalize cursor-pointer ",
              {
                "text-blue  underline": activeLink(sub_category_id, el?.name),
              }
            )}
          >
            <Link
              href={
                "/categories/" +
                main_category?.name?.replaceAll(" ", "-") +
                "/" +
                el?.name?.replaceAll(" ", "-") +
                "/products?role=all_products"
              }
            >
              {el.name}
            </Link>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}
