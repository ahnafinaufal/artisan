import { useState } from "react";
import {
  Card,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Input,
  parseColor,
} from "@heroui/react";

/**
 * Organism: ColorPickerShowcaseSection
 * Showcase komponen ColorPicker dari @heroui/react.
 */
export function ColorPickerShowcaseSection() {
  const [color, setColor] = useState(parseColor("#6366F1"));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorPicker
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pemilih warna komposabel yang menyinkronkan <code>ColorArea</code>,{" "}
          <code>ColorSlider</code>, dan <code>ColorField</code> di dalam{" "}
          <code>ColorPicker.Popover</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <ColorPicker value={color} onChange={setColor}>
          <ColorPicker.Trigger>
            <ColorSwatch size="sm" />
            <span className="font-mono text-sm">{color.toString("hex")}</span>
          </ColorPicker.Trigger>
          <ColorPicker.Popover className="w-64 space-y-3 p-3">
            <ColorArea
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
              className="w-full"
            >
              <ColorArea.Thumb />
            </ColorArea>
            <ColorSlider colorSpace="hsb" channel="hue" className="w-full">
              <ColorSlider.Track>
                <ColorSlider.Thumb />
              </ColorSlider.Track>
            </ColorSlider>
            <ColorField aria-label="Hex color">
              <Input />
            </ColorField>
          </ColorPicker.Popover>
        </ColorPicker>
      </Card>
    </section>
  );
}
