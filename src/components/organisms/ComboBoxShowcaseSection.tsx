import { useState } from "react";
import { Card, ComboBox, Input, Label, ListBox } from "@heroui/react";
import type { Key } from "@heroui/react";

const FRAMEWORKS = [
  { id: "react", name: "React" },
  { id: "next", name: "Next.js" },
  { id: "vite", name: "Vite" },
  { id: "remix", name: "Remix" },
  { id: "astro", name: "Astro" },
];

/**
 * Organism: ComboBoxShowcaseSection
 * Showcase komponen ComboBox dari @heroui/react.
 */
export function ComboBoxShowcaseSection() {
  const [selected, setSelected] = useState<Key | null>("react");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ComboBox
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menggabungkan input teks dan daftar opsi menggunakan{" "}
          <code>ComboBox</code>, <code>ComboBox.InputGroup</code>,{" "}
          <code>ComboBox.Trigger</code>, dan <code>ComboBox.Popover</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Searchable ComboBox
        </h3>
        <ComboBox
          selectedKey={selected}
          onSelectionChange={setSelected}
          className="w-full"
        >
          <Label>Framework</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Ketik atau pilih framework..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              {FRAMEWORKS.map((fw) => (
                <ListBox.Item key={fw.id} id={fw.id} textValue={fw.name}>
                  {fw.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
      </Card>
    </section>
  );
}
