"use client";

import { DataTable } from "@/app/admin/_components/table";
import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getSellers_admin } from "@/lib/RTK/slices/admin/sellers";
import { useDebounce } from "react-use";

export function SellersTable() {
  const dispatch = useAppDispatch();
  
  const { sellers, loading } = useAppSelector((state) => state.sellers);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const query = searchQuery ? searchQuery : "";
  useDebounce(
    () => {
      setDebouncedValue(query.trim());
    },
    2000,
    [query.trim()]
  );

  useEffect(() => {
    dispatch(getSellers_admin(debouncedValue.trim()));
  }, [debouncedValue, dispatch]);

  return (
    <DataTable
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      data={sellers}
      loading={loading}
      columns={columns}
    />
  );
}
