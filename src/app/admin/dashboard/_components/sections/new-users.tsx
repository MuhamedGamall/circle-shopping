'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAdminDashboardAnalytics} from "@/lib/RTK/slices/admin/dashboard";
import React, { useEffect } from "react";

export default function Users() {
  const dispatch = useAppDispatch();
  const { analytics } = useAppSelector((state) => state.admin_dashboard);
  useEffect(() => {
    dispatch(getAdminDashboardAnalytics());
  }, [dispatch]);
  console.log(analytics);

  return <div>TopSales</div>;
}
