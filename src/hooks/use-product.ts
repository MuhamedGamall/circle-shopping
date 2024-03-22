import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/RTK/slices/products-slice";

export default function useProduct() {
  const dispatch = useAppDispatch();
  const { store_id, product_id } = useParams();
  const { product, loading } = useAppSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(getProduct({ store_id, product_id }));
  }, [dispatch, product_id, store_id]);

  return { loading, data: product };
}
