import { Card, Kbd } from "@heroui/react";

/**
 * Organism: KbdShowcaseSection
 * Showcase komponen Kbd dari @heroui/react:
 * Key combinations dengan Kbd.Abbr dan Kbd.Content serta Variants.
 */
export function KbdShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Kbd
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan pintasan keyboard menggunakan <code>Kbd</code>,{" "}
          <code>Kbd.Abbr</code>, dan <code>Kbd.Content</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Key Combinations
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
            <Kbd>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>P</Kbd.Content>
            </Kbd>
            <Kbd>
              <Kbd.Abbr keyValue="ctrl" />
              <Kbd.Abbr keyValue="option" />
              <Kbd.Content>Del</Kbd.Content>
            </Kbd>
            <Kbd>
              <Kbd.Abbr keyValue="enter" />
            </Kbd>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Kbd variant="default">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
            <Kbd variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>C</Kbd.Content>
            </Kbd>
          </div>
        </Card>
      </div>
    </section>
  );
}
