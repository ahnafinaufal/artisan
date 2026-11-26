import { useState } from "react";
import { Card, Disclosure } from "@heroui/react";

/**
 * Organism: DisclosureShowcaseSection
 * Showcase komponen Disclosure dari @heroui/react:
 * Uncontrolled dan Controlled.
 */
export function DisclosureShowcaseSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Disclosure
        </h2>
        <p className="mt-1 text-sm text-muted">
          Bagian konten yang dapat dibuka/tutup menggunakan{" "}
          <code>Disclosure</code>, <code>Disclosure.Heading</code>,{" "}
          <code>Disclosure.Trigger</code>, <code>Disclosure.Indicator</code>,{" "}
          <code>Disclosure.Content</code>, dan <code>Disclosure.Body</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Uncontrolled Disclosure
          </h3>
          <Disclosure>
            <Disclosure.Heading>
              <Disclosure.Trigger>
                Lihat detail konfigurasi
                <Disclosure.Indicator />
              </Disclosure.Trigger>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body>
                <p className="text-sm text-muted">
                  Konfigurasi bawaan sudah mengaktifkan tree-shaking dan dukungan mode gelap otomatis.
                </p>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled Disclosure
          </h3>
          <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
            <Disclosure.Heading>
              <Disclosure.Trigger>
                Status: {isExpanded ? "Terbuka" : "Tertutup"}
                <Disclosure.Indicator />
              </Disclosure.Trigger>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body>
                <p className="text-sm text-muted">
                  State <code>isExpanded</code> dapat dikontrol penuh dari parent component.
                </p>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </Card>
      </div>
    </section>
  );
}
