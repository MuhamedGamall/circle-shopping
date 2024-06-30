"use client";

import { buttonVariants } from "@/components/ui/button";
import useProductsSeller from "@/hooks/seller/use-products_seller";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { columns } from "./table-columns";
import { ProductsTable } from "@/components/table/table";
import { useState } from "react";
import Loader from "@/components/loader";

export function DataTable() {
  const { store_id } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, loading } = useProductsSeller(searchQuery);

  return (
    <div>
      {loading && <Loader />}
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        data={data}
        loading={loading}
        columns={columns}
      />
    </div>
  );
}
