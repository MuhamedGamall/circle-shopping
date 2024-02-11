import HeroSection from "@/components/home-hero-section";
import SliderAds from "@/components/ads-slider/slider-ads";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import Image from "next/image";
import Link from "next/link";
import ProductsContainer from "@/components/recommended-products/products-container";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HeroSection />
        <ProductsContainer />
      </MaxWidthWrapper>
    </main>
  );
}
