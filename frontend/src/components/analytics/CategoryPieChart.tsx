import type { CategoryBreakdown } from "@/types/analytics";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";

interface Props {
  data: CategoryBreakdown[];
  type: "income" | "expense";
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#ec4899",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

const CategoryPieChart = ({ data, type }: Props) => {
  // Inject colors into data so Legend can read them
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold mb-4">
          {type === "expense" ? "Spending" : "Income"} by Category
        </h2>
        <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
          No data for this period
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-semibold mb-4">
        {type === "expense" ? "Spending" : "Income"} by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={coloredData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
            }
            shape={(props: any) => {
              const { payload, ...rest } = props;
              return <Sector {...rest} fill={payload.fill} />;
            }}
          />

          <Tooltip formatter={(value) => formatCurrency(Number(value))} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
