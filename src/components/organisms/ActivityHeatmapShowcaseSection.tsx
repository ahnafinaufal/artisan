import { Card } from "@heroui/react";
import { ActivityHeatmap } from "@/components/ui/activity-heatmap";

const CALENDAR_DATA = [
  { date: "2026-10-18", value: 3 },
  { date: "2026-10-19", value: 9 },
  { date: "2026-10-20", value: 5 },
  { date: "2026-10-21", value: 12 },
  { date: "2026-10-24", value: 7 },
  { date: "2026-10-28", value: 15 },
  { date: "2026-11-03", value: 4 },
  { date: "2026-11-08", value: 10 },
  { date: "2026-11-14", value: 6 },
  { date: "2026-11-20", value: 13 },
];

const HOURS_MATRIX = [
  [1, 0, 0, 0, 0, 1, 3, 6, 9, 11, 8, 7, 10, 12, 8, 6, 5, 7, 9, 6, 3, 2, 1, 0],
  [0, 0, 0, 0, 1, 2, 4, 7, 12, 14, 10, 8, 11, 15, 12, 8, 7, 9, 10, 8, 4, 2, 1, 0],
  [0, 0, 0, 0, 0, 1, 3, 8, 11, 13, 9, 8, 12, 16, 13, 9, 6, 8, 11, 7, 4, 2, 0, 0],
  [1, 0, 0, 0, 0, 2, 5, 9, 13, 15, 12, 9, 10, 14, 11, 8, 7, 10, 12, 9, 5, 2, 1, 0],
  [0, 0, 0, 0, 0, 1, 4, 7, 10, 12, 9, 7, 9, 13, 10, 7, 6, 8, 9, 7, 4, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 3, 5, 7, 6, 4, 5, 8, 7, 5, 4, 6, 8, 6, 3, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 4, 3, 4, 6, 5, 3, 2, 4, 6, 4, 2, 1, 0, 0],
];

export function ActivityHeatmapShowcaseSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">ActivityHeatmap</h2>
        <p className="mt-1 text-sm text-muted">Kalender kontribusi dan pola aktivitas menurut hari serta jam.</p>
      </div>

      <Card className="p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Aktivitas harian</h3>
        <p className="mt-1 text-sm text-muted">Kolom menyesuaikan lebar area yang tersedia.</p>
        <ActivityHeatmap className="mt-5" data={CALENDAR_DATA} endDate="2026-11-28" weekStart={1} color="var(--accent)" unit="aktivitas" />
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Pola aktivitas per jam</h3>
        <p className="mt-1 text-sm text-muted">Distribusi aktivitas setiap hari dalam satu minggu.</p>
        <ActivityHeatmap className="mt-5" mode="hours" matrix={HOURS_MATRIX} color="var(--accent)" unit="aktivitas" />
      </Card>
    </section>
  );
}
