import { Button, Card } from "@heroui/react";

/**
 * Organism: CardShowcaseSection
 * Showcase komponen Card dari @heroui/react:
 * Variants (default, secondary, tertiary) dan compound parts (Header, Title, Description, Content, Footer).
 */
export function CardShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Card
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontainer fleksibel untuk mengelompokkan konten dan aksi menggunakan{" "}
          <code>Card</code>, <code>Card.Header</code>, <code>Card.Title</code>,{" "}
          <code>Card.Description</code>, <code>Card.Content</code>, dan{" "}
          <code>Card.Footer</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {(["default", "secondary", "tertiary"] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <Card.Header>
              <Card.Title className="capitalize">{variant} Card</Card.Title>
              <Card.Description>
                Contoh kartu dengan varian <code>{variant}</code>.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-sm text-muted">
                Mendukung komposisi header, konten utama, serta footer aksi yang konsisten dengan token tema.
              </p>
            </Card.Content>
            <Card.Footer className="flex justify-end gap-2">
              <Button size="sm" variant="ghost">
                Detail
              </Button>
              <Button size="sm" variant="primary">
                Pilih
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
