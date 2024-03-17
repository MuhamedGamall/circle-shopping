import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getUser_user } from "@/lib/RTK/slices/user-slices/user-slice";
import { useSession } from "next-auth/react";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user_userData);
  const { status } = useSession();
  const loading = status === "loading";
  useEffect(() => {
    dispatch(getUser_user());
  }, [dispatch]);

  return { loading, data: profile };
}
