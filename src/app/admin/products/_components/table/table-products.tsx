"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/app/admin/actions/get-products";
import { ProductsTable } from "@/components/table/table-products";
import { Product } from "@/types";
import { columns } from "./table-columns";

export function DataTable() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return <ProductsTable  data={products} loading={loading} columns={columns}  />;
}
