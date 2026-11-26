import { useState } from "react";
import { Card, CloseButton } from "@heroui/react";
import { X, XCircle } from "lucide-react";

/**
 * Organism: CloseButtonShowcaseSection
 * Implementasi lengkap seluruh contoh CloseButton dari dokumentasi HeroUI v3:
 * Usage, Interactive, With Custom Icon, Disabled, dan Custom Styles.
 */
export function CloseButtonShowcaseSection() {
  const [count, setCount] = useState(0);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          CloseButton
        </h2>
        <p className="mt-1 text-sm text-muted">
          Tombol penutup untuk dialog, modal, atau elemen yang dapat ditutup menggunakan{" "}
          <code>CloseButton</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex items-center gap-4">
            <CloseButton aria-label="Close" />
          </div>
        </Card>

        {/* 2. Interactive */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Interactive
          </h3>
          <div className="flex flex-col items-start justify-center gap-3">
            <CloseButton
              aria-label={`Close (clicked ${count} times)`}
              onPress={() => setCount((prev) => prev + 1)}
            />
            <span className="text-sm text-muted">Clicked: {count} times</span>
          </div>
        </Card>

        {/* 3. With Custom Icon */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Custom Icon
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <CloseButton aria-label="Custom close icon">
                <XCircle className="size-4" />
              </CloseButton>
              <span className="text-xs text-muted">Custom Icon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CloseButton aria-label="Alternative close icon">
                <X className="size-4" />
              </CloseButton>
              <span className="text-xs text-muted">Alternative Icon</span>
            </div>
          </div>
        </Card>

        {/* 4. Disabled & Custom Styles */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled &amp; Custom Styles
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <CloseButton isDisabled aria-label="Disabled close" />
              <span className="text-xs text-muted">isDisabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CloseButton
                aria-label="Close"
                className="size-8 rounded-full bg-default text-muted hover:bg-default-hover hover:text-foreground active:scale-95"
              />
              <span className="text-xs text-muted">Tailwind CSS</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
