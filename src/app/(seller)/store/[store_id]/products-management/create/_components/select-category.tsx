import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { FaCaretRight } from "react-icons/fa";


const LoadingSkeleton =()=>{

}
export default function SelectCategory({
  data,
  label,
  setValue,
  value,
}: {
  data: any;
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <div className=" flex flex-col justify-center mb-[50px]">
      <h6 className="text-[16px] text-[#888888] my-2 sm:text-start text-center">
        {label}
      </h6>
      <div className="rounded-sm border flex flex-col items-center w-full bg-white">
        <div className=" bg-slate-100  p-2 w-full text-sky-700 text-sm font-semibold">
          {label}
        </div>
        <div className=" hide-scroll  max-h-[430px]  overflow-y-auto w-full h-full">
          <div className="  w-full h-full flex flex-col justify-center ">
            {data.map((el: any, i: any) => (
              <div
                onClick={() => setValue(el?.title)}
                key={i}
                className={cn(
                  "cursor-pointer  border-b p-3 text-slate-600 text-sm flex items-center justify-between",
                  {
                    "bg-sky-700/20 text-sky-700 font-bold": el.title === value,
                  }
                )}
              >
                {el.title}
                <FaCaretRight />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}