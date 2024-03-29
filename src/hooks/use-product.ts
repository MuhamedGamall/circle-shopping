import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/RTK/slices/products-slice";

export default function useProduct() {
  const dispatch = useAppDispatch();
  const { product_id } = useParams();
  const { product, loading, error  } = useAppSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(getProduct(product_id));
  }, [dispatch, product_id]);

  return { loading, data: product, error  };
}
