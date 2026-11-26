import { Card, ErrorMessage, Input, Label, TextField } from "@heroui/react";

/**
 * Organism: ErrorMessageShowcaseSection
 * Showcase komponen ErrorMessage dari @heroui/react.
 */
export function ErrorMessageShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ErrorMessage
        </h2>
        <p className="mt-1 text-sm text-muted">
          Komponen tingkat rendah untuk menampilkan pesan kesalahan menggunakan{" "}
          <code>ErrorMessage</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Invalid Field
          </h3>
          <TextField isInvalid defaultValue="invalid-email">
            <Label>Email</Label>
            <Input />
            <ErrorMessage>Format email tidak valid.</ErrorMessage>
          </TextField>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Standalone ErrorMessage
          </h3>
          <div className="space-y-2">
            <ErrorMessage>Token API telah kedaluwarsa. Silakan buat token baru.</ErrorMessage>
          </div>
        </Card>
      </div>
    </section>
  );
}
