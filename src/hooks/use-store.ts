import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getStore } from "@/lib/RTK/slices/store-slice";
import { useParams } from "next/navigation";

export default function useStore() {
  const dispatch = useAppDispatch();

  const { store, loading } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStore());
  }, [dispatch]);

  return { loading, data: store };
}
