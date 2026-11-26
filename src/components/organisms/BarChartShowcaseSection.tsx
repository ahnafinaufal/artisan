import { Card } from "@heroui/react";
import { KPI } from "../molecules";
import { BarChart } from "./charts";

const DAILY_SALES = [
  { month: "Jan", units: 18 },
  { month: "Feb", units: 31 },
  { month: "Mar", units: 28 },
  { month: "Apr", units: 44 },
  { month: "May", units: 38 },
  { month: "Jun", units: 52 },
  { month: "Jul", units: 42 },
  { month: "Aug", units: 55 },
  { month: "Sep", units: 48 },
  { month: "Oct", units: 59 },
  { month: "Nov", units: 53 },
  { month: "Dec", units: 57 },
];

const CHANNEL_DATA = [
  { month: "Jan", online: 4300, retail: 3200, direct: 3500 },
  { month: "Feb", online: 5800, retail: 3700, direct: 4200 },
  { month: "Mar", online: 4900, retail: 3400, direct: 4000 },
  { month: "Apr", online: 7600, retail: 4300, direct: 5100 },
  { month: "May", online: 6200, retail: 3900, direct: 4600 },
  { month: "Jun", online: 8600, retail: 4500, direct: 5800 },
];

const PLAN_STACKED = [
  { quarter: "Q1", starter: 4500, pro: 8000, enterprise: 11500 },
  { quarter: "Q2", starter: 5500, pro: 9500, enterprise: 15000 },
  { quarter: "Q3", starter: 6500, pro: 11500, enterprise: 18000 },
  { quarter: "Q4", starter: 7500, pro: 13500, enterprise: 22000 },
];

const TOP_PRODUCTS = [
  { name: "Widgets", sold: 1860 },
  { name: "Gadgets", sold: 1580 },
  { name: "Modules", sold: 1240 },
  { name: "Plugins", sold: 980 },
  { name: "Add-ons", sold: 740 },
];

const ENERGY_ACTIVITY = [
  { day: "Mon", low: 140, medium: 320, high: 210 },
  { day: "Tue", low: 170, medium: 360, high: 250 },
  { day: "Wed", low: 200, medium: 290, high: 170 },
  { day: "Thu", low: 160, medium: 330, high: 210 },
  { day: "Fri", low: 180, medium: 310, high: 220 },
  { day: "Sat", low: 150, medium: 270, high: 240 },
  { day: "Sun", low: 190, medium: 340, high: 280 },
];

const WEEKLY_ORDERS = [
  { day: "Mon", thisWeek: 120, lastWeek: 90 },
  { day: "Tue", thisWeek: 180, lastWeek: 150 },
  { day: "Wed", thisWeek: 150, lastWeek: 170 },
  { day: "Thu", thisWeek: 210, lastWeek: 140 },
  { day: "Fri", thisWeek: 190, lastWeek: 160 },
  { day: "Sat", thisWeek: 80, lastWeek: 100 },
  { day: "Sun", thisWeek: 60, lastWeek: 70 },
];

/**
 * Organism: BarChartShowcaseSection
 * Seluruh 8 varian BarChart sesuai dokumentasi HeroUI Pro.
 */
