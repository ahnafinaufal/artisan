import { useState, type FormEvent } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

/**
 * Organism: FormShowcaseSection
 * Showcase komponen Form dari @heroui/react dengan validasi native & submit handler.
 */
export function FormShowcaseSection() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(`Email: ${data.get("email")}, Nama: ${data.get("name")}`);
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Form
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pembungkus formulir untuk validasi dan penanganan submit menggunakan{" "}
          <code>Form</code>.
        </p>
      </div>

      <Card className="max-w-lg p-6">
        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField name="name" isRequired>
            <Label>Nama Lengkap</Label>
            <Input placeholder="Masukkan nama" />
            <FieldError />
          </TextField>

          <TextField name="email" type="email" isRequired>
            <Label>Alamat Email</Label>
            <Input placeholder="nama@perusahaan.com" />
            <FieldError />
          </TextField>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary">
              Kirim Formulir
            </Button>
            <Button type="reset" variant="tertiary" onPress={() => setSubmitted(null)}>
              Reset
            </Button>
          </div>

          {submitted ? (
            <p className="rounded-lg bg-surface-secondary p-3 text-xs text-foreground">
              Terkirim — {submitted}
            </p>
          ) : null}
        </Form>
      </Card>
    </section>
  );
}
