import { Button, Card, toast } from "@heroui/react";

/**
 * Organism: ToastShowcaseSection
 * Showcase komponen Toast dari @heroui/react:
 * Variants (default, accent, success, warning, danger) dan Action Button.
 */
export function ToastShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Toast
        </h2>
        <p className="mt-1 text-sm text-muted">
          Notifikasi sementara menggunakan <code>Toast.Provider</code> (sudah terpasang di root aplikasi) dan helper{" "}
          <code>toast()</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              onPress={() =>
                toast("Perubahan tersimpan", {
                  description: "Konfigurasi workspace berhasil diperbarui.",
                })
              }
            >
              Default
            </Button>
            <Button
              size="sm"
              variant="primary"
              onPress={() =>
                toast.info("Info rilis", {
                  description: "HeroUI v3.2.8 aktif di proyek ini.",
                })
              }
            >
              Info
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={() =>
                toast.success("Build berhasil", {
                  description: "Seluruh modul terkompilasi tanpa error.",
                })
              }
            >
              Success
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={() =>
                toast.warning("Peringatan memori", {
                  description: "Penggunaan cache mendekati batas.",
                })
              }
            >
              Warning
            </Button>
            <Button
              size="sm"
              variant="danger"
              onPress={() =>
                toast.danger("Gagal menyambung", {
                  description: "Periksa koneksi jaringan Anda.",
                })
              }
            >
              Danger
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Action Button
          </h3>
          <Button
            variant="secondary"
            onPress={() =>
              toast("Item dihapus", {
                description: "Komponen dipindahkan ke arsip.",
                actionProps: {
                  children: "Urungkan",
                  onPress: () => toast.success("Dibatalkan"),
                },
              })
            }
          >
            Trigger Toast with Action
          </Button>
        </Card>
      </div>
    </section>
  );
}
