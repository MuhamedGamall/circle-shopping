"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAdminDashboardAnalytics } from "@/lib/RTK/slices/admin/dashboard";
import React, { useEffect } from "react";
import TotalSales from "./total-sales";
import TotalUsers from "./total-users";
import TotalAdmins from "./total-admin";
import SalesCount from "./sales-count";
import TopSalesByCountry from "./top-sales-by-country";

export default function Sections() {
  const dispatch = useAppDispatch();
  const { analytics } = useAppSelector((state) => state.admin_dashboard);
  useEffect(() => {
    dispatch(getAdminDashboardAnalytics());
  }, [dispatch]);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
          <TotalSales data={analytics?.total_sales || 400} />
          <SalesCount data={analytics?.sales_count || 16000} />
          <TotalUsers data={analytics?.users_length || 0} />
          <TotalAdmins data={analytics?.admin_length || 0} />
        </div>

        <TopSalesByCountry data={analytics?.top_selling_by_country || []} />
      </div>
    </div>
  );
}
