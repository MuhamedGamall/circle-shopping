import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CategoryItem({
  main_category,
  sub_categories,
}: Category) {
  // const pathname = usePathname();
  // const activeLink = path
  const { category_id, sub_category_id } = useParams();
  const activeMainLink =
    main_category?.name?.replaceAll(" ", "-") === category_id;

  return (
    <MenubarMenu>
      <MenubarTrigger
        className={cn(
          "hover:text-[#3866df] whitespace-nowrap border-none rounded-none hover:bg-white uppercase font-bold  py-2.5 px-2 hover:shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px] ",
          {
            "text-[#3866df] bg-white shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px]":
              activeMainLink,
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
            href={"/categories/" + main_category?.name?.replaceAll(" ", "-")}
          >
            {main_category?.name}
          </Link>
        </MenubarItem>
        {sub_categories?.map((el: any, i: number) => (
          <MenubarItem
            key={i}
            asChild
            className={
              "hover:text-[#3866df]  rounded-none capitalize cursor-pointer "
            }
          >
            <Link
              href={
                "/categories/" +
                main_category?.name?.replaceAll(" ", "-") +
                "/" +
                el?.name?.replaceAll(" ", "-")
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
