import { FunnelChart } from "@/components/ui/funnel-chart";

const STAGES = [
  { label: "Lihat halaman", value: 48200 },
  { label: "Daftar akun", value: 15840 },
  { label: "Buat proyek", value: 9120 },
  { label: "Langganan Pro", value: 1380 },
];

export function FunnelChartShowcaseSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">FunnelChart</h2>
        <p className="mt-1 text-sm text-muted">
          Funnel konversi dengan lebar per tahap, bridge drop-off melengkung, dan chip kehilangan di antara tahap.
        </p>
      </div>

      <div className="w-full max-w-lg rounded-2xl bg-surface p-5 ring-1 ring-border">
        <FunnelChart
          stages={STAGES}
          formatValue={(value) => value.toLocaleString("id-ID")}
        />
      </div>
    </section>
  );
}
