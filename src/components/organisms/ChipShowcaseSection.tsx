import { useState } from "react";
import { Avatar, Card, Chip } from "@heroui/react";
import { Check, Sparkles, Tag, X } from "lucide-react";

/**
 * Organism: ChipShowcaseSection
 * Showcase komponen Chip sesuai dokumentasi HeroUI v3:
 * Usage, Variants, Colors, Sizes, With Icons/Avatar, dan Dismissible.
 */
export function ChipShowcaseSection() {
  const [tags, setTags] = useState(["React", "Tailwind v4", "HeroUI v3", "TypeScript"]);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Chip</h2>
        <p className="mt-1 text-sm text-muted">
          Elemen ringkas untuk label, status, dan kategori menggunakan{" "}
          <code>Chip</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Chip>Default</Chip>
            <Chip color="accent">Accent</Chip>
            <Chip color="success">Success</Chip>
          </div>
        </Card>

        {/* 2. Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Chip color="accent" variant="primary">
              Primary
            </Chip>
            <Chip color="accent" variant="secondary">
              Secondary
            </Chip>
            <Chip color="accent" variant="soft">
              Soft
            </Chip>
          </div>
        </Card>

        {/* 3. Colors */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Colors</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Chip color="default" variant="soft">
              Default
            </Chip>
            <Chip color="accent" variant="soft">
              Accent
            </Chip>
            <Chip color="success" variant="soft">
              Success
            </Chip>
            <Chip color="warning" variant="soft">
              Warning
            </Chip>
            <Chip color="danger" variant="soft">
              Danger
            </Chip>
          </div>
        </Card>

        {/* 4. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Chip size="sm" variant="soft">
              Small
            </Chip>
            <Chip size="md" variant="soft">
              Medium
            </Chip>
            <Chip size="lg" variant="soft">
              Large
            </Chip>
          </div>
        </Card>

        {/* 5. With Icons & Avatar */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Icons &amp; Avatar
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Chip color="success" variant="soft">
              <Check className="size-3.5" />
              Verified
            </Chip>
            <Chip color="accent" variant="soft">
              <Sparkles className="size-3.5" />
              New Feature
            </Chip>
            <Chip variant="secondary">
              <Tag className="size-3.5" />
              v3.2.8
            </Chip>
            <Chip variant="soft">
              <Avatar size="sm" className="size-4">
                <Avatar.Image
                  alt="Kate"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                />
                <Avatar.Fallback>K</Avatar.Fallback>
              </Avatar>
              Kate Moore
            </Chip>
          </div>
        </Card>

        {/* 6. Dismissible */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Dismissible
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Chip key={tag} variant="soft" className="gap-1.5">
                {tag}
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                  className="cursor-pointer rounded-full p-0.5 hover:bg-foreground/10"
                >
                  <X className="size-3" />
                </button>
              </Chip>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
