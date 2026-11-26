import { Button, Card, Sheet } from "@heroui/react";

/**
 * Organism: SheetShowcaseSection
 * Showcase komponen Sheet dari @heroui/react:
 * Swipeable overlay dengan Handle, Header, Body, Footer.
 */
export function SheetShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Sheet
        </h2>
        <p className="mt-1 text-sm text-muted">
          Overlay geser menggunakan <code>Sheet</code>, <code>Sheet.Trigger</code>,{" "}
          <code>Sheet.Backdrop</code>, <code>Sheet.Content</code>,{" "}
          <code>Sheet.Handle</code>, <code>Sheet.Dialog</code>,{" "}
          <code>Sheet.Header</code>, <code>Sheet.Heading</code>,{" "}
          <code>Sheet.Body</code>, dan <code>Sheet.Footer</code>.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Interactive Sheet
        </h3>
        <div className="flex flex-wrap gap-3">
          <Sheet>
            <Sheet.Trigger>
              <Button variant="primary">Open Bottom Sheet</Button>
            </Sheet.Trigger>
            <Sheet.Backdrop>
              <Sheet.Content>
                <Sheet.Handle />
                <Sheet.Dialog>
                  <Sheet.CloseTrigger />
                  <Sheet.Header>
                    <Sheet.Heading>Filter Komponen</Sheet.Heading>
                  </Sheet.Header>
                  <Sheet.Body>
                    <p className="text-sm text-muted">
                      Sheet mendukung gesture swipe-to-dismiss serta snap points yang mulus.
                    </p>
                  </Sheet.Body>
                  <Sheet.Footer>
                    <Button slot="close" variant="tertiary">
                      Reset
                    </Button>
                    <Button slot="close" variant="primary">
                      Terapkan
                    </Button>
                  </Sheet.Footer>
                </Sheet.Dialog>
              </Sheet.Content>
            </Sheet.Backdrop>
          </Sheet>
        </div>
      </Card>
    </section>
  );
}
