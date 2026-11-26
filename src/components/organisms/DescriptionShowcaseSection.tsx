import { Card, Description, Input, Label, TextField } from "@heroui/react";

/**
 * Organism: DescriptionShowcaseSection
 * Showcase komponen Description dari @heroui/react.
 */
export function DescriptionShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Description
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menyediakan teks bantuan tambahan untuk field formulir dan komponen lain menggunakan{" "}
          <code>Description</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Inside TextField
          </h3>
          <TextField name="username">
            <Label>Username</Label>
            <Input placeholder="ahnafi" />
            <Description>
              Hanya huruf kecil, angka, dan tanda hubung.
            </Description>
          </TextField>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Standalone Description
          </h3>
          <div className="space-y-2">
            <Label>API Endpoint</Label>
            <Description>
              Gunakan URL HTTPS yang dapat diakses oleh webhook server Anda.
            </Description>
          </div>
        </Card>
      </div>
    </section>
  );
}
