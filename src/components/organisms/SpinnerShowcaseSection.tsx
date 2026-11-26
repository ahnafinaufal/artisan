import { Card, Spinner } from "@heroui/react";

/**
 * Organism: SpinnerShowcaseSection
 * Showcase komponen Spinner dari @heroui/react:
 * Sizes dan Colors.
 */
export function SpinnerShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Spinner
        </h2>
        <p className="mt-1 text-sm text-muted">
          Indikator loading untuk status pending menggunakan <code>Spinner</code> dengan
          prop <code>size</code> dan <code>color</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Spinner size="sm" aria-label="Small spinner" />
            <Spinner size="md" aria-label="Medium spinner" />
            <Spinner size="lg" aria-label="Large spinner" />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Colors
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            {(["current", "accent", "success", "warning", "danger"] as const).map(
              (color) => (
                <div key={color} className="flex flex-col items-center gap-2">
                  <Spinner color={color} aria-label={`${color} spinner`} />
                  <span className="text-xs capitalize text-muted">{color}</span>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
