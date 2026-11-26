import { Card, Separator } from "@heroui/react";

/**
 * Organism: SeparatorShowcaseSection
 * Showcase komponen Separator dari @heroui/react:
 * Orientation (horizontal, vertical) dan Variants.
 */
export function SeparatorShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Separator
        </h2>
        <p className="mt-1 text-sm text-muted">
          Memisahkan bagian konten secara visual menggunakan <code>Separator</code>{" "}
          dengan prop <code>orientation</code> dan <code>variant</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Horizontal Separator
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">HeroUI v3</p>
              <p className="text-xs text-muted">Komponen React berbasis React Aria &amp; Tailwind v4.</p>
            </div>
            <Separator />
            <div className="flex h-6 items-center gap-3 text-sm text-foreground">
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Components</span>
              <Separator orientation="vertical" />
              <span>Themes</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs text-muted">Default</span>
              <Separator variant="default" />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs text-muted">Secondary</span>
              <Separator variant="secondary" />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs text-muted">Tertiary</span>
              <Separator variant="tertiary" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
