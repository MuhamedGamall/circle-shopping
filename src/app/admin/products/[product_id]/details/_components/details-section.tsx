"use client";
import ShowProductDetails from "@/app/admin/_components/show-product-details/details-section";
import useAdminProduct from "@/hooks/admin/use-admin-product";
import { useParams } from "next/navigation";

export default function ViewDetailsSection() {
  const { product_id } = useParams();
  const { data, loading } = useAdminProduct(product_id);

  return <ShowProductDetails product={data} loading={loading} />;
}
