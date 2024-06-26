import useCountdown from "@/hooks/use-countdown";
import { formatNumber } from "@/utils/format";
import { TbShoppingCartCheck } from "react-icons/tb";

export default function SalesCount({ data }: { data: number }) {
  const { timer } = useCountdown(data);
  
  return (
    <div className="flex flex-col bg-white justify-center shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className=" mb-5 bg-yellow-300/40 rounded-sm flex items-center justify-center w-fit px-3 py-4">
        <TbShoppingCartCheck className="min-h-6 min-w-6 text-yellow-500" />
      </div>
      <div className="flex md:flex-col-reverse gap-2 flex-row md:items-start items-center">
        <p className="text-slate-400  text-[20px] md:text-[30px] ">
          Sales Count
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-shade ">
          {formatNumber(timer)}
        </h2>
      </div>
    </div>
  );
}
