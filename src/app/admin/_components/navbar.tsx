"use client";
import Icons from "@/components/icons";
import React from "react";
import NavLinks from "./nav-links";
import ExitButton from "@/components/exit-button";

export default function Navbar() {
  return (
    <header className="bg-white  shadow-section fixed top-0 z-[50] w-full left-0">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] py-2.5 px-3">
        <Icons.adminLogo />
        <div className="flex gap-2 items-end ">
          <ExitButton />
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
