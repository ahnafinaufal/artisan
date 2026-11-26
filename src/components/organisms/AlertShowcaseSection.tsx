import { Alert, Button, Card, CloseButton } from "@heroui/react";
import { useState } from "react";

/**
 * Organism: AlertShowcaseSection
 * Showcase komponen Alert dari @heroui/react:
 * Statuses (default, accent, success, warning, danger), dengan Action & Dismissible.
 */
export function AlertShowcaseSection() {
  const [visible, setVisible] = useState(true);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Alert
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan pesan penting dan notifikasi status menggunakan{" "}
          <code>Alert</code>, <code>Alert.Indicator</code>, <code>Alert.Content</code>,{" "}
          <code>Alert.Title</code>, dan <code>Alert.Description</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Statuses
          </h3>
          <div className="space-y-3">
            {(["default", "accent", "success", "warning", "danger"] as const).map(
              (status) => (
                <Alert key={status} status={status}>
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title className="capitalize">{status} alert</Alert.Title>
                    <Alert.Description>
                      Informasi status {status} dengan token tema HeroUI v3.
                    </Alert.Description>
                  </Alert.Content>
                </Alert>
              ),
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Action &amp; Dismissible
          </h3>
          <div className="space-y-4">
            <Alert status="accent">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Pembaruan tersedia</Alert.Title>
                <Alert.Description>
                  Versi terbaru design system siap dipasang.
                </Alert.Description>
              </Alert.Content>
              <Button size="sm" variant="secondary">
                Update
              </Button>
            </Alert>

            {visible ? (
              <Alert status="warning">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Kuota penyimpanan hampir penuh</Alert.Title>
                  <Alert.Description>
                    Sisa ruang penyimpanan di workspace kurang dari 10%.
                  </Alert.Description>
                </Alert.Content>
                <CloseButton onPress={() => setVisible(false)} />
              </Alert>
            ) : (
              <Button size="sm" variant="tertiary" onPress={() => setVisible(true)}>
                Tampilkan kembali alert
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
