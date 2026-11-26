import { Button, Card, Tooltip } from "@heroui/react";

/**
 * Organism: TooltipShowcaseSection
 * Showcase komponen Tooltip dari @heroui/react:
 * Default dengan Arrow dan Placements.
 */
export function TooltipShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Tooltip
        </h2>
        <p className="mt-1 text-sm text-muted">
          Teks informatif saat hover atau fokus menggunakan <code>Tooltip</code>,{" "}
          <code>Tooltip.Trigger</code>, <code>Tooltip.Content</code>, dan{" "}
          <code>Tooltip.Arrow</code>.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Placements &amp; Arrow
        </h3>
        <div className="flex flex-wrap gap-3">
          {(["top", "bottom", "left", "right"] as const).map((placement) => (
            <Tooltip key={placement} delay={150}>
              <Tooltip.Trigger>
                <Button variant="secondary" size="sm" className="capitalize">
                  Hover ({placement})
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content placement={placement}>
                <Tooltip.Arrow />
                Tooltip di posisi {placement}
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </Card>
    </section>
  );
}
