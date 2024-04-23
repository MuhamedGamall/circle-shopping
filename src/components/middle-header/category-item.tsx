import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Category } from "@/types";
import Link from "next/link";

export default function CategoryItem({
  main_category,
  sub_categories,
}: Category) {
  return (
    <MenubarMenu>
      <MenubarTrigger className="whitespace-nowrap rounded-none hover:bg-white uppercase font-bold  py-2.5 px-2 hover:shadow-[rgba(0,_0,_0,_0.18)_0px_5px_4px_0px] ">
        <Link href={""}>{main_category?.name}</Link>
      </MenubarTrigger>
      <MenubarContent className="rounded-none">
        {sub_categories?.map((el: any, i: number) => (
          <MenubarItem key={i} asChild>
            <Link href={""}>{el.name}</Link>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}
