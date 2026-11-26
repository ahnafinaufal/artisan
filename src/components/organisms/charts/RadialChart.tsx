import type { ComponentProps, ReactNode } from "react";
import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface RadialChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  barSize?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  startAngle?: number;
  endAngle?: number;
  className?: string;
  children?: ReactNode;
}

function RadialChartRoot({
  data,
  height = 280,
  width = "100%",
  barSize = 12,
  innerRadius = "35%",
  outerRadius = "90%",
  startAngle = 90,
  endAngle = -270,
  className = "",
  children,
}: RadialChartProps) {
  return (
    <div
      className={`heroui-chart radial-chart w-full ${className}`}
      style={{ height }}
    >
      <ResponsiveContainer width={width} height="100%">
        <RechartsRadialBarChart
          data={data}
          barSize={barSize}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
        >
          {children}
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RadialChartBar({
  cornerRadius = 8,
  background = { fill: "var(--surface-secondary)" },
  ...props
}: ComponentProps<typeof RadialBar>) {
  return <RadialBar cornerRadius={cornerRadius} background={background} {...props} />;
}

function RadialChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return <Tooltip content={<ChartTooltip.Content hideHeader />} {...props} />;
}

export const RadialChart = Object.assign(RadialChartRoot, {
  AngleAxis: PolarAngleAxis,
  Bar: RadialChartBar,
  Cell,
  Tooltip: RadialChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
