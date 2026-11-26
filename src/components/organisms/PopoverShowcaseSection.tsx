import { Button, Card, Popover } from "@heroui/react";

/**
 * Organism: PopoverShowcaseSection
 * Showcase komponen Popover dari @heroui/react:
 * Default dengan Arrow & Heading, serta Placements.
 */
export function PopoverShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Popover
        </h2>
        <p className="mt-1 text-sm text-muted">
          Konten kaya dalam portal menggunakan <code>Popover</code>,{" "}
          <code>Popover.Trigger</code>, <code>Popover.Content</code>,{" "}
          <code>Popover.Arrow</code>, <code>Popover.Dialog</code>, dan{" "}
          <code>Popover.Heading</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Arrow &amp; Heading
          </h3>
          <Popover>
            <Popover.Trigger>
              <Button variant="secondary">Info Paket</Button>
            </Popover.Trigger>
            <Popover.Content className="max-w-xs">
              <Popover.Arrow />
              <Popover.Dialog>
                <Popover.Heading>HeroUI v3.2.8</Popover.Heading>
                <p className="mt-1 text-xs text-muted">
                  Mendukung React 19, React Aria Components, dan Tailwind CSS v4.
                </p>
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Placements
          </h3>
          <div className="flex flex-wrap gap-3">
            {(["top", "bottom", "left", "right"] as const).map((placement) => (
              <Popover key={placement}>
                <Popover.Trigger>
                  <Button variant="tertiary" size="sm" className="capitalize">
                    {placement}
                  </Button>
                </Popover.Trigger>
                <Popover.Content placement={placement}>
                  <Popover.Arrow />
                  <Popover.Dialog>
                    <p className="text-xs text-foreground">
                      Placement: <strong>{placement}</strong>
                    </p>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
