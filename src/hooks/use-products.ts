import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProducts_seller } from "@/lib/RTK/slices/seller-slices/products-slice";

export default function useProducts(store_id: string | string[]) {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state) => state.seller_products
  );

  useEffect(() => {
    dispatch(getProducts_seller(store_id));
  }, [store_id, dispatch]);

  return { loading, data: products };
}
