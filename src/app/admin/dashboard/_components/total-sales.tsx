import useCountdown from "@/hooks/use-countdown";
import { formatPrice } from "@/utils/format";
import { DollarSign } from "lucide-react";
export default function TotalSales({ data }: { data: number }) {
  const { timer } = useCountdown(data);

  return (
    <div className="flex flex-col bg-white  justify-center shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="mb-5 bg-green-500/20  rounded-sm flex items-center justify-center w-fit px-3 py-4">
        <DollarSign className="  min-h-6 min-w-6 text-green-600  " />
      </div>
      <div className="flex md:flex-col-reverse gap-2 flex-row md:items-start items-center">
        <p className="text-slate-400  text-[20px] md:text-[30px] ">
          Total Sales
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-shade ">
          {formatPrice(timer)}
        </h2>
      </div>
    </div>
  );
}
