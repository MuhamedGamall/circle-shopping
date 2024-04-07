import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#34495E", "#2E86C1", "#5D6D7E", "#1F618D"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function SalesCountChart({ data }: any) {
  const chartData = data?.map((el: any) => ({
    name: el?._id,
    value: el?.sales_count,
  }));
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="95%" height={400}>
        <PieChart>
          <Pie
            style={{ filter: "drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25))" }}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
          >
            {chartData?.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
function TotalSalesChart({ data }: any) {
  const chartData = data?.map((el: any) => ({
    name: el?._id,
    value: el?.total_sales,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={200} height={200}>
        <Pie
          style={{ filter: "drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25))" }}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
          dataKey="value"
        >
          {chartData?.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function TopSalesByCountry({ data }: { data: any }) {
  return (
    <div className=" flex-1 flex-col flex gap-5  shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold mb-2">World sales count</h2>
        <p className="text-shade text-[14px] ">Top sales count by countries</p>
      </div>
      <SalesCountChart data={data} />
      {/* <div className="">
        <div className="">
          <h2 className="text-[16px] font-semibold mb-2">World total sales</h2>
          <p className="text-shade text-[14px] ">
            Top total sales by countries
          </p>
        </div>
        <SalesCountChart data={data} />
      </div> */}
    </div>
  );
}
