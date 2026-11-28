import { Earnings, type EarningsPeriod } from "@/components/ui/earnings";

const PERIODS: EarningsPeriod[] = [
  {
    id: "7d",
    label: "7D",
    comparison: "vs 7 hari sebelumnya",
    previous: 2100000,
    trend: [240, 310, 280, 390, 420, 380, 510],
    trendLabels: ["22 Nov", "23 Nov", "24 Nov", "25 Nov", "26 Nov", "27 Nov", "28 Nov"],
    sources: [
      { id: "sponsor", label: "Sponsorship", amount: 1850000, change: 12.4 },
      { id: "affiliate", label: "Affiliate", amount: 940000, change: 6.8 },
      { id: "digital", label: "Produk digital", amount: 520000, change: -2.4 },
    ],
  },
  {
    id: "30d",
    label: "30D",
    comparison: "vs 30 hari sebelumnya",
    previous: 8900000,
    trend: [240, 310, 280, 390, 420, 380, 510, 470, 540, 610],
    trendLabels: ["1 Nov", "4 Nov", "7 Nov", "10 Nov", "13 Nov", "16 Nov", "19 Nov", "22 Nov", "25 Nov", "28 Nov"],
    sources: [
      { id: "sponsor", label: "Sponsorship", amount: 4200000, change: 8.2 },
      { id: "affiliate", label: "Affiliate", amount: 3100000, change: 14.6 },
      { id: "digital", label: "Produk digital", amount: 1250000, change: -3.1 },
    ],
  },
  {
    id: "12m",
    label: "12M",
    comparison: "vs 12 bulan sebelumnya",
    previous: 92000000,
    trend: [3.8, 4.2, 4.1, 4.9, 5.4, 5.1, 5.8, 6.2, 6.7, 6.4, 7.1, 7.6],
    trendLabels: ["Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov"],
    sources: [
      { id: "sponsor", label: "Sponsorship", amount: 52000000, change: 22.5 },
      { id: "affiliate", label: "Affiliate", amount: 28000000, change: 9.4 },
      { id: "digital", label: "Produk digital", amount: 14500000, change: 5.2 },
    ],
  },
];

export function EarningsShowcaseSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Earnings</h2>
        <p className="mt-1 text-sm text-muted">
          Ringkasan pendapatan dengan total beranimasi, trend line yang bisa digeser, dan rincian sumber pendapatan.
        </p>
      </div>

      <div className="w-full max-w-[560px]">
        <Earnings
          periods={PERIODS}
          payout={{ label: "Payout berikutnya", date: "5 Des", amount: 1240000 }}
          currency="IDR"
          locale="id-ID"
        />
      </div>
    </section>
  );
}
