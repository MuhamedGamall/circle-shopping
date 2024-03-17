"use client";

import { useEffect } from "react";

import { ProductsTable } from "@/components/table/table-products";
import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts_admin } from "@/lib/RTK/slices/admin-slices/products-slice";

export function DataTable() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.admin_products);
  useEffect(() => {
    dispatch(getProducts_admin());
  }, [dispatch]);

  return <ProductsTable data={products} loading={loading} columns={columns} />;
}
