import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { FaCaretRight } from "react-icons/fa";

const LoadingSkeleton = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Skeleton key={i} className="h-[30px] w-[97%] my-2 mx-auto rounded-sm" />
  ));
};
export default function SelectCategory({
  data,
  label,
  loading,
  setValue,
  value,
}: {
  data: any;
  loading: boolean;
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
            {loading ? (
            <LoadingSkeleton />
            ) : (
              data?.map((el: any, i: any) => (
                <div
                  onClick={() => setValue(el)}
                  key={i}
                  className={cn(
                    "cursor-pointer  border-b p-3 text-slate-600 text-sm flex items-center justify-between",
                    {
                      "bg-sky-700/20 text-sky-700 font-bold": el === value,
                    }
                  )}
                >
                  {el}
                  <FaCaretRight />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
