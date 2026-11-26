import { useState } from "react";
import { Card, ColorArea, parseColor } from "@heroui/react";

/**
 * Organism: ColorAreaShowcaseSection
 * Showcase komponen ColorArea dari @heroui/react.
 */
export function ColorAreaShowcaseSection() {
  const [color, setColor] = useState(parseColor("hsl(210, 80%, 55%)"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorArea
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pemilih warna 2D dari area gradien menggunakan <code>ColorArea</code> dan{" "}
          <code>ColorArea.Thumb</code>.
        </p>
      </div>

      <Card className="inline-block p-5">
        <div className="space-y-3">
          <ColorArea
            value={color}
            onChange={setColor}
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>
          <p className="text-xs text-muted">
            Selected: <span className="font-mono text-foreground">{color.toString("hex")}</span>
          </p>
        </div>
      </Card>
    </section>
  );
}
