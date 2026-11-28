import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

export type TimelineAxis = "start" | "center";
export type TimelinePlacement = "start" | "end" | "alternate";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineDensity = "compact" | "comfortable";
export type TimelineAlign = "start" | "center";
export type TimelineSide = "start" | "end";
export type TimelineStatus =
  | "default"
  | "current"
  | "success"
  | "warning"
  | "danger"
  | "muted";

interface TimelineContextValue {
  axis: TimelineAxis;
  placement: TimelinePlacement;
  size: TimelineSize;
  density: TimelineDensity;
  itemAlign: TimelineAlign;
}

const TimelineContext = createContext<TimelineContextValue>({
  axis: "start",
  placement: "end",
  size: "md",
  density: "comfortable",
  itemAlign: "start",
});

export interface TimelineItemContextValue {
  align: TimelineAlign;
  index: number;
  isLast: boolean;
  side: TimelineSide;
  status: TimelineStatus;
}

const TimelineItemContext = createContext<TimelineItemContextValue>({
  align: "start",
  index: 0,
  isLast: false,
  side: "end",
  status: "default",
});

const TimelineItemIndexContext = createContext<{
  index: number;
  isLast: boolean;
}>({
  index: 0,
  isLast: false,
});

export function useTimelineItem(): TimelineItemContextValue {
  return useContext(TimelineItemContext);
}

const MARKER_SIZE: Record<TimelineSize, string> = {
  sm: "timeline__marker--sm h-5 w-5 text-[10px]",
  md: "timeline__marker--md h-7 w-7 text-xs",
  lg: "timeline__marker--lg h-9 w-9 text-sm border-2",
};

const MARKER_TONE: Record<TimelineStatus, string> = {
  default: "border-border bg-surface text-muted",
  current: "border-accent/60 bg-accent/15 text-accent",
  success: "border-success/60 bg-success/15 text-success",
  warning: "border-warning/60 bg-warning/15 text-warning",
  danger: "border-danger/60 bg-danger/15 text-danger",
  muted: "border-border/80 bg-surface-secondary text-muted",
};

const DENSITY_GAP: Record<TimelineDensity, string> = {
  compact: "timeline--compact pb-4",
  comfortable: "timeline--comfortable pb-6",
};

export interface TimelineProps extends ComponentPropsWithoutRef<"ol"> {
  axis?: TimelineAxis;
  placement?: TimelinePlacement;
  size?: TimelineSize;
  density?: TimelineDensity;
  itemAlign?: TimelineAlign;
  children?: ReactNode;
}

