import type { ComponentProps, ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface LineChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  children?: ReactNode;
}

function LineChartRoot({
  data,
  height = 280,
  width = "100%",
  margin = { top: 8, right: 8, bottom: 0, left: 0 },
  className = "",
  children,
}: LineChartProps) {
  return (
    <div className={`heroui-chart line-chart w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        <RechartsLineChart data={data} margin={margin}>
          {children}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineChartGrid(props: ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} {...props} />;
}

function LineChartLine({
  type = "monotone",
  stroke = "var(--accent)",
  strokeWidth = 2,
  dot = false,
  ...props
}: ComponentProps<typeof Line>) {
  return (
    <Line
      type={type}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={dot}
      activeDot={{ r: 5, strokeWidth: 2 }}
      {...props}
    />
  );
}

function LineChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      content={<ChartTooltip.Content />}
      cursor={{ stroke: "var(--muted)", strokeDasharray: "4 4" }}
      {...props}
    />
  );
}

export const LineChart = Object.assign(LineChartRoot, {
  Grid: LineChartGrid,
  XAxis,
  YAxis,
  Line: LineChartLine,
  Tooltip: LineChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
