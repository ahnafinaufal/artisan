import { useState } from "react";
import { Card, ColorField, Input, Label, parseColor } from "@heroui/react";
import type { Color } from "@heroui/react";

/**
 * Organism: ColorFieldShowcaseSection
 * Showcase komponen ColorField dari @heroui/react.
 */
export function ColorFieldShowcaseSection() {
  const [color, setColor] = useState<Color | null>(parseColor("#006FEE"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kolom input nilai warna menggunakan <code>ColorField</code> dan{" "}
          <code>Input</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <ColorField value={color} onChange={setColor}>
          <Label>Accent Color (Hex)</Label>
          <Input placeholder="#006FEE" />
        </ColorField>
      </Card>
    </section>
  );
}
