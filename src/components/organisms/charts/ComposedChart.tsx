import type { ComponentProps, ReactNode } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as RechartsComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface ComposedChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  children?: ReactNode;
}

function ComposedChartRoot({
  data,
  height = 280,
  width = "100%",
  margin = { top: 8, right: 8, bottom: 0, left: 0 },
  className = "",
  children,
}: ComposedChartProps) {
  return (
    <div
      className={`heroui-chart composed-chart w-full ${className}`}
      style={{ height }}
    >
      <ResponsiveContainer width={width} height="100%">
        <RechartsComposedChart data={data} margin={margin}>
          {children}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function ComposedChartGrid(props: ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} {...props} />;
}

function ComposedChartBar({
  fill = "var(--accent)",
  radius = [6, 6, 0, 0],
  ...props
}: ComponentProps<typeof Bar>) {
  return <Bar fill={fill} radius={radius} {...props} />;
}

function ComposedChartLine({
  type = "monotone",
  stroke = "var(--success)",
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

function ComposedChartArea({
  type = "monotone",
  stroke = "var(--warning)",
  fill = "var(--warning)",
  fillOpacity = 0.14,
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
      {...props}
    />
  );
}

function ComposedChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      content={<ChartTooltip.Content />}
      cursor={{ stroke: "var(--muted)", strokeDasharray: "4 4" }}
      {...props}
    />
  );
}

export const ComposedChart = Object.assign(ComposedChartRoot, {
  Grid: ComposedChartGrid,
  XAxis,
  YAxis,
  Bar: ComposedChartBar,
  Line: ComposedChartLine,
  Area: ComposedChartArea,
  Tooltip: ComposedChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
