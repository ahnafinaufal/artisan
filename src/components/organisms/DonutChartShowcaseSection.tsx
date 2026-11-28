import { Card } from "@heroui/react";
import { DonutChart } from "@/components/ui/donut-chart";

const CHANNEL_DATA = [
  { label: "Instagram", value: 5240 },
  { label: "TikTok", value: 3180 },
  { label: "YouTube", value: 2260 },
  { label: "Facebook", value: 1610 },
];

const PROGRESS_DATA = [
  { label: "Selesai", value: 68 },
  { label: "Berjalan", value: 24 },
  { label: "Belum mulai", value: 8 },
];

export function DonutChartShowcaseSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">DonutChart</h2>
        <p className="mt-1 text-sm text-muted">
          Donut dan half-ring gauge SVG dengan arc animasi, readout tengah, hover, dan legend yang memfilter slice.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Distribusi jangkauan</h3>
            <p className="mt-1 text-sm text-muted">
              Klik item legend untuk menyembunyikan slice tanpa membuat ring kolaps.
            </p>
          </div>
          <DonutChart
            className="mt-4 flex-1 justify-center"
            data={CHANNEL_DATA}
            centerLabel="Total jangkauan"
            formatValue={(value) => value.toLocaleString("id-ID")}
          />
        </Card>

        <Card className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Gauge setengah lingkaran</h3>
            <p className="mt-1 text-sm text-muted">
              Varian semi menampilkan distribusi status tugas dalam satu busur.
            </p>
          </div>
          <DonutChart
            className="mt-4 flex-1 justify-center"
            variant="semi"
            data={PROGRESS_DATA}
            centerLabel="Total tugas"
          />
        </Card>
      </div>
    </section>
  );
}
