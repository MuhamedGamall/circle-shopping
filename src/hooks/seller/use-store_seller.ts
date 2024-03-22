import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getStore_seller } from "@/lib/RTK/slices/seller/store-slice";

export default function useStoreSeller() {
  const dispatch = useAppDispatch();

  const { store, loading } = useAppSelector((state) => state.seller_store);

  useEffect(() => {
    dispatch(getStore_seller());
  }, [dispatch]);

  return { loading, data: store };
}
