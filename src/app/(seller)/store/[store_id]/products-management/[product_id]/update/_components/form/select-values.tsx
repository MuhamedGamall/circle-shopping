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

export function DropdownMenuSelection({
  disabled,
  setValuesSelected,
  valuesSelected,
  label,
  className,
  options,
}: {
  disabled: boolean;
  setValuesSelected: Dispatch<SetStateAction<string[]>>;
  valuesSelected: string[];
  label: string;
  options: string[];
  className?: string;
}) {
  const handleCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      setValuesSelected((curr) => [...curr, value]);
    } else {
      setValuesSelected((prevCheckedValues) =>
        prevCheckedValues.filter((val) => val !== value)
      );
    }
  };

  return (
    <DropdownMenu>
      <div className={cn("flex flex-col", className)}>
        <Label className="text-shade text-[12px] mb-2">{label}</Label>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="rounded-sm justify-start w-full flex items-center gap-3 overflow-x-auto overflow-y-hidden py-5"
          >
            {valuesSelected?.length === 0
              ? "Select " + label
              : valuesSelected?.map((el) => {
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
      <DropdownMenuContent align="start" className={"w-56"}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className={"max-h-[350px] overflow-y-auto"}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem className="capitalize"
              key={option}
              checked={valuesSelected?.includes(option)}
              onCheckedChange={(checked) =>
                handleCheckedChange(option, checked)
              }
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
