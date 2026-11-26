import { Card, Surface } from "@heroui/react";

/**
 * Organism: SurfaceShowcaseSection
 * Showcase komponen Surface dari @heroui/react:
 * Surface variants (default, secondary, tertiary, transparent).
 */
export function SurfaceShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Surface
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontainer permukaan berhirarki menggunakan <code>Surface</code> dengan varian{" "}
          <code>default</code>, <code>secondary</code>, <code>tertiary</code>, dan{" "}
          <code>transparent</code>.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Surface Hierarchy
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["default", "secondary", "tertiary", "transparent"] as const).map(
            (variant) => (
              <Surface
                key={variant}
                variant={variant}
                className="rounded-xl border border-border p-4"
              >
                <p className="text-sm font-semibold capitalize text-foreground">
                  {variant}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Konteks permukaan dengan token <code>surface</code>.
                </p>
              </Surface>
            ),
          )}
        </div>
      </Card>
    </section>
  );
}
