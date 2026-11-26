import { Card, Link } from "@heroui/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ATOMIC_LEVEL_META, HEROUI_COMPONENTS } from "../../data/componentsCatalog";
import { StatusChip } from "../atoms";
import { ComponentPreview } from "../molecules";

export interface ComponentDetailSectionProps {
  componentName: string;
  onBackToCatalog: () => void;
}

/**
 * Organism: ComponentDetailSection
 * Tampilan detail individual untuk komponen dari katalog HEROUI_COMPONENTS
 * yang belum memiliki halaman showcase multi-contoh khusus.
 */
export function ComponentDetailSection({
  componentName,
  onBackToCatalog,
}: ComponentDetailSectionProps) {
  const comp = HEROUI_COMPONENTS.find((c) => c.name === componentName);

  if (!comp) {
    return null;
  }

  const levelMeta = ATOMIC_LEVEL_META[comp.atomicLevel];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {comp.name}
            </h2>
            <StatusChip color={levelMeta.color} variant="soft">
              {levelMeta.label.slice(0, -1)}
            </StatusChip>
            {comp.isPro ? (
              <StatusChip color="default" variant="primary">
                Pro
              </StatusChip>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted">{comp.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-secondary"
          >
            <ArrowLeft className="size-3.5" />
            All Components
          </button>
          <Link
            href={comp.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
          >
            HeroUI Docs <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">Preview</h3>
        <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-border/60 bg-surface-secondary/30 p-6">
          <ComponentPreview name={comp.name} isPro={comp.isPro} />
        </div>
      </Card>
    </section>
  );
}
