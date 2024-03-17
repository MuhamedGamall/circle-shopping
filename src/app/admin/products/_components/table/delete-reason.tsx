import React, { ReactNode, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Value } from "@radix-ui/react-select";
const reasons = [
  "Featuring photos of adult nudity or pornography",
  "Promoting hate speech, discrimination, or violence against any individual or group based on race, ethnicity, national origin",
  "Product data is incomplete",
  "Violation of intellectual property rights or copyright infringement",
  "Selling counterfeit or fraudulent products",
  "Product is expired or past its use-by date",
  "Item is prohibited or restricted by law or regulation",
  "Product description contains misleading or false information",
  "Product does not meet safety standards or poses health risks",
  "Multiple customer complaints about the product quality or functionality",
  "Repeated instances of late or non-delivery of the product",
  "Manufacturer recalls or warnings regarding the product",
  "Product is deemed environmentally harmful or unsustainable",
];

export default function DeleteConfirm({
  children,
  onDelete,
}: {
  onDelete: (value: string ) => Promise<void|any>;
  children: ReactNode;
}) {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Choose why you delete this product
          </AlertDialogTitle>
          <AlertDialogDescription>
            Select an option below to provide a reason for deleting the product,
            This information will be used to messaged to the user who posted it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RadioGroup
          onValueChange={setValue}
          className="my-4 border-b pb-2 flex flex-col gap-2 max-h-[500px] overflow-y-auto"
        >
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="flex items-center space-x-2  hover:shadow-md p-2"
            >
              <RadioGroupItem value={reason} id={"reason" + i} />
              <Label htmlFor={"reason" + i}>{reason}</Label>
            </div>
          ))}
        </RadioGroup>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!value} onClick={() => onDelete(value)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
