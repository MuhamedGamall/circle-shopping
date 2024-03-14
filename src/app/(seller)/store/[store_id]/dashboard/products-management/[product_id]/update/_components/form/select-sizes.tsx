import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export function SizesDropdownMenu({
  disabled,
  setSelectSizes,
  selectSizes,
}: {
  disabled: boolean;
  setSelectSizes: Dispatch<SetStateAction<string[]>>;
  selectSizes: string[];
}) {
  
  const handleCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectSizes((curr) => [...curr, value]);
    } else {
      setSelectSizes((prevCheckedValues) =>
        prevCheckedValues.filter((val) => val !== value)
      );
    }
  };
  
  return (
    <DropdownMenu>
      <div className="flex flex-col">
        <Label className="text-shade text-[12px] mb-2">Sizes</Label>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="rounded-sm justify-start w-full flex items-center gap-3 overflow-x-auto overflow-y-hidden py-5"
          >
            {selectSizes?.length === 0
              ? "Select Sizes"
              : selectSizes?.map((el) => {
                  return (
                    <span
                      key={el}
                      className="border border-sky-700 bg-sky-700/20 p-1 rounded-sm text-sm text-sky-700 "
                    >
                      {el}
                    </span>
                  );
                })}
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className={cn("w-56 ")}>
        <DropdownMenuLabel>Sizes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {[
          "Small",
          "Medium",
          "Large",
          "Extra Large",
          "XXL",
          "XXXL",
          "XXXXL",
          "XXXXXL",
        ].map((size) => (
          <DropdownMenuCheckboxItem
            key={size}
            checked={selectSizes?.includes(size)}
            onCheckedChange={(checked) => handleCheckedChange(size, checked)}
          >
            {size}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
