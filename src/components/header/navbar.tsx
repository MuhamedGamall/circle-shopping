import React from "react";
import Logo from "../logo";
import NavLinks from "./nav-links";
import NavSearch from "./nav-search";
import CategoriesContainer from "../middle-header/categories-container";

export default function Navbar() {
  return (
    <header className="bg-white sm:bg-main  pt-2 ">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-screen-2xl px-2.5">
        <Logo />
        <NavSearch />
        <NavLinks />
      </div>
      <CategoriesContainer />
    </header>
  );
}
