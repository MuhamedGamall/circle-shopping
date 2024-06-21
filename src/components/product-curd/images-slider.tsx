import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { SliderBalls } from "./handle-balls";

export function ImagesSlider({ images }: { images: string[] }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const imagesLength = images?.length;

  useEffect(() => {
    let interval: any;
    if (hovered)
      interval = setInterval(
        () =>
          setImageIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1)),
        1000
      );
    else {
      clearInterval(interval);
      setImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, imagesLength]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setImageIndex(0);
  };
  return (
    <>
      <div className=" bg-slate-100 relative border">
        <Link href={""}>
          <Image
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            width={400}
            height={400}
            src={images?.[imageIndex]}
            alt="product image"
            loading="lazy"
            className=" h-[208px] lg:h-[284px] object-cover "
          />
        </Link>
      </div>
      <SliderBalls imagesLength={imagesLength} imageIndex={imageIndex} />
    </>
  );
}
