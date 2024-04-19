import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getProducts_seller } from "@/lib/RTK/slices/seller/products";
import { useParams } from "next/navigation";
import { useDebounce } from "react-use";

export default function useProductsSeller(searchQuery:string) {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();
  const [debouncedValue, setDebouncedValue] = useState("");
  const { products, loading, error } = useAppSelector(
    (state) => state.seller_products
  );

  const query = searchQuery ? searchQuery : "";
  useDebounce(
    () => {
      setDebouncedValue(query.trim());
    },
    2000,
    [query.trim()]
  );

  useEffect(() => {
    dispatch(getProducts_seller({store_id,searchQuery:debouncedValue}));
  }, [store_id, dispatch, debouncedValue]);

  return { loading, data: products, error };
}
