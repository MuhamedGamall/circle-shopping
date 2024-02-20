"use client";

import React from "react";

import AccountMenu from "./account-menu";

export default function NavLinks() {
  return (
    <nav className="flex gap-2 items-center mx-4">
      <AccountMenu />
    </nav>
  );
}
