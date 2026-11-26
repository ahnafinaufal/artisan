import { useState, type FormEvent } from "react";
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Label,
} from "@heroui/react";

/**
 * Organism: CheckboxShowcaseSection
 * Implementasi lengkap seluruh contoh Checkbox dari dokumentasi HeroUI v3:
 * Usage, Variants, Full Rounded, Disabled, External Label, With Description,
 * Default Selected, Invalid, Controlled, Indeterminate, dan Form Integration.
 */
export function CheckboxShowcaseSection() {
  const [isControlledSelected, setIsControlledSelected] = useState(true);
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isIndeterminateSelected, setIsIndeterminateSelected] = useState(false);
  const [formResult, setFormResult] = useState<string | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Array.from(formData.entries()).map(
      ([key, value]) => `${key}: ${String(value)}`,
    );
    setFormResult(entries.length > 0 ? entries.join(", ") : "Tidak ada yang dicentang");
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Checkbox
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kontrol pilihan biner atau daftar pilihan menggunakan compound parts{" "}
          <code>Checkbox</code>, <code>Checkbox.Content</code>,{" "}
          <code>Checkbox.Control</code>, dan <code>Checkbox.Indicator</code> sesuai
          dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <Checkbox name="basic-terms">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Accept terms and conditions
            </Checkbox.Content>
          </Checkbox>
        </Card>

        {/* 2. Default Selected & With Description */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Default Selected &amp; Description
          </h3>
          <div className="flex flex-col gap-4">
            <Checkbox defaultSelected id="default-notifications">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Enable email notifications
              </Checkbox.Content>
            </Checkbox>

            <Checkbox name="description-notifications">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Email notifications
              </Checkbox.Content>
              <Description>
                Get notified when someone mentions you in a comment
              </Description>
            </Checkbox>
          </div>
        </Card>

        {/* 3. Variants */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted">Primary variant</p>
              <Checkbox id="primary" name="primary" variant="primary">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Primary checkbox
                </Checkbox.Content>
                <Description>Standard styling with default background</Description>
              </Checkbox>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted">Secondary variant</p>
              <Checkbox id="secondary" name="secondary" variant="secondary">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Secondary checkbox
                </Checkbox.Content>
                <Description>Lower emphasis variant for use in surfaces</Description>
              </Checkbox>
            </div>
          </div>
        </Card>

        {/* 4. Full Rounded */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Full Rounded
          </h3>
          <div className="flex flex-col gap-3">
            <Label className="text-muted">Rounded checkboxes</Label>
            <Checkbox
              className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-2"
              name="small-rounded"
            >
              <Checkbox.Content>
                <Checkbox.Control className="size-3 rounded-full before:rounded-full">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Small size
              </Checkbox.Content>
            </Checkbox>
            <Checkbox name="default-rounded">
              <Checkbox.Content>
                <Checkbox.Control className="size-4 rounded-full before:rounded-full">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Default size
              </Checkbox.Content>
            </Checkbox>
            <Checkbox name="large-rounded">
              <Checkbox.Content>
                <Checkbox.Control className="size-5 rounded-full before:rounded-full">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Large size
              </Checkbox.Content>
            </Checkbox>
            <Checkbox
              className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-4"
              name="xl-rounded"
            >
              <Checkbox.Content>
                <Checkbox.Control className="size-6 rounded-full before:rounded-full">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Extra large size
              </Checkbox.Content>
            </Checkbox>
          </div>
        </Card>

        {/* 5. Disabled & External Label */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled &amp; External Label
          </h3>
          <div className="flex flex-col gap-5">
            <Checkbox isDisabled id="feature">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Premium Feature
              </Checkbox.Content>
              <Description>This feature is coming soon</Description>
            </Checkbox>

            <div className="flex items-center gap-3">
              <Checkbox id="label-marketing">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox.Content>
              </Checkbox>
              <Label htmlFor="label-marketing">Send me marketing emails</Label>
            </div>
          </div>
        </Card>

        {/* 6. Invalid */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Invalid</h3>
          <Checkbox isInvalid isRequired name="agreement">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              I agree to the terms
            </Checkbox.Content>
            <FieldError>You must accept the terms to continue</FieldError>
          </Checkbox>
        </Card>

        {/* 7. Controlled */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Controlled
          </h3>
          <div className="flex flex-col gap-3">
            <Checkbox
              id="email-notifications"
              isSelected={isControlledSelected}
              onChange={setIsControlledSelected}
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Email notifications
              </Checkbox.Content>
            </Checkbox>
            <p className="text-sm text-muted">
              Status:{" "}
              <span className="font-medium text-foreground">
                {isControlledSelected ? "Enabled" : "Disabled"}
              </span>
            </p>
          </div>
        </Card>

        {/* 8. Indeterminate */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Indeterminate
          </h3>
          <Checkbox
            id="select-all"
            isIndeterminate={isIndeterminate}
            isSelected={isIndeterminateSelected}
            onChange={(selected: boolean) => {
              setIsIndeterminateSelected(selected);
              setIsIndeterminate(false);
            }}
          >
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Select all
            </Checkbox.Content>
            <Description>Shows indeterminate state (dash icon)</Description>
          </Checkbox>
        </Card>

        {/* 9. Form Integration */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Form Integration
          </h3>
          <form className="flex flex-col items-start gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-3">
              <Checkbox name="notifications" value="on">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Enable notifications
                </Checkbox.Content>
              </Checkbox>
              <Checkbox name="newsletter" value="subscribed">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Subscribe to newsletter
                </Checkbox.Content>
              </Checkbox>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" type="submit">
                Submit
              </Button>
              {formResult ? (
                <span className="text-xs text-muted">{formResult}</span>
              ) : null}
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
