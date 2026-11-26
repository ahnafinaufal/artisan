import { Card, Input, Label } from "@heroui/react";

/**
 * Organism: InputShowcaseSection
 * Showcase komponen Input dari @heroui/react:
 * Variants, States, dan Sizes.
 */
export function InputShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Input
        </h2>
        <p className="mt-1 text-sm text-muted">
          Komponen input teks satu baris primitif menggunakan <code>Input</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Primary</Label>
              <Input variant="primary" placeholder="Primary input..." />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary</Label>
              <Input variant="secondary" placeholder="Secondary input..." />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            States
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Disabled</Label>
              <Input disabled defaultValue="Read-only value" />
            </div>
            <div className="space-y-1.5">
              <Label>Invalid</Label>
              <Input aria-invalid="true" defaultValue="Invalid input" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
