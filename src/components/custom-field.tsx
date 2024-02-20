import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomField({
  form,
  name,
  disabled,
  label,
  type,
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
  type: string;
  required?: boolean;
  className?: string | any;
  labelClassName?: string | any;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return type === "password" ? (
    <div className="relative">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={labelClassName}>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  disabled={disabled}
                  placeholder={placeholder}
                  type={show ? "text" : "password"}
                  maxLength={maxLength}
                  minLength={minLength}
                  required={required}
                  {...field}
                  className={cn("rounded-sm py-5", className)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleShow}
                >
                  {show ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {show ? "Hide" : "Show"} password
                  </span>
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
    </div>
  ) : (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              type={type}
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