export function BarChartShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          BarChart
        </h2>
        <p className="mt-1 text-sm text-muted">
          Seluruh varian BarChart (Usage, Grouped, Stacked, Horizontal, Horizontal Stacked, Comparison, KPI With Bar Chart, dan Custom Tooltip).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage — Daily Sales */}
        <Card className="p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Daily Sales
              </h3>
              <p className="text-xs text-muted">Units sold per month</p>
            </div>
            <KPI.Trend trend="up">12.5%</KPI.Trend>
          </div>
          <BarChart data={DAILY_SALES} height={220}>
            <BarChart.Grid />
            <BarChart.XAxis dataKey="month" />
            <BarChart.YAxis ticks={[0, 15, 30, 45, 60]} />
            <BarChart.Tooltip />
            <BarChart.Bar
              dataKey="units"
              name="Units"
              fill="#0077ff"
              barSize={14}
              radius={[8, 8, 8, 8]}
            />
          </BarChart>
        </Card>

        {/* 2. Grouped — Revenue by Channel */}
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Revenue by Channel (Grouped)
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0077ff]" />
                Online
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0055cc]" />
                Retail
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
                Direct
              </span>
            </div>
          </div>
          <BarChart data={CHANNEL_DATA} height={220}>
            <BarChart.Grid />
            <BarChart.XAxis dataKey="month" />
            <BarChart.YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <BarChart.Tooltip
              content={
                <BarChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <BarChart.Bar
              dataKey="online"
              name="Online"
              fill="#0077ff"
              barSize={10}
              radius={[5, 5, 0, 0]}
            />
            <BarChart.Bar
              dataKey="retail"
              name="Retail"
              fill="#0055cc"
              barSize={10}
              radius={[5, 5, 0, 0]}
            />
            <BarChart.Bar
              dataKey="direct"
              name="Direct"
              fill="#003399"
              barSize={10}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </Card>

        {/* 3. Stacked — Revenue by Plan */}
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Revenue by Plan (Stacked)
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38a3ff]" />
                Enterprise
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0077ff]" />
                Pro
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
                Starter
              </span>
            </div>
          </div>
          <BarChart data={PLAN_STACKED} height={220}>
            <BarChart.Grid />
            <BarChart.XAxis dataKey="quarter" />
            <BarChart.YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <BarChart.Tooltip
              content={
                <BarChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <BarChart.Bar
              dataKey="starter"
              name="Starter"
              stackId="a"
              fill="#003399"
              barSize={26}
              radius={[0, 0, 0, 0]}
            />
            <BarChart.Bar
              dataKey="pro"
              name="Pro"
              stackId="a"
              fill="#0077ff"
              barSize={26}
              radius={[0, 0, 0, 0]}
            />
            <BarChart.Bar
              dataKey="enterprise"
              name="Enterprise"
              stackId="a"
              fill="#38a3ff"
              barSize={26}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </Card>

        {/* 4. Horizontal — Top Products */}
        <Card className="p-5">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-foreground">
              Top Products (Horizontal)
            </h3>
            <p className="text-xs text-muted">Units sold this quarter</p>
          </div>
          <BarChart
            data={TOP_PRODUCTS}
            layout="vertical"
            height={220}
            margin={{ top: 4, right: 16, bottom: 0, left: 16 }}
          >
            <BarChart.XAxis type="number" domain={[0, 2000]} />
            <BarChart.YAxis type="category" dataKey="name" width={64} />
            <BarChart.Tooltip />
            <BarChart.Bar
              dataKey="sold"
              name="Sold"
              fill="#0077ff"
              barSize={14}
              radius={[8, 8, 8, 8]}
            />
          </BarChart>
        </Card>

        {/* 5. Horizontal Stacked — Avg. Energy Activity */}
        <Card className="p-5">
          <div className="mb-2">
            <h3 className="text-base font-semibold text-foreground">
              Avg. Energy Activity
            </h3>
            <p className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
              580/280{" "}
              <span className="text-xs font-normal text-muted">kcal</span>
            </p>
          </div>
          <BarChart
            data={ENERGY_ACTIVITY}
            layout="vertical"
            height={210}
            margin={{ top: 4, right: 12, bottom: 0, left: 4 }}
          >
            <BarChart.XAxis type="number" hide />
            <BarChart.YAxis type="category" dataKey="day" width={36} />
            <BarChart.Tooltip />
            <BarChart.Bar
              dataKey="low"
              name="Low"
              stackId="e"
              fill="#003399"
              barSize={14}
              radius={[6, 0, 0, 6]}
            />
            <BarChart.Bar
              dataKey="medium"
              name="Medium"
              stackId="e"
              fill="#0055cc"
              barSize={14}
              radius={[0, 0, 0, 0]}
            />
            <BarChart.Bar
              dataKey="high"
              name="High"
              stackId="e"
              fill="#38a3ff"
              barSize={14}
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
              Low
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0055cc]" />
              Medium
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#38a3ff]" />
              High
            </span>
          </div>
        </Card>

        {/* 6. Comparison — Weekly Orders */}
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Weekly Orders (Comparison)
              </h3>
              <p className="text-xs text-muted">This week vs last week</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0077ff]" />
                This week
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
                Last week
              </span>
            </div>
          </div>
          <BarChart data={WEEKLY_ORDERS} height={220}>
            <BarChart.Grid />
            <BarChart.XAxis dataKey="day" />
            <BarChart.YAxis ticks={[0, 55, 110, 165, 220]} />
            <BarChart.Tooltip />
            <BarChart.Bar
              dataKey="thisWeek"
              name="This week"
              fill="#0077ff"
              barSize={12}
              radius={[5, 5, 0, 0]}
            />
            <BarChart.Bar
              dataKey="lastWeek"
              name="Last week"
              fill="#003399"
              barSize={12}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </Card>

        {/* 7. KPI With Bar Chart — Monthly Sales */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted">Monthly Sales</h3>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                278
              </span>
              <KPI.Trend trend="up" variant="inline" subtitle="last 30d">
                3.3%
              </KPI.Trend>
            </div>
          </div>
          <BarChart data={DAILY_SALES} height={190}>
            <BarChart.Grid />
            <BarChart.XAxis dataKey="month" />
            <BarChart.Tooltip />
            <BarChart.Bar
              dataKey="units"
              name="Sales"
              fill="#0077ff"
              barSize={18}
              radius={[9, 9, 9, 9]}
            />
          </BarChart>
        </Card>
      </div>
    </section>
  );
}
