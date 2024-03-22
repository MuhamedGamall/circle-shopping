import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getAllProducts } from "@/lib/RTK/slices/products-slice";

export default function useProducts(store_id: string | string[]) {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts(store_id));
  }, [store_id, dispatch]);

  return { loading, data: products };
}
