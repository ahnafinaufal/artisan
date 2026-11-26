import { useState } from "react";
import { Card, Label, Tag, TagGroup } from "@heroui/react";

const INITIAL_TAGS = [
  { id: "react", name: "React" },
  { id: "heroui", name: "HeroUI" },
  { id: "tailwind", name: "Tailwind v4" },
  { id: "typescript", name: "TypeScript" },
];

/**
 * Organism: TagGroupShowcaseSection
 * Showcase komponen TagGroup dari @heroui/react:
 * Selectable & Removable tags.
 */
export function TagGroupShowcaseSection() {
  const [tags, setTags] = useState(INITIAL_TAGS);

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
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Selectable Tags
          </h3>
          <TagGroup selectionMode="multiple" defaultSelectedKeys={["react", "heroui"]}>
            <Label className="mb-2 block">Technologies</Label>
            <TagGroup.List>
              {INITIAL_TAGS.map((tag) => (
                <Tag key={tag.id} id={tag.id}>
                  {tag.name}
                </Tag>
              ))}
            </TagGroup.List>
          </TagGroup>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Removable Tags
          </h3>
          <TagGroup
            onRemove={(keys) =>
              setTags((prev) => prev.filter((t) => !keys.has(t.id)))
            }
          >
            <Label className="mb-2 block">Active Filters</Label>
            <TagGroup.List items={tags}>
              {(item) => <Tag id={item.id}>{item.name}</Tag>}
            </TagGroup.List>
          </TagGroup>
        </Card>
      </div>
    </section>
  );
}
