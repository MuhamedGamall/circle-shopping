import React from "react";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import Link from "next/link";
import { CategoriesTable } from "./_components/table/categories-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";

export default function CategoriesPage() {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full  ">
        <section className="p-5 shadow-section w-full ">
          <SectionTitle title="Categories" className="mb-5" />
          <Link
            href={"/admin/categories/create"}
            className={cn(
              buttonVariants({
                variant: "blue",
                className:
                  "rounded-sm my-4 gap-2  float-right text-[12px] px-7",
              })
            )}
          >
            <FaPlus />
            Add new
          </Link>
          <CategoriesTable />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
