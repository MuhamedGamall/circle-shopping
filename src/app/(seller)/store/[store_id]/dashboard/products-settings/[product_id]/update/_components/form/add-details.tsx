import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { cn } from "@/lib/utils";
import { Info, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function AddDetails({
  label,
  data,
  setData,
  name,
  setErrorMessages,
  errorMessages,
}: {
  label: string;
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
  name: string;
  setErrorMessages: Dispatch<SetStateAction<boolean[]>>;
  errorMessages: boolean[];
}) {
  const isValid = (val: string) =>
    /^[a-zA-Z][a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(val);
  // update  error messages
  const updateErrorMessages = (idx: number, isValidValue: boolean) => {
    setErrorMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[idx] = !isValidValue;
      return newMessages;
    });
  };

  // Function to handle input change
  const onChange = (value: string, idx: number) => {
    setData((curr) => {
      const newArr = [...curr];
      newArr[idx] = value;
      if (curr.length <= 30 && curr.length >= 1) {
        if (idx === newArr.length - 1 && isValid(value)) {
          newArr.push("");
        }
        updateErrorMessages(idx, isValid(value));
      }
      return newArr;
    });
  };

  // Function to handle deletion of an item
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
          <Label
            className={
              "text-shade flex items-center justify-between w-full gap-2  capitalize "
            }
          >
            <div className="flex items-center gap-2">
              {label}
              <TooltipWrapper label={"Repeats will be deleted"}>
                <Info className="h-3 w-3 text-shade" />
              </TooltipWrapper>
            </div>
            <span className="mr-2">( {data?.length} )</span>
          </Label>
        </AccordionTrigger>
        <AccordionContent className="w-full max-h-[400px] overflow-y-auto">
          <div className="mx-2">
            {data?.map((el, i) => (
              <div key={i} className="mb-3">
                <div className="w-full flex items-center gap-1 ">
                  <Input
                    name={name}
                    value={el}
                    placeholder={label}
                    type={"text"}
                    onChange={(e) => onChange(e.target.value, i)}
                    className={"rounded-sm py-5"}
                  />
                  <Trash2
                    className={cn("h-5 w-5 text-shade hover:text-red-700", {
                      hidden: data?.length === 1,
                    })}
                    onClick={() => onDelete(i)}
                  />
                </div>
                {errorMessages[i] && (
                  <span className="text-red-500 mt-1">Invalid input</span>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
