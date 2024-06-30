"use client";

import Icons from "@/components/icons";
import Loader from "@/components/loader";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUser_admin } from "@/lib/RTK/slices/admin/users";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useEffect } from "react";

export default function DetialsSection({ user_id }: { user_id: string }) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.admin_users);

  useEffect(() => {
    dispatch(getUser_admin(user_id));
  }, [dispatch, user_id]);
  const firstName = user?.name?.split(" ")?.[0] || "";
  const lastName = user?.name?.split(" ")?.slice(1).join(" ") || "";

  return (
    <div className="flex flex-col gap-4 mt-10">
      {loading && <Loader />}
      <Label className="flex flex-col gap-2 text-slate-700">
        Image
        {user?.image ? (
          <Image
            src={user?.image}
            width={96}
            height={96}
            alt="account image"
            className=""
          />
        ) : (
          <div className="w-[96px] h-[96px] bg-[#f7f6fb] flex items-center justify-center text-sm">
            <div className="opacity-[.7]">
              <Icons.logo h="20" w="20" />
            </div>
          </div>
        )}
      </Label>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Is Banned</Label>
          <div className=" text-shade border rounded-sm text-sm ">
            {user?.ban?.is_banned ? (
              <>
                <span className=" text-red-500 p-1 font-semibold block">
                  Banned
                </span>
                <span className="flex items-center gap-1 bg-slate-100/70 p-2 text-shade whitespace-nowrap overflow-x-auto">
                  reason:
                  <span className="text-[11px] text-black">
                    {user?.ban?.reason}
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
          <Label className={"text-slate-700 "}>Is Admin</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto font-semibold">
            {user?.admin ? (
              <span className="text-green-500">Admin</span>
            ) : (
              <span className="text-slate-500">Not Admin</span>
            )}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Email</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.email || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>First Name</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {firstName || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2">
          <Label className={"text-slate-700 "}>Last Name</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {lastName || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Phone Number</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.phone || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>City</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.city || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Country</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.country || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Street Address</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.street_address || "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Created At</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.createdAt
              ? formatDate(user.createdAt, "dd/MM/yyyy HH:mm:ss")
              : "--"}
          </div>
        </div>
        <div className=" flex flex-col gap-3 w-full mt-2  ">
          <Label className={"text-slate-700 "}>Updated At</Label>
          <div className=" text-shade border rounded-sm py-2.5 px-2 text-sm overflow-x-auto">
            {user?.createdAt
              ? formatDate(user.createdAt, "dd/MM/yyyy HH:mm:ss")
              : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
