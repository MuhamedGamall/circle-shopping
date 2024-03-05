import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AddDetails({
  label,
  form,
  data,
  setData,
  name,
}: {
  label: string;
  form: any;
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
  name: string;
}) {
  const onChange = (value: string, idx: number) => {
    if (!!value) {
      setData((curr) => {
        const newArr = [...curr];
        newArr[idx] = value;
        if (curr.length <= 30 && curr.length >= 1)
          if (idx === newArr.length - 1) {
            newArr.push("");
          }
        return newArr;
      });
    }
  };

  const onDelete = (idx: number) => {
    if (data?.length > 1)
      idx >= 0 && setData((curr: string[]) => curr.filter((_, i) => i !== idx));
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="mt-5 rounded-sm px-2 border"
    >
      <AccordionItem value={name} className="border-none ">
        <AccordionTrigger className="">
          <Label className={"text-shade  capitalize block"}>{label}</Label>
        </AccordionTrigger>
        <AccordionContent className="w-full max-h-[400px] overflow-y-auto">
          <div className="mx-2">
            {data?.map((el, i) => (
              <div key={i} className="w-full flex items-center gap-1 mb-3">
                <Input
                  name={name}
                  value={el}
                  placeholder={label}
                  type={"text"}
                  onChange={(e) => onChange(e.target.value, i)}
                  className={"rounded-sm py-5"}
                  lang="en-US"
                />
                <Trash2
                  className={cn("h-5 w-5 text-shade hover:text-red-700", {
                    hidden: data?.length === 1,
                  })}
                  onClick={() => onDelete(i)}
                />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
