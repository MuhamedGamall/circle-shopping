"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct } from "@/lib/RTK/slices/products-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductDetailsHeader() {
  const { store_id, product_id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct({ store_id, product_id }));
  }, [dispatch, product_id, store_id]);

  return <div>ProductDetalsHeader</div>;
}
