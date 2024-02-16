'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getUser } from "@/lib/RTK/slices/user-slice";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return { loading, data: profile };
}
