import { useState } from "react";
import { Card, Tabs } from "@heroui/react";
import { KPI } from "../molecules";
import { LineChart } from "./charts";

const SESSIONS_DATA = [
  { month: "Jan", organic: 2100, paid: 1200 },
  { month: "Feb", organic: 15200, paid: 10100 },
  { month: "Mar", organic: 8100, paid: 11900 },
  { month: "Apr", organic: 14100, paid: 14000 },
  { month: "May", organic: 15100, paid: 8100 },
  { month: "Jun", organic: 8200, paid: 9200 },
  { month: "Jul", organic: 18100, paid: 12000 },
  { month: "Aug", organic: 18200, paid: 10100 },
  { month: "Sep", organic: 20100, paid: 5200 },
  { month: "Oct", organic: 17200, paid: 11800 },
  { month: "Nov", organic: 21800, paid: 18200 },
  { month: "Dec", organic: 15100, paid: 9100 },
];

const MULTI_TRAFFIC_DATA = [
  { month: "Jan", organic: 2000, paid: 1100, referral: 900, direct: 600 },
  { month: "Feb", organic: 5000, paid: 3100, referral: 1600, direct: 1300 },
  { month: "Mar", organic: 8000, paid: 5100, referral: 2200, direct: 2100 },
  { month: "Apr", organic: 7000, paid: 6000, referral: 2800, direct: 1900 },
  { month: "May", organic: 9500, paid: 4000, referral: 3200, direct: 2600 },
  { month: "Jun", organic: 8000, paid: 5500, referral: 2600, direct: 2000 },
  { month: "Jul", organic: 12000, paid: 7000, referral: 4100, direct: 3100 },
  { month: "Aug", organic: 11000, paid: 6500, referral: 3800, direct: 2800 },
  { month: "Sep", organic: 14000, paid: 8000, referral: 4500, direct: 3500 },
  { month: "Oct", organic: 13000, paid: 9000, referral: 5200, direct: 3200 },
  { month: "Nov", organic: 16000, paid: 10000, referral: 5800, direct: 4000 },
  { month: "Dec", organic: 15000, paid: 9500, referral: 5200, direct: 3700 },
];

const MONTHLY_REV_LINE = [
  { month: "Jan", actual: 4200, target: 5000 },
  { month: "Feb", actual: 5800, target: 5500 },
  { month: "Mar", actual: 4900, target: 6000 },
  { month: "Apr", actual: 7200, target: 6500 },
  { month: "May", actual: 6100, target: 7000 },
  { month: "Jun", actual: 8400, target: 7500 },
  { month: "Jul", actual: 7800, target: 8000 },
  { month: "Aug", actual: 9200, target: 8500 },
  { month: "Sep", actual: 8600, target: 9000 },
  { month: "Oct", actual: 10200, target: 9500 },
  { month: "Nov", actual: 9800, target: 10000 },
  { month: "Dec", actual: 11500, target: 10500 },
];

const PORTFOLIO_SERIES: Record<string, Array<{ t: string; v: number }>> = {
  "1H": [
    { t: "10:00", v: 24750 },
    { t: "10:10", v: 24790 },
    { t: "10:20", v: 24720 },
    { t: "10:30", v: 24770 },
    { t: "10:40", v: 24710 },
    { t: "10:50", v: 24810 },
    { t: "11:00", v: 24801 },
  ],
  "1D": [
    { t: "00:00", v: 24420 },
    { t: "04:00", v: 24510 },
    { t: "08:00", v: 24480 },
    { t: "12:00", v: 24650 },
    { t: "16:00", v: 24740 },
    { t: "20:00", v: 24801 },
  ],
  "1W": [
    { t: "Mon", v: 23900 },
    { t: "Tue", v: 24120 },
    { t: "Wed", v: 24050 },
    { t: "Thu", v: 24480 },
    { t: "Fri", v: 24690 },
    { t: "Sun", v: 24801 },
  ],
  "1M": [
    { t: "W1", v: 22800 },
    { t: "W2", v: 23400 },
    { t: "W3", v: 23950 },
    { t: "W4", v: 24801 },
  ],
  "1Y": [
    { t: "Q1", v: 18900 },
    { t: "Q2", v: 21200 },
    { t: "Q3", v: 23100 },
    { t: "Q4", v: 24801 },
  ],
  ALL: [
    { t: "2023", v: 14200 },
    { t: "2024", v: 18600 },
    { t: "2025", v: 21900 },
    { t: "2026", v: 24801 },
  ],
};

