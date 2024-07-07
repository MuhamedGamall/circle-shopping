import Icons from "../icons";
import NavLinks from "./nav-links";
import SearchBar from "./search-bar";

export default function Navbar() {
  return (
    <header className="bg-white sm:bg-main sm:border-none border-b  ">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] h-[65px] px-2.5">
        <Icons.mainLogo />
        <SearchBar />
        <NavLinks />
      </div>
    </header>
  );
}
