import { Accordion, Card } from "@heroui/react";

const FAQ_ITEMS = [
  {
    id: "atomic",
    title: "Apa itu konsep Atomic Design?",
    body: "Atomic Design membagi UI menjadi Atoms (primitif), Molecules (gabungan atom), dan Organisms (bagian antarmuka yang kompleks).",
  },
  {
    id: "heroui",
    title: "Apakah HeroUI v3 dibangun di atas React Aria?",
    body: "Ya, komponen interaktif HeroUI v3 menggunakan React Aria Components untuk aksesibilitas penuh dan Tailwind CSS v4 untuk styling.",
  },
  {
    id: "theming",
    title: "Bagaimana cara kustomisasi tema?",
    body: "Gunakan CSS variables HeroUI seperti --accent, --surface, --foreground, dan --border.",
  },
];

/**
 * Organism: AccordionShowcaseSection
 * Showcase komponen Accordion dari @heroui/react:
 * Default, Surface variant, dan Multiple expanded.
 */
export function AccordionShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Accordion
        </h2>
        <p className="mt-1 text-sm text-muted">
          Panel konten lipat menggunakan compound parts <code>Accordion</code>,{" "}
          <code>Accordion.Item</code>, <code>Accordion.Heading</code>,{" "}
          <code>Accordion.Trigger</code>, <code>Accordion.Indicator</code>,{" "}
          <code>Accordion.Panel</code>, dan <code>Accordion.Body</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Default Accordion
          </h3>
          <Accordion defaultExpandedKeys={["atomic"]}>
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item key={item.id} id={item.id}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {item.title}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Surface Variant &amp; Multiple Expanded
          </h3>
          <Accordion variant="surface" allowsMultipleExpanded defaultExpandedKeys={["atomic", "heroui"]}>
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item key={item.id} id={item.id}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {item.title}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}
