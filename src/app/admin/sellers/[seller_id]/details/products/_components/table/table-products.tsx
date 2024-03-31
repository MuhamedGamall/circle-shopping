"use client";

import { useEffect } from "react";

import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ProductsTable } from "@/components/table/table";
import { getProductsSeller_admin } from "@/lib/RTK/slices/admin/sellers";

export function DataTable({ seller_id }: { seller_id: string }) {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.sellers);
  useEffect(() => {
    dispatch(getProductsSeller_admin(seller_id));
  }, [dispatch, seller_id]);

  return <ProductsTable data={products} loading={loading} columns={columns} />;
}
