import NavLinks from "@/components/header/nav-links";
import NavSearch from "@/components/header/nav-search";
import Icons from "@/components/icons";

export default function Navbar() {
  return (
    <header className="bg-white sm:bg-main sm:border-none border-b  ">
      <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] p-2.5">
        <Icons.mainLogo />
        <NavSearch />
        <NavLinks />
      </div>
    </header>
  );
}
