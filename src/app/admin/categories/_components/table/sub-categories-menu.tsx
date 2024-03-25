import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types";
import Link from "next/link";
export default function SubCategoriesMenu({ data }: { data: Category }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col gap-1 w-[250px] "
      >
        <DropdownMenuLabel className="">Sub Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {data?.sub_categories?.map((el, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link
              href={"/admin/categories/" + data?._id + "/update"}
              className="cursor-pointer flex items-center gap-5"
            >
              <Image
                src={el?.image}
                alt="sub-categories-image"
                width={660}
                height={900}
                className=" object-cover max-w-[60px] min-w-[60px] h-[82px] "
              />
              <span className="text-sm  max-w-[150px] overflow-x-auto">
                {el?.name}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
