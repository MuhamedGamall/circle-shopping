"use client";

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
import { useEffect, useState } from "react";

export function SizesDropdownMenu({ form }: any) {
  const [checkedValues, setCheckedValues] = useState<string[]>(
    form.getValues("sizes") || []
  );

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedValues((prevCheckedValues) => [...prevCheckedValues, value]);
    } else {
      setCheckedValues((prevCheckedValues) =>
        prevCheckedValues.filter((val) => val !== value)
      );
    }
  };

  useEffect(() => {
    checkedValues.length === 0 ? setErrorMessage(true) : setErrorMessage(false);
    form.setValue("sizes", checkedValues);
  }, [checkedValues, form]);

  return (
    <DropdownMenu>
      <div className="flex flex-col">
        <Label className="text-shade text-[12px] mb-2">Sizes *</Label>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-sm justify-start w-full flex items-center gap-3 overflow-x-auto overflow-y-hidden py-5"
          >
            {checkedValues.length === 0
              ? "Select Sizes"
              : checkedValues.map((el) => {
                  return (
                    <span
                      key={el}
                      className="border border-sky-700  bg-sky-700/20 p-1 rounded-sm text-sm text-sky-700 "
                    >
                      {el}
                    </span>
                  );
                })}
          </Button>
        </DropdownMenuTrigger>
        {errorMessage ? (
          <span className="text-red-700 text-[11px] my-2 font-semibold">
            At least one size must be added.
          </span>
        ) : (
          ""
        )}
      </div>
      <DropdownMenuContent className={cn("w-56 ")}>
        <DropdownMenuLabel>Sizes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("Small")}
          onCheckedChange={(checked) => handleCheckedChange("Small", checked)}
        >
          Small
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("Medium")}
          onCheckedChange={(checked) => handleCheckedChange("Medium", checked)}
        >
          Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("Large")}
          onCheckedChange={(checked) => handleCheckedChange("Large", checked)}
        >
          Large
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("Extra Large")}
          onCheckedChange={(checked) =>
            handleCheckedChange("Extra Large", checked)
          }
        >
          Extra Large
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("XXL")}
          onCheckedChange={(checked) => handleCheckedChange("XXL", checked)}
        >
          XXL
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("XXXL")}
          onCheckedChange={(checked) => handleCheckedChange("XXXL", checked)}
        >
          XXXL
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("XXXXL")}
          onCheckedChange={(checked) => handleCheckedChange("XXXXL", checked)}
        >
          XXXXL
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checkedValues.includes("XXXXXL")}
          onCheckedChange={(checked) => handleCheckedChange("XXXXXL", checked)}
        >
          XXXXXL
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
