// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import {
  Navigation,
  Mousewheel,
  Keyboard,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function ProductImagesSection({
  images,
}: {
  images: string[] | undefined;
}) {
  const [isActive, setActive] = useState(0);
  const handleActiveImg = (i: number) => {
    setActive(i);
  };
  return (
    <>
      <div className="md:flex hidden gap-2 ">
        <Swiper
          navigation={{
            enabled: true,
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          scrollbar={{ draggable: true }}
          className="lg:h-[460px] h-[380px]   lg:min-w-[77px] min-w-[67px] custom-swiper"
        >
          {images?.length &&
            images?.map((img, i) => (
              <SwiperSlide
                key={i}
                className={cn(" ")}
                onClick={() => handleActiveImg(i)}
              >
                <Image
                  src={img}
                  alt={`image-${i}`}
                  width={70}
                  height={100}
                  className={cn(
                    "w-full h-full object-cover rounded-sm cursor-pointer  hover:border-2 border-slate-500 transition-all",
                    {
                      "border-2 border-[blue]": isActive === i,
                    }
                  )}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="w-full">
          {images?.length && (
            <Image
              src={images?.[isActive] || ""}
              alt="product"
              width={500}
              height={500}
              className="  object-contain "
            />
          )}
        </div>
      </div>

      <Swiper
        pagination={{
          enabled: true,
        }}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        scrollbar={{ draggable: true }}
        className=" custom-pagination-swiper  flex-[0_0_40%] h-fit"
        
      >
        {images?.length &&
          images?.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`image-${i}`}
                width={1000}
                height={1000}
                className={cn("w-full h-full object-contain")}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
