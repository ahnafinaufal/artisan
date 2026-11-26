import { Card, Input, Label, TextField } from "@heroui/react";

/**
 * Organism: LabelShowcaseSection
 * Showcase komponen Label dari @heroui/react.
 */
export function LabelShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Label
        </h2>
        <p className="mt-1 text-sm text-muted">
          Merender label aksesibel yang terasosiasi dengan kontrol formulir menggunakan{" "}
          <code>Label</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Required &amp; Disabled Label
        </h3>
        <div className="space-y-4">
          <TextField isRequired>
            <Label>Nama Proyek</Label>
            <Input placeholder="heroui-app" />
          </TextField>

          <TextField isDisabled>
            <Label>Organization ID</Label>
            <Input defaultValue="org_98231" />
          </TextField>
        </div>
      </Card>
    </section>
  );
}
