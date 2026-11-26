import { useState } from "react";
import { Card, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import type { Key } from "@heroui/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  LayoutGrid,
  List,
  Underline,
} from "lucide-react";

/**
 * Organism: ToggleButtonGroupShowcaseSection
 * Showcase komponen ToggleButtonGroup dari @heroui/react:
 * Single/Multiple selection, Detached vs Connected, Sizes, Orientation, FullWidth, dan Disabled.
 */
export function ToggleButtonGroupShowcaseSection() {
  const [formatting, setFormatting] = useState<Set<Key>>(new Set(["bold"]));
  const [alignment, setAlignment] = useState<Set<Key>>(new Set(["left"]));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ToggleButtonGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mengelompokkan <code>ToggleButton</code> menjadi satu kontrol terpadu dengan{" "}
          <code>ToggleButtonGroup</code> dan <code>ToggleButtonGroup.Separator</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Multiple Selection */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Multiple Selection (Formatting)
          </h3>
          <div className="space-y-3">
            <ToggleButtonGroup
              selectionMode="multiple"
              selectedKeys={formatting}
              onSelectionChange={setFormatting}
              aria-label="Text formatting"
            >
              <ToggleButton id="bold" isIconOnly aria-label="Bold">
                <Bold className="size-4" />
              </ToggleButton>
              <ToggleButtonGroup.Separator />
              <ToggleButton id="italic" isIconOnly aria-label="Italic">
                <Italic className="size-4" />
              </ToggleButton>
              <ToggleButtonGroup.Separator />
              <ToggleButton id="underline" isIconOnly aria-label="Underline">
                <Underline className="size-4" />
              </ToggleButton>
            </ToggleButtonGroup>
            <p className="text-xs text-muted">
              Active:{" "}
              <span className="font-medium text-foreground">
                {Array.from(formatting).join(", ") || "none"}
              </span>
            </p>
          </div>
        </Card>

        {/* 2. Single Selection */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Single Selection (Alignment)
          </h3>
          <div className="space-y-3">
            <ToggleButtonGroup
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={alignment}
              onSelectionChange={setAlignment}
              aria-label="Text alignment"
            >
              <ToggleButton id="left" aria-label="Align left">
                <AlignLeft className="size-4" />
                Left
              </ToggleButton>
              <ToggleButton id="center" aria-label="Align center">
                <AlignCenter className="size-4" />
                Center
              </ToggleButton>
              <ToggleButton id="right" aria-label="Align right">
                <AlignRight className="size-4" />
                Right
              </ToggleButton>
            </ToggleButtonGroup>
            <p className="text-xs text-muted">
              Selected:{" "}
              <span className="font-medium text-foreground">
                {Array.from(alignment)[0] ?? "none"}
              </span>
            </p>
          </div>
        </Card>

        {/* 3. Detached vs Connected */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Detached Group
          </h3>
          <ToggleButtonGroup isDetached defaultSelectedKeys={["grid"]} aria-label="View mode">
            <ToggleButton id="grid">
              <LayoutGrid className="size-4" />
              Grid
            </ToggleButton>
            <ToggleButton id="list">
              <List className="size-4" />
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>

        {/* 4. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <ToggleButtonGroup size="sm" defaultSelectedKeys={["a"]} aria-label="Small">
              <ToggleButton id="a">SM</ToggleButton>
              <ToggleButton id="b">Opt</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup size="md" defaultSelectedKeys={["a"]} aria-label="Medium">
              <ToggleButton id="a">MD</ToggleButton>
              <ToggleButton id="b">Opt</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup size="lg" defaultSelectedKeys={["a"]} aria-label="Large">
              <ToggleButton id="a">LG</ToggleButton>
              <ToggleButton id="b">Opt</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Card>

        {/* 5. Vertical & Disabled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Vertical &amp; Disabled
          </h3>
          <div className="flex flex-wrap items-start gap-8">
            <ToggleButtonGroup
              orientation="vertical"
              defaultSelectedKeys={["top"]}
              aria-label="Vertical group"
            >
              <ToggleButton id="top">Top</ToggleButton>
              <ToggleButton id="middle">Middle</ToggleButton>
              <ToggleButton id="bottom">Bottom</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              isDisabled
              defaultSelectedKeys={["one"]}
              aria-label="Disabled group"
            >
              <ToggleButton id="one">One</ToggleButton>
              <ToggleButton id="two">Two</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Card>

        {/* 6. Full Width */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Full Width
          </h3>
          <ToggleButtonGroup
            fullWidth
            selectionMode="single"
            defaultSelectedKeys={["monthly"]}
            aria-label="Billing cycle"
          >
            <ToggleButton id="monthly">Monthly</ToggleButton>
            <ToggleButton id="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        </Card>
      </div>
    </section>
  );
}
