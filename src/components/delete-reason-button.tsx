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
import { ReactNode, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DeleteReasonsBtn({
  children,
  onClick,
  title,
  description,
  reasons,
}: {
  children: ReactNode;
  onClick: (value: string) => Promise<void | any>;
  title: string;
  description: string;
  reasons: string[];
}) {
  const [value, setValue] = useState("");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <RadioGroup
          onValueChange={setValue}
          className="my-4 border-b pb-2 flex flex-col gap-2 max-h-[500px] overflow-y-auto"
        >
          {reasons.map((reason, i) => (
            <Label
              key={i}
              htmlFor={"reason" + i}
              className="flex items-center space-x-2  hover:shadow-md p-2"
            >
              <RadioGroupItem value={reason} id={"reason" + i} />
              <span>{reason}</span>
            </Label>
          ))}
        </RadioGroup>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!value} onClick={() => onClick(value)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
