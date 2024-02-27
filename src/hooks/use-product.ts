import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProduct } from "@/lib/RTK/slices/products-slice";
import { useParams } from "next/navigation";

export default function useProduct() {
  const dispatch = useAppDispatch();
  const {store_id,product_id}=useParams()
  const { product ,loading} = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct({store_id,product_id}));
  }, [ dispatch, product_id, store_id]);

  return { loading, data: product };
}
