
export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">

      <div className="mt-[77px]">{children}</div>
    </div>
  );
}