import { Card, Label, Meter } from "@heroui/react";

/**
 * Organism: MeterShowcaseSection
 * Showcase komponen Meter dari @heroui/react:
 * Colors, Sizes, dan Custom Value Formatting.
 */
export function MeterShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Meter
        </h2>
        <p className="mt-1 text-sm text-muted">
          Merepresentasikan kuantitas dalam rentang nilai menggunakan{" "}
          <code>Meter</code>, <code>Meter.Output</code>, <code>Meter.Track</code>, dan{" "}
          <code>Meter.Fill</code>.
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
                { color: "accent", label: "CPU Usage", value: 42 },
                { color: "success", label: "Health Score", value: 88 },
                { color: "warning", label: "Memory", value: 74 },
                { color: "danger", label: "Disk Quota", value: 93 },
              ] as const
            ).map((item) => (
              <Meter key={item.color} color={item.color} value={item.value}>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label>{item.label}</Label>
                  <Meter.Output />
                </div>
                <Meter.Track>
                  <Meter.Fill />
                </Meter.Track>
              </Meter>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes &amp; Custom Format
          </h3>
          <div className="space-y-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Meter
                key={size}
                size={size}
                value={64}
                maxValue={100}
                valueLabel="64 GB / 100 GB"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <Label className="uppercase">{size}</Label>
                  <Meter.Output />
                </div>
                <Meter.Track>
                  <Meter.Fill />
                </Meter.Track>
              </Meter>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
