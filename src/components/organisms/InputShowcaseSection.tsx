import { useState } from "react";
import { Card, Input, Label, Surface } from "@heroui/react";

/**
 * Organism: InputShowcaseSection
 * Showcase komponen Input dari @heroui/react berdasarkan dokumentasi v3:
 * variants, types, full width, controlled, states, penggunaan di Surface,
 * dan kustomisasi dengan Tailwind + token tema.
 *
 * Input adalah komponen primitif tanpa compound parts. Untuk label, helper,
 * dan validasi, dokumentasi menyarankan TextField dengan Input sebagai child.
 */
export function InputShowcaseSection() {
  const [domain, setDomain] = useState("heroui.com");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Input
        </h2>
        <p className="mt-1 text-sm text-muted">
          Input teks satu baris yang primitif. Gunakan{" "}
          <code>TextField</code> dengan <code>Input</code> sebagai child untuk
          label, helper text, dan validasi.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="input-primary">Primary</Label>
              <Input
                id="input-primary"
                fullWidth
                placeholder="Primary input..."
                variant="primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-secondary">Secondary</Label>
              <Input
                id="input-secondary"
                fullWidth
                placeholder="Secondary input..."
                variant="secondary"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            <code>primary</code> adalah default dengan shadow;{" "}
            <code>secondary</code> lebih ringan tanpa shadow.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Input Types
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="input-email">Email</Label>
              <Input
                id="input-email"
                fullWidth
                placeholder="jane@example.com"
                type="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-number">Age</Label>
              <Input id="input-number" fullWidth min={0} placeholder="30" type="number" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-password">Password</Label>
              <Input
                id="input-password"
                fullWidth
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Full Width
          </h3>
          <div className="space-y-3">
            <Input fullWidth placeholder="Full width input" />
            <p className="text-xs text-muted">
              Prop <code>fullWidth</code> membuat input mengikuti lebar container.
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled
          </h3>
          <div className="space-y-2">
            <Label htmlFor="input-domain">Domain</Label>
            <Input
              id="input-domain"
              fullWidth
              placeholder="domain"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
            />
            <p className="px-1 text-sm text-muted">
              https://{domain || "your-domain"}
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            States
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="input-disabled">Disabled</Label>
              <Input
                id="input-disabled"
                fullWidth
                disabled
                defaultValue="Tidak dapat diubah"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-readonly">Read Only</Label>
              <Input
                id="input-readonly"
                fullWidth
                readOnly
                defaultValue="Nilai hanya-baca"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-required">Required</Label>
              <Input
                id="input-required"
                fullWidth
                required
                placeholder="Wajib diisi"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            In Surface
          </h3>
          <Surface className="flex items-center justify-center rounded-3xl bg-surface p-4">
            <Input
              aria-label="Nama di dalam surface"
              className="w-full"
              placeholder="Your name"
              variant="secondary"
            />
          </Surface>
          <p className="mt-3 text-xs text-muted">
            Gunakan <code>variant=&quot;secondary&quot;</code> saat Input berada
            di atas Surface.
          </p>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Customization
          </h3>
          <Input
            aria-label="Cari proyek"
            fullWidth
            className="rounded-xl border border-border/80 bg-default text-foreground placeholder:text-muted"
            placeholder="Cari proyek..."
          />
          <p className="mt-3 text-xs text-muted">
            Class Tailwind digabungkan dengan gaya bawaan. Gunakan token tema
            seperti <code>border-border</code>, <code>bg-default</code>, dan{" "}
            <code>text-foreground</code>.
          </p>
        </Card>
      </div>
    </section>
  );
}
