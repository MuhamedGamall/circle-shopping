"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAdminDashboardAnalytics } from "@/lib/RTK/slices/admin/dashboard";
import React, { useEffect } from "react";
import TotalSales from "./total-sales";
import TotalUsers from "./total-users";
import TotalAdmins from "./total-admin";
import SalesCount from "./sales-count";
import TopSalesByCountry from "./top-sales-by-country";
import TopSalesByCategory from "./top-sales-by-category";
import TopSales from "./top-sales";
import TopUsers from "./top-users";
import TopSellers from "./top-sellers";
import LoaderLayout from "@/components/loader-layout";

export default function Sections() {
  const dispatch = useAppDispatch();
  const { analytics, loading } = useAppSelector(
    (state) => state.admin_dashboard
  );
  useEffect(() => {
    dispatch(getAdminDashboardAnalytics(null));
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-5">
      <LoaderLayout loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <TotalSales data={analytics?.total_sales || 0} />
        <SalesCount data={analytics?.sales_count || 0} />
        <TotalUsers data={analytics?.users_length || 0} />
        <TotalAdmins data={analytics?.admin_length || 0} />
      </div>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <TopSalesByCountry data={analytics?.top_selling_by_country || []} />
        <TopSalesByCategory data={analytics?.top_selling_by_categories} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        <TopSales data={analytics?.top_sales} />
        <TopUsers data={analytics?.top_users} />
        <TopSellers data={analytics?.top_sellers} />
      </div>
    </div>
  );
}
