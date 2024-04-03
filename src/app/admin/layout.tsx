import BreadCrumbs from "./_components/bread-crumbs";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <div className="mt-[77px]">
        <div className="flex w-full pl-[60px]">
          <Sidebar />
          <div className="m-5 w-full">
            <BreadCrumbs />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


