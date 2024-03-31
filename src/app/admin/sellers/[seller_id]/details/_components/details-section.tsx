"use client";

import LoaderLayout from "@/components/loader-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getProductsSeller_admin,
  getSeller_admin,
} from "@/lib/RTK/slices/admin/sellers";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";

export default function DetialsSection({ seller_id }: { seller_id: string }) {
  const dispatch = useAppDispatch();
  const { seller, loading } = useAppSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(getSeller_admin(seller_id));
  }, [dispatch, seller_id]);

  return (
    <div className="flex flex-col gap-4 mt-10">
      <LoaderLayout loadingCondition={loading} />
      <Link
        href={"/admin/sellers/"+seller_id+'/details/products'}
        className={buttonVariants({
          variant: "blue",
          className: "w-fit ml-auto",
        })}
      >
        Seller Products
      </Link>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Is Banned</Label>
          <div className=" text-shade border rounded-sm text-sm ">
            {seller?.ban?.is_banned ? (
              <>
                <span className=" text-red-500 p-1 font-semibold block">
                  Banned
                </span>
                <span className="flex items-center gap-1 bg-slate-100/70 p-2 text-shade whitespace-nowrap overflow-x-auto">
                  reason:
                  <span className="text-[11px] text-black">
                    {seller?.ban?.reason}
                  </span>
                </span>
              </>
            ) : (
              <div className="text-slate-500 py-2.5 px-2 font-semibold">
                Not Banned
              </div>
            )}
          </div>
        </div>

        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Display Name</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.display_name}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Personal Email</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.personal_email}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Business Email</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.business_email}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Finance Email</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.finance_email}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Store Phone Number</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.store_phone_number}
          </div>
        </div>

        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Created At</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.createdAt &&
              formatDate(seller.createdAt, "dd/MM/yyyy HH:mm:ss")}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Updated At</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {seller?.createdAt &&
              formatDate(seller.createdAt, "dd/MM/yyyy HH:mm:ss")}
          </div>
        </div>
      </div>
    </div>
  );
}
