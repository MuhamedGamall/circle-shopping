"use client";

import { useEffect } from "react";

import { columns } from "./table-columns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllProducts } from "@/lib/RTK/slices/products-slice";
import { ProductsTable } from "@/components/table/table";

export function DataTable() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return <ProductsTable data={products} loading={loading} columns={columns} />;
}
