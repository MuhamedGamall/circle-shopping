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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useEffect, useState } from "react";

export default function CustomSelectField({
  form,
  name,
  disabled,
  label,
  className,
  labelClassName,
  selectData,
  selectLabel,
}: {
  form: any;
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string | any;
  labelClassName?: string | any;
  selectLabel?: string;
  selectData: string[];
}) {
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full rounded-sm", className)}>
          <FormLabel className={cn(labelClassName)}>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className=" ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{selectLabel}</SelectLabel>
                  {selectData.map((el, i) => (
                    <SelectItem key={i} value={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-red-700  text-[11px] whitespace-nowrap" />
        </FormItem>
      )}
    />
  );
}
