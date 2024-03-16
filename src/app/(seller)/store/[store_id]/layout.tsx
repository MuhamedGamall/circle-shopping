import BreadCrumbs from "../_components/bread-crumbs";
import Sidebar from "../_components/sidebar";


export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full pl-[60px] md:pl-[250px]">
      <Sidebar />
      <div className="m-5 w-full">
        <BreadCrumbs />
        {children}
      </div>
    </div>
  );
}
