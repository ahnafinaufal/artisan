import type { ComponentProps, ReactNode } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface RadarChartProps {
  data: Record<string, number | string>[];
  height?: number;
  width?: number | `${number}%`;
  outerRadius?: number | string;
  className?: string;
  children?: ReactNode;
}

function RadarChartRoot({
  data,
  height = 280,
  width = "100%",
  outerRadius = "74%",
  className = "",
  children,
}: RadarChartProps) {
  return (
    <div
      className={`heroui-chart radar-chart w-full ${className}`}
      style={{ height }}
    >
      <ResponsiveContainer width={width} height="100%">
        <RechartsRadarChart data={data} outerRadius={outerRadius}>
          {children}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RadarChartGrid(props: ComponentProps<typeof PolarGrid>) {
  return <PolarGrid stroke="var(--border)" {...props} />;
}

function RadarChartRadar({
  stroke = "var(--accent)",
  fill = "var(--accent)",
  fillOpacity = 0.2,
  strokeWidth = 2,
  ...props
}: ComponentProps<typeof Radar>) {
  return (
    <Radar
      stroke={stroke}
      fill={fill}
      fillOpacity={fillOpacity}
      strokeWidth={strokeWidth}
      activeDot={{ r: 4.5, strokeWidth: 2, stroke: "var(--surface)" }}
      {...props}
    />
  );
}

function RadarChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return <Tooltip content={<ChartTooltip.Content />} {...props} />;
}

export const RadarChart = Object.assign(RadarChartRoot, {
  Grid: RadarChartGrid,
  AngleAxis: PolarAngleAxis,
  RadiusAxis: PolarRadiusAxis,
  Radar: RadarChartRadar,
  Tooltip: RadarChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
