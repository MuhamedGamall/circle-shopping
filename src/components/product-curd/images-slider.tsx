import { BiCartAdd } from "react-icons/bi";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { formatNumber } from "@/utils/format";
import { SliderBalls } from "./handle-balls";
import Link from "next/link";

export function ImagesSlieder({
  images,
  likes,
  is_best_seller,
}: {
  images: string[];
  likes: number;
  is_best_seller: boolean;
}) {
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
        <Link href={""} >
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
        <Button
          onClick={() => console.log(150)}
          className="h-7 w-7   bg-white hover:bg-slate-100 rounded-md shadow-md absolute bottom-4 right-4 text-secondMain p-1"
        >
          <BiCartAdd className=" h-7 w-7" />
        </Button>
        <Button className="h-7 w-7  bg-white hover:bg-slate-100  rounded-md  shadow-md absolute top-4 right-4 text-secondMain p-1">
          <Heart className=" h-7 w-7" />
        </Button>
        {is_best_seller && (
          <span className=" bg-slate-700  rounded-[30px] absolute top-4 left-2 text-white pt-0 px-3">
            Best Seller
          </span>
        )}
        <span className="flex items-center gap-1 bg-white text-[16px] border rounded-[30px]  absolute bottom-4 left-2 text-secondMain px-2">
          <AiOutlineLike className="text-[#0084fd] h-4 w-4" />
          <span className="text-gray-500 text-[13px]">
            ({formatNumber(likes)})
          </span>
        </span>
      </div>
      <SliderBalls imagesLength={imagesLength} imageIndex={imageIndex} />
    </>
  );
}
