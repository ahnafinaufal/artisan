import { Card } from "@heroui/react";
import { ChartTooltip } from "../molecules/ChartTooltip";
import {
  AreaChart,
  ComposedChart,
  PieChart,
  RadarChart,
  RadialChart,
} from "./charts";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 4200, expenses: 2400, target: 4000 },
  { month: "Feb", revenue: 5800, expenses: 2900, target: 4800 },
  { month: "Mar", revenue: 4900, expenses: 2700, target: 5200 },
  { month: "Apr", revenue: 7200, expenses: 3400, target: 6000 },
  { month: "May", revenue: 6100, expenses: 3100, target: 6400 },
  { month: "Jun", revenue: 8400, expenses: 3900, target: 7200 },
];

const BROWSER_PIE_DATA = [
  { name: "Chrome", value: 62, color: "#38a3ff" },
  { name: "Safari", value: 18, color: "#0077ff" },
  { name: "Firefox", value: 10, color: "#0055cc" },
  { name: "Edge", value: 10, color: "#003399" },
];

const TRAFFIC_DONUT_DATA = [
  { name: "Organic", value: 4500, color: "#38a3ff" },
  { name: "Direct", value: 3200, color: "#0077ff" },
  { name: "Referral", value: 2100, color: "#0055cc" },
  { name: "Social", value: 1400, color: "#003399" },
];

const STORAGE_DONUT_DATA = [
  { name: "Documents", value: 42, color: "#38a3ff" },
  { name: "Media", value: 28, color: "#0077ff" },
  { name: "Apps", value: 18, color: "#0055cc" },
  { name: "Other", value: 12, color: "#003399" },
];

const DEVICES_DONUT_DATA = [
  { name: "Mobile", value: 2800, pct: "62%", color: "#38a3ff" },
  { name: "Desktop", value: 1200, pct: "27%", color: "#0077ff" },
  { name: "Tablet", value: 500, pct: "11%", color: "#0055cc" },
];

const PLAN_DONUT_DATA = [
  { name: "Enterprise", value: 340, pct: "29.8%", color: "#38a3ff" },
  { name: "Pro", value: 520, pct: "45.6%", color: "#0077ff" },
  { name: "Starter", value: 280, pct: "24.6%", color: "#0055cc" },
];

const QUARTER_LAST_YEAR = [
  { name: "Q1", value: 22, color: "#38a3ff" },
  { name: "Q2", value: 28, color: "#0077ff" },
  { name: "Q3", value: 24, color: "#0055cc" },
  { name: "Q4", value: 26, color: "#003399" },
];

const QUARTER_THIS_YEAR = [
  { name: "Q1", value: 24, color: "#38a3ff" },
  { name: "Q2", value: 30, color: "#0077ff" },
  { name: "Q3", value: 26, color: "#0055cc" },
  { name: "Q4", value: 32, color: "#003399" },
];

const RADIAL_DATA = [
  { name: "Performance", value: 86, fill: "var(--accent)" },
  { name: "Accessibility", value: 94, fill: "var(--success)" },
  { name: "SEO", value: 72, fill: "var(--warning)" },
];

const PLATFORM_RADAR_DATA = [
  { metric: "Speed", teamA: 86, teamB: 72 },
  { metric: "Reliability", teamA: 78, teamB: 88 },
  { metric: "Security", teamA: 90, teamB: 75 },
  { metric: "Uptime", teamA: 82, teamB: 78 },
  { metric: "Performance", teamA: 88, teamB: 70 },
  { metric: "Scalability", teamA: 68, teamB: 82 },
];

const DEVICE_RADAR_DATA = [
  { month: "Jan", desktop: 68, mobile: 52, tablet: 40 },
  { month: "Feb", desktop: 74, mobile: 60, tablet: 45 },
  { month: "Mar", desktop: 80, mobile: 65, tablet: 52 },
  { month: "Apr", desktop: 76, mobile: 68, tablet: 44 },
  { month: "May", desktop: 85, mobile: 62, tablet: 55 },
  { month: "Jun", desktop: 90, mobile: 75, tablet: 60 },
];

const SKILL_RADAR_DATA = [
  { skill: "Design", score: 84 },
  { skill: "Frontend", score: 94 },
  { skill: "Backend", score: 78 },
  { skill: "DevOps", score: 72 },
  { skill: "Testing", score: 86 },
  { skill: "Leadership", score: 74 },
];

