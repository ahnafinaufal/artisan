import { useState } from "react";
import { Card, Description, FieldError, Input, Label, TextField } from "@heroui/react";

/**
 * Organism: TextFieldShowcaseSection
 * Showcase komponen TextField dari @heroui/react:
 * Label + Input + Description + FieldError.
 */
export function TextFieldShowcaseSection() {
  const [value, setValue] = useState("HeroUI v3");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          TextField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Komposisi field teks lengkap dengan label, deskripsi, dan validasi menggunakan{" "}
          <code>TextField</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled TextField
          </h3>
          <TextField value={value} onChange={setValue}>
            <Label>Nama Aplikasi</Label>
            <Input placeholder="Masukkan nama" />
            <Description>Ditampilkan di header navigasi.</Description>
          </TextField>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Invalid State
          </h3>
          <TextField isInvalid defaultValue="abc">
            <Label>Password</Label>
            <Input type="password" />
            <FieldError>Password minimal 8 karakter.</FieldError>
          </TextField>
        </Card>
      </div>
    </section>
  );
}
