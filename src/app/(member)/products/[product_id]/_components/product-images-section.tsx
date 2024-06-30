// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
    <div className="flex gap-2">
      <Swiper
        cssMode={true}
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
        className="flex-1 h-[460px] relative  custom-swiper" 
      >
        {images?.length &&
          images?.map((img, i) => (
            <SwiperSlide
              key={i}
              className={cn("h-[100px] w-full  ")}
              onClick={() => handleActiveImg(i)}
            >
              <Image
                src={img}
                alt={`image-${i}`}
                width={70}
                height={100}
                className={cn(
                  "w-full h-full object-cover rounded-md cursor-pointer  hover:border-2 border-slate-500 transition-all",
                  {
                    "border-2 border-[blue]": isActive === i,
                  }
                )}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex-[3.2]">
        {images?.length && (
          <Image
            src={images?.[isActive] || ""}
            alt="product"
            width={500}
            height={500}
            className=" w-full h-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
