import { Button, Card, Modal } from "@heroui/react";

/**
 * Organism: ModalShowcaseSection
 * Showcase komponen Modal dari @heroui/react:
 * Basic Modal dan Sizes.
 */
export function ModalShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Modal
        </h2>
        <p className="mt-1 text-sm text-muted">
          Overlay dialog fokus menggunakan <code>Modal</code>,{" "}
          <code>Modal.Backdrop</code>, <code>Modal.Container</code>,{" "}
          <code>Modal.Dialog</code>, <code>Modal.Header</code>,{" "}
          <code>Modal.Heading</code>, <code>Modal.Body</code>, dan{" "}
          <code>Modal.Footer</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Default Modal
          </h3>
          <Modal>
            <Button>Open Modal</Button>
            <Modal.Backdrop>
              <Modal.Container>
                <Modal.Dialog className="sm:max-w-[420px]">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Edit Workspace</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-sm text-muted">
                      Kelola preferensi tema dan izin anggota di workspace Anda.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="tertiary">
                      Batal
                    </Button>
                    <Button slot="close" variant="primary">
                      Simpan Perubahan
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes
          </h3>
          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Modal key={size}>
                <Button variant="secondary" className="uppercase">
                  {size}
                </Button>
                <Modal.Backdrop>
                  <Modal.Container size={size}>
                    <Modal.Dialog>
                      <Modal.CloseTrigger />
                      <Modal.Header>
                        <Modal.Heading className="uppercase">
                          Modal Size: {size}
                        </Modal.Heading>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="text-sm text-muted">
                          Contoh ukuran modal <code>{size}</code> di HeroUI v3.
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button slot="close" variant="primary">
                          Selesai
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
