import { useState } from "react";
import type { Key } from "@heroui/react";
import { Card, Tabs } from "@heroui/react";

const OVERFLOW_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "performance", label: "Performance" },
  { id: "engagement", label: "Engagement" },
  { id: "audience", label: "Audience" },
  { id: "acquisition", label: "Acquisition" },
  { id: "retention", label: "Retention" },
  { id: "settings", label: "Settings" },
];

/**
 * Organism: TabsShowcaseSection
 * Implementasi lengkap contoh Tabs dari dokumentasi HeroUI v3:
 * Usage, Vertical, Overflow, Disabled, Controlled, dan Secondary Variant.
 */
export function TabsShowcaseSection() {
  const [selectedKey, setSelectedKey] = useState<Key>("overview");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Tabs</h2>
        <p className="mt-1 text-sm text-muted">
          Mengorganisasikan konten ke dalam beberapa panel menggunakan{" "}
          <code>Tabs</code>, <code>Tabs.ListContainer</code>, <code>Tabs.List</code>,{" "}
          <code>Tabs.Tab</code>, <code>Tabs.Indicator</code>, dan{" "}
          <code>Tabs.Panel</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <Tabs className="w-full max-w-md">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Options">
                <Tabs.Tab id="overview">
                  Overview
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="analytics">
                  Analytics
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="reports">
                  Reports
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4 text-sm text-muted" id="overview">
              View your project overview and recent activity.
            </Tabs.Panel>
            <Tabs.Panel className="pt-4 text-sm text-muted" id="analytics">
              Track your metrics and analyze performance data.
            </Tabs.Panel>
            <Tabs.Panel className="pt-4 text-sm text-muted" id="reports">
              Generate and download detailed reports.
            </Tabs.Panel>
          </Tabs>
        </Card>

        {/* 2. Controlled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled
          </h3>
          <div className="space-y-3">
            <Tabs
              className="w-full max-w-md"
              selectedKey={String(selectedKey)}
              onSelectionChange={setSelectedKey}
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="Controlled tabs">
                  <Tabs.Tab id="overview">
                    Overview
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="billing">
                    Billing
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab isDisabled id="admin">
                    Admin (Disabled)
                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
              <Tabs.Panel className="pt-4 text-sm text-muted" id="overview">
                Active tab: <strong className="text-foreground">Overview</strong>
              </Tabs.Panel>
              <Tabs.Panel className="pt-4 text-sm text-muted" id="billing">
                Active tab: <strong className="text-foreground">Billing</strong>
              </Tabs.Panel>
              <Tabs.Panel className="pt-4 text-sm text-muted" id="admin">
                Admin panel.
              </Tabs.Panel>
            </Tabs>
            <p className="text-xs text-muted">
              Selected key: <code className="text-foreground">{String(selectedKey)}</code>
            </p>
          </div>
        </Card>

        {/* 3. Vertical */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Vertical</h3>
          <Tabs className="w-full max-w-lg" orientation="vertical">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Vertical tabs">
                <Tabs.Tab id="account">
                  Account
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="security">
                  Security
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="notifications">
                  Notifications
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="billing">
                  Billing
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="px-4" id="account">
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                Account Settings
              </h4>
              <p className="text-xs text-muted">
                Manage your account information and preferences.
              </p>
            </Tabs.Panel>
            <Tabs.Panel className="px-4" id="security">
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                Security Settings
              </h4>
              <p className="text-xs text-muted">
                Configure two-factor authentication and password settings.
              </p>
            </Tabs.Panel>
            <Tabs.Panel className="px-4" id="notifications">
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                Notification Preferences
              </h4>
              <p className="text-xs text-muted">
                Choose how and when you want to receive notifications.
              </p>
            </Tabs.Panel>
            <Tabs.Panel className="px-4" id="billing">
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                Billing Information
              </h4>
              <p className="text-xs text-muted">
                View and manage your subscription and payment methods.
              </p>
            </Tabs.Panel>
          </Tabs>
        </Card>

        {/* 4. Overflow */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Overflow</h3>
          <div className="w-full max-w-[400px]">
            <Tabs>
              <Tabs.ListContainer>
                <Tabs.List aria-label="Overflow options">
                  {OVERFLOW_ITEMS.map((item) => (
                    <Tabs.Tab key={item.id} id={item.id}>
                      {item.label}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
              {OVERFLOW_ITEMS.map((item) => (
                <Tabs.Panel
                  key={item.id}
                  className="pt-4 text-sm text-muted"
                  id={item.id}
                >
                  Content for <strong className="text-foreground">{item.label}</strong>
                </Tabs.Panel>
              ))}
            </Tabs>
          </div>
        </Card>
      </div>
    </section>
  );
}
