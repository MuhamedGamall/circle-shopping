"use client";

import { DataTable } from "@/app/admin/_components/table";
import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUsers } from "@/lib/RTK/slices/admin/users";
import { useEffect } from "react";

export function UsersTable() {
  const dispatch = useAppDispatch();

  const { users, loading } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return <DataTable data={users} loading={loading} columns={columns} />;
}
