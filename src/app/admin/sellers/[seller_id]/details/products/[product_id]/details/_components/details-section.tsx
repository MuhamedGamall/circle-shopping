"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import ShowProductDetails from "@/app/admin/_components/show-product-details/details-section";
import { getProductSeller_admin } from "@/lib/RTK/slices/admin/sellers";

export default function ViewDetailsSection() {
  const dispatch = useAppDispatch();
  const { product_id, seller_id } = useParams();
  const { product, loading } = useAppSelector((state) => state.sellers);
  useEffect(() => {
    dispatch(getProductSeller_admin({ product_id, seller_id }));
  }, [dispatch, product_id, seller_id]);

  return <ShowProductDetails product={product} loading={loading} />;
}
