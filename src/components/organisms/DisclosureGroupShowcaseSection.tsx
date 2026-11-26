import { Card, Disclosure, DisclosureGroup } from "@heroui/react";

/**
 * Organism: DisclosureGroupShowcaseSection
 * Showcase komponen DisclosureGroup dari @heroui/react:
 * Single expanded dan Multiple expanded.
 */
export function DisclosureGroupShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          DisclosureGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontainer yang mengoordinasikan beberapa item <code>Disclosure</code> secara bersamaan.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Single Expanded
          </h3>
          <DisclosureGroup defaultExpandedKeys={["step-1"]}>
            <Disclosure id="step-1">
              <Disclosure.Heading>
                <Disclosure.Trigger>
                  1. Instalasi Paket
                  <Disclosure.Indicator />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body>
                  Jalankan <code>npm install @heroui/react</code> di direktori proyek Anda.
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure>
            <Disclosure id="step-2">
              <Disclosure.Heading>
                <Disclosure.Trigger>
                  2. Impor Styles
                  <Disclosure.Indicator />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body>
                  Tambahkan <code>@import "@heroui/styles";</code> pada berkas CSS utama.
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure>
          </DisclosureGroup>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Multiple Expanded
          </h3>
          <DisclosureGroup allowsMultipleExpanded defaultExpandedKeys={["a", "b"]}>
            <Disclosure id="a">
              <Disclosure.Heading>
                <Disclosure.Trigger>
                  Aksesibilitas Keyboard
                  <Disclosure.Indicator />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body>
                  Mendukung navigasi tombol panah atas/bawah dan Home/End secara otomatis.
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure>
            <Disclosure id="b">
              <Disclosure.Heading>
                <Disclosure.Trigger>
                  Animasi Halus
                  <Disclosure.Indicator />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body>
                  Transisi tinggi panel diatur secara native oleh CSS HeroUI v3.
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure>
          </DisclosureGroup>
        </Card>
      </div>
    </section>
  );
}
