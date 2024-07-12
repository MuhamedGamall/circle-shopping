import AddToCart from "@/app/(member)/_components/products-content/add-to-cart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
export default function ButtonsActions({
  sizes,
  max_purchase_quantity,
  quantity_in_stock,
}: {
  sizes: string[];
  max_purchase_quantity: number;
  quantity_in_stock: number;
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("1");

  const quantityArray = Array.from(
    { length: max_purchase_quantity },
    (_, i) => i + 1
  );

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div
        className={cn("text-[#00763f] text-[16px] font-semibold", {
          "text-red-600": !quantity_in_stock,
        })}
      >
        {quantity_in_stock ? "In Stock" : "Out of Stock"}
      </div>

      <div className="w-full flex items-center gap-2">
        {sizes?.length && (
          <div className="flex flex-col w-full">
            <div className="mb-1 text-gray-400 text-[12px]">Size</div>
            <Select
              defaultValue={selectedSize}
              onValueChange={(value) => setSelectedSize(value)}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent className="max-h-[350px] overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Size</SelectLabel>
                  {sizes?.map((el: string, i: number) => (
                    <SelectItem key={i} value={el} className="capitalize">
                      {el}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex flex-col w-full">
          <div className="mb-1 text-gray-400 text-[12px]">Quantity</div>
          <Select
            defaultValue={selectedQuantity}
            onValueChange={(value) => setSelectedQuantity(value)}
          >
            <SelectTrigger className="capitalize">
              <SelectValue placeholder="Select QTY" />
            </SelectTrigger>
            <SelectContent className="max-h-[350px] overflow-y-auto">
              <SelectGroup>
                <SelectLabel>Quantity</SelectLabel>
                {quantityArray?.map((el: number, i: number) => (
                  <SelectItem
                    key={i}
                    value={el.toString()}
                    className="capitalize"
                  >
                    {el}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AddToCart>
        <div className="flex justify-center ">
          <button className="w-full whitespace-nowrap bg-yellow-300 p-2 hover:brightness-[.9] rounded-sm font-bold text-slate-700 border-yellow-500 mx-auto transition-all">
            ADD TO CART
          </button>
        </div>
      </AddToCart>
      <div className="flex gap-2 items-center w-full">
        <button className="w-fit text-[13px] border whitespace-nowrap p-2 hover:backdrop-brightness-[0.9] rounded-sm font-bold text-slate-700 mx-auto transition-all">
          <GoHeartFill className="h-5 w-5" />
        </button>
        <div className="flex justify-center  w-full">
          <button className="w-full whitespace-nowrap border p-2 hover:brightness-[.8] bg-blue text-white rounded-sm font-bold mx-auto transition-all">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
