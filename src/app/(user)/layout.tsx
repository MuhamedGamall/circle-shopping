import Sidebar from "./_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 flex w-full border-t">
      <Sidebar />
      <div className="mx-8 w-full">{children}</div>
    </div>
  );
}
