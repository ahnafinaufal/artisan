import { useId, useState, type ReactNode } from "react";
import { Card, ProgressBar, Separator } from "@heroui/react";
import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react";
import { ActionButton, StatusChip } from "../atoms";

export interface KpiDataPoint {
  label: string;
  value: number | null;
}

export type KpiColor = "success" | "warning" | "danger" | "accent";

const COLOR_VAR: Record<KpiColor, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  accent: "var(--accent)",
};

/**
 * Generates a smooth cubic-bezier SVG path (monotone-like) through points.
 */
function buildSmoothPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function KpiRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`relative w-full gap-2.5 p-4 ${className}`}>
      {children}
    </Card>
  );
}

function KpiHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 pr-7 ${className}`}>
      {children}
    </div>
  );
}

function KpiIcon({
  status = "success",
  variant = "tinted",
  children,
}: {
  status?: KpiColor;
  variant?: "tinted" | "plain";
  children: ReactNode;
}) {
  if (variant === "plain") {
    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center text-muted">
        {children}
      </div>
    );
  }

  const toneClass =
    status === "success"
      ? "bg-success/15 text-success"
      : status === "warning"
        ? "bg-warning/15 text-warning"
        : status === "danger"
          ? "bg-danger/15 text-danger"
          : "bg-accent/15 text-accent";

  return (
    <div
      data-status={status}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${toneClass}`}
    >
      {children}
    </div>
  );
}

function KpiTitle({ children }: { children: ReactNode }) {
  return <dt className="text-sm font-medium text-muted">{children}</dt>;
}

function KpiActions({ onPress }: { onPress?: () => void }) {
  return (
    <div className="absolute top-3.5 right-3">
      <ActionButton
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label="KPI actions"
        onPress={onPress}
      >
        <MoreVertical className="h-4 w-4 text-muted" />
      </ActionButton>
    </div>
  );
}

function KpiContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

function KpiValue({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const formatted =
    typeof value === "number" ? value.toLocaleString("en-US") : value;
  return (
    <dd
      className={`text-2xl font-bold tracking-tight tabular-nums text-foreground ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </dd>
  );
}

function KpiTrend({
  trend = "up",
  variant = "chip",
  subtitle,
  children,
}: {
  trend?: "up" | "down" | "neutral";
  variant?: "chip" | "inline";
  subtitle?: string;
  children: ReactNode;
}) {
  if (variant === "inline") {
    const textColor =
      trend === "up"
        ? "text-success"
        : trend === "down"
          ? "text-danger"
          : "text-muted";

    return (
      <div className="flex items-center gap-1 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-medium ${textColor}`}>
          {trend === "up" ? <ArrowUp className="h-3 w-3" /> : null}
          {trend === "down" ? <ArrowDown className="h-3 w-3" /> : null}
          {children}
        </span>
        {subtitle ? <span className="text-muted">{subtitle}</span> : null}
      </div>
    );
  }

  return (
    <StatusChip
      color={
        trend === "up" ? "success" : trend === "down" ? "danger" : "default"
      }
      variant="soft"
      size="sm"
    >
      <span className="inline-flex items-center gap-0.5 font-medium">
        {trend === "up" ? <ArrowUp className="h-3 w-3" /> : null}
        {trend === "down" ? <ArrowDown className="h-3 w-3" /> : null}
        {children}
      </span>
    </StatusChip>
  );
}

