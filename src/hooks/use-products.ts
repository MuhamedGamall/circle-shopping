import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { useDebounce } from "react-use";

import { getAllProducts } from "@/lib/RTK/slices/products-slice";

export default function useProducts(query: string) {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.allProducts
  );
  const [debouncedValue, setDebouncedValue] = useState("");
  useDebounce(
    () => {
      setDebouncedValue(query.trim());
    },
    2000,
    [query.trim()]
  );
  useEffect(() => {
    dispatch(getAllProducts(debouncedValue));
  }, [debouncedValue, dispatch]);

  return { loading, data: products, error };
}
