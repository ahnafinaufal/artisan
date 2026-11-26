import { useState } from "react";
import { Card, ColorSlider, Label, parseColor } from "@heroui/react";

/**
 * Organism: ColorSliderShowcaseSection
 * Showcase komponen ColorSlider dari @heroui/react.
 */
export function ColorSliderShowcaseSection() {
  const [color, setColor] = useState(parseColor("hsl(220, 90%, 56%)"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorSlider
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menyesuaikan kanal warna individual menggunakan <code>ColorSlider</code>,{" "}
          <code>ColorSlider.Output</code>, <code>ColorSlider.Track</code>, dan{" "}
          <code>ColorSlider.Thumb</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <div className="space-y-4">
          <ColorSlider channel="hue" colorSpace="hsl" value={color} onChange={setColor}>
            <div className="mb-1.5 flex items-center justify-between">
              <Label>Hue</Label>
              <ColorSlider.Output />
            </div>
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>

          <ColorSlider channel="alpha" colorSpace="hsl" value={color} onChange={setColor}>
            <div className="mb-1.5 flex items-center justify-between">
              <Label>Opacity</Label>
              <ColorSlider.Output />
            </div>
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
        </div>
      </Card>
    </section>
  );
}
