import { Card, Label, ProgressBar } from "@heroui/react";

/**
 * Organism: ProgressBarShowcaseSection
 * Showcase komponen ProgressBar dari @heroui/react:
 * Colors, Sizes, dan Indeterminate.
 */
export function ProgressBarShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ProgressBar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan progres operasi secara linear menggunakan{" "}
          <code>ProgressBar</code>, <code>ProgressBar.Output</code>,{" "}
          <code>ProgressBar.Track</code>, dan <code>ProgressBar.Fill</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Colors
          </h3>
          <div className="space-y-4">
            {(
              [
                { color: "accent", label: "Uploading assets", value: 48 },
                { color: "success", label: "Build completed", value: 100 },
                { color: "warning", label: "Bundle size check", value: 78 },
                { color: "danger", label: "Error threshold", value: 92 },
              ] as const
            ).map((item) => (
              <ProgressBar key={item.color} color={item.color} value={item.value}>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label>{item.label}</Label>
                  <ProgressBar.Output />
                </div>
                <ProgressBar.Track>
                  <ProgressBar.Fill />
                </ProgressBar.Track>
              </ProgressBar>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes &amp; Indeterminate
          </h3>
          <div className="space-y-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <ProgressBar key={size} size={size} value={65}>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label className="uppercase">{size}</Label>
                  <ProgressBar.Output />
                </div>
                <ProgressBar.Track>
                  <ProgressBar.Fill />
                </ProgressBar.Track>
              </ProgressBar>
            ))}

            <ProgressBar isIndeterminate>
              <Label className="mb-1.5 block">Syncing repository...</Label>
              <ProgressBar.Track>
                <ProgressBar.Fill />
              </ProgressBar.Track>
            </ProgressBar>
          </div>
        </Card>
      </div>
    </section>
  );
}