function TimelineRoot({
  axis = "start",
  placement = "end",
  size = "md",
  density = "comfortable",
  itemAlign = "start",
  className = "",
  children,
  ...props
}: TimelineProps) {
  const items = Children.toArray(children);
  const total = items.length;

  return (
    <TimelineContext.Provider
      value={{ axis, placement, size, density, itemAlign }}
    >
      <ol
        className={`timeline timeline--${size} timeline--axis-${axis} timeline--${density} flex flex-col ${className}`}
        {...props}
      >
        {items.map((child, index) => (
          <TimelineItemIndexContext.Provider
            key={isValidElement(child) && child.key != null ? child.key : index}
            value={{ index, isLast: index === total - 1 }}
          >
            {child}
          </TimelineItemIndexContext.Provider>
        ))}
      </ol>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps extends ComponentPropsWithoutRef<"li"> {
  status?: TimelineStatus;
  align?: TimelineAlign;
  side?: TimelineSide;
  children?: ReactNode;
}

function TimelineItem({
  status = "default",
  align,
  side,
  className = "",
  children,
  ...props
}: TimelineItemProps) {
  const ctx = useContext(TimelineContext);
  const { index, isLast } = useContext(TimelineItemIndexContext);

  const resolvedAlign: TimelineAlign = align ?? ctx.itemAlign;
  const resolvedSide: TimelineSide =
    side ??
    (ctx.placement === "alternate"
      ? index % 2 === 0
        ? "start"
        : "end"
      : ctx.placement === "start"
        ? "start"
        : "end");

  const childArray = Children.toArray(children);
  const hasExplicitRail = childArray.some(
    (c) => isValidElement(c) && c.type === TimelineRail,
  );

  const alignClass =
    resolvedAlign === "center"
      ? "timeline__item--align-center items-center"
      : "timeline__item--align-start items-start";

  const layoutClass =
    ctx.axis === "center"
      ? "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-4"
      : "grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5";

  return (
    <TimelineItemContext.Provider
      value={{
        align: resolvedAlign,
        index,
        isLast,
        side: resolvedSide,
        status,
      }}
    >
      <li
        aria-current={status === "current" ? "true" : undefined}
        className={`timeline__item ${alignClass} ${layoutClass} ${className}`}
        {...props}
      >
        {!hasExplicitRail && ctx.axis === "start" ? <TimelineRail /> : null}
        {children}
        {!hasExplicitRail && ctx.axis === "center" ? <TimelineRail /> : null}
      </li>
    </TimelineItemContext.Provider>
  );
}

export interface TimelineRailProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

function TimelineRail({
  className = "",
  children,
  ...props
}: TimelineRailProps) {
  const { axis } = useContext(TimelineContext);
  const childArray = Children.toArray(children);
  const hasMarker = childArray.some(
    (c) => isValidElement(c) && c.type === TimelineMarker,
  );
  const hasConnector = childArray.some(
    (c) => isValidElement(c) && c.type === TimelineConnector,
  );

  const colClass = axis === "center" ? "col-start-2 row-start-1" : "";

  return (
    <span
      className={`timeline__rail flex flex-col items-center self-stretch ${colClass} ${className}`}
      {...props}
    >
      {hasMarker ? null : <TimelineMarker />}
      {children}
      {hasConnector ? null : <TimelineConnector />}
    </span>
  );
}

export interface TimelineMarkerProps extends ComponentPropsWithoutRef<"span"> {
  status?: TimelineStatus;
  children?: ReactNode;
}

function TimelineMarker({
  status,
  className = "",
  children,
  ...props
}: TimelineMarkerProps) {
  const { size } = useContext(TimelineContext);
  const item = useContext(TimelineItemContext);
  const resolvedStatus = status ?? item.status;
  const isEmpty = Children.count(children) === 0;

  return (
    <span
      aria-hidden={isEmpty ? "true" : undefined}
      className={`timeline__marker relative z-10 flex shrink-0 items-center justify-center rounded-full border font-medium transition-colors ${MARKER_SIZE[size]} ${MARKER_TONE[resolvedStatus]} ${className}`}
      {...props}
    >
      {isEmpty ? null : children}
    </span>
  );
}

export interface TimelineConnectorProps extends ComponentPropsWithoutRef<"span"> {
  force?: boolean;
}

function TimelineConnector({
  force = false,
  className = "",
  ...props
}: TimelineConnectorProps) {
  const { isLast } = useContext(TimelineItemContext);
  if (isLast && !force) return null;

  return (
    <span
      aria-hidden="true"
      className={`timeline__connector my-1.5 w-px flex-1 min-h-4 bg-border ${className}`}
      {...props}
    />
  );
}

export interface TimelineContentProps extends ComponentPropsWithoutRef<"div"> {
  side?: TimelineSide;
  children?: ReactNode;
}

function TimelineContent({
  side,
  className = "",
  children,
  ...props
}: TimelineContentProps) {
  const { axis, density } = useContext(TimelineContext);
  const item = useContext(TimelineItemContext);
  const resolvedSide = side ?? item.side;
  const padBottom = item.isLast ? "pb-0" : DENSITY_GAP[density];

  const sideClass =
    axis === "center"
      ? resolvedSide === "start"
        ? "col-start-1 row-start-1 text-end"
        : "col-start-3 row-start-1 text-start"
      : "";

  return (
    <div
      className={`timeline__content min-w-0 ${padBottom} ${sideClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Rail: TimelineRail,
  Marker: TimelineMarker,
  Connector: TimelineConnector,
  Content: TimelineContent,
});
