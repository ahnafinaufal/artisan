import type { ComponentProps, ReactNode } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartTooltip } from "../../molecules/ChartTooltip";

export interface PieChartProps {
  height?: number;
  width?: number | `${number}%`;
  className?: string;
  children?: ReactNode;
}

function PieChartRoot({
  height = 280,
  width = "100%",
  className = "",
  children,
}: PieChartProps) {
  return (
    <div className={`heroui-chart pie-chart w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        <RechartsPieChart>{children}</RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

function PieChartTooltip(props: ComponentProps<typeof Tooltip>) {
  return <Tooltip content={<ChartTooltip.Content hideHeader />} {...props} />;
}

export const PieChart = Object.assign(PieChartRoot, {
  Pie,
  Cell,
  Label,
  Tooltip: PieChartTooltip,
  TooltipContent: ChartTooltip.Content,
});
