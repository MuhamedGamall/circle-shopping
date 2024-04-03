"use client";
import Icons from "@/components/icons";
import React from "react";
import NavLinks from "./nav-links";
import StoreButton from "./store-button";
import ExitButton from "@/components/exit-button";

export default function Navbar() {
  return (
    <header className="bg-white   shadow-section fixed top-0 z-[50] w-full left-0">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] py-2.5 px-3">
        <div className="flex items-center gap-10">
          <Icons.storeLogo />
          <StoreButton />
        </div>
        <div className="flex gap-2 items-center ">
          <ExitButton />
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
