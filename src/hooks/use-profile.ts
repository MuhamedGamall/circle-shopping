import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getUser } from "@/lib/RTK/slices/user-slice";
import { useSession } from "next-auth/react";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.userData);
  const {status}=useSession()
  const loading = status==='loading'
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return { loading, data: profile };
}
