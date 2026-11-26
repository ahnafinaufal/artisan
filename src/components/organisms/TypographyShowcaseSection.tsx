import { Card, Code, Heading, Paragraph, Prose } from "@heroui/react";

/**
 * Organism: TypographyShowcaseSection
 * Showcase komponen Typography dari @heroui/react:
 * Heading, Paragraph, Code, Prose, dan Typography.
 */
export function TypographyShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Typography
        </h2>
        <p className="mt-1 text-sm text-muted">
          Primitif tipografi semantik menggunakan <code>Typography</code>,{" "}
          <code>Heading</code>, <code>Paragraph</code>, <code>Code</code>, dan{" "}
          <code>Prose</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Headings &amp; Paragraphs
          </h3>
          <div className="space-y-3">
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Paragraph size="base">
              Paragraf ukuran base dengan warna teks standar dari tema HeroUI.
            </Paragraph>
            <Paragraph size="sm" color="muted">
              Paragraf ukuran sm dengan warna muted untuk teks pendukung.
            </Paragraph>
            <div className="flex items-center gap-2">
              <Paragraph size="xs" color="muted">
                Inline code:
              </Paragraph>
              <Code>npm install @heroui/react</Code>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Prose Container
          </h3>
          <Prose>
            <h4>Atomic Design di HeroUI v3</h4>
            <p>
              <code>Prose</code> mengatur tipografi konten panjang secara otomatis,
              termasuk jarak paragraf, heading, dan elemen daftar.
            </p>
            <ul>
              <li>Atoms: komponen primitif terkecil.</li>
              <li>Molecules: gabungan beberapa atom.</li>
              <li>Organisms: bagian antarmuka yang mandiri.</li>
            </ul>
          </Prose>
        </Card>
      </div>
    </section>
  );
}
