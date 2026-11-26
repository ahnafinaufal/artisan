import { Card, ScrollShadow } from "@heroui/react";

const SAMPLE_ITEMS = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `Release Note v3.2.${i + 1}`,
  summary: "Peningkatan aksesibilitas React Aria dan token warna Tailwind v4.",
}));

/**
 * Organism: ScrollShadowShowcaseSection
 * Showcase komponen ScrollShadow dari @heroui/react:
 * Vertical & Horizontal scroll shadows.
 */
export function ScrollShadowShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ScrollShadow
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan bayangan visual saat konten dapat digulir menggunakan{" "}
          <code>ScrollShadow</code> (<code>orientation</code>, <code>size</code>,{" "}
          <code>hideScrollBar</code>).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Vertical Scroll
          </h3>
          <ScrollShadow className="h-60 space-y-2.5 pr-2">
            {SAMPLE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-border bg-surface-secondary/50 p-3"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted">{item.summary}</p>
              </div>
            ))}
          </ScrollShadow>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Horizontal Scroll (Hidden Scrollbar)
          </h3>
          <ScrollShadow
            orientation="horizontal"
            hideScrollBar
            className="flex gap-3 py-2"
          >
            {SAMPLE_ITEMS.slice(0, 10).map((item) => (
              <div
                key={item.id}
                className="w-48 shrink-0 rounded-lg border border-border bg-surface-secondary/50 p-3"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.summary}</p>
              </div>
            ))}
          </ScrollShadow>
        </Card>
      </div>
    </section>
  );
}
