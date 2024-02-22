"use client";
import Icons from "@/components/icons";
import React from "react";
import NavLinks from "./nav-links";
import useStore from "@/hooks/use-store";
import { useParams } from "next/navigation";
import { truncateText } from "@/utils/truncate-text";

export default function Navbar() {
  const { store_id } = useParams();

  const { data, loading } = useStore(store_id);
  const name = data?.display_name;
  return (
    <header className="bg-white  border-b  fixed top-0 z-[50] w-full left-0">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] py-2.5 px-3">
        <div className="flex items-center gap-10">
          <Icons.storeLogo />
          <div className="cursor-default rounded-md border py-1 pl-2 pr-8 leading-[inherit] flex items-center gap-2">
            <span className="h-[35px] px-2.5 text-sky-700 flex items-center font-bold rounded-md bg-slate-100 ">
              {name?.slice(0, 1)}
            </span>
            <span className="font-semibold text-sm block">
              {truncateText(name || "", 10)}
            </span>
          </div>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
