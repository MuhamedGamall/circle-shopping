"use client";

import { buttonVariants } from "@/components/ui/button";
import useProducts from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { columns } from "./table-columns";
import { ProductsTable } from "@/components/table/table";

export function DataTable() {
  const { store_id } = useParams();
  const { data, loading } = useProducts(store_id);
  return (
    <div>
      <Link
        href={"/store/" + store_id + "/products-management/create"}
        className={cn(
          buttonVariants({
            variant: "blue",
            className: "rounded-sm my-4 gap-2  float-right text-[12px] px-7",
          })
        )}
      >
        <FaPlus /> Add New
      </Link>
      <ProductsTable
        data={data}
        loading={loading}
        columns={columns}
      />
    </div>
  );
}
