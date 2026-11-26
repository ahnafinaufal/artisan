import {
  Button,
  ButtonGroup,
  Card,
  Chip,
  Description,
  Dropdown,
  Label,
} from "@heroui/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Pin,
  QrCode,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

/**
 * Organism: ButtonGroupShowcaseSection
 * Implementasi lengkap contoh ButtonGroup dari dokumentasi HeroUI v3:
 * Usage (Dropdown split button & individual action groups), Variants, Sizes,
 * Orientation (vertical), Full Width, dan Disabled.
 */
export function ButtonGroupShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          ButtonGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mengelompokkan tombol terkait dengan gaya dan jarak konsisten menggunakan{" "}
          <code>ButtonGroup</code>, <code>ButtonGroup.Separator</code>, dan{" "}
          <code>Button</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage: Split Button with Dropdown */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Split Button with Dropdown
          </h3>
          <ButtonGroup>
            <Button>Merge pull request</Button>
            <Dropdown>
              <Button isIconOnly aria-label="More options">
                <ButtonGroup.Separator />
                <ChevronDown className="size-4" />
              </Button>
              <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="flex flex-col items-start gap-1"
                    id="merge"
                    textValue="Create a merge commit"
                  >
                    <Label>Create a merge commit</Label>
                    <Description>
                      All commits from this branch will be added to the base branch
                    </Description>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="flex flex-col items-start gap-1"
                    id="squash-and-merge"
                    textValue="Squash and merge"
                  >
                    <Label>Squash and merge</Label>
                    <Description>
                      Commits from this branch will be combined into one commit
                    </Description>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="flex flex-col items-start gap-1"
                    id="rebase-and-merge"
                    textValue="Rebase and merge"
                  >
                    <Label>Rebase and merge</Label>
                    <Description>
                      Commits from this branch will be rebased onto the base branch
                    </Description>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </ButtonGroup>
        </Card>

        {/* 2. Action Groups */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Action Groups
          </h3>
          <div className="flex flex-wrap gap-3">
            <ButtonGroup variant="tertiary">
              <Button>
                <GitFork className="size-3.5" />
                Fork
                <Chip color="accent" size="sm" variant="soft">
                  24
                </Chip>
              </Button>
              <Button isIconOnly aria-label="More fork options">
                <ButtonGroup.Separator />
                <ChevronDown className="size-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="tertiary">
              <Button isIconOnly aria-label="Show QR code">
                <QrCode className="size-4" />
              </Button>
              <Button>
                <ButtonGroup.Separator />
                Scan to pay
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="tertiary">
              <Button>
                <ThumbsUp className="size-4" />
                <span className="text-xs font-semibold">2.4K</span>
              </Button>
              <Button isIconOnly aria-label="Dislike">
                <ButtonGroup.Separator />
                <ThumbsDown className="size-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="tertiary">
              <Button>
                <Star className="size-3.5" />
                Star
              </Button>
              <Button className="px-2">
                <ButtonGroup.Separator />
                <Chip color="accent" size="sm" variant="soft">
                  104
                </Chip>
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="tertiary">
              <Button>
                <Pin className="size-4" />
                Pinned
              </Button>
              <Button isIconOnly aria-label="More pin options">
                <ButtonGroup.Separator />
                <ChevronDown className="size-4" />
              </Button>
            </ButtonGroup>
          </div>
        </Card>

        {/* 3. Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-col items-start gap-3">
            {(["primary", "secondary", "tertiary", "ghost", "danger"] as const).map(
              (variant) => (
                <ButtonGroup key={variant} variant={variant}>
                  <Button>Left</Button>
                  <Button>
                    <ButtonGroup.Separator />
                    Center
                  </Button>
                  <Button>
                    <ButtonGroup.Separator />
                    Right
                  </Button>
                </ButtonGroup>
              ),
            )}
          </div>
        </Card>

        {/* 4. Sizes & Alignment Toolbar */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes &amp; Toolbar
          </h3>
          <div className="flex flex-col items-start gap-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <ButtonGroup key={size} size={size} variant="secondary">
                <Button isIconOnly aria-label="Align left">
                  <AlignLeft className="size-4" />
                </Button>
                <Button isIconOnly aria-label="Align center">
                  <ButtonGroup.Separator />
                  <AlignCenter className="size-4" />
                </Button>
                <Button isIconOnly aria-label="Align right">
                  <ButtonGroup.Separator />
                  <AlignRight className="size-4" />
                </Button>
                <Button isIconOnly aria-label="Align justify">
                  <ButtonGroup.Separator />
                  <AlignJustify className="size-4" />
                </Button>
              </ButtonGroup>
            ))}
          </div>
        </Card>

        {/* 5. Vertical & Disabled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Vertical &amp; Disabled
          </h3>
          <div className="flex flex-wrap items-start gap-6">
            <ButtonGroup orientation="vertical" variant="secondary">
              <Button>Top</Button>
              <Button>
                <ButtonGroup.Separator />
                Middle
              </Button>
              <Button>
                <ButtonGroup.Separator />
                Bottom
              </Button>
            </ButtonGroup>

            <ButtonGroup isDisabled variant="secondary">
              <Button>
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button>
                <ButtonGroup.Separator />
                Next
                <ChevronRight className="size-4" />
              </Button>
            </ButtonGroup>
          </div>
        </Card>

        {/* 6. Full Width */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Full Width
          </h3>
          <ButtonGroup fullWidth variant="secondary">
            <Button>Overview</Button>
            <Button>
              <ButtonGroup.Separator />
              Analytics
            </Button>
            <Button>
              <ButtonGroup.Separator />
              Settings
            </Button>
          </ButtonGroup>
        </Card>
      </div>
    </section>
  );
}