export type ChartViewFilter =
  | "all"
  | "area"
  | "composed"
  | "pie"
  | "radar"
  | "radial"
  | "tooltip";

/**
 * Organism: ChartsShowcaseSection
 * Menampilkan komponen Chart berbasis Recharts sesuai item yang dipilih di sidebar.
 */
export function ChartsShowcaseSection({
  view = "all",
}: {
  view?: ChartViewFilter;
}) {
  const show = (target: ChartViewFilter) => view === "all" || view === target;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {view === "all"
            ? "All Chart Components (Recharts)"
            : view === "area"
              ? "AreaChart"
              : view === "composed"
                ? "ComposedChart"
                : view === "pie"
                  ? "PieChart"
                  : view === "radar"
                    ? "RadarChart"
                    : view === "radial"
                      ? "RadialChart"
                      : "ChartTooltip"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Implementasi Recharts dengan theming &amp; compound API HeroUI Pro.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. AreaChart (Multi & Stacked) */}
        {show("area") ? (
          <Card className="p-5 lg:col-span-2">
            <div className="mb-3">
              <h3 className="text-base font-semibold text-foreground">AreaChart</h3>
              <p className="text-xs text-muted">
                Multi-series area chart dengan gradient fill &amp; ChartTooltip
              </p>
            </div>
            <AreaChart data={MONTHLY_DATA} height={260}>
              <AreaChart.Grid />
              <AreaChart.XAxis dataKey="month" />
              <AreaChart.YAxis />
              <AreaChart.Tooltip
                content={
                  <AreaChart.TooltipContent
                    valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                  />
                }
              />
              <AreaChart.Area
                dataKey="revenue"
                name="Revenue"
                stroke="var(--accent)"
                fill="var(--accent)"
              />
              <AreaChart.Area
                dataKey="expenses"
                name="Expenses"
                stroke="var(--success)"
                fill="var(--success)"
              />
            </AreaChart>
          </Card>
        ) : null}

        {/* 4. ComposedChart (Bar + Area + Line) */}
        {show("composed") ? (
          <Card className="p-5 lg:col-span-2">
            <div className="mb-3">
              <h3 className="text-base font-semibold text-foreground">ComposedChart</h3>
              <p className="text-xs text-muted">
                Kombinasi Bar, Area, dan Line dalam satu chart
              </p>
            </div>
            <ComposedChart data={MONTHLY_DATA} height={260}>
              <ComposedChart.Grid />
              <ComposedChart.XAxis dataKey="month" />
              <ComposedChart.YAxis />
              <ComposedChart.Tooltip
                content={
                  <ComposedChart.TooltipContent
                    valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                  />
                }
              />
              <ComposedChart.Area
                dataKey="expenses"
                name="Expenses"
                fill="var(--warning)"
                stroke="var(--warning)"
              />
              <ComposedChart.Bar
                dataKey="revenue"
                name="Revenue"
                fill="var(--accent)"
                barSize={24}
              />
              <ComposedChart.Line
                dataKey="target"
                name="Target"
                stroke="var(--success)"
              />
            </ComposedChart>
          </Card>
        ) : null}

        {/* 5a-g. PieChart */}
        {show("pie") ? (
          <>

        {/* 5a. PieChart — Browser Usage */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Browser Usage
          </h3>
          <PieChart height={220}>
            <PieChart.Pie
              data={BROWSER_PIE_DATA}
              dataKey="value"
              nameKey="name"
              outerRadius={88}
              startAngle={90}
              endAngle={-270}
            >
              {BROWSER_PIE_DATA.map((entry) => (
                <PieChart.Cell key={entry.name} fill={entry.color} />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip
              content={
                <PieChart.TooltipContent hideHeader valueFormatter={(v) => `${v}%`} />
              }
            />
          </PieChart>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
            {BROWSER_PIE_DATA.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: d.color }}
                  className="h-2.5 w-2.5 rounded-full"
                />
                {d.name}
              </span>
            ))}
          </div>
        </Card>

        {/* 5b. PieChart — Market Share (with % Tooltip) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Market Share
          </h3>
          <PieChart height={220}>
            <PieChart.Pie
              data={BROWSER_PIE_DATA}
              dataKey="value"
              nameKey="name"
              outerRadius={88}
              startAngle={90}
              endAngle={-270}
            >
              {BROWSER_PIE_DATA.map((entry) => (
                <PieChart.Cell key={entry.name} fill={entry.color} />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip
              content={
                <PieChart.TooltipContent
                  hideHeader
                  valueFormatter={(v) => `${Number(v).toFixed(1)}%`}
                />
              }
            />
          </PieChart>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
            {BROWSER_PIE_DATA.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: d.color }}
                  className="h-2.5 w-2.5 rounded-full"
                />
                {d.name}
              </span>
            ))}
          </div>
        </Card>

        {/* 5c. PieChart — Traffic Sources (Donut) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Traffic Sources
          </h3>
          <PieChart height={210}>
            <PieChart.Pie
              data={TRAFFIC_DONUT_DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={88}
              cornerRadius={8}
              paddingAngle={2}
            >
              {TRAFFIC_DONUT_DATA.map((entry) => (
                <PieChart.Cell key={entry.name} fill={entry.color} />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip />
          </PieChart>
          <div className="mx-auto mt-2 grid max-w-[280px] grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted">
            {TRAFFIC_DONUT_DATA.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: d.color }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                />
                {d.name} ({d.value.toLocaleString("en-US")})
              </span>
            ))}
          </div>
        </Card>

        {/* 5d. PieChart — Storage Usage (Donut with Center Content) */}
        <Card className="p-5">
          <div className="mb-2">
            <h3 className="text-base font-semibold text-foreground">
              Storage Usage
            </h3>
            <p className="text-xs text-muted">100 GB of 128 GB used</p>
          </div>
          <div className="relative">
            <PieChart height={200}>
              <PieChart.Pie
                data={STORAGE_DONUT_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={84}
                cornerRadius={8}
                paddingAngle={2}
              >
                {STORAGE_DONUT_DATA.map((entry) => (
                  <PieChart.Cell key={entry.name} fill={entry.color} />
                ))}
              </PieChart.Pie>
              <PieChart.Tooltip
                content={
                  <PieChart.TooltipContent hideHeader valueFormatter={(v) => `${v} GB`} />
                }
              />
            </PieChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-foreground">100</span>
              <span className="text-xs text-muted">GB used</span>
            </div>
          </div>
          <div className="mx-auto mt-2 grid max-w-[290px] grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted">
            {STORAGE_DONUT_DATA.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: d.color }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                />
                {d.name} ({d.value} GB)
              </span>
            ))}
          </div>
        </Card>

        {/* 5e. PieChart — Connected Devices (Donut + Breakdown) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Connected Devices
          </h3>
          <div className="relative">
            <PieChart height={200}>
              <PieChart.Pie
                data={DEVICES_DONUT_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={84}
                cornerRadius={8}
                paddingAngle={2}
              >
                {DEVICES_DONUT_DATA.map((entry) => (
                  <PieChart.Cell key={entry.name} fill={entry.color} />
                ))}
              </PieChart.Pie>
              <PieChart.Tooltip />
            </PieChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-foreground">4.5K</span>
              <span className="text-xs text-muted">Devices</span>
            </div>
          </div>
          <div className="mx-auto mt-3 max-w-[220px] space-y-1.5 text-xs">
            {DEVICES_DONUT_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-foreground">
                  <span
                    style={{ backgroundColor: d.color }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                  {d.name}
                </span>
                <span className="tabular-nums">
                  <strong className="font-semibold text-foreground">
                    {d.value.toLocaleString("en-US")}
                  </strong>{" "}
                  <span className="text-muted">({d.pct})</span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 5f. PieChart — Revenue: This Year vs Last (Nested Donut) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Revenue: This Year vs Last
          </h3>
          <PieChart height={210}>
            <PieChart.Pie
              data={QUARTER_LAST_YEAR}
              dataKey="value"
              nameKey="name"
              innerRadius={44}
              outerRadius={58}
              cornerRadius={6}
              paddingAngle={2}
            >
              {QUARTER_LAST_YEAR.map((entry) => (
                <PieChart.Cell key={entry.name} fill={entry.color} />
              ))}
            </PieChart.Pie>
            <PieChart.Pie
              data={QUARTER_THIS_YEAR}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={84}
              cornerRadius={8}
              paddingAngle={2}
            >
              {QUARTER_THIS_YEAR.map((entry) => (
                <PieChart.Cell key={entry.name} fill={entry.color} />
              ))}
            </PieChart.Pie>
            <PieChart.Tooltip />
          </PieChart>
          <div className="mt-2 space-y-1.5 text-center text-xs text-muted">
            <div className="flex items-center justify-center gap-4">
              {QUARTER_THIS_YEAR.map((d) => (
                <span key={d.name} className="inline-flex items-center gap-1.5">
                  <span
                    style={{ backgroundColor: d.color }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                  {d.name}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                Last year (inner)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                This year (outer)
              </span>
            </div>
          </div>
        </Card>

        {/* 5g. PieChart — Users by Plan (Horizontal Donut + Breakdown) */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-3 text-base font-semibold text-foreground">
            Users by Plan
          </h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <div className="relative w-48 shrink-0">
              <PieChart height={180}>
                <PieChart.Pie
                  data={PLAN_DONUT_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={80}
                  cornerRadius={8}
                  paddingAngle={2}
                >
                  {PLAN_DONUT_DATA.map((entry) => (
                    <PieChart.Cell key={entry.name} fill={entry.color} />
                  ))}
                </PieChart.Pie>
                <PieChart.Tooltip />
              </PieChart>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-foreground">1,140</span>
                <span className="text-xs text-muted">Total</span>
              </div>
            </div>
            <div className="w-full max-w-xs space-y-2.5 text-sm">
              {PLAN_DONUT_DATA.map((d) => (
                <div key={d.name} className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2.5 text-foreground">
                    <span
                      style={{ backgroundColor: d.color }}
                      className="h-3 w-3 rounded-full"
                    />
                    {d.name}
                  </span>
                  <span className="tabular-nums">
                    <strong className="font-semibold text-foreground">{d.value}</strong>{" "}
                    <span className="text-muted">({d.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
          </>
        ) : null}

        {/* 6. RadialChart (Progress Rings / Gauge) */}
        {show("radial") ? (
          <>
        <Card className="p-5">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-foreground">RadialChart</h3>
            <p className="text-xs text-muted">
              Concentric progress rings dengan background track &amp; hover tooltip
            </p>
          </div>
          <RadialChart data={RADIAL_DATA} height={240} innerRadius="30%" outerRadius="92%">
            <RadialChart.AngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialChart.Bar dataKey="value" />
            <RadialChart.Tooltip
              content={
                <RadialChart.TooltipContent valueFormatter={(v) => `${v}%`} />
              }
            />
          </RadialChart>
        </Card>

        {/* 6b. RadialChart — Daily Steps (Progress Ring) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">Daily Steps</h3>
          <div className="relative flex items-center justify-center">
            <RadialChart
              data={[{ name: "Steps", value: 75, fill: "var(--accent)" }]}
              height={220}
              barSize={14}
              innerRadius="74%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
            >
              <RadialChart.AngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialChart.Bar dataKey="value" />
              <RadialChart.Tooltip
                content={
                  <RadialChart.TooltipContent valueFormatter={(v) => `${v}%`} />
                }
              />
            </RadialChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold tracking-tight text-foreground">75%</span>
              <span className="text-xs text-muted">7,452 / 10,000</span>
            </div>
          </div>
        </Card>

        {/* 6c. RadialChart — Activity Gauge */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">Activity</h3>
          <div className="relative flex items-center justify-center">
            <RadialChart
              data={[{ name: "Active Users", value: 62, fill: "var(--accent)" }]}
              height={220}
              barSize={14}
              innerRadius="74%"
              outerRadius="92%"
              startAngle={225}
              endAngle={-45}
            >
              <RadialChart.AngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialChart.Bar dataKey="value" />
              <RadialChart.Tooltip
                content={
                  <RadialChart.TooltipContent valueFormatter={() => "1,358"} />
                }
              />
            </RadialChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
              <span className="text-xs text-muted">Active Users</span>
              <span className="text-2xl font-bold tracking-tight text-foreground">1,358</span>
            </div>
          </div>
        </Card>
          </>
        ) : null}

        {/* 7a. RadarChart — Platform Comparison */}
        {show("radar") ? (
          <>
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Platform Comparison
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                Team A
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
                Team B
              </span>
            </div>
          </div>
          <RadarChart data={PLATFORM_RADAR_DATA} height={260}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="metric" />
            <RadarChart.Radar
              dataKey="teamA"
              name="Team A"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.18}
            />
            <RadarChart.Radar
              dataKey="teamB"
              name="Team B"
              stroke="#1e40af"
              fill="#1e40af"
              fillOpacity={0.14}
            />
            <RadarChart.Tooltip />
          </RadarChart>
        </Card>

        {/* 7b. RadarChart — Device Usage (3 series) */}
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">Device Usage</h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                Desktop
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                Mobile
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
                Tablet
              </span>
            </div>
          </div>
          <RadarChart data={DEVICE_RADAR_DATA} height={260}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="month" />
            <RadarChart.Radar
              dataKey="desktop"
              name="Desktop"
              stroke="#60a5fa"
              fill="#60a5fa"
              fillOpacity={0.14}
            />
            <RadarChart.Radar
              dataKey="mobile"
              name="Mobile"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.14}
            />
            <RadarChart.Radar
              dataKey="tablet"
              name="Tablet"
              stroke="#1e40af"
              fill="#1e40af"
              fillOpacity={0.14}
            />
            <RadarChart.Tooltip />
          </RadarChart>
        </Card>

        {/* 7c. RadarChart — Sprint Velocity (with RadiusAxis) */}
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">Sprint Velocity</h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                Current
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
                Target
              </span>
            </div>
          </div>
          <RadarChart data={PLATFORM_RADAR_DATA} height={260}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="metric" />
            <RadarChart.RadiusAxis domain={[0, 100]} tickCount={5} />
            <RadarChart.Radar
              dataKey="teamA"
              name="Current"
              stroke="#60a5fa"
              fill="#60a5fa"
              fillOpacity={0.18}
            />
            <RadarChart.Radar
              dataKey="teamB"
              name="Target"
              stroke="#1e40af"
              fill="#1e40af"
              fillOpacity={0.14}
            />
            <RadarChart.Tooltip />
          </RadarChart>
        </Card>

        {/* 7d. RadarChart — Performance Metrics (Dots, no fill) */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Performance Metrics
          </h3>
          <RadarChart data={SKILL_RADAR_DATA} height={260}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="skill" />
            <RadarChart.Radar
              dataKey="score"
              name="Score"
              stroke="var(--accent)"
              fill="transparent"
              fillOpacity={0}
              dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
            />
            <RadarChart.Tooltip />
          </RadarChart>
        </Card>

        {/* 7e. RadarChart — Skill Assessment */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Skill Assessment
          </h3>
          <RadarChart data={SKILL_RADAR_DATA} height={260}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="skill" />
            <RadarChart.Radar
              dataKey="score"
              name="Skill"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.2}
            />
            <RadarChart.Tooltip />
          </RadarChart>
        </Card>
          </>
        ) : null}
      </div>

      {/* 7. ChartTooltip Standalone */}
      {show("tooltip") ? (
        <Card className="p-5">
        <div className="mb-3">
          <h3 className="text-base font-semibold text-foreground">ChartTooltip</h3>
          <p className="text-xs text-muted">
            Varian dot indicator dan line indicator sesuai dokumentasi HeroUI Pro
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ChartTooltip indicator="dot">
            <ChartTooltip.Header>July 2026</ChartTooltip.Header>
            <ChartTooltip.Item>
              <ChartTooltip.Indicator color="var(--accent)" />
              <ChartTooltip.Label>Revenue</ChartTooltip.Label>
              <ChartTooltip.Value>$7,800</ChartTooltip.Value>
            </ChartTooltip.Item>
            <ChartTooltip.Item>
              <ChartTooltip.Indicator color="var(--success)" />
              <ChartTooltip.Label>Profit</ChartTooltip.Label>
              <ChartTooltip.Value>$4,120</ChartTooltip.Value>
            </ChartTooltip.Item>
          </ChartTooltip>

          <ChartTooltip indicator="line">
            <ChartTooltip.Header>Line Indicator</ChartTooltip.Header>
            <ChartTooltip.Item>
              <ChartTooltip.Indicator color="var(--warning)" />
              <ChartTooltip.Label>Target</ChartTooltip.Label>
              <ChartTooltip.Value>$7,200</ChartTooltip.Value>
            </ChartTooltip.Item>
            <ChartTooltip.Item>
              <ChartTooltip.Indicator color="var(--danger)" />
              <ChartTooltip.Label>Expenses</ChartTooltip.Label>
              <ChartTooltip.Value>$3,400</ChartTooltip.Value>
            </ChartTooltip.Item>
          </ChartTooltip>
        </div>
      </Card>
      ) : null}
    </section>
  );
}
