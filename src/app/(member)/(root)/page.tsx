import HeroSection from "@/components/home-hero-section";
import SliderAds from "@/components/ads-slider/slider-ads";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import ProductsContainer from "@/components/products-slider/products-container";
import ShowCategories from "@/components/show-categories/categories-container";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import MoblieBar from "@/components/mobile-bar";
import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
const images = [
  {
    image: "/ads-photos/ELECTRONICS.avif",
    href: "/",
  },
  {
    image: "/ads-photos/gym.avif",
    href: "/",
  },
  {
    image: "/ads-photos/tv.avif",
    href: "/",
  },
];
export default function Home() {
  return (
    <main>
      <CategoriesNavigation />
      <MaxWidthWrapper>
        <HeroSection />
        <section>
          {/* <ProductsContainer /> */}
          <SliderAds
            images={images}
            className="w-full h-full sm:h-[200px] object-cover sm:aspect-auto aspect-[12/4]"
          />
          <ShowCategories />
        </section>
      </MaxWidthWrapper>
      <MoblieBar />
    </main>
  );
}
