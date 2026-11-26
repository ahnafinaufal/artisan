import { useState } from "react";
import { Card, Description, Label, NumberField } from "@heroui/react";

/**
 * Organism: NumberFieldShowcaseSection
 * Showcase komponen NumberField dari @heroui/react:
 * Basic, Currency formatting, dan Min/Max/Step.
 */
export function NumberFieldShowcaseSection() {
  const [qty, setQty] = useState(2);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          NumberField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Input angka dengan tombol tambah/kurang menggunakan{" "}
          <code>NumberField</code>, <code>NumberField.Group</code>,{" "}
          <code>NumberField.DecrementButton</code>, <code>NumberField.Input</code>, dan{" "}
          <code>NumberField.IncrementButton</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled Quantity
          </h3>
          <NumberField value={qty} onChange={setQty} minValue={1} maxValue={20}>
            <Label>Jumlah Lisensi</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>Rentang 1 hingga 20 lisensi.</Description>
          </NumberField>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Currency Format
          </h3>
          <NumberField
            defaultValue={1250}
            step={50}
            formatOptions={{ style: "currency", currency: "USD" }}
          >
            <Label>Anggaran Bulanan</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </Card>
      </div>
    </section>
  );
}
