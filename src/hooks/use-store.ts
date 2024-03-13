import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getStore } from "@/lib/RTK/slices/store-slice";
import { useParams } from "next/navigation";

export default function useStore() {
  const dispatch = useAppDispatch();
const {store_id}=useParams()
  const { store, loading } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStore(store_id));
  }, [dispatch,store_id]);

  return { loading, data: store };
}
