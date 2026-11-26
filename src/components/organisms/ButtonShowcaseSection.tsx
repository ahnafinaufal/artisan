import { useState } from "react";
import { Button, Card, Spinner } from "@heroui/react";
import {
  Code2,
  Globe,
  Mail,
  MoreHorizontal,
  Paperclip,
  Plus,
  Settings,
  Smartphone,
  Trash2,
} from "lucide-react";

/**
 * Organism: ButtonShowcaseSection
 * Implementasi lengkap seluruh contoh Button dari dokumentasi HeroUI v3:
 * Usage, Variants, Sizes, With Icons, Icon Only, Loading, Loading State,
 * Full Width, Disabled State, Social Buttons, dan Render Function.
 */
export function ButtonShowcaseSection() {
  const [pressCount, setPressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadPress = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Button</h2>
        <p className="mt-1 text-sm text-muted">
          Komponen tombol interaktif dengan berbagai varian, ukuran, ikon, serta state{" "}
          <code>isPending</code> dan <code>isDisabled</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button onPress={() => setPressCount((c) => c + 1)}>Click me</Button>
            <span className="text-xs text-muted">Pressed: {pressCount}x</span>
          </div>
        </Card>

        {/* 2. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>

        {/* 3. Variants */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-soft">Danger Soft</Button>
          </div>
        </Card>

        {/* 4. With Icons */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">With Icons</h3>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Globe className="size-4" />
              Search
            </Button>
            <Button variant="secondary">
              <Plus className="size-4" />
              Add Member
            </Button>
            <Button variant="tertiary">
              <Mail className="size-4" />
              Email
            </Button>
            <Button variant="danger">
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </Card>

        {/* 5. Icon Only */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Icon Only</h3>
          <div className="flex flex-wrap gap-3">
            <Button isIconOnly aria-label="More options" variant="tertiary">
              <MoreHorizontal className="size-4" />
            </Button>
            <Button isIconOnly aria-label="Settings" variant="secondary">
              <Settings className="size-4" />
            </Button>
            <Button isIconOnly aria-label="Delete" variant="danger">
              <Trash2 className="size-4" />
            </Button>
          </div>
        </Card>

        {/* 6. Loading & Loading State */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Loading &amp; Loading State
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button isPending>
              {({ isPending }) => (
                <>
                  {isPending ? <Spinner color="current" size="sm" /> : null}
                  Uploading...
                </>
              )}
            </Button>

            <Button isPending={isLoading} onPress={handleUploadPress}>
              {({ isPending }) => (
                <>
                  {isPending ? (
                    <Spinner color="current" size="sm" />
                  ) : (
                    <Paperclip className="size-4" />
                  )}
                  {isPending ? "Uploading..." : "Upload File"}
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* 7. Full Width */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Full Width</h3>
          <div className="w-full max-w-[400px] space-y-3">
            <Button fullWidth>Primary Button</Button>
            <Button fullWidth>
              <Plus className="size-4" />
              With Icon
            </Button>
          </div>
        </Card>

        {/* 8. Disabled State */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled State
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button isDisabled>Primary</Button>
            <Button isDisabled variant="secondary">
              Secondary
            </Button>
            <Button isDisabled variant="tertiary">
              Tertiary
            </Button>
            <Button isDisabled variant="outline">
              Outline
            </Button>
            <Button isDisabled variant="ghost">
              Ghost
            </Button>
            <Button isDisabled variant="danger">
              Danger
            </Button>
          </div>
        </Card>

        {/* 9. Social Buttons */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Social Buttons
          </h3>
          <div className="flex w-full max-w-xs flex-col gap-3">
            <Button className="w-full" variant="tertiary">
              <Globe className="size-4" />
              Sign in with Google
            </Button>
            <Button className="w-full" variant="tertiary">
              <Code2 className="size-4" />
              Sign in with GitHub
            </Button>
            <Button className="w-full" variant="tertiary">
              <Smartphone className="size-4" />
              Sign in with Apple
            </Button>
          </div>
        </Card>

        {/* 10. Render Function */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Render Function
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              render={(props, { isPressed }) => (
                <button {...props} data-custom={isPressed ? "pressed" : "idle"} />
              )}
            >
              Press me
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
