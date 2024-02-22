import Navbar from "./_components/navbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <div className="mt-[77px]">{children}</div>
    </div>
  );
}
