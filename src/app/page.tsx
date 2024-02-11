import HeroSection from "@/components/home-hero-section";
import SliderAds from "@/components/slider-ads";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HeroSection />
      </MaxWidthWrapper>
    </main>
  );
}
