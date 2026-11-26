import { useState } from "react";
import {
  Avatar,
  Card,
  Description,
  Header,
  Kbd,
  Label,
  ListBox,
  ListLayout,
  Separator,
  Surface,
  Virtualizer,
} from "@heroui/react";
import type { Selection } from "@heroui/react";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";

const USERS = [
  { id: "1", name: "Bob", email: "bob@heroui.com", avatar: "blue", fallback: "B" },
  { id: "2", name: "Fred", email: "fred@heroui.com", avatar: "green", fallback: "F" },
  { id: "3", name: "Martha", email: "martha@heroui.com", avatar: "purple", fallback: "M" },
];

function UserItem({ id, name, email, avatar, fallback, customIndicator }: {
  id: string;
  name: string;
  email: string;
  avatar: string;
  fallback: string;
  customIndicator?: boolean;
}) {
  return (
    <ListBox.Item id={id} textValue={name}>
      <Avatar size="sm">
        <Avatar.Image
          alt={name}
          src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/${avatar}.jpg`}
        />
        <Avatar.Fallback>{fallback}</Avatar.Fallback>
      </Avatar>
      <div className="flex flex-col">
        <Label>{name}</Label>
        <Description>{email}</Description>
      </div>
      <ListBox.ItemIndicator>
        {customIndicator
          ? ({ isSelected }) =>
              isSelected ? (
                <Check className="size-4 text-accent-soft-foreground" />
              ) : null
          : undefined}
      </ListBox.ItemIndicator>
    </ListBox.Item>
  );
}

export function ListBoxShowcaseSection() {
  const [selected, setSelected] = useState<Selection>(new Set(["react"]));
  const [usersSelected, setUsersSelected] = useState<Selection>(new Set(["1"]));

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
        {/* Default (Avatar + Description) */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Default</h3>
          <ListBox
            aria-label="Users"
            className="w-full max-w-xs rounded-xl border border-border p-1"
            selectionMode="single"
            defaultSelectedKeys={["1"]}
          >
            {USERS.map((user) => (
              <UserItem key={user.id} {...user} />
            ))}
          </ListBox>
        </Card>

        {/* Multiple Selection */}
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
          <p className="mt-3 text-xs text-muted">
            Selected:{" "}
            {selected instanceof Set
              ? Array.from(selected).join(", ") || "None"
              : "None"}
          </p>
        </Card>

        {/* With Sections */}
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

        {/* With Disabled Items */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Disabled Items
          </h3>
          <Surface className="w-[256px] rounded-3xl shadow-surface">
            <ListBox
              aria-label="File actions"
              className="w-full p-2"
              disabledKeys={["delete-file"]}
              selectionMode="none"
              onAction={(key) => console.log("Action:", key)}
            >
              <ListBox.Section>
                <Header>Actions</Header>
                <ListBox.Item id="new-file" textValue="New file">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Plus className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>New file</Label>
                    <Description>Create a new file</Description>
                  </div>
                  <Kbd className="ms-auto" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>N</Kbd.Content>
                  </Kbd>
                </ListBox.Item>
                <ListBox.Item id="edit-file" textValue="Edit file">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Pencil className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Edit file</Label>
                    <Description>Make changes</Description>
                  </div>
                  <Kbd className="ms-auto" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>E</Kbd.Content>
                  </Kbd>
                </ListBox.Item>
              </ListBox.Section>
              <Separator />
              <ListBox.Section>
                <Header>Danger zone</Header>
                <ListBox.Item id="delete-file" textValue="Delete file" variant="danger">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Trash2 className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Delete file</Label>
                    <Description>Move to trash</Description>
                  </div>
                  <Kbd className="ms-auto" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Abbr keyValue="shift" />
                    <Kbd.Content>D</Kbd.Content>
                  </Kbd>
                </ListBox.Item>
              </ListBox.Section>
            </ListBox>
          </Surface>
        </Card>

        {/* Controlled + Custom Check Icon */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled (Custom Check)
          </h3>
          <div className="space-y-3">
            <Surface className="w-[256px] rounded-3xl shadow-surface">
              <ListBox
                aria-label="Users"
                selectedKeys={usersSelected}
                selectionMode="multiple"
                onSelectionChange={setUsersSelected}
              >
                {USERS.map((user) => (
                  <UserItem key={user.id} {...user} customIndicator />
                ))}
              </ListBox>
            </Surface>
            <p className="text-sm text-muted">
              Selected:{" "}
              {usersSelected instanceof Set && usersSelected.size > 0
                ? Array.from(usersSelected).join(", ")
                : "None"}
            </p>
          </div>
        </Card>

        {/* Custom Styles */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Styles
          </h3>
          <ListBox
            aria-label="Assignee"
            className="w-56 rounded-xl border border-border/80 bg-surface p-1 shadow-sm"
            selectionMode="single"
            defaultSelectedKeys={["1"]}
          >
            {USERS.slice(0, 2).map((user) => (
              <ListBox.Item
                key={user.id}
                className="rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5"
                id={user.id}
                textValue={user.name}
              >
                <Avatar size="sm">
                  <Avatar.Image
                    alt={user.name}
                    src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/${user.avatar}.jpg`}
                  />
                  <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col">
                  <Label>{user.name}</Label>
                  <Description>{user.email}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Card>

        {/* Virtualization */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Virtualization (1000 items)
          </h3>
          <VirtualizationExample />
        </Card>
      </div>
    </section>
  );
}

function VirtualizationExample() {
  const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
  const users = Array.from({ length: 1000 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acme.com`,
    };
  });

  return (
    <Virtualizer layout={ListLayout} layoutOptions={{ rowHeight: 50 }}>
      <ListBox
        aria-label="Virtualized list with 1000 items"
        className="h-[300px] w-[280px] overflow-y-auto rounded-xl border border-border"
        items={users}
      >
        {(user) => (
          <ListBox.Item id={user.id} textValue={user.name}>
            <div className="flex flex-col">
              <Label>{user.name}</Label>
              <Description>{user.email}</Description>
            </div>
            <ListBox.ItemIndicator />
          </ListBox.Item>
        )}
      </ListBox>
    </Virtualizer>
  );
}