import { useState } from "react";
import { Card, ToggleButton } from "@heroui/react";
import { Bookmark, Heart } from "lucide-react";

/**
 * Organism: ToggleButtonShowcaseSection
 * Implementasi lengkap seluruh contoh ToggleButton dari dokumentasi HeroUI v3:
 * Usage, Variants, Icon Only, Sizes, Disabled, Controlled, dan Custom Styles.
 */
export function ToggleButtonShowcaseSection() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ToggleButton
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontrol toggle interaktif untuk status on/off atau selected/unselected menggunakan{" "}
          <code>ToggleButton</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex items-center gap-3">
            <ToggleButton>
              <Heart className="size-4" />
              Like
            </ToggleButton>
          </div>
        </Card>

        {/* 2. Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex items-center gap-3">
            <ToggleButton>
              <Heart className="size-4" />
              Default
            </ToggleButton>
            <ToggleButton variant="ghost">
              <Heart className="size-4" />
              Ghost
            </ToggleButton>
          </div>
        </Card>

        {/* 3. Icon Only */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Icon Only</h3>
          <div className="flex items-center gap-3">
            <ToggleButton isIconOnly aria-label="Like">
              <Heart className="size-4" />
            </ToggleButton>
            <ToggleButton isIconOnly aria-label="Bookmark" variant="ghost">
              <Bookmark className="size-4" />
            </ToggleButton>
          </div>
        </Card>

        {/* 4. Disabled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Disabled</h3>
          <div className="flex items-center gap-3">
            <ToggleButton isDisabled>
              <Heart className="size-4" />
              Like
            </ToggleButton>
            <ToggleButton defaultSelected isDisabled>
              <Heart className="size-4 fill-current" />
              Like
            </ToggleButton>
          </div>
        </Card>

        {/* 5. Sizes */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <ToggleButton size="sm">
                <Heart className="size-3.5" />
                Small
              </ToggleButton>
              <ToggleButton size="md">
                <Heart className="size-4" />
                Medium
              </ToggleButton>
              <ToggleButton size="lg">
                <Heart className="size-4" />
                Large
              </ToggleButton>
            </div>
            <div className="flex items-center gap-3">
              <ToggleButton isIconOnly aria-label="Like small" size="sm">
                <Heart className="size-3.5" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Like medium" size="md">
                <Heart className="size-4" />
              </ToggleButton>
              <ToggleButton isIconOnly aria-label="Like large" size="lg">
                <Heart className="size-4" />
              </ToggleButton>
            </div>
          </div>
        </Card>

        {/* 6. Controlled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled
          </h3>
          <div className="flex flex-col items-start gap-4">
            <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
              {({ isSelected: selected }) => (
                <>
                  <Heart className={`size-4 ${selected ? "fill-current" : ""}`} />
                  {selected ? "Liked" : "Like"}
                </>
              )}
            </ToggleButton>
            <p className="text-sm text-muted">
              Status:{" "}
              <span className="font-medium text-foreground">
                {isSelected ? "Selected" : "Not selected"}
              </span>
            </p>
          </div>
        </Card>

        {/* 7. Custom Styles (Tailwind CSS) */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Styles (Tailwind CSS)
          </h3>
          <div className="flex items-center gap-3">
            <ToggleButton className="gap-2 rounded-full border border-border/80 bg-surface px-4 text-foreground shadow-sm data-[selected=true]:border-accent/30 data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-soft-foreground [&_svg]:text-muted data-[selected=true]:[&_svg]:text-accent">
              <Heart className="size-4" />
              Save article
            </ToggleButton>
          </div>
        </Card>
      </div>
    </section>
  );
}
