import type { ComponentProps, ReactNode } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface BarChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  layout?: "horizontal" | "vertical";
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  children?: ReactNode;
}

function BarChartRoot({
  data,
  height = 280,
  width = "100%",
  layout = "horizontal",
  margin = { top: 8, right: 8, bottom: 0, left: 0 },
  className = "",
  children,
}: BarChartProps) {
  return (
    <div className={`heroui-chart bar-chart w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        <RechartsBarChart data={data} layout={layout} margin={margin}>
          {children}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function BarChartGrid(props: ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} {...props} />;
}

function BarChartBar({
  fill = "var(--accent)",
  radius = [6, 6, 0, 0],
  ...props
}: ComponentProps<typeof Bar>) {
  return <Bar fill={fill} radius={radius} {...props} />;
}

function BarChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      content={<ChartTooltip.Content />}
      cursor={{ fill: "var(--surface-secondary)", opacity: 0.55 }}
      {...props}
    />
  );
}

export const BarChart = Object.assign(BarChartRoot, {
  Grid: BarChartGrid,
  XAxis,
  YAxis,
  Bar: BarChartBar,
  Tooltip: BarChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
