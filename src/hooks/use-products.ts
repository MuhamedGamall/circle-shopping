import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getAllProducts } from "@/lib/RTK/slices/products-slice";

export default function useProducts() {
  const dispatch = useAppDispatch();
  const { products, loading , error } = useAppSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return { loading, data: products , error };
}
