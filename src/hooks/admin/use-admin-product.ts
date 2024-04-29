import { getProduct_admin } from "@/lib/RTK/slices/admin/products-slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";

export default function useAdminProduct(product_id: string | string[]) {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(
    (state) => state.admin_products
  );
  useEffect(() => {
    dispatch(getProduct_admin(product_id));
  }, [dispatch, product_id]);

  return { loading, data: product, error };
}
