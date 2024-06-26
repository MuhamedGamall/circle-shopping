import Sidebar from "./_components/sidebar";
import SidebarSheet from "./_components/sidebar-sheet";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-[#f2f3f8] flex w-full border-t">
        <div className="md:block hidden">
          <Sidebar />
        </div>
        <div className=" my-10 mx-8 w-full relative">
          <SidebarSheet
            className={"bg-white absolute top-[8px] right-8 px-5 py-3"}
          />
          {children}
        </div>
      </div>
    </>
  );
}
