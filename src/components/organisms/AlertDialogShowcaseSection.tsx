import { AlertDialog, Button, Card } from "@heroui/react";

/**
 * Organism: AlertDialogShowcaseSection
 * Showcase komponen AlertDialog dari @heroui/react:
 * Confirmation dialog dengan status danger dan default.
 */
export function AlertDialogShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          AlertDialog
        </h2>
        <p className="mt-1 text-sm text-muted">
          Dialog konfirmasi kritis menggunakan <code>AlertDialog</code>,{" "}
          <code>AlertDialog.Backdrop</code>, <code>AlertDialog.Container</code>,{" "}
          <code>AlertDialog.Dialog</code>, <code>AlertDialog.Header</code>,{" "}
          <code>AlertDialog.Icon</code>, <code>AlertDialog.Heading</code>,{" "}
          <code>AlertDialog.Body</code>, dan <code>AlertDialog.Footer</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Destructive Confirmation
          </h3>
          <AlertDialog>
            <Button variant="danger">Delete Project</Button>
            <AlertDialog.Backdrop>
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-[400px]">
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />
                    <AlertDialog.Heading>Hapus proyek secara permanen?</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      Seluruh data, token tema, dan riwayat komponen akan dihapus dan tidak dapat dipulihkan.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button slot="close" variant="tertiary">
                      Batal
                    </Button>
                    <Button slot="close" variant="danger">
                      Hapus
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Warning Confirmation
          </h3>
          <AlertDialog>
            <Button variant="secondary">Publish Changes</Button>
            <AlertDialog.Backdrop>
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-[400px]">
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="warning" />
                    <AlertDialog.Heading>Publikasikan rilis baru?</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      Perubahan akan langsung tersedia untuk seluruh anggota tim di workspace.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button slot="close" variant="tertiary">
                      Tinjau Ulang
                    </Button>
                    <Button slot="close" variant="primary">
                      Publikasikan
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        </Card>
      </div>
    </section>
  );
}
