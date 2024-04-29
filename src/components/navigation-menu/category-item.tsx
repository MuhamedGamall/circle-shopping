import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { Category } from "@/types";
import Link from "next/link";

export default function CategoryItem({
  main_category,
  sub_categories,
}: Category) {
  return (
    <MenubarMenu>
      <MenubarTrigger className="hover:text-[#3866df] whitespace-nowrap border-none rounded-none hover:bg-white uppercase font-bold  py-2.5 px-2 hover:shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px] ">
        {main_category?.name}
      </MenubarTrigger>
      <MenubarContent className="rounded-none ">
        <MenubarItem asChild>
          <Link
            href={"/category/" + main_category?.name?.replaceAll(" ", "-")}
            className="bg-slate-100 rounded-none capitalize cursor-pointer text-[#3866df]"
          >
            {main_category?.name}
          </Link>
        </MenubarItem>
        {sub_categories?.map((el: any, i: number) => (
          <MenubarItem key={i} asChild>
            <Link
              href={
                "/category/" +
                main_category?.name?.replaceAll(" ", "-") +
                "/" +
                el?.name?.replaceAll(" ", "-")
              }
              className="rounded-none capitalize cursor-pointer"
            >
              {el.name}
            </Link>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}
