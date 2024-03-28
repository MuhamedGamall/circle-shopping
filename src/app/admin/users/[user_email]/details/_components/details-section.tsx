"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUser } from "@/lib/RTK/slices/admin/users";
import { useEffect } from "react";

export default function DetialsSection({
  userEmail,
}: {
  userEmail: string 
}) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser(userEmail));
  }, [dispatch, userEmail]);

  return <div>DetialsSection</div>;
}
