import { Card, FieldError, Input, Label, TextField } from "@heroui/react";

/**
 * Organism: FieldErrorShowcaseSection
 * Showcase komponen FieldError dari @heroui/react.
 */
export function FieldErrorShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          FieldError
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan pesan validasi otomatis dari React Aria pada field formulir menggunakan{" "}
          <code>FieldError</code>.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Validation Error Display
        </h3>
        <div className="max-w-md space-y-4">
          <TextField isInvalid defaultValue="ab">
            <Label>Project Slug</Label>
            <Input />
            <FieldError>Slug minimal terdiri dari 3 karakter.</FieldError>
          </TextField>
        </div>
      </Card>
    </section>
  );
}
