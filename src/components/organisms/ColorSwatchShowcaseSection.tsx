import { Card, ColorSwatch, parseColor } from "@heroui/react";

const SWATCH_COLORS = ["#006FEE", "#17C964", "#F5A524", "#F31260", "#7828C8"];

/**
 * Organism: ColorSwatchShowcaseSection
 * Showcase komponen ColorSwatch dari @heroui/react:
 * Sizes dan Shapes.
 */
export function ColorSwatchShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ColorSwatch
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pratinjau visual nilai warna menggunakan <code>ColorSwatch</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Palette Swatches
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {SWATCH_COLORS.map((hex) => (
              <ColorSwatch key={hex} color={parseColor(hex)} aria-label={hex} />
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <ColorSwatch
                key={size}
                size={size}
                color={parseColor("#006FEE")}
                aria-label={`Size ${size}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
