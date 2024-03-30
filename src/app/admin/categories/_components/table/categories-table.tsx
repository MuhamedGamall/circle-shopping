"use client";

import useCategories from "@/hooks/use-categories";
import { columns } from "./table-columns";
import { DataTable } from "@/app/admin/_components/table";

export function CategoriesTable() {
  const { data, loading } = useCategories();
  return <DataTable data={data} loading={loading} columns={columns} />;
}
