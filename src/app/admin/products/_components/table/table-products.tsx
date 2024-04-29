"use client";

import { useState } from "react";

import { ProductsTable } from "@/components/table/table";
import useAdminProducts from "@/hooks/admin/use-admin-products";
import { columns } from "./table-columns";

export function DataTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, loading } = useAdminProducts(searchQuery);

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
