import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

export default function CustomTextarea({
  form,
  name,
  disabled,
  label,
  required,
  className,
  labelClassName,
  placeholder,
  minLength,
  maxLength,
}: {
  form: any;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string | any;
  labelClassName?: string | any;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn('capitalize',labelClassName)}>{label}</FormLabel>
          <FormControl>
            <Textarea
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              minLength={minLength}
              required={required}
              {...field}
              className={cn("rounded-sm py-5", className)}
            />
          </FormControl>
          <FormMessage className="text-red-700" />
        </FormItem>
      )}
    />
  );
}
