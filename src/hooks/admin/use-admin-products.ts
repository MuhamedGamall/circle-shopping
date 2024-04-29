import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { useDebounce } from "react-use";
import { getProducts_admin } from "@/lib/RTK/slices/admin/products-slice";


export default function useAdminProducts(query: string) {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.admin_products
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
    dispatch(getProducts_admin(debouncedValue));
  }, [debouncedValue, dispatch]);

  return { loading, data: products, error };
}
