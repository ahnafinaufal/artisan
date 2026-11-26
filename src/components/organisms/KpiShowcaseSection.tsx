import { useState } from "react";
import { Card } from "@heroui/react";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Scan,
  ShoppingCart,
  Tag,
  Target,
  Users,
} from "lucide-react";
import { KPI, type KpiDataPoint } from "../molecules";

const UP_TREND: KpiDataPoint[] = [
  { label: "Mon", value: 185 },
  { label: "Tue", value: 192 },
  { label: "Wed", value: 180 },
  { label: "Thu", value: 208 },
  { label: "Fri", value: 204 },
  { label: "Sat", value: 221 },
  { label: "Sun", value: 228 },
];

const DOWN_TREND: KpiDataPoint[] = [
  { label: "Mon", value: 56 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 51 },
  { label: "Fri", value: 50 },
  { label: "Sat", value: 48 },
  { label: "Sun", value: 49 },
];

const RESPONSE_TREND: KpiDataPoint[] = [
  { label: "Mon", value: 21 },
  { label: "Tue", value: 19 },
  { label: "Wed", value: 23 },
  { label: "Thu", value: 17 },
  { label: "Fri", value: 19 },
  { label: "Sat", value: 17 },
  { label: "Sun", value: 16 },
];

const MONTHLY_REVENUE = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5800 },
  { month: "Mar", value: 4900 },
  { month: "Apr", value: 7200 },
  { month: "May", value: 6100 },
  { month: "Jun", value: 8400 },
  { month: "Jul", value: 7800 },
  { month: "Aug", value: 9200 },
  { month: "Sep", value: 8600 },
  { month: "Oct", value: 10200 },
  { month: "Nov", value: 9800 },
  { month: "Dec", value: 11500 },
];

function buildSmoothAreaPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length === 0) return "";
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

/**
 * Organism: MonthlyRevenueChart
 * AreaChart lengkap dengan Y-axis ($0k-$12k), X-axis (Jan-Dec), crosshair, dan tooltip hover.
 */
