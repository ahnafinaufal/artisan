import { Card, Label, ProgressCircle } from "@heroui/react";

/**
 * Organism: ProgressCircleShowcaseSection
 * Showcase komponen ProgressCircle dari @heroui/react:
 * Determinate, Indeterminate, Colors, dan Sizes.
 */
export function ProgressCircleShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ProgressCircle
        </h2>
        <p className="mt-1 text-sm text-muted">
          Indikator progres melingkar menggunakan{" "}
          <code>ProgressCircle</code>, <code>ProgressCircle.Track</code>,{" "}
          <code>ProgressCircle.TrackCircle</code>, dan{" "}
          <code>ProgressCircle.FillCircle</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes &amp; Determinate
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            {(["sm", "md", "lg"] as const).map((size) => (
              <ProgressCircle key={size} size={size} value={72} aria-label={`Progress ${size}`}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Colors &amp; Indeterminate
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            {(["accent", "success", "warning", "danger"] as const).map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <ProgressCircle color={color} value={65} aria-label={color}>
                  <ProgressCircle.Track>
                    <ProgressCircle.TrackCircle />
                    <ProgressCircle.FillCircle />
                  </ProgressCircle.Track>
                </ProgressCircle>
                <Label className="text-xs capitalize text-muted">{color}</Label>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <ProgressCircle isIndeterminate aria-label="Loading">
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
              <Label className="text-xs text-muted">Indeterminate</Label>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
