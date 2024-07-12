import Footer from "@/components/footer";
import Navbar from "@/app/(member)/_components/header/navbar";
import MoblieBar from "./_components/products-content/mobile-bar";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MoblieBar />
    </>
  );
}
