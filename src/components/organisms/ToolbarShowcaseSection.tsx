import { Button, Card, Separator, ToggleButton, Toolbar } from "@heroui/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Copy,
  Italic,
  Scissors,
  Underline,
} from "lucide-react";

/**
 * Organism: ToolbarShowcaseSection
 * Showcase komponen Toolbar dari @heroui/react:
 * Horizontal, Attached, dan Vertical toolbar dengan navigasi tombol panah.
 */
export function ToolbarShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Toolbar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontainer kontrol interaktif dengan dukungan navigasi tombol panah menggunakan{" "}
          <code>Toolbar</code> (<code>orientation</code>, <code>isAttached</code>).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Editor Toolbar
          </h3>
          <Toolbar aria-label="Text formatting toolbar">
            <ToggleButton isIconOnly size="sm" aria-label="Bold">
              <Bold className="size-4" />
            </ToggleButton>
            <ToggleButton isIconOnly size="sm" aria-label="Italic">
              <Italic className="size-4" />
            </ToggleButton>
            <ToggleButton isIconOnly size="sm" aria-label="Underline">
              <Underline className="size-4" />
            </ToggleButton>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Button isIconOnly size="sm" variant="ghost" aria-label="Cut">
              <Scissors className="size-4" />
            </Button>
            <Button isIconOnly size="sm" variant="ghost" aria-label="Copy">
              <Copy className="size-4" />
            </Button>
          </Toolbar>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Attached &amp; Vertical
          </h3>
          <div className="flex flex-wrap items-start gap-6">
            <Toolbar isAttached aria-label="Attached alignment toolbar">
              <Button isIconOnly size="sm" variant="secondary" aria-label="Align Left">
                <AlignLeft className="size-4" />
              </Button>
              <Button isIconOnly size="sm" variant="secondary" aria-label="Align Center">
                <AlignCenter className="size-4" />
              </Button>
              <Button isIconOnly size="sm" variant="secondary" aria-label="Align Right">
                <AlignRight className="size-4" />
              </Button>
            </Toolbar>

            <Toolbar orientation="vertical" aria-label="Vertical toolbar">
              <ToggleButton isIconOnly size="sm" aria-label="Bold">
                <Bold className="size-4" />
              </ToggleButton>
              <ToggleButton isIconOnly size="sm" aria-label="Italic">
                <Italic className="size-4" />
              </ToggleButton>
            </Toolbar>
          </div>
        </Card>
      </div>
    </section>
  );
}
