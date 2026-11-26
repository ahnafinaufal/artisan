import { useState } from "react";
import { Card, DateField, Description, Label } from "@heroui/react";
import { parseDate, type DateValue } from "@internationalized/date";

/**
 * Organism: DateFieldShowcaseSection
 * Showcase komponen DateField dari @heroui/react.
 */
export function DateFieldShowcaseSection() {
  const [value, setValue] = useState<DateValue | null>(parseDate("2026-11-26"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          DateField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kolom input tanggal tersegmentasi menggunakan <code>DateField</code>,{" "}
          <code>DateField.Group</code>, <code>DateField.Input</code>, dan{" "}
          <code>DateField.Segment</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Controlled DateField
        </h3>
        <DateField value={value} onChange={setValue}>
          <Label>Tanggal Rilis</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          <Description>
            Nilai terpilih: {value ? value.toString() : "—"}
          </Description>
        </DateField>
      </Card>
    </section>
  );
}
