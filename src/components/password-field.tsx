import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PasswordField({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const disabled = !!value;

  return (
    <Label htmlFor={id}>
      {label}
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" rounded-sm w-full py-5  border-slate-300 mt-3 "
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={toggleShow}
          disabled={!disabled}
        >
          {show ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">{show ? "Hide" : "Show"} password</span>
        </Button>
      </div>
    </Label>
  );
}
