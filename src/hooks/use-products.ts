import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProducts } from "@/lib/RTK/slices/products-slice";
import useStore from "./use-store";

export default function useProducts() {
  const dispatch = useAppDispatch();
  const { data } = useStore();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts(data?._id));
  }, [data?._id, dispatch]);

  return { loading, data: products };
}