const SPARK_UP = [
  { i: 1, v: 20 },
  { i: 2, v: 26 },
  { i: 3, v: 22 },
  { i: 4, v: 34 },
  { i: 5, v: 30 },
  { i: 6, v: 42 },
  { i: 7, v: 48 },
];

const SPARK_DOWN = [
  { i: 1, v: 46 },
  { i: 2, v: 42 },
  { i: 3, v: 44 },
  { i: 4, v: 36 },
  { i: 5, v: 34 },
  { i: 6, v: 26 },
  { i: 7, v: 22 },
];

/**
 * Organism: LineChartShowcaseSection
 * Seluruh varian LineChart sesuai dokumentasi HeroUI Pro:
 * Traffic Source, Portfolio, Multi Line Colors, With Dots, Dashed Comparison,
 * Sparkline, KPI With Chart, Stats With Chart, dan Sessions (Custom Tooltip).
 */
export function LineChartShowcaseSection() {
  const [timeframe, setTimeframe] = useState("1H");
  const portfolioData = PORTFOLIO_SERIES[timeframe] ?? PORTFOLIO_SERIES["1H"];

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          LineChart Variants
        </h2>
        <p className="mt-1 text-sm text-muted">
          Seluruh contoh LineChart sesuai dokumentasi HeroUI Pro lengkap dengan hover tooltip &amp; multi-series.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage / Traffic Source (Linear) */}
        <Card className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Traffic Source
              </h3>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                231,856
              </p>
              <p className="text-xs text-muted">Sessions</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38a3ff]" />
                Organic
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
                Paid Ads
              </span>
            </div>
          </div>
          <LineChart data={SESSIONS_DATA} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`)}
            />
            <LineChart.Tooltip />
            <LineChart.Line
              type="linear"
              dataKey="organic"
              name="Organic"
              stroke="#38a3ff"
            />
            <LineChart.Line
              type="linear"
              dataKey="paid"
              name="Paid Ads"
              stroke="#003399"
            />
          </LineChart>
        </Card>

        {/* 2. Portfolio (Interactive Timeframe Tabs) */}
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">Portfolio</h3>
              <p className="mt-1 text-xs text-muted">Total balance</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                $24,801.32
              </p>
              <p className="text-xs font-medium text-success">+$42.10 (0.17%)</p>
            </div>
            <Tabs
              selectedKey={timeframe}
              onSelectionChange={(k) => setTimeframe(String(k))}
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="Timeframe">
                  {(["1H", "1D", "1W", "1M", "1Y", "ALL"] as const).map((tf) => (
                    <Tabs.Tab key={tf} id={tf} className="px-2 text-xs">
                      {tf}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>
          <LineChart data={portfolioData} height={175}>
            <LineChart.YAxis hide domain={["dataMin - 40", "dataMax + 40"]} />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <LineChart.Line
              dataKey="v"
              name="Balance"
              stroke="var(--accent)"
              strokeWidth={2}
            />
          </LineChart>
        </Card>

        {/* 3. Multi Line Chart Colors */}
        <Card className="p-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Traffic Sources
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#60a5fa]" />
                Organic
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
                Paid Ads
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1d4ed8]" />
                Referral
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1e3a8a]" />
                Direct
              </span>
            </div>
          </div>
          <LineChart data={MULTI_TRAFFIC_DATA} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`)}
            />
            <LineChart.Tooltip />
            <LineChart.Line dataKey="organic" name="Organic" stroke="#60a5fa" />
            <LineChart.Line dataKey="paid" name="Paid Ads" stroke="#2563eb" />
            <LineChart.Line dataKey="referral" name="Referral" stroke="#1d4ed8" />
            <LineChart.Line dataKey="direct" name="Direct" stroke="#1e3a8a" />
          </LineChart>
        </Card>

        {/* 4. With Dots */}
        <Card className="p-5">
          <h3 className="mb-2 text-base font-semibold text-foreground">
            Monthly Revenue (With Dots)
          </h3>
          <LineChart data={MONTHLY_REV_LINE} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <LineChart.Line
              dataKey="actual"
              name="Revenue"
              stroke="var(--accent)"
              dot={{ r: 3.5, fill: "var(--accent)", strokeWidth: 0 }}
            />
          </LineChart>
        </Card>

        {/* 5. Dashed Comparison */}
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Actual vs Target
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                Actual
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-blue-700" />
                Target
              </span>
            </div>
          </div>
          <LineChart data={MONTHLY_REV_LINE} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <LineChart.Line dataKey="actual" name="Actual" stroke="var(--accent)" />
            <LineChart.Line
              dataKey="target"
              name="Target"
              stroke="#1d4ed8"
              strokeDasharray="5 5"
            />
          </LineChart>
        </Card>

        {/* 6. Sessions (Smooth Multi-Line + Custom Tooltip) */}
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">Sessions</h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38a3ff]" />
                Organic
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#003399]" />
                Paid Ads
              </span>
            </div>
          </div>
          <LineChart data={SESSIONS_DATA} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`)}
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  indicator="line"
                  valueFormatter={(v) => Number(v).toLocaleString("en-US")}
                />
              }
            />
            <LineChart.Line dataKey="organic" name="Organic" stroke="#38a3ff" />
            <LineChart.Line dataKey="paid" name="Paid Ads" stroke="#003399" />
          </LineChart>
        </Card>
      </div>

      {/* 7. Sparkline Row */}
      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">Sparkline</h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-xs font-medium text-muted">Revenue</p>
            <LineChart data={SPARK_UP} height={56}>
              <LineChart.Line dataKey="v" stroke="var(--success)" />
            </LineChart>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted">Churn</p>
            <LineChart data={SPARK_DOWN} height={56}>
              <LineChart.Line dataKey="v" stroke="var(--danger)" />
            </LineChart>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted">Users</p>
            <LineChart data={SPARK_UP} height={56}>
              <LineChart.Line dataKey="v" stroke="var(--accent)" />
            </LineChart>
          </div>
        </div>
      </Card>

      {/* 8. Stats With Chart */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Stats With Chart
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <KPI>
            <KPI.Header>
              <KPI.Title>Revenue</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-center justify-between gap-2">
                <KPI.Value value={228441} prefix="$" />
                <KPI.Trend trend="up">3.3%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>
          <KPI>
            <KPI.Header>
              <KPI.Title>Expenses</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-center justify-between gap-2">
                <KPI.Value value={25108} prefix="$" />
                <KPI.Trend trend="down">3.3%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>
          <KPI>
            <KPI.Header>
              <KPI.Title>Sales</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-center justify-between gap-2">
                <KPI.Value value={458} />
                <KPI.Trend trend="up">3.3%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>
        </div>

        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-base font-semibold text-foreground">
              Monthly Revenue
            </h4>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Revenue
            </span>
          </div>
          <LineChart data={MONTHLY_REV_LINE} height={220}>
            <LineChart.Grid />
            <LineChart.XAxis dataKey="month" />
            <LineChart.YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={(v) => `$${Number(v).toLocaleString("en-US")}`}
                />
              }
            />
            <LineChart.Line dataKey="actual" name="Revenue" stroke="var(--accent)" />
          </LineChart>
        </Card>
      </div>
    </section>
  );
}
