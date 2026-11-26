import { Card, InputGroup, Label, TextField } from "@heroui/react";
import { Globe, Mail } from "lucide-react";

/**
 * Organism: InputGroupShowcaseSection
 * Showcase komponen InputGroup dari @heroui/react:
 * Prefix & Suffix dengan InputGroup.Input dan InputGroup.TextArea.
 */
export function InputGroupShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          InputGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mengelompokkan kontrol input dengan elemen prefix dan suffix menggunakan{" "}
          <code>InputGroup</code>, <code>InputGroup.Prefix</code>,{" "}
          <code>InputGroup.Input</code>, dan <code>InputGroup.Suffix</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Prefix &amp; Suffix
          </h3>
          <div className="space-y-4">
            <TextField name="website">
              <Label>Website</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Globe className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="heroui.com" />
                <InputGroup.Suffix>.dev</InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <TextField name="email">
              <Label>Email</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="tim@heroui.com" />
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With TextArea
          </h3>
          <TextField name="bio">
            <Label>Catatan</Label>
            <InputGroup>
              <InputGroup.TextArea placeholder="Tulis ringkasan singkat..." rows={3} />
            </InputGroup>
          </TextField>
        </Card>
      </div>
    </section>
  );
}
