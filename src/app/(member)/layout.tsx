import Footer from "@/components/footer";
import Navbar from "@/components/header/navbar";
import MoblieBar from "@/components/mobile-bar";

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
