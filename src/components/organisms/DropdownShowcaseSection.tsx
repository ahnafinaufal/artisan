import { useState } from "react";
import {
  Button,
  Card,
  Description,
  Dropdown,
  Header,
  Kbd,
  Label,
  Separator,
} from "@heroui/react";
import type { Selection } from "@heroui/react";
import {
  Copy,
  Download,
  Edit3,
  EllipsisVertical,
  FilePlus,
  FolderOpen,
  MoreHorizontal,
  Save,
  Settings,
  Share2,
  Trash2,
} from "lucide-react";

export function DropdownShowcaseSection() {
  const [selected, setSelected] = useState<Selection>(new Set(["production"]));
  const [multiSelected, setMultiSelected] = useState<Selection>(
    new Set(["apple", "banana"]),
  );
  const [open, setOpen] = useState(false);

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
        {/* Action Menu with Icons & Kbd */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Action Menu (Icons + Shortcut)
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">
                Actions
                <MoreHorizontal className="size-4" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => console.log("Action:", key)}>
                <Dropdown.Item id="new-file" textValue="New File">
                  <FilePlus className="size-4 shrink-0 text-muted" />
                  <Label>New File</Label>
                  <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>N</Kbd.Content>
                  </Kbd>
                </Dropdown.Item>
                <Dropdown.Item id="open-file" textValue="Open File">
                  <FolderOpen className="size-4 shrink-0 text-muted" />
                  <Label>Open File</Label>
                  <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>O</Kbd.Content>
                  </Kbd>
                </Dropdown.Item>
                <Dropdown.Item id="save-file" textValue="Save File">
                  <Save className="size-4 shrink-0 text-muted" />
                  <Label>Save File</Label>
                  <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>S</Kbd.Content>
                  </Kbd>
                </Dropdown.Item>
                <Dropdown.Item id="delete-file" textValue="Delete File" variant="danger">
                  <Trash2 className="size-4 shrink-0 text-danger" />
                  <Label>Delete File</Label>
                  <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Abbr keyValue="shift" />
                    <Kbd.Content>D</Kbd.Content>
                  </Kbd>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        {/* With Descriptions */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Descriptions
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">File Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => console.log("Action:", key)}>
                <Dropdown.Item id="new-file" textValue="New File">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <FilePlus className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>New File</Label>
                    <Description>Create a new file</Description>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="open-file" textValue="Open File">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <FolderOpen className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Open File</Label>
                    <Description>Open an existing file</Description>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="save-file" textValue="Save File">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Save className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Save File</Label>
                    <Description>Save the current file</Description>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="delete-file" textValue="Delete File" variant="danger">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Trash2 className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Delete File</Label>
                    <Description>Move to trash</Description>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        {/* Disabled Items + Sections */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled Items &amp; Sections
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button isIconOnly aria-label="Menu" variant="secondary">
                <EllipsisVertical className="outline-none" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover className="min-w-[240px]">
              <Dropdown.Menu
                disabledKeys={["delete-file"]}
                onAction={(key) => console.log("Action:", key)}
              >
                <Dropdown.Section>
                  <Header>Actions</Header>
                  <Dropdown.Item id="new-file" textValue="New File">
                    <FilePlus className="size-4 shrink-0 text-muted" />
                    <Label>New File</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="edit-file" textValue="Edit File">
                    <Edit3 className="size-4 shrink-0 text-muted" />
                    <Label>Edit File</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Separator />
                <Dropdown.Section>
                  <Header>Danger Zone</Header>
                  <Dropdown.Item id="delete-file" textValue="Delete File" variant="danger">
                    <Trash2 className="size-4 shrink-0 text-danger" />
                    <Label>Delete File</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        {/* Single Selection */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Single Selection
          </h3>
          <div className="flex items-center gap-4">
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="tertiary">
                  Env: {selected instanceof Set ? Array.from(selected)[0] : "All"}
                  <MoreHorizontal className="size-4" />
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

        {/* Multiple Selection */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Multiple Selection
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">Preferred Fruits</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover className="min-w-[240px]">
              <Dropdown.Menu
                selectedKeys={multiSelected}
                selectionMode="multiple"
                onSelectionChange={setMultiSelected}
              >
                <Dropdown.Section>
                  <Header>Select a fruit</Header>
                  <Dropdown.Item id="apple" textValue="Apple">
                    <Dropdown.ItemIndicator />
                    <Label>Apple</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="banana" textValue="Banana">
                    <Dropdown.ItemIndicator />
                    <Label>Banana</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="cherry" textValue="Cherry">
                    <Dropdown.ItemIndicator />
                    <Label>Cherry</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Item id="orange" textValue="Orange">
                  <Dropdown.ItemIndicator />
                  <Label>Orange</Label>
                </Dropdown.Item>
                <Dropdown.Item id="pear" textValue="Pear">
                  <Dropdown.ItemIndicator />
                  <Label>Pear</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <p className="mt-3 text-xs text-muted">
            Selected:{" "}
            {multiSelected instanceof Set
              ? Array.from(multiSelected).join(", ") || "None"
              : "None"}
          </p>
        </Card>

        {/* Controlled Open State */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled Open State
          </h3>
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-muted">
              Dropdown is: <strong>{open ? "open" : "closed"}</strong>
            </p>
            <Dropdown isOpen={open} onOpenChange={setOpen}>
              <Button aria-label="Menu" variant="secondary">
                Actions
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item id="new-file" textValue="New File">
                    <Label>New File</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="open-file" textValue="Open File">
                    <Label>Open File</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </Card>

        {/* Submenus */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Submenus
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">Share</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => console.log("Action:", key)}>
                <Dropdown.Item id="copy-link" textValue="Copy Link">
                  <Copy className="size-4 shrink-0 text-muted" />
                  <Label>Copy Link</Label>
                </Dropdown.Item>
                <Dropdown.SubmenuTrigger>
                  <Dropdown.Item id="share" textValue="Share">
                    <Share2 className="size-4 shrink-0 text-muted" />
                    <Label>More options</Label>
                    <Dropdown.SubmenuIndicator />
                  </Dropdown.Item>
                  <Dropdown.Popover>
                    <Dropdown.Menu>
                      <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                        <Label>WhatsApp</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="telegram" textValue="Telegram">
                        <Label>Telegram</Label>
                      </Dropdown.Item>
                      <Dropdown.SubmenuTrigger>
                        <Dropdown.Item id="email" textValue="Email">
                          <Label>Email</Label>
                          <Dropdown.SubmenuIndicator />
                        </Dropdown.Item>
                        <Dropdown.Popover>
                          <Dropdown.Menu>
                            <Dropdown.Item id="work" textValue="Work email">
                              <Label>Work email</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="personal" textValue="Personal email">
                              <Label>Personal email</Label>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown.SubmenuTrigger>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.SubmenuTrigger>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        {/* Custom Trigger (Avatar) */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Trigger
          </h3>
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Button isIconOnly variant="tertiary" aria-label="Account">
                <Settings className="size-4" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                    JD
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium text-foreground">
                      Jane Doe
                    </p>
                    <p className="text-xs leading-none text-muted">
                      jane@example.com
                    </p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item id="dashboard" textValue="Dashboard">
                  <Label>Dashboard</Label>
                </Dropdown.Item>
                <Dropdown.Item id="profile" textValue="Profile">
                  <Label>Profile</Label>
                </Dropdown.Item>
                <Dropdown.Item id="settings" textValue="Settings">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Settings</Label>
                    <Settings className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Log Out</Label>
                    <Download className="size-3.5 text-danger" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>

        {/* Long Press Trigger */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Long Press Trigger
          </h3>
          <Dropdown trigger="longPress">
            <Dropdown.Trigger>
              <Button variant="secondary">Long Press Me</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item id="new-file" textValue="New File">
                  <Label>New File</Label>
                </Dropdown.Item>
                <Dropdown.Item id="open-file" textValue="Open File">
                  <Label>Open File</Label>
                </Dropdown.Item>
                <Dropdown.Item id="delete-file" textValue="Delete File" variant="danger">
                  <Label>Delete File</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <p className="mt-3 text-xs text-muted">
            Tahan (long press) tombol untuk membuka menu.
          </p>
        </Card>

        {/* Custom Indicator */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Indicator (Dot)
          </h3>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">Text Alignment</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover className="min-w-[200px]">
              <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["left"]}>
                <Dropdown.Section>
                  <Header>Alignment</Header>
                  <Dropdown.Item id="left" textValue="Left">
                    <Dropdown.ItemIndicator type="dot" />
                    <Label>Left</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="center" textValue="Center">
                    <Dropdown.ItemIndicator type="dot" />
                    <Label>Center</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="right" textValue="Right">
                    <Dropdown.ItemIndicator type="dot" />
                    <Label>Right</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>
      </div>
    </section>
  );
}