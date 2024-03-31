"use client";

import { DataTable } from "@/app/admin/_components/table";
import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getSellers_admin } from "@/lib/RTK/slices/admin/sellers";

export function SellersTable() {
  const dispatch = useAppDispatch();

  const { sellers, loading } = useAppSelector((state) => state.sellers);
  useEffect(() => {
    dispatch(getSellers_admin());
  }, [dispatch]);

  return <DataTable data={sellers} loading={loading} columns={columns} />;
}
