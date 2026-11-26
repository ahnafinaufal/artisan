import { CheckCircle2, Clock, Layers, Sparkles } from "lucide-react";
import { KPI, type KpiColor } from "../../../components/molecules/KPI";
import type { ContentIdea, SummaryCardKey } from "../types";

interface SummaryCardsProps {
  /** Ideas already filtered by brand, platform, and period (NOT status) */
  scopedIdeas: ContentIdea[];
  activeCard: SummaryCardKey | null;
  onSelectCard: (key: SummaryCardKey) => void;
}

export function SummaryCards({
  scopedIdeas,
  activeCard,
  onSelectCard,
}: SummaryCardsProps) {
  const activeIdeas = scopedIdeas.filter((i) => !i.isArchived);
  const totalCount = activeIdeas.length;
  const reviewCount = activeIdeas.filter((i) => i.status === "Diajukan").length;
  const readyCount = activeIdeas.filter((i) => i.status === "Disetujui").length;
  const convertedCount = activeIdeas.filter(
    (i) => i.status === "Jadi Konten",
  ).length;

  const cards: Array<{
    key: SummaryCardKey;
    label: string;
    value: number;
    delta: string;
    helper: string;
    color: KpiColor;
    icon: React.ReactNode;
  }> = [
    {
      key: "total",
      label: "Total Ide",
      value: totalCount,
      delta: "+2",
      helper: "Semua ide aktif",
      color: "accent",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      key: "review",
      label: "Perlu Direview",
      value: reviewCount,
      delta: "+1",
      helper: "Status = Diajukan",
      color: "warning",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      key: "ready",
      label: "Siap Diproduksi",
      value: readyCount,
      delta: "+1",
      helper: "Status = Disetujui",
      color: "success",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      key: "converted",
      label: "Jadi Konten",
      value: convertedCount,
      delta: "+1",
      helper: "Sudah masuk produksi",
      color: "accent",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const isSelected = activeCard === card.key;

        return (
          <div
            key={card.key}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCard(card.key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCard(card.key);
              }
            }}
            className={`cursor-pointer transition-all ${
              isSelected ? "" : "hover:opacity-95"
            }`}
          >
            <KPI className={isSelected ? "ring-2 ring-accent/60" : ""}>
              <KPI.Header>
                <KPI.Icon status={card.color} variant="tinted">
                  {card.icon}
                </KPI.Icon>
                <KPI.Title>{card.label}</KPI.Title>
              </KPI.Header>
              <KPI.Content>
                <div className="flex items-end justify-between gap-2">
                  <KPI.Value value={card.value} />
                  <KPI.Trend trend="up">{card.delta}</KPI.Trend>
                </div>
              </KPI.Content>
              <KPI.Footer>
                <span className="text-muted">
                  {isSelected ? "Filter aktif · Klik untuk reset" : card.helper}
                </span>
              </KPI.Footer>
            </KPI>
          </div>
        );
      })}
    </div>
  );
}
