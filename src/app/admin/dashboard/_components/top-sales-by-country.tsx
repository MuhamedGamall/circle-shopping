import { formatNumber, formatPrice } from "@/utils/format";
import { ResponsivePie } from "@nivo/pie";
import { useWindowSize } from "react-use";
const MyResponsivePie = ({ data }: any) => {
  const { width } = useWindowSize();
  const chartData = data?.map((el: any) => ({
    id: el?._id,
    label: el?._id,
    sales_count: el?.sales_count,
    total_sales: el?.total_sales,
  }));
  return (
    <ResponsivePie
      value={"sales_count"}
      valueFormat={formatNumber}
      data={chartData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-4}
      innerRadius={0.45}
      padAngle={2}
      cornerRadius={22}
      activeInnerRadiusOffset={15}
      activeOuterRadiusOffset={5}
      colors={{ scheme: "purple_red" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel={(e) => e.id + ""}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-2}
      arcLinkLabelsDiagonalLength={15}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 1.7]],
      }}
      tooltip={(point: any) => {
        return (
          <div className="flex text-center flex-col gap-2 p-4 rounded-lg shadow-lg bg-white justify-center text-shade">
            <div className="text-black font-semibold">{point?.datum?.id}</div>
            <div className="border-t pt-2">
              Total Sales: {formatNumber(point?.datum?.value)}
            </div>
            Sales Count: {formatPrice(point?.datum?.data?.sales_count)}
          </div>
        );
      }}
      motionConfig="wobbly"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 59,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 0,
          symbolSize: 20,
          itemDirection: "left-to-right",
        },
      ]}
    />
  );
};
export default function TopSalesByCountry({ data }: { data: any }) {
  return (
    <div className=" flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold ">World top sales</h2>
        <p className="text-shade text-[14px] ">Top sales by countries</p>
      </div>
      {data?.length ? (
        <div className="overflow-auto">
          <div className="mx-auto w-full h-full min-w-[400px] min-h-[400px] ">
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
