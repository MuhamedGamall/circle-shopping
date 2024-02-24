import Sidebar from "./_components/sidebar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full pl-[60px] md:pl-[300px]">
      <Sidebar />
      <div className="m-5 w-full">{children}</div>
    </div>
  );
}
