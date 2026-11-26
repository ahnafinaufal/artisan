import { useState, useMemo } from "react";
import { FileText, Globe, Rocket, ShoppingBag } from "lucide-react";
import {
  Avatar,
  Card,
  Description,
  EmptyState,
  ErrorMessage,
  Label,
  Tag,
  TagGroup,
  useListData,
} from "@heroui/react";
import type { Key } from "@heroui/react";

const INITIAL_TAGS = [
  { id: "react", name: "React" },
  { id: "heroui", name: "HeroUI" },
  { id: "tailwind", name: "Tailwind v4" },
  { id: "typescript", name: "TypeScript" },
];

export function TagGroupShowcaseSection() {
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [frameworks, setFrameworks] = useState([
    { id: "react", name: "React" },
    { id: "vue", name: "Vue" },
    { id: "angular", name: "Angular" },
    { id: "svelte", name: "Svelte" },
  ]);
  const [singleSelected, setSingleSelected] = useState<Iterable<Key>>(
    new Set(["news"]),
  );
  const [multiSelected, setMultiSelected] = useState<Iterable<Key>>(
    new Set(["news", "travel"]),
  );
  const [controlled, setControlled] = useState<Iterable<Key>>(
    new Set(["news", "travel"]),
  );
  const [amenities, setAmenities] = useState<Iterable<Key>>(new Set());
  const isInvalid = useMemo(() => Array.from(amenities).length === 0, [amenities]);

  const list = useListData<{ id: string; name: string; avatar: string; fallback: string }>({
    getKey: (item) => item.id,
    initialItems: [
      { id: "fred", name: "Fred", avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg", fallback: "F" },
      { id: "michael", name: "Michael", avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg", fallback: "M" },
      { id: "jane", name: "Jane", avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg", fallback: "J" },
    ],
    initialSelectedKeys: new Set(["fred", "michael"]),
  });

  const onRemoveTags = (keys: Set<Key>) => {
    setTags((prev) => prev.filter((t) => !keys.has(t.id)));
  };
  const onRemoveFrameworks = (keys: Set<Key>) => {
    setFrameworks((prev) => prev.filter((t) => !keys.has(t.id)));
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          TagGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Daftar tag dengan navigasi keyboard dan penghapusan menggunakan{" "}
          <code>TagGroup</code>, <code>TagGroup.List</code>, dan <code>Tag</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-col gap-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <TagGroup key={size} selectionMode="single" size={size}>
                <Label className="mb-1 block capitalize">{size}</Label>
                <TagGroup.List>
                  <Tag>News</Tag>
                  <Tag>Travel</Tag>
                  <Tag>Gaming</Tag>
                </TagGroup.List>
              </TagGroup>
            ))}
          </div>
        </Card>

        {/* Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-col gap-4">
            <TagGroup selectionMode="single" variant="default">
              <Label className="mb-1 block">Default</Label>
              <TagGroup.List>
                <Tag>News</Tag>
                <Tag>Travel</Tag>
                <Tag>Gaming</Tag>
              </TagGroup.List>
            </TagGroup>
            <TagGroup selectionMode="single" variant="surface">
              <Label className="mb-1 block">Surface</Label>
              <TagGroup.List>
                <Tag>News</Tag>
                <Tag>Travel</Tag>
                <Tag>Gaming</Tag>
              </TagGroup.List>
            </TagGroup>
          </div>
        </Card>

        {/* Disabled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Disabled</h3>
          <div className="flex flex-col gap-4">
            <TagGroup selectionMode="single">
              <Label className="mb-1 block">Disabled Tags</Label>
              <TagGroup.List>
                <Tag isDisabled>News</Tag>
                <Tag>Travel</Tag>
                <Tag isDisabled>Gaming</Tag>
              </TagGroup.List>
              <Description>Some tags are disabled</Description>
            </TagGroup>
            <TagGroup disabledKeys={["travel"]} selectionMode="single">
              <Label className="mb-1 block">Disabled Keys</Label>
              <TagGroup.List>
                <Tag id="news">News</Tag>
                <Tag id="travel">Travel</Tag>
                <Tag id="gaming">Gaming</Tag>
              </TagGroup.List>
              <Description>Tags disabled via disabledKeys prop</Description>
            </TagGroup>
          </div>
        </Card>

        {/* Selection Modes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Selection Modes
          </h3>
          <div className="flex flex-col gap-4">
            <TagGroup
              selectedKeys={singleSelected}
              selectionMode="single"
              onSelectionChange={(keys) => setSingleSelected(keys)}
            >
              <Label className="mb-1 block">Single Selection</Label>
              <TagGroup.List>
                <Tag>News</Tag>
                <Tag>Travel</Tag>
                <Tag>Gaming</Tag>
                <Tag>Shopping</Tag>
              </TagGroup.List>
              <Description>Choose one category</Description>
            </TagGroup>
            <TagGroup
              selectedKeys={multiSelected}
              selectionMode="multiple"
              onSelectionChange={(keys) => setMultiSelected(keys)}
            >
              <Label className="mb-1 block">Multiple Selection</Label>
              <TagGroup.List>
                <Tag>News</Tag>
                <Tag>Travel</Tag>
                <Tag>Gaming</Tag>
                <Tag>Shopping</Tag>
              </TagGroup.List>
              <Description>Choose multiple categories</Description>
            </TagGroup>
          </div>
        </Card>

        {/* Controlled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled
          </h3>
          <TagGroup
            selectedKeys={controlled}
            selectionMode="multiple"
            onSelectionChange={(keys) => setControlled(keys)}
          >
            <Label className="mb-1 block">Categories (controlled)</Label>
            <TagGroup.List>
              <Tag id="news">News</Tag>
              <Tag id="travel">Travel</Tag>
              <Tag id="gaming">Gaming</Tag>
              <Tag id="shopping">Shopping</Tag>
            </TagGroup.List>
            <Description>
              Selected:{" "}
              {Array.from(controlled).length > 0
                ? Array.from(controlled).join(", ")
                : "None"}
            </Description>
          </TagGroup>
        </Card>

        {/* Error Message */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Error Message
          </h3>
          <TagGroup
            selectedKeys={amenities}
            selectionMode="multiple"
            onSelectionChange={(keys) => setAmenities(keys)}
          >
            <Label>Amenities</Label>
            <TagGroup.List>
              <Tag id="laundry">Laundry</Tag>
              <Tag id="fitness">Fitness center</Tag>
              <Tag id="parking">Parking</Tag>
              <Tag id="pool">Swimming pool</Tag>
              <Tag id="breakfast">Breakfast</Tag>
            </TagGroup.List>
            <Description>
              {isInvalid
                ? "Select at least one category"
                : "Selected: " + Array.from(amenities).join(", ")}
            </Description>
            <ErrorMessage>{!!isInvalid && <>Please select at least one category</>}</ErrorMessage>
          </TagGroup>
        </Card>

        {/* Removable Tags */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Removable Tags
          </h3>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <TagGroup selectionMode="single" onRemove={onRemoveTags}>
                <Label className="mb-1 block">Default Remove Button</Label>
                <TagGroup.List
                  items={tags}
                  renderEmptyState={() => (
                    <EmptyState className="p-1">No categories found</EmptyState>
                  )}
                >
                  {(tag) => (
                    <Tag key={tag.name} id={tag.id} textValue={tag.name}>
                      {tag.name}
                    </Tag>
                  )}
                </TagGroup.List>
                <Description>Click the X to remove tags</Description>
              </TagGroup>
            </div>
            <div className="w-full">
              <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
                <Label className="mb-1 block">Custom Remove Button</Label>
                <TagGroup.List
                  items={frameworks}
                  renderEmptyState={() => (
                    <EmptyState className="p-1">No frameworks found</EmptyState>
                  )}
                >
                  {(tag) => (
                    <Tag key={tag.id} id={tag.id} textValue={tag.name}>
                      {(renderProps) => (
                        <>
                          {tag.name}
                          {!!renderProps.allowsRemoving && (
                            <Tag.RemoveButton>
                              <span className="text-xs">×</span>
                            </Tag.RemoveButton>
                          )}
                        </>
                      )}
                    </Tag>
                  )}
                </TagGroup.List>
                <Description>Custom remove button</Description>
              </TagGroup>
            </div>
          </div>
        </Card>

        {/* With Icons */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Icons
          </h3>
          <TagGroup selectionMode="single">
            <Label className="mb-1 block">Categories</Label>
            <TagGroup.List>
              <Tag>
                <FileText className="size-3.5" />
                News
              </Tag>
              <Tag>
                <Globe className="size-3.5" />
                Travel
              </Tag>
              <Tag>
                <Rocket className="size-3.5" />
                Gaming
              </Tag>
              <Tag>
                <ShoppingBag className="size-3.5" />
                Shopping
              </Tag>
            </TagGroup.List>
            <Description>Tags with icons</Description>
          </TagGroup>
        </Card>

        {/* With Prefix (Icons/Avatars) */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Prefix (Icons / Avatars)
          </h3>
          <div className="flex flex-col gap-4">
            <TagGroup selectionMode="single">
              <Label className="mb-1 block">With Avatars</Label>
              <TagGroup.List>
                <Tag>
                  <Avatar className="size-4">
                    <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg" />
                    <Avatar.Fallback>F</Avatar.Fallback>
                  </Avatar>
                  Fred
                </Tag>
                <Tag>
                  <Avatar className="size-4">
                    <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg" />
                    <Avatar.Fallback>M</Avatar.Fallback>
                  </Avatar>
                  Michael
                </Tag>
                <Tag>
                  <Avatar className="size-4">
                    <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg" />
                    <Avatar.Fallback>J</Avatar.Fallback>
                  </Avatar>
                  Jane
                </Tag>
              </TagGroup.List>
              <Description>Tags with avatars</Description>
            </TagGroup>
          </div>
        </Card>

        {/* With List Data */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With List Data
          </h3>
          <TagGroup
            selectedKeys={list.selectedKeys}
            selectionMode="multiple"
            onRemove={(keys) => list.remove(...keys)}
            onSelectionChange={(keys) => list.setSelectedKeys(keys)}
          >
            <Label>Team Members</Label>
            <TagGroup.List
              items={list.items}
              renderEmptyState={() => (
                <EmptyState className="p-1">No team members</EmptyState>
              )}
            >
              {(user) => (
                <Tag key={user.id} id={user.id} textValue={user.name}>
                  <Avatar className="size-4" size="sm">
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                  </Avatar>
                  {user.name}
                </Tag>
              )}
            </TagGroup.List>
            <Description>Select team members for your project</Description>
          </TagGroup>
          {list.selectedKeys !== "all" &&
            Array.from(list.selectedKeys).length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm font-medium text-muted">Selected:</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(list.selectedKeys).map((key) => {
                    const user = list.getItem(key);
                    if (!user) return null;
                    return (
                      <div
                        key={`${user.id}-selected`}
                        className="flex items-center gap-2 rounded-lg bg-surface-tertiary px-2 py-1"
                      >
                        <Avatar className="size-4" size="sm">
                          <Avatar.Image src={user.avatar} />
                          <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </Card>
      </div>
    </section>
  );
}