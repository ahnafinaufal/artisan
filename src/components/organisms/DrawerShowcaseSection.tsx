import { Button, Card, Drawer } from "@heroui/react";

/**
 * Organism: DrawerShowcaseSection
 * Showcase komponen Drawer dari @heroui/react:
 * Placement (left, right, bottom) dengan Header, Body, Footer.
 */
export function DrawerShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Drawer
        </h2>
        <p className="mt-1 text-sm text-muted">
          Panel geser menggunakan <code>Drawer</code>, <code>Drawer.Backdrop</code>,{" "}
          <code>Drawer.Content</code>, <code>Drawer.Dialog</code>,{" "}
          <code>Drawer.Header</code>, <code>Drawer.Heading</code>,{" "}
          <code>Drawer.Body</code>, dan <code>Drawer.Footer</code>.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Placements
        </h3>
        <div className="flex flex-wrap gap-3">
          {(["left", "right", "bottom"] as const).map((placement) => (
            <Drawer key={placement}>
              <Button variant="secondary" className="capitalize">
                Open {placement}
              </Button>
              <Drawer.Backdrop>
                <Drawer.Content placement={placement}>
                  <Drawer.Dialog>
                    <Drawer.CloseTrigger />
                    <Drawer.Header>
                      <Drawer.Heading className="capitalize">
                        {placement} Drawer
                      </Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body>
                      <p className="text-sm text-muted">
                        Konten panel tambahan yang muncul dari sisi {placement}.
                      </p>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Button slot="close" variant="tertiary">
                        Tutup
                      </Button>
                      <Button slot="close" variant="primary">
                        Simpan
                      </Button>
                    </Drawer.Footer>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
          ))}
        </div>
      </Card>
    </section>
  );
}
