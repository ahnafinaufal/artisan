import { useState } from "react";
import { Card, ColorSwatchPicker, parseColor } from "@heroui/react";

const PRESETS = ["#006FEE", "#17C964", "#F5A524", "#F31260", "#9353D3", "#3F3F46"];

/**
 * Organism: ColorSwatchPickerShowcaseSection
 * Showcase komponen ColorSwatchPicker dari @heroui/react.
 */
export function ColorSwatchPickerShowcaseSection() {
  const [selected, setSelected] = useState(parseColor("#006FEE"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorSwatchPicker
        </h2>
        <p className="mt-1 text-sm text-muted">
          Daftar swatch warna untuk memilih dari palet preset menggunakan{" "}
          <code>ColorSwatchPicker</code>, <code>ColorSwatchPicker.Item</code>,{" "}
          <code>ColorSwatchPicker.Swatch</code>, dan{" "}
          <code>ColorSwatchPicker.Indicator</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <div className="space-y-3">
          <ColorSwatchPicker value={selected} onChange={setSelected}>
            {PRESETS.map((hex) => (
              <ColorSwatchPicker.Item key={hex} color={hex}>
                <ColorSwatchPicker.Swatch />
                <ColorSwatchPicker.Indicator />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
          <p className="text-xs text-muted">
            Selected: <span className="font-mono text-foreground">{selected.toString("hex")}</span>
          </p>
        </div>
      </Card>
    </section>
  );
}
