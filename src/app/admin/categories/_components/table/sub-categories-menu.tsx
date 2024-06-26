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
        align="center"
        className="flex flex-col gap-1 bottom-0"
      >
        <DropdownMenuLabel className="">Sub Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-h-[350px] overflow-y-auto justify-start">
          {data?.sub_categories?.map((el, i) => (
            <DropdownMenuItem key={i} asChild className="hover:bg-slate-100">
              <Link
                href={"/admin/categories/" + data?._id + "/update"}
                className="cursor-pointer sm:flex-col  flex items-center gap-5 "
              >
                <Image
                  src={el?.image}
                  alt="sub-categories-image"
                  width={660}
                  height={900}
                  loading="lazy"
                  className=" object-cover max-w-[62px] min-w-[62px] h-[62px] "
                />
                <span className="text-sm text-center  max-w-[150px] overflow-x-auto">
                  {el?.name}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
