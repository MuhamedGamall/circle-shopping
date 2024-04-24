"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import useCategories from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CategoryItem from "./category-item";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
  const loadingArray = Array.from({ length: 22 });

  return (
    <div className=" flex items-center gap-1">
      {loadingArray.map((_, i) => (
        <Skeleton key={i} className="h-[30px] w-[100px] " />
      ))}
    </div>
  );
};
export default function CategoriesNavigation() {
  const { data, loading } = useCategories();
  return (
    <nav className={cn("hidden sm:block bg-[#fcfbf4] overflow-x-auto ")}>
      <Menubar  className="rounded-none bg-transparent mx-auto border-0 w-full max-w-[1890px]  px-2.5">
        <MenubarMenu>
          <MenubarTrigger className=" border-r rounded-none p-2.5">
            <Link href={"/bestsellers"} className="">
              BESTSELLERS
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          data?.map((el, i) => <CategoryItem key={i} {...el} />)
        )}
      </Menubar>
    </nav>
  );
}
