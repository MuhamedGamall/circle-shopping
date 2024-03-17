import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export default function Overview({
  label,
  data,
}: {
  label: string;
  data: string[] | [];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-5 rounded-sm px-2 border"
    >
      <AccordionItem value={label} className="border-none ">
        <AccordionTrigger className="">
          <Label
            className={
              "text-shade flex items-center justify-between w-full gap-2  capitalize "
            }
          >
            {label}

            <span className="mr-2">( {data?.length } )</span>
          </Label>
        </AccordionTrigger>
        <AccordionContent className="w-full max-h-[400px] overflow-y-auto">
          <div className="mx-2">
            {data?.map((el, i) => (
              <div key={i} className="rounded-sm p-3 text-sm border mb-2">
                {el}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
