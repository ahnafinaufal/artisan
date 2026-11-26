import {
  Button,
  Card,
  Description,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  TextField,
} from "@heroui/react";

/**
 * Organism: FieldsetShowcaseSection
 * Showcase komponen Fieldset dari @heroui/react:
 * Fieldset.Legend, Description, FieldGroup, dan Fieldset.Actions.
 */
export function FieldsetShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Fieldset
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mengelompokkan kontrol formulir terkait menggunakan <code>Fieldset</code>,{" "}
          <code>Fieldset.Legend</code>, <code>FieldGroup</code>, dan{" "}
          <code>Fieldset.Actions</code>.
        </p>
      </div>

      <Card className="max-w-xl p-6">
        <Fieldset>
          <Fieldset.Legend>Informasi Organisasi</Fieldset.Legend>
          <Description>
            Detail ini akan muncul pada halaman profil publik tim Anda.
          </Description>
          <FieldGroup>
            <TextField name="orgName" defaultValue="HeroUI Lab">
              <Label>Nama Organisasi</Label>
              <Input />
            </TextField>
            <TextField name="orgUrl" defaultValue="https://heroui.com">
              <Label>Website</Label>
              <Input />
            </TextField>
          </FieldGroup>
          <Fieldset.Actions>
            <Button variant="tertiary">Batal</Button>
            <Button variant="primary">Simpan</Button>
          </Fieldset.Actions>
        </Fieldset>
      </Card>
    </section>
  );
}
