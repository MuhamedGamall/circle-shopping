import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed z-[11111111111111111111] backdrop-blur inset-0 bg-sky-700/20 flex justify-center items-center"
    >
      <div className="flex justify-start items-center text-shade gap-2 p-3 sm:p-4 bg-slate-100 text-[13px] sm:text-[17px]  w-[200px] sm:w-[300px]  whitespace-nowrap">
        <Loader2 className="animate-spin transition-all h-4 w-4 " />
        Loading...
      </div>
    </div>
  );
}
