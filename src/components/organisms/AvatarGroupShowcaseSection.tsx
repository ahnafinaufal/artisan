import type { ReactNode } from "react";
import { Avatar, AvatarGroup, Card } from "@heroui/react";
import { User } from "lucide-react";

const USERS = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Emily Chen",
  },
  {
    id: 4,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Michael Brown",
  },
  {
    id: 5,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "Olivia Davis",
  },
] as const;

const STRIPE_STYLES = `
@keyframes ag-stripes {
  to { background-position: 24px 24px; }
}

.ag-stripes {
  background-color: color-mix(in oklab, var(--danger) 6%, var(--surface));
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 10px,
    color-mix(in oklab, var(--danger) 12%, transparent) 10px 11px,
    transparent 11px 21px,
    color-mix(in oklab, var(--danger) 28%, transparent) 21px 22px
  );
  background-size: 24px 24px;
  animation: ag-stripes 2.8s linear infinite;
}
`;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function StripeBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-flex rounded-xl p-6">
      <div
        aria-hidden
        className="ag-stripes pointer-events-none absolute inset-0 rounded-xl"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function OverlapDemoGroup({ overlap }: { overlap: "clip" | "ring" }) {
  return (
    <AvatarGroup overlap={overlap} size="lg">
      <Avatar>
        <Avatar.Image
          alt="John"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          alt="Emily"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
        />
        <Avatar.Fallback>EC</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <AvatarGroup.Count>+2</AvatarGroup.Count>
    </AvatarGroup>
  );
}

/**
 * Organism: AvatarGroupShowcaseSection
 * Implementasi lengkap seluruh contoh AvatarGroup dari dokumentasi HeroUI v3:
 * Usage, Max, With Count, Sizes, Grid, Overlap, dan Custom Styles.
 */
export function AvatarGroupShowcaseSection() {
  const total = 12;

  return (
    <section className="space-y-8">
      <style>{STRIPE_STYLES}</style>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          AvatarGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan kelompok avatar bertumpuk atau grid dengan penghitung overflow
          menggunakan <code>AvatarGroup</code>, <code>AvatarGroup.Count</code>, dan{" "}
          <code>Avatar</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <AvatarGroup>
            {USERS.slice(0, 4).map((user) => (
              <Avatar key={user.id}>
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </Card>

        {/* 2. Max */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Max</h3>
          <AvatarGroup max={3}>
            {USERS.map((user) => (
              <Avatar key={user.id}>
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </Card>

        {/* 3. With Count */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Count
          </h3>
          <AvatarGroup size="sm">
            {USERS.slice(0, 3).map((user) => (
              <Avatar key={user.id}>
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
              </Avatar>
            ))}
            <AvatarGroup.Count>+{total - 3}</AvatarGroup.Count>
          </AvatarGroup>
        </Card>

        {/* 4. Grid */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Grid</h3>
          <AvatarGroup isGrid max={5}>
            {USERS.map((user) => (
              <Avatar key={user.id}>
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </Card>

        {/* 5. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs text-muted">Small</p>
              <AvatarGroup size="sm">
                {USERS.slice(0, 4).map((user) => (
                  <Avatar key={user.id}>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs text-muted">Medium (default)</p>
              <AvatarGroup size="md">
                {USERS.slice(0, 4).map((user) => (
                  <Avatar key={user.id}>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs text-muted">Large</p>
              <AvatarGroup size="lg">
                {USERS.slice(0, 4).map((user) => (
                  <Avatar key={user.id}>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </div>
        </Card>

        {/* 6. Overlap */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Overlap</h3>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted">clip</p>
              <StripeBackdrop>
                <OverlapDemoGroup overlap="clip" />
              </StripeBackdrop>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted">ring</p>
              <StripeBackdrop>
                <OverlapDemoGroup overlap="ring" />
              </StripeBackdrop>
            </div>
          </div>
        </Card>

        {/* 7. Custom Styles (Tailwind CSS) */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Styles (Tailwind CSS)
          </h3>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-surface/95 py-1 pr-3 pl-1 shadow-sm ring-1 ring-black/[0.04] dark:border-border/80 dark:bg-surface/90 dark:ring-white/10">
            <AvatarGroup
              aria-label="Assignees"
              className="[--avatar-group-overlap:0.7rem] [--avatar-group-seam:2px]"
              overlap="clip"
              role="group"
              size="sm"
            >
              {USERS.slice(0, 3).map((user) => (
                <Avatar key={user.id}>
                  <Avatar.Image alt={user.name} src={user.image} />
                  <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
                </Avatar>
              ))}
              <Avatar>
                <Avatar.Fallback>
                  <User className="size-4 shrink-0" />
                </Avatar.Fallback>
              </Avatar>
              <AvatarGroup.Count>+3</AvatarGroup.Count>
            </AvatarGroup>
            <span className="text-sm font-medium text-foreground">Assignees</span>
          </div>
        </Card>
      </div>
    </section>
  );
}
