import { createContext, useContext, type ReactNode } from "react";

type IndicatorType = "dot" | "line";

const TooltipContext = createContext<{ indicator: IndicatorType }>({
  indicator: "dot",
});

export interface ChartTooltipRootProps {
  active?: boolean;
  indicator?: IndicatorType;
  className?: string;
  children?: ReactNode;
}

function ChartTooltipRoot({
  active = true,
  indicator = "dot",
  className = "",
  children,
}: ChartTooltipRootProps) {
  if (!active) return null;

  return (
    <TooltipContext.Provider value={{ indicator }}>
      <div
        className={`chart-tooltip min-w-[140px] rounded-xl border border-border bg-overlay px-3 py-2 text-xs shadow-md ${className}`}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

function ChartTooltipHeader({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`chart-tooltip__header mb-1.5 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </div>
  );
}

function ChartTooltipItem({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`chart-tooltip__item flex items-center gap-2 py-0.5 ${className}`}
    >
      {children}
    </div>
  );
}

function ChartTooltipIndicator({
  color = "var(--accent)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const { indicator } = useContext(TooltipContext);

  if (indicator === "line") {
    return (
      <span
        style={{ backgroundColor: color }}
        className={`chart-tooltip__indicator inline-block h-3 w-1 shrink-0 rounded-full ${className}`}
      />
    );
  }

  return (
    <span
      style={{ backgroundColor: color }}
      className={`chart-tooltip__indicator inline-block h-2 w-2 shrink-0 rounded-full ${className}`}
    />
  );
}

function ChartTooltipLabel({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`chart-tooltip__label flex-1 text-xs text-muted ${className}`}>
      {children}
    </span>
  );
}

function ChartTooltipValue({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={`chart-tooltip__value text-xs font-semibold tabular-nums text-foreground ${className}`}
    >
      {children}
    </span>
  );
}

export interface RechartsPayloadItem {
  name?: string | number;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
  payload?: Record<string, unknown>;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: RechartsPayloadItem[];
  label?: string | number;
  indicator?: IndicatorType;
  hideHeader?: boolean;
  valueFormatter?: (value: number | string, name?: string) => string;
  labelFormatter?: (label: string | number) => string;
}

function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = "dot",
  hideHeader = false,
  valueFormatter,
  labelFormatter,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null;

  const formattedLabel =
    label !== undefined && labelFormatter ? labelFormatter(label) : label;

  return (
    <ChartTooltipRoot active={active} indicator={indicator}>
      {!hideHeader && formattedLabel !== undefined && formattedLabel !== "" ? (
        <ChartTooltipHeader>{formattedLabel}</ChartTooltipHeader>
      ) : null}
      <div className="space-y-0.5">
        {payload.map((entry, idx) => {
          const name = String(entry.name ?? entry.dataKey ?? `Series ${idx + 1}`);
          const rawVal = entry.value ?? 0;
          const formattedVal = valueFormatter
            ? valueFormatter(rawVal, name)
            : typeof rawVal === "number"
              ? rawVal.toLocaleString("en-US")
              : String(rawVal);

          return (
            <ChartTooltipItem key={`${name}-${idx}`}>
              <ChartTooltipIndicator color={entry.color || "var(--accent)"} />
              <ChartTooltipLabel>{name}</ChartTooltipLabel>
              <ChartTooltipValue>{formattedVal}</ChartTooltipValue>
            </ChartTooltipItem>
          );
        })}
      </div>
    </ChartTooltipRoot>
  );
}

/**
 * Molecule: ChartTooltip
 * Komponen tooltip composable untuk seluruh chart HeroUI Pro (mengacu pada ChartTooltip docs).
 */
export const ChartTooltip = Object.assign(ChartTooltipRoot, {
  Header: ChartTooltipHeader,
  Item: ChartTooltipItem,
  Indicator: ChartTooltipIndicator,
  Label: ChartTooltipLabel,
  Value: ChartTooltipValue,
  Content: ChartTooltipContent,
});
