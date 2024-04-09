import { formatNumber } from "@/utils/format";
import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ data }: any) => {
  const chartData = data?.map((el: any) => ({
    id: el?._id,
    label: el?._id,
    sales_count: el?.sales_count,
  }));
  return (
    <ResponsivePie
      value={"sales_count"}
      valueFormat={formatNumber}
      data={chartData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-4}
      innerRadius={0.22}
      padAngle={2}
      cornerRadius={18}
      activeInnerRadiusOffset={2}
      activeOuterRadiusOffset={5}
      colors={{ scheme: "set2" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={16}
      arcLinkLabelsTextOffset={2}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-2}
      arcLinkLabelsDiagonalLength={9}
      arcLinkLabelsStraightLength={21}
      arcLinkLabelsThickness={4}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      motionConfig="wobbly"
    />
  );
};
export default function TopSalesByCategory({ data }: any) {
  return (
    <div className=" flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold">Top Selling Categories</h2>
        <p className="text-shade text-[14px] ">Top sales by category</p>
      </div>
      {data?.length ? (
        <div className="overflow-auto">
          <div className="mx-auto w-full h-full min-w-[366px] min-h-[366px] ">
            <MyResponsivePie data={data} />
          </div>
        </div>
      ) : (
        <span className="text-slate-300 text-[20px] md:text-[40px] h-[400px] flex items-center justify-center">
          No Sales yet
        </span>
      )}
    </div>
  );
}
