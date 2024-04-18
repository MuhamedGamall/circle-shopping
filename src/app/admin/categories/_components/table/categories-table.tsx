"use client";

import useCategories from "@/hooks/use-categories";
import { columns } from "./table-columns";
import { DataTable } from "@/app/admin/_components/table";
import { useState } from "react";

export function CategoriesTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, loading } = useCategories(searchQuery);
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
