"use client"
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadButton() {
  return (
    <Button asChild>
      <div className="flex gap-2 cursor-pointer">
        <Upload />
      </div>
    </Button>
  );
}
