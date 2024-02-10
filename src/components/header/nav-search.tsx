import React from "react";
import { Input } from "../ui/input";

export default function NavSearch() {
  return (
    <Input
      type="text"
      placeholder="What are you looking for?"
      className="h-[38px] w-[90%] mx-auto"
    />
  );
}
