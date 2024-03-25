import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getProducts_seller } from "@/lib/RTK/slices/seller/products";
import { useParams } from "next/navigation";

export default function useProductsSeller() {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const { products, loading } = useAppSelector(
    (state) => state.seller_products
  );

  useEffect(() => {
    dispatch(getProducts_seller(store_id));
  }, [store_id, dispatch]);

  return { loading, data: products };
}
