import { Card, Label, TextArea } from "@heroui/react";

/**
 * Organism: TextAreaShowcaseSection
 * Showcase komponen TextArea dari @heroui/react.
 */
export function TextAreaShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          TextArea
        </h2>
        <p className="mt-1 text-sm text-muted">
          Komponen input teks multibaris primitif menggunakan <code>TextArea</code>.
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
              <TextArea variant="primary" rows={3} placeholder="Tulis deskripsi..." />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary</Label>
              <TextArea variant="secondary" rows={3} placeholder="Catatan tambahan..." />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled
          </h3>
          <div className="space-y-1.5">
            <Label>Read-only</Label>
            <TextArea
              disabled
              rows={3}
              defaultValue="Konten ini tidak dapat diubah pada mode pratinjau."
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
