"use client";

import { DataTable } from "@/app/admin/_components/table";
import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUsers_admin } from "@/lib/RTK/slices/admin/users";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export function UsersTable() {
  const dispatch = useAppDispatch();

  const { users, loading } = useAppSelector((state) => state.admin_users);
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
    dispatch(getUsers_admin(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <DataTable
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      data={users}
      loading={loading}
      columns={columns}
    />
  );
}
