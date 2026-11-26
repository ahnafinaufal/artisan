import { useState } from "react";
import { Card, Description, Header, Label, ListBox } from "@heroui/react";
import type { Selection } from "@heroui/react";

/**
 * Organism: ListBoxShowcaseSection
 * Showcase komponen ListBox dari @heroui/react:
 * Single & Multiple selection dengan Section dan ItemIndicator.
 */
export function ListBoxShowcaseSection() {
  const [selected, setSelected] = useState<Selection>(new Set(["react"]));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ListBox
        </h2>
        <p className="mt-1 text-sm text-muted">
          Daftar opsi interaktif menggunakan <code>ListBox</code>,{" "}
          <code>ListBox.Section</code>, <code>ListBox.Item</code>, dan{" "}
          <code>ListBox.ItemIndicator</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Multiple Selection
          </h3>
          <ListBox
            aria-label="Frameworks"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            className="w-full max-w-xs rounded-xl border border-border p-1"
          >
            <ListBox.Item id="react" textValue="React">
              <ListBox.ItemIndicator />
              <div className="flex flex-col">
                <Label>React 19</Label>
                <Description>Library UI utama</Description>
              </div>
            </ListBox.Item>
            <ListBox.Item id="tailwind" textValue="Tailwind CSS">
              <ListBox.ItemIndicator />
              <div className="flex flex-col">
                <Label>Tailwind CSS v4</Label>
                <Description>Utility-first styling</Description>
              </div>
            </ListBox.Item>
            <ListBox.Item id="aria" textValue="React Aria">
              <ListBox.ItemIndicator />
              <div className="flex flex-col">
                <Label>React Aria</Label>
                <Description>Aksesibilitas &amp; interaksi</Description>
              </div>
            </ListBox.Item>
          </ListBox>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Sections
          </h3>
          <ListBox
            aria-label="Actions"
            selectionMode="single"
            className="w-full max-w-xs rounded-xl border border-border p-1"
          >
            <ListBox.Section>
              <Header>Design</Header>
              <ListBox.Item id="tokens" textValue="Tokens">
                <Label>Design Tokens</Label>
              </ListBox.Item>
              <ListBox.Item id="icons" textValue="Icons">
                <Label>Lucide Icons</Label>
              </ListBox.Item>
            </ListBox.Section>
            <ListBox.Section>
              <Header>Engineering</Header>
              <ListBox.Item id="ts" textValue="TypeScript">
                <Label>TypeScript</Label>
              </ListBox.Item>
            </ListBox.Section>
          </ListBox>
        </Card>
      </div>
    </section>
  );
}
