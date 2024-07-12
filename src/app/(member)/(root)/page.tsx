import SliderAds from "@/components/ads-slider/slider-ads";
import HeroSection from "@/components/home-hero-section";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import CategoriesNavigation from "@/components/navigation-menu/categories-navigation";
import ShowCategories from "@/components/show-categories/categories-container";
import MoblieBar from "../_components/products-content/mobile-bar";
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