function KpiProgress({
  value,
  color = "success",
}: {
  value: number;
  color?: KpiColor;
}) {
  return (
    <ProgressBar
      value={value}
      color={color === "accent" ? "accent" : color}
      aria-label="Target progress"
      className="w-full"
    >
      <ProgressBar.Track className="h-1.5">
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}

function KpiChart({
  data,
  color = "success",
  valuePrefix = "",
  valueSuffix = "",
  height = 52,
  className = "",
}: {
  data: KpiDataPoint[];
  color?: KpiColor;
  valuePrefix?: string;
  valueSuffix?: string;
  height?: number;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradId = useId();
  const width = 220;
  const strokeColor = COLOR_VAR[color];

  const numericValues = data
    .map((d) => d.value)
    .filter((v): v is number => v !== null);
  const minVal = Math.min(...numericValues);
  const maxVal = Math.max(...numericValues);
  const range = Math.max(maxVal - minVal, 1);

  const points = data.map((d, i) => ({
    ...d,
    x: (i / Math.max(data.length - 1, 1)) * width,
    y:
      d.value === null
        ? null
        : height - ((d.value - minVal) / range) * (height - 14) - 6,
  }));

  const validPoints = points.filter(
    (p): p is { label: string; value: number; x: number; y: number } =>
      p.y !== null && p.value !== null
  );

  const linePath = buildSmoothPath(validPoints);
  const firstX = validPoints[0]?.x ?? 0;
  const lastX = validPoints[validPoints.length - 1]?.x ?? width;
  const areaPath = validPoints.length
    ? `${linePath} L ${lastX.toFixed(1)} ${height} L ${firstX.toFixed(1)} ${height} Z`
    : "";

  const activePoint =
    activeIndex !== null && points[activeIndex]?.y !== null
      ? (points[activeIndex] as {
          label: string;
          value: number;
          x: number;
          y: number;
        })
      : null;

  return (
    <div className={`relative w-full pt-4 ${className}`}>
      {activePoint ? (
        <div
          style={{
            left: `${Math.min(Math.max((activePoint.x / width) * 100, 14), 86)}%`,
          }}
          className="pointer-events-none absolute -top-1 z-20 -translate-x-1/2 rounded-lg border border-border bg-overlay px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm whitespace-nowrap transition-all duration-150 ease-out"
        >
          <span
            style={{ backgroundColor: strokeColor }}
            className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
          />
          <span className="text-muted">{activePoint.label}: </span>
          <span className="tabular-nums font-semibold">
            {valuePrefix}
            {activePoint.value.toLocaleString("en-US")}
            {valueSuffix}
          </span>
        </div>
      ) : null}

      <div
        className="relative w-full"
        style={{
          height,
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full cursor-crosshair overflow-visible"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {areaPath ? <path d={areaPath} fill={`url(#${gradId})`} /> : null}
          {linePath ? (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {points.map((p, i) => (
            <rect
              key={p.label}
              x={p.x - width / (points.length * 2)}
              y={0}
              width={width / points.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(i)}
            />
          ))}
        </svg>

        {/* Smooth HTML crosshair & dot (selalu bulat sempurna meski SVG full-width) */}
        {activePoint ? (
          <>
            <div
              style={{ left: `${(activePoint.x / width) * 100}%` }}
              className="pointer-events-none absolute top-0 bottom-0 z-10 w-px border-l border-dashed border-border transition-all duration-150 ease-out"
            />
            <div
              style={{
                left: `${(activePoint.x / width) * 100}%`,
                top: `${(activePoint.y / height) * 100}%`,
                backgroundColor: strokeColor,
              }}
              className="pointer-events-none absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface shadow-xs transition-all duration-150 ease-out"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

function KpiSeparator() {
  return <Separator className="my-0.5" />;
}

function KpiFooter({ children }: { children: ReactNode }) {
  return <div className="text-xs font-medium text-foreground">{children}</div>;
}

/**
 * Molecule: KPI (compound component mengacu pada @heroui-pro/react/kpi)
 */
export const KPI = Object.assign(KpiRoot, {
  Header: KpiHeader,
  Icon: KpiIcon,
  Title: KpiTitle,
  Actions: KpiActions,
  Content: KpiContent,
  Value: KpiValue,
  Trend: KpiTrend,
  Progress: KpiProgress,
  Chart: KpiChart,
  Separator: KpiSeparator,
  Footer: KpiFooter,
});
