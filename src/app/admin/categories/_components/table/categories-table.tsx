"use client";

import useAdminCategories from "@/hooks/admin/use-admin-categories";
import { columns } from "./table-columns";
import { DataTable } from "@/app/admin/_components/table";
import { useState } from "react";

export function CategoriesTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, loading } = useAdminCategories(searchQuery);
  return (
    <DataTable
      data={data}
      loading={loading}
      columns={columns}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
