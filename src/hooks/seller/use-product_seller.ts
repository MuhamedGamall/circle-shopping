import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getProduct_seller } from "@/lib/RTK/slices/seller/products-slice";
import { useParams } from "next/navigation";

export default function useProductSeller() {
  const dispatch = useAppDispatch();
  const { store_id, product_id } = useParams();
  const { product, loading } = useAppSelector((state) => state.seller_products);
  useEffect(() => {
    dispatch(getProduct_seller({ store_id, product_id }));
  }, [dispatch, product_id, store_id]);

  return { loading, data: product };
}
