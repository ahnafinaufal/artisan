import { Card, Skeleton } from "@heroui/react";

/**
 * Organism: SkeletonShowcaseSection
 * Showcase komponen Skeleton dari @heroui/react:
 * Animation types (shimmer, pulse, none) dan komposisi card/list.
 */
export function SkeletonShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Skeleton
        </h2>
        <p className="mt-1 text-sm text-muted">
          Placeholder loading menggunakan <code>Skeleton</code> dengan{" "}
          <code>animationType</code> (<code>shimmer</code>, <code>pulse</code>,{" "}
          <code>none</code>).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Card Placeholder (Shimmer)
          </h3>
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" animationType="shimmer" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 rounded-md" animationType="shimmer" />
              <Skeleton className="h-4 w-1/2 rounded-md" animationType="shimmer" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            List &amp; Pulse Animation
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" animationType="pulse" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3 rounded-md" animationType="pulse" />
                  <Skeleton className="h-3 w-1/3 rounded-md" animationType="pulse" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
