"use client";

import { useEffect, useState } from "react";

import { ProductsTable } from "@/components/table/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProductsSeller_admin } from "@/lib/RTK/slices/admin/sellers";
import { useDebounce } from "react-use";
import { columns } from "./table-columns";

export function DataTable({ seller_id }: { seller_id: string }) {
  const dispatch = useAppDispatch();
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { products, loading } = useAppSelector((state) => state.admin_sellers);
  const query = searchQuery ? searchQuery : "";
  useDebounce(
    () => {
      setDebouncedValue(query.trim());
    },
    2000,
    [query.trim()]
  );
  useEffect(() => {
    dispatch(
      getProductsSeller_admin({ seller_id, searchQuery: debouncedValue })
    );
  }, [debouncedValue, dispatch, seller_id]);

  return (
    <ProductsTable
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      data={products}
      loading={loading}
      columns={columns}
    />
  );
}
