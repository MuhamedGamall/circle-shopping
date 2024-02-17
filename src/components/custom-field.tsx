
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
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
              className={className}
            />
          </FormControl>
          <FormMessage className="text-red-700" />
        </FormItem>
      )}
    />
  );
}
