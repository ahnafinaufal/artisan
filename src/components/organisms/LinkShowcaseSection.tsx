import { Card, Link } from "@heroui/react";

/**
 * Organism: LinkShowcaseSection
 * Showcase komponen Link dari @heroui/react:
 * Default, External dengan Link.Icon, Underline modes, dan Disabled.
 */
export function LinkShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Link
        </h2>
        <p className="mt-1 text-sm text-muted">
          Komponen tautan bergaya dengan dukungan ikon bawaan menggunakan{" "}
          <code>Link</code> dan <code>Link.Icon</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Basic &amp; External Link
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="https://heroui.com" target="_blank" rel="noreferrer">
              HeroUI Website
              <Link.Icon />
            </Link>
            <Link href="#catalog">Internal Anchor</Link>
            <Link isDisabled href="#disabled">
              Disabled Link
            </Link>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Styling Variants
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#hover" className="no-underline hover:underline">
              Underline on Hover
            </Link>
            <Link href="#accent" className="text-accent font-semibold">
              Accent Link
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
