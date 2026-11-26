import { useState } from "react";
import { Button, Card, Description, Dropdown, Header, Label } from "@heroui/react";
import type { Selection } from "@heroui/react";
import { ChevronDown } from "lucide-react";

/**
 * Organism: DropdownShowcaseSection
 * Showcase komponen Dropdown dari @heroui/react:
 * Action menu, Sections & Descriptions, serta Single Selection.
 */
export function DropdownShowcaseSection() {
  const [selected, setSelected] = useState<Selection>(new Set(["production"]));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dropdown
        </h2>
        <p className="mt-1 text-sm text-muted">
          Daftar aksi atau pilihan menggunakan <code>Dropdown</code>,{" "}
          <code>Dropdown.Trigger</code>, <code>Dropdown.Popover</code>,{" "}
          <code>Dropdown.Menu</code>, <code>Dropdown.Section</code>, dan{" "}
          <code>Dropdown.Item</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Action Menu
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">
                Actions
                <ChevronDown className="size-4" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => console.log("Action:", key)}>
                <Dropdown.Section>
                  <Header>File</Header>
                  <Dropdown.Item id="new" textValue="New File">
                    <Label>New File</Label>
                    <Description>Buat berkas komponen baru</Description>
                  </Dropdown.Item>
                  <Dropdown.Item id="duplicate" textValue="Duplicate">
                    <Label>Duplicate</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Section>
                  <Header>Danger Zone</Header>
                  <Dropdown.Item id="delete" variant="danger" textValue="Delete">
                    <Label>Delete</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Single Selection
          </h3>
          <div className="flex items-center gap-4">
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="tertiary">
                  Env: {selected instanceof Set ? Array.from(selected)[0] : "All"}
                  <ChevronDown className="size-4" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item id="development" textValue="Development">
                    <Dropdown.ItemIndicator />
                    <Label>Development</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="staging" textValue="Staging">
                    <Dropdown.ItemIndicator />
                    <Label>Staging</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="production" textValue="Production">
                    <Dropdown.ItemIndicator />
                    <Label>Production</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </Card>
      </div>
    </section>
  );
}
