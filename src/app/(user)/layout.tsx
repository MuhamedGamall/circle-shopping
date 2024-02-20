import Footer from "@/components/footer";
import MoblieBar from "@/components/mobile-bar";
import Navbar from "./_components/navbar";

export default function RootLayout({
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
