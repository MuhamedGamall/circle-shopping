import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getStore } from "@/lib/RTK/slices/store-slice";

export default function useStore(id:string|string[]) {
  const dispatch = useAppDispatch();
  const { store, loading } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStore(id));
  }, [dispatch,id]);

  return { loading, data: store };
}
