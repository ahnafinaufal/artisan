import { Breadcrumbs, Card } from "@heroui/react";
import { Slash } from "lucide-react";

/**
 * Organism: BreadcrumbsShowcaseSection
 * Showcase komponen Breadcrumbs dari @heroui/react:
 * Default dan Custom Separator.
 */
export function BreadcrumbsShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Breadcrumbs
        </h2>
        <p className="mt-1 text-sm text-muted">
          Navigasi hierarki halaman menggunakan <code>Breadcrumbs</code> dan{" "}
          <code>Breadcrumbs.Item</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Default Breadcrumbs
          </h3>
          <Breadcrumbs>
            <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#components">Components</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#navigation">Navigation</Breadcrumbs.Item>
            <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
          </Breadcrumbs>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Separator
          </h3>
          <Breadcrumbs separator={<Slash className="size-3.5 text-muted" />}>
            <Breadcrumbs.Item href="#workspace">Workspace</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#design-system">Design System</Breadcrumbs.Item>
            <Breadcrumbs.Item>Tokens</Breadcrumbs.Item>
          </Breadcrumbs>
        </Card>
      </div>
    </section>
  );
}
