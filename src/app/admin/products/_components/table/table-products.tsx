"use client";

import { useEffect, useState } from "react";

import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllProducts } from "@/lib/RTK/slices/products-slice";
import { ProductsTable } from "@/components/table/table";
import useProducts from "@/hooks/use-products";

export function DataTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, loading } = useProducts(searchQuery);

  return (
    <ProductsTable
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      data={data}
      loading={loading}
      columns={columns}
    />
  );
}
