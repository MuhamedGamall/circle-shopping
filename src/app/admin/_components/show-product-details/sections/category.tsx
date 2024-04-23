import SectionTitle from "@/components/section-title";
import { Label } from "@/components/ui/label";

export default function CategorySection({ data }: any) {
  return (
    <div className="p-5 border-b">
      <SectionTitle
        title="category."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Main Category
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.main_category}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Sub Category
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.sub_category}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Brand
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.brand}
          </div>
        </Label>
      </div>
    </div>
  );
}
