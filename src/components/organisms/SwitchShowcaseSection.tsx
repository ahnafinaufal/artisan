import { useState } from "react";
import { Card, Description, Label, Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

/**
 * Organism: SwitchShowcaseSection
 * Showcase komponen Switch dari @heroui/react:
 * Basic, Controlled, Sizes, With Icons, dan Disabled.
 */
export function SwitchShowcaseSection() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Switch
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontrol toggle boolean menggunakan compound parts{" "}
          <code>Switch</code>, <code>Switch.Control</code>, <code>Switch.Thumb</code>,{" "}
          <code>Switch.Icon</code>, dan <code>Switch.Content</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Controlled with Label & Description */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled &amp; Description
          </h3>
          <div className="space-y-4">
            <Switch isSelected={notifications} onChange={setNotifications}>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Push notifications</Label>
                <Description>Terima pembaruan status build secara real-time.</Description>
              </Switch.Content>
            </Switch>
            <p className="text-xs text-muted">
              Status:{" "}
              <span className="font-medium text-foreground">
                {notifications ? "Enabled" : "Disabled"}
              </span>
            </p>
          </div>
        </Card>

        {/* 2. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Switch size="sm" defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Small</Label>
              </Switch.Content>
            </Switch>
            <Switch size="md" defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Medium</Label>
              </Switch.Content>
            </Switch>
            <Switch size="lg" defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Large</Label>
              </Switch.Content>
            </Switch>
          </div>
        </Card>

        {/* 3. Custom Thumb Icon */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Thumb Icon
          </h3>
          <Switch size="lg" isSelected={darkMode} onChange={setDarkMode}>
            <Switch.Control>
              <Switch.Thumb>
                <Switch.Icon>
                  {darkMode ? <Moon className="size-3" /> : <Sun className="size-3" />}
                </Switch.Icon>
              </Switch.Thumb>
            </Switch.Control>
            <Switch.Content>
              <Label>{darkMode ? "Dark Mode" : "Light Mode"}</Label>
            </Switch.Content>
          </Switch>
        </Card>

        {/* 4. Disabled States */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled States
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Switch isDisabled>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Off (Disabled)</Label>
              </Switch.Content>
            </Switch>
            <Switch isDisabled defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>On (Disabled)</Label>
              </Switch.Content>
            </Switch>
          </div>
        </Card>
      </div>
    </section>
  );
}
