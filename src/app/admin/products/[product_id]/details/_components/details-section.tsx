"use client";
import ShowProductDetails from "@/app/admin/_components/show-product-details/details-section";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct } from "@/lib/RTK/slices/products-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ViewDetailsSection() {
  const dispatch = useAppDispatch();
  const { product_id } = useParams();
  const { product, loading } = useAppSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(getProduct(product_id));
  }, [dispatch, product_id]);

  return <ShowProductDetails product={product} loading={loading} />;
}
