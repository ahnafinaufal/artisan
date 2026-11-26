import type { ComponentProps, ReactNode } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface AreaChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  children?: ReactNode;
}

function AreaChartRoot({
  data,
  height = 280,
  width = "100%",
  margin = { top: 8, right: 8, bottom: 0, left: 0 },
  className = "",
  children,
}: AreaChartProps) {
  return (
    <div className={`heroui-chart area-chart w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        <RechartsAreaChart data={data} margin={margin}>
          {children}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function AreaChartGrid(props: ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} {...props} />;
}

function AreaChartArea({
  type = "monotone",
  stroke = "var(--accent)",
  fill = "var(--accent)",
  fillOpacity = 0.16,
  strokeWidth = 2,
  ...props
}: ComponentProps<typeof Area>) {
  return (
    <Area
      type={type}
      stroke={stroke}
      fill={fill}
      fillOpacity={fillOpacity}
      strokeWidth={strokeWidth}
      activeDot={{ r: 5, strokeWidth: 2 }}
      {...props}
    />
  );
}

function AreaChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      content={<ChartTooltip.Content />}
      cursor={{ stroke: "var(--muted)", strokeDasharray: "4 4" }}
      {...props}
    />
  );
}

export const AreaChart = Object.assign(AreaChartRoot, {
  Grid: AreaChartGrid,
  XAxis,
  YAxis,
  Area: AreaChartArea,
  Tooltip: AreaChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
