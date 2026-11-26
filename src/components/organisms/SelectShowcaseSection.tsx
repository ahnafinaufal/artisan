import { useState } from "react";
import { Card, Description, Label, ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";

const ROLES = [
  { id: "admin", name: "Administrator" },
  { id: "editor", name: "Editor" },
  { id: "viewer", name: "Viewer" },
];

/**
 * Organism: SelectShowcaseSection
 * Showcase komponen Select dari @heroui/react.
 */
export function SelectShowcaseSection() {
  const [role, setRole] = useState<Key | null>("editor");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Select
        </h2>
        <p className="mt-1 text-sm text-muted">
          Daftar pilihan dropdown menggunakan <code>Select</code>,{" "}
          <code>Select.Trigger</code>, <code>Select.Value</code>,{" "}
          <code>Select.Indicator</code>, dan <code>Select.Popover</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled Select
          </h3>
          <Select
            value={role}
            onChange={setRole}
            placeholder="Pilih peran"
            className="w-full max-w-xs"
          >
            <Label>Peran Anggota</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Description>Menentukan hak akses di workspace.</Description>
            <Select.Popover>
              <ListBox>
                {ROLES.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled Select
          </h3>
          <Select isDisabled placeholder="Terkunci" className="w-full max-w-xs">
            <Label>Region</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="ap-southeast-1" textValue="Asia Pacific">
                  Asia Pacific
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </Card>
      </div>
    </section>
  );
}
