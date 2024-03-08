import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";

import ImageInstructions from "./image-instructions";
import ImageItem from "./image-item";

export default function ImageForm({
  data,
  loading,
}: {
  data: Product | null;
  loading: boolean;
}) {
  const [imageValue, setImageValue] = useState<string[]>([]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images: FileList | null = e.target.files;
    if (!images) return;

    const filteredImages = Array.from(images).filter(
      (file) => file.size <= 10 * 1024 * 1024 && file.type.startsWith("image/")
    );

    if (images.length !== filteredImages.length) {
      toast.error("Some files are not images or exceed 10MB", {
        duration: 2000,
      });
      return;
    }

    const numUploadedImages = imageValue.length + filteredImages.length;

    if (numUploadedImages > 10) {
      toast.error("You can only upload up to 10 images.", { duration: 2000 });
      return;
    }

    for (const image of filteredImages) {
      const isValidImage = await checkImageDimensions(image);
      if (isValidImage) {
        readerImage(image);
      } else {
        toast.error(
          "Image dimensions should be at least 660px width and 900px height.",
          { duration: 2000 }
        );
      }
    }
  };

  const checkImageDimensions = async (image: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        resolve(img.width >= 660 && img.height >= 900);
      };
    });
  };

  const readerImage = (image: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageValue((prevImages) => [...prevImages, reader.result as string]);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="image-section p-5 border-b">
      <SectionTitle
        title="Product Images."
        className="text-[16px] sm:text-[16px] text-slate-700 my-3"
      />
      <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="mb-5">
          <span className="text-[10px] text-shade sm:text-left text-center block">
            Upload image/s
          </span>
          <div className="py-3 hide-scroll flex items-center sm:justify-start justify-center flex-wrap gap-5 w-full sm:max-h-full max-h-[480px] sm:overflow-y-visible overflow-y-auto">
            <label
              htmlFor="upload"
              className={cn(
                "flex items-center justify-center gap-3 flex-col text-[9px] cursor-pointer min-w-[140px] w-[140px] h-[230px] border-[#3866df] border rounded-md bg-[#eff3fd]",
                { "opacity-[.5] cursor-not-allowed": imageValue.length === 10 }
              )}
            >
              <FaCirclePlus className="text-[#3866df] h-5 w-5" />
              Add image/s
            </label>
            {imageValue.map((el, i) => (
              <ImageItem
                key={i}
                src={el}
                idx={i}
                setImageValue={setImageValue}
              />
            ))}
          </div>
          <Input
            onChange={onChange}
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            multiple
            disabled={imageValue.length === 10}
          />
        </div>
        <ImageInstructions />
        <Button
          className="text-[11px] my-3 h-[30px] rounded-sm"
          disabled={loading}
          variant="blue"
          size="sm"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
