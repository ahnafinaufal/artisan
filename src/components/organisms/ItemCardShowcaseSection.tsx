import { useState } from "react";
import { Button, Card, Chip, Switch } from "@heroui/react";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Laptop,
  Mail,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

type ItemCardVariant = "default" | "secondary" | "tertiary" | "outline" | "transparent";

const VARIANT_CLASSES: Record<ItemCardVariant, string> = {
  default: "bg-surface shadow-sm",
  secondary: "bg-surface-secondary",
  tertiary: "bg-surface-tertiary",
  outline: "border border-border bg-transparent",
  transparent: "bg-transparent",
};

/**
 * Organism: ItemCardShowcaseSection
 * Showcase ItemCard (HeroUI Pro pattern):
 * Usage, Variants (default, secondary, tertiary, outline, transparent),
 * With Switch, Wallet/Device List, Without Icon, Title Only, dan Pressable.
 */
export function ItemCardShowcaseSection() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Item Card
          </h2>
          <span className="rounded bg-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted">
            PRO
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          Kartu daftar serbaguna dengan ikon, judul, deskripsi, dan slot aksi di sisi
          kanan seperti switch, tombol, atau badge.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage & Wallet */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Usage &amp; Wallet Card
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3.5 shadow-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-foreground">
                <Wallet className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  Main Wallet
                </div>
                <div className="truncate text-xs text-muted">
                  Balance: $4,820.50 USD
                </div>
              </div>
              <Button size="sm" variant="secondary">
                Top up
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3.5 shadow-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-foreground">
                <CreditCard className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  Visa •••• 4242
                </div>
                <div className="truncate text-xs text-muted">Expires 12/28</div>
              </div>
              <Chip color="success" size="sm" variant="soft">
                Primary
              </Chip>
            </div>
          </div>
        </Card>

        {/* 2. With Switch */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Switch
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-surface-secondary p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                <Bell className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  Push Notifications
                </div>
                <div className="truncate text-xs text-muted">
                  Receive instant alerts for mentions
                </div>
              </div>
              <Switch
                aria-label="Push Notifications"
                isSelected={notificationsEnabled}
                onChange={setNotificationsEnabled}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-surface-secondary p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                <ShieldCheck className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  Two-Factor Auth
                </div>
                <div className="truncate text-xs text-muted">
                  Protect your account with 2FA
                </div>
              </div>
              <Switch
                aria-label="Two-Factor Auth"
                isSelected={twoFactorEnabled}
                onChange={setTwoFactorEnabled}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
          </div>
        </Card>

        {/* 3. Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="space-y-2.5">
            {(
              ["default", "secondary", "tertiary", "outline", "transparent"] as const
            ).map((variant) => (
              <div
                key={variant}
                className={`flex items-center gap-3 rounded-2xl p-3 ${VARIANT_CLASSES[variant]}`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-muted">
                  <Mail className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium capitalize text-foreground">
                    {variant}
                  </div>
                  <div className="truncate text-xs text-muted">
                    Variant styling: {variant}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. Device List & Pressable */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Device List &amp; Pressable
          </h3>
          <div className="space-y-2.5">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-border bg-transparent p-3.5 text-left transition-colors hover:bg-surface-secondary"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-foreground">
                <Laptop className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  MacBook Pro 14&quot;
                </div>
                <div className="truncate text-xs text-muted">
                  Jakarta, ID • Active now
                </div>
              </div>
              <ChevronRight className="size-4 text-muted" />
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-border bg-transparent p-3.5 text-left transition-colors hover:bg-surface-secondary"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-foreground">
                <Smartphone className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  iPhone 16 Pro
                </div>
                <div className="truncate text-xs text-muted">
                  Jakarta, ID • 2h ago
                </div>
              </div>
              <ChevronRight className="size-4 text-muted" />
            </button>

            {/* Title Only / Without Icon */}
            <div className="flex items-center justify-between rounded-2xl bg-surface-secondary p-3.5">
              <span className="text-sm font-medium text-foreground">
                Title Only (Without Icon)
              </span>
              <Chip size="sm" variant="soft">
                Ready
              </Chip>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
