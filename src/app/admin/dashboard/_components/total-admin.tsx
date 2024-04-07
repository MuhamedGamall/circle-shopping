import { formatNumber } from "@/utils/format";
import { RiAdminLine } from "react-icons/ri";
export default function TotalAdmins({ data }: { data: number }) {
  return (
    <div className="  flex flex-col  justify-center shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className=" mb-5 bg-slate-300/40 rounded-sm flex items-center justify-center w-fit px-3 py-4">
        <RiAdminLine className="  min-h-6 min-w-6 text-slate-600  " />
      </div>
      <div className="flex md:flex-col-reverse gap-2 flex-row md:items-start items-center">
        <p className="text-slate-400  text-[20px] md:text-[30px] ">
          Total Admins
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-shade ">
          {formatNumber(data)}
        </h2>
      </div>
    </div>
  );
}
