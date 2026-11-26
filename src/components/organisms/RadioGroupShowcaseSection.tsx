import { useState } from "react";
import { Card, Description, Label, Radio, RadioGroup } from "@heroui/react";

/**
 * Organism: RadioGroupShowcaseSection
 * Showcase komponen RadioGroup & Radio dari @heroui/react:
 * Vertical, Horizontal, dan Description.
 */
export function RadioGroupShowcaseSection() {
  const [plan, setPlan] = useState("pro");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          RadioGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pemilihan satu opsi menggunakan <code>RadioGroup</code>, <code>Radio</code>,{" "}
          <code>Radio.Control</code>, <code>Radio.Indicator</code>, dan{" "}
          <code>Radio.Content</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Plan Selection
          </h3>
          <RadioGroup value={plan} onChange={setPlan}>
            <Label>Pilih Paket</Label>
            <Radio value="free">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>Starter</Label>
                <Description>Gratis untuk proyek personal</Description>
              </Radio.Content>
            </Radio>
            <Radio value="pro">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>Pro</Label>
                <Description>Untuk tim produk dan skala produksi</Description>
              </Radio.Content>
            </Radio>
            <Radio value="enterprise">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>Enterprise</Label>
                <Description>SLA khusus dan dukungan prioritas</Description>
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Horizontal Orientation
          </h3>
          <RadioGroup orientation="horizontal" defaultValue="md">
            <Label>Ukuran</Label>
            {(["sm", "md", "lg"] as const).map((sz) => (
              <Radio key={sz} value={sz}>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label className="uppercase">{sz}</Label>
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </Card>
      </div>
    </section>
  );
}
