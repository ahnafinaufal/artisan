import { Button, Card, Chip } from "@heroui/react";
import { ArrowRight, CheckCircle2, Clock3, Lightbulb } from "lucide-react";
import { ActivityHeatmap, type HeatDay } from "../ui/activity-heatmap";
import { INITIAL_IDEAS } from "../../features/bank-ide/mockData";
import type { IdeaStatus } from "../../features/bank-ide/types";

export interface WorkspaceDashboardProps {
  onOpenBankIde: () => void;
}

const activeIdeas = INITIAL_IDEAS.filter((idea) => !idea.isArchived);
const needsReview = activeIdeas.filter((idea) => idea.status === "Diajukan" || idea.status === "Revisi");
const approved = activeIdeas.filter((idea) => idea.status === "Disetujui");
const converted = activeIdeas.filter((idea) => idea.status === "Jadi Konten");
const recentIdeas = [...activeIdeas]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  .slice(0, 4);

const activityByDate = new Map<string, number>();
for (const idea of activeIdeas) {
  for (const timestamp of [idea.createdAt, idea.updatedAt]) {
    const date = timestamp.slice(0, 10);
    activityByDate.set(date, (activityByDate.get(date) ?? 0) + 1);
  }
}
const activityData: HeatDay[] = Array.from(activityByDate, ([date, value]) => ({ date, value }));

const statusColor: Partial<Record<IdeaStatus, "accent" | "success" | "warning" | "default">> = {
  Diajukan: "accent",
  Revisi: "warning",
  Disetujui: "success",
  "Jadi Konten": "success",
};

export function WorkspaceDashboard({ onOpenBankIde }: WorkspaceDashboardProps) {
  return (
    <section className="mx-auto w-full max-w-[1280px] space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Ringkasan aktivitas ide konten di workspace Artisan.</p>
        </div>
        <Button variant="secondary" size="sm" onPress={onOpenBankIde}>
          Buka Bank Ide <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <Card className="flex flex-col justify-between gap-8 p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <Clock3 className="h-4 w-4" />
              Menunggu tinjauan
            </div>
            <p className="text-5xl font-semibold tabular-nums tracking-tight text-foreground">
              {needsReview.length}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {needsReview.length > 0
                ? `${needsReview.length} ide berstatus Diajukan atau Revisi memerlukan tindak lanjut.`
                : "Semua ide yang diajukan sudah ditinjau."}
            </p>
          </div>
          <Button variant="primary" size="sm" className="self-start" onPress={onOpenBankIde}>
            Tinjau ide <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-base font-semibold text-foreground">Ringkasan ide</h2>
          <dl className="mt-5 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-sm text-muted"><Lightbulb className="h-4 w-4" /> Semua ide aktif</dt>
              <dd className="text-xl font-semibold tabular-nums text-foreground">{activeIdeas.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-sm text-muted"><CheckCircle2 className="h-4 w-4" /> Disetujui</dt>
              <dd className="text-xl font-semibold tabular-nums text-foreground">{approved.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-sm text-muted"><ArrowRight className="h-4 w-4" /> Jadi konten</dt>
              <dd className="text-xl font-semibold tabular-nums text-foreground">{converted.length}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card className="min-w-0 p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground">Aktivitas workspace</h2>
        </div>
        <ActivityHeatmap
          data={activityData}
          weekStart={1}
          color="var(--accent)"
          unit="aktivitas"
          ariaLabel="Heatmap aktivitas workspace berdasarkan ide yang dibuat dan diperbarui"
        />
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">Ide terbaru</h2>
            <p className="mt-1 text-sm text-muted">Diurutkan berdasarkan perubahan terakhir.</p>
          </div>
          <Button variant="ghost" size="sm" onPress={onOpenBankIde}>
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <ul className="mt-5 divide-y divide-border">
          {recentIdeas.map((idea) => (
            <li key={idea.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{idea.title}</p>
                <p className="mt-0.5 text-xs text-muted">{idea.brand} · {idea.id}</p>
              </div>
              <Chip size="sm" variant="soft" color={statusColor[idea.status] ?? "default"}>
                {idea.status}
              </Chip>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
