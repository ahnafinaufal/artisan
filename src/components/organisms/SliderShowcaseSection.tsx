import { useState } from "react";
import { Card, Label, Slider } from "@heroui/react";

/**
 * Organism: SliderShowcaseSection
 * Showcase komponen Slider dari @heroui/react:
 * Basic, Range, Steps & Marks, Vertical, dan Disabled.
 */
export function SliderShowcaseSection() {
  const [volume, setVolume] = useState<number>(60);
  const [priceRange, setPriceRange] = useState<number[]>([200, 800]);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Slider
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontrol rentang nilai menggunakan compound parts{" "}
          <code>Slider</code>, <code>Slider.Track</code>, <code>Slider.Fill</code>,{" "}
          <code>Slider.Thumb</code>, <code>Slider.Output</code>, <code>Slider.Steps</code>,{" "}
          <code>Slider.Marks</code>, dan <code>Slider.Mark</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Controlled Single Slider */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled Slider
          </h3>
          <Slider
            value={volume}
            onChange={(val) => setVolume(Array.isArray(val) ? val[0] : val)}
            minValue={0}
            maxValue={100}
            className="w-full"
          >
            <div className="mb-2 flex items-center justify-between">
              <Label>Volume</Label>
              <Slider.Output />
            </div>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
        </Card>

        {/* 2. Range Slider */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Range Slider
          </h3>
          <Slider
            value={priceRange}
            onChange={(val) => Array.isArray(val) && setPriceRange(val)}
            minValue={0}
            maxValue={1000}
            step={50}
            formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            className="w-full"
          >
            <div className="mb-2 flex items-center justify-between">
              <Label>Price Range</Label>
              <Slider.Output>
                {({ state }) =>
                  `${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`
                }
              </Slider.Output>
            </div>
            <Slider.Track>
              {({ state }) => (
                <>
                  <Slider.Fill />
                  {state.values.map((_, i) => (
                    <Slider.Thumb key={i} index={i} aria-label={`Thumb ${i + 1}`} />
                  ))}
                </>
              )}
            </Slider.Track>
          </Slider>
        </Card>

        {/* 3. Steps & Marks */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Steps &amp; Marks
          </h3>
          <Slider defaultValue={50} minValue={0} maxValue={100} step={25} className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <Label>Quality</Label>
              <Slider.Output />
            </div>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Steps />
              <Slider.Thumb />
            </Slider.Track>
            <Slider.Marks>
              <Slider.Mark value={0}>0%</Slider.Mark>
              <Slider.Mark value={25}>25%</Slider.Mark>
              <Slider.Mark value={50}>50%</Slider.Mark>
              <Slider.Mark value={75}>75%</Slider.Mark>
              <Slider.Mark value={100}>100%</Slider.Mark>
            </Slider.Marks>
          </Slider>
        </Card>

        {/* 4. Vertical & Disabled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Vertical &amp; Disabled
          </h3>
          <div className="flex items-start gap-10">
            <Slider
              orientation="vertical"
              defaultValue={40}
              aria-label="Vertical slider"
              className="h-40"
            >
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>

            <div className="flex-1">
              <Slider isDisabled defaultValue={70} className="w-full">
                <div className="mb-2 flex items-center justify-between">
                  <Label>Disabled</Label>
                  <Slider.Output />
                </div>
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
