"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import SortBySheet from "@/app/(member)/_components/sortby-sheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FilterDataState, GroupFilters } from "@/types";
import { Separator } from "@radix-ui/react-menubar";
import { Dispatch, SetStateAction } from "react";
import { BiSort } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
export default function FiltersSheetTrigger({
  searchParams,
  setSearchParams,
  groupFilters,
}: {
  searchParams: FilterDataState;
  setSearchParams: Dispatch<SetStateAction<FilterDataState>>;
  groupFilters: null | GroupFilters;
}) {
  return (
    <div className="md:hidden flex gap-2 items-center fixed  h-fit z-[1010] bottom-16 left-[50%] -translate-x-[50%] rounded-full bg-blue px-5 py-2 ">
      <Sheet>
        <SheetTrigger className={cn("md:hidden ")}>
          <div className="flex gap-1 items-center text-white whitespace-nowrap">
            Sort By
            <BiSort className=" h-5 w-5" />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="pb-0  z-[1050] rounded-t-[30px]"
        >
          <SortBySheet
          
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </SheetContent>
      </Sheet>
      <Separator className="h-5 w-[1px] bg-white" />
      <Sheet>
        <SheetTrigger>
          <div className="flex gap-1 items-center text-white whitespace-nowrap">
            Filter
            <LuFilter className=" h-5 w-5" />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="pb-0 w-fit overflow-y-auto z-[1050]"
        >
          <FilterSidebar
            groupFilters={groupFilters}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