function MonthlyRevenueChart() {
  const [activeIdx, setActiveIdx] = useState<number | null>(6);
  const width = 640;
  const height = 220;
  const maxVal = 12000;

  const pts = MONTHLY_REVENUE.map((d, i) => ({
    ...d,
    x: (i / (MONTHLY_REVENUE.length - 1)) * width,
    y: height - (d.value / maxVal) * height,
  }));

  const linePath = buildSmoothAreaPath(pts);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const activePt = activeIdx !== null ? pts[activeIdx] : null;
  const yTicks = [12000, 9000, 6000, 3000, 0];

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Monthly Revenue
      </h3>
      <div className="flex gap-3">
        <div className="flex h-[220px] flex-col justify-between text-right text-xs text-muted">
          {yTicks.map((tick) => (
            <span key={tick}>${tick / 1000}k</span>
          ))}
        </div>

        <div className="relative flex-1">
          <div className="relative h-[220px] w-full">
            {activePt ? (
              <div
                style={{
                  left: `${Math.min(Math.max((activePt.x / width) * 100 + 6, 12), 84)}%`,
                  top: `${Math.min(Math.max((activePt.y / height) * 100 + 8, 10), 68)}%`,
                }}
                className="pointer-events-none absolute z-20 rounded-xl border border-border bg-overlay px-3.5 py-2.5 shadow-md transition-all duration-150 ease-out"
              >
                <p className="text-xs font-medium text-muted">{activePt.month}</p>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="text-muted">Revenue</span>
                  <span className="font-semibold tabular-nums text-foreground">
                    ${activePt.value.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            ) : null}

            <svg
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
              className="h-full w-full cursor-crosshair overflow-visible"
              onMouseLeave={() => setActiveIdx(null)}
            >
              <defs>
                <linearGradient id="monthlyRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {yTicks.map((tick) => {
                const y = height - (tick / maxVal) * height;
                return (
                  <line
                    key={tick}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              <path d={areaPath} fill="url(#monthlyRevGrad)" />
              <path
                d={linePath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {pts.map((pt, i) => (
                <rect
                  key={pt.month}
                  x={pt.x - width / (pts.length * 2)}
                  y={0}
                  width={width / pts.length}
                  height={height}
                  fill="transparent"
                  onMouseEnter={() => setActiveIdx(i)}
                />
              ))}
            </svg>

            {activePt ? (
              <>
                <div
                  style={{ left: `${(activePt.x / width) * 100}%` }}
                  className="pointer-events-none absolute top-0 bottom-0 z-10 w-px border-l border-dashed border-muted transition-all duration-150 ease-out"
                />
                <div
                  style={{
                    left: `${(activePt.x / width) * 100}%`,
                    top: `${(activePt.y / height) * 100}%`,
                  }}
                  className="pointer-events-none absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow-sm transition-all duration-150 ease-out"
                />
              </>
            ) : null}
          </div>

          <div className="mt-2 flex justify-between text-xs text-muted">
            {MONTHLY_REVENUE.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Organism: KpiShowcaseSection
 * Menampilkan seluruh varian KPI & Monthly Revenue AreaChart sesuai dokumentasi HeroUI Pro.
 */
export function KpiShowcaseSection() {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          KPI &amp; AreaChart Showcase
        </h2>
        <p className="mt-1 text-sm text-muted">
          Implementasi lengkap seluruh varian KPI Card dan AreaChart sesuai dokumentasi HeroUI Pro beserta hover tooltip.
        </p>
      </div>

      {/* 1. With Icon */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Icon</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <Users className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Total Users</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value={5400} />
                <KPI.Trend trend="up">+33%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="warning">
                <DollarSign className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Total Sales</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value={15400} prefix="$" />
                <KPI.Trend trend="neutral">0.0%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="danger">
                <Tag className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Net Profit</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value={10400} prefix="$" />
                <KPI.Trend trend="down">-3.3%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>
        </div>
      </div>

      {/* 2. With Actions */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <ShoppingCart className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Conversion Rate</KPI.Title>
            </KPI.Header>
            <KPI.Actions />
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value="3.8%" />
                <KPI.Trend trend="up">+1.7%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="danger">
                <FileText className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Bounce Rate</KPI.Title>
            </KPI.Header>
            <KPI.Actions />
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value="42.3%" />
                <KPI.Trend trend="down">-5.9%</KPI.Trend>
              </div>
            </KPI.Content>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="warning">
                <Scan className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Load Time</KPI.Title>
            </KPI.Header>
            <KPI.Actions />
            <KPI.Content>
              <KPI.Value value="856" />
              <KPI.Progress value={66} color="warning" />
            </KPI.Content>
          </KPI>
        </div>
      </div>

      {/* 3. With Footer */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Footer</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <Users className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Total Subscribers</KPI.Title>
              <div className="ml-auto">
                <KPI.Trend trend="up">+122</KPI.Trend>
              </div>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value={71897} />
            </KPI.Content>
            <KPI.Footer>View all</KPI.Footer>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="warning">
                <DollarSign className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Monthly Revenue</KPI.Title>
              <div className="ml-auto">
                <KPI.Trend trend="up">+20.1%</KPI.Trend>
              </div>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value={45231} prefix="$" />
            </KPI.Content>
            <KPI.Footer>View report</KPI.Footer>
          </KPI>
        </div>
      </div>

      {/* 4. With Chart Bottom */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Chart Bottom</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Title>Total Revenue</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value={228451} prefix="$" />
                <KPI.Trend trend="up">+3.3%</KPI.Trend>
              </div>
            </KPI.Content>
            <KPI.Chart data={UP_TREND} color="success" valuePrefix="$" valueSuffix="k" />
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Title>Baer Limited (BAL)</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value="49.33" prefix="$" />
                <KPI.Trend trend="down">-1.9%</KPI.Trend>
              </div>
            </KPI.Content>
            <KPI.Chart data={DOWN_TREND} color="danger" valuePrefix="$" />
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <Users className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Active Users</KPI.Title>
            </KPI.Header>
            <KPI.Actions />
            <KPI.Content>
              <div className="flex items-end justify-between gap-2">
                <KPI.Value value="98K" />
                <KPI.Trend trend="neutral">10.9%</KPI.Trend>
              </div>
            </KPI.Content>
            <KPI.Chart data={UP_TREND} color="accent" valueSuffix="K" />
          </KPI>
        </div>
      </div>

      {/* 5. With Chart Inline */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Chart Inline</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Icon variant="plain">
                <Target className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Total Clicks</KPI.Title>
            </KPI.Header>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <KPI.Value value={2441} />
                <KPI.Trend trend="up" variant="inline" subtitle="last 30d">
                  3.5%
                </KPI.Trend>
              </div>
              <div className="w-32 shrink-0">
                <KPI.Chart data={UP_TREND} color="accent" height={42} />
              </div>
            </div>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon variant="plain">
                <FileText className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Bounce Rate</KPI.Title>
            </KPI.Header>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <KPI.Value value="42.3%" />
                <KPI.Trend trend="down" variant="inline" subtitle="vs last 7d">
                  5.9%
                </KPI.Trend>
              </div>
              <div className="w-32 shrink-0">
                <KPI.Chart data={DOWN_TREND} color="danger" height={42} valueSuffix="%" />
              </div>
            </div>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <DollarSign className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Monthly Revenue</KPI.Title>
            </KPI.Header>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <KPI.Value value={21300} prefix="$" />
                <KPI.Trend trend="up" variant="inline" subtitle="last 30d">
                  11.5%
                </KPI.Trend>
              </div>
              <div className="w-32 shrink-0">
                <KPI.Chart data={UP_TREND} color="success" height={42} valuePrefix="$" />
              </div>
            </div>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon variant="plain">
                <Clock className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Time to First Response</KPI.Title>
            </KPI.Header>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <KPI.Value value="16 min" />
                <KPI.Trend trend="down" variant="inline" subtitle="vs last week">
                  27%
                </KPI.Trend>
              </div>
              <div className="w-32 shrink-0">
                <KPI.Chart data={RESPONSE_TREND} color="success" height={42} valueSuffix="m" />
              </div>
            </div>
          </KPI>

          <KPI>
            <KPI.Header>
              <KPI.Icon variant="plain">
                <CheckCircle2 className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Time to Resolve</KPI.Title>
            </KPI.Header>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <KPI.Value value="141 min" />
                <KPI.Trend trend="down" variant="inline" subtitle="vs last week">
                  20%
                </KPI.Trend>
              </div>
              <div className="w-32 shrink-0">
                <KPI.Chart data={DOWN_TREND} color="accent" height={42} valueSuffix="m" />
              </div>
            </div>
          </KPI>
        </div>
      </div>

      {/* 6. With Progress */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">With Progress</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPI>
            <KPI.Header>
              <KPI.Icon status="success">
                <FileText className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Server Load</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value="38%" />
              <KPI.Progress value={38} color="success" />
            </KPI.Content>
          </KPI>
          <KPI>
            <KPI.Header>
              <KPI.Icon status="danger">
                <FileText className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Server Load</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value="98%" />
              <KPI.Progress value={98} color="danger" />
            </KPI.Content>
          </KPI>
          <KPI>
            <KPI.Header>
              <KPI.Icon status="warning">
                <Scan className="h-4 w-4" />
              </KPI.Icon>
              <KPI.Title>Average Memory Used</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value="64%" />
              <KPI.Progress value={64} color="warning" />
            </KPI.Content>
          </KPI>
        </div>
      </div>

      {/* 7. Monthly Revenue AreaChart */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">AreaChart with Tooltip</h3>
        <MonthlyRevenueChart />
      </div>
    </section>
  );
}
