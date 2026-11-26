import { useState } from "react";
import {
  Accordion,
  Card,
  Fieldset,
  Form,
  Modal,
  Slider,
  toast,
} from "@heroui/react";
import type { Key } from "@heroui/react";
import { Sparkles } from "lucide-react";
import {
  ActionButton,
  CheckBoxAtom,
  Divider,
  FieldLabel,
  ProgressIndicator,
  StatusChip,
  ToggleSwitch,
} from "../atoms";
import {
  ButtonToolbar,
  FormField,
  SelectField,
  type SelectOption,
} from "../molecules";

const FRAMEWORK_OPTIONS: SelectOption[] = [
  { id: "vite", label: "Vite + React 19" },
  { id: "nextjs", label: "Next.js App Router" },
  { id: "remix", label: "Remix / React Router" },
];

/**
 * Organism: InteractivePlayground
 * Demo interaktif gabungan Atoms + Molecules + Organisms HeroUI v3.
 */
export function InteractivePlayground() {
  const [name, setName] = useState("Ahnafi");
  const [framework, setFramework] = useState<Key | null>("vite");
  const [progress, setProgress] = useState(65);
  const [subscribe, setSubscribe] = useState(true);
  const [agree, setAgree] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Konfigurasi Atomic Design tersimpan", {
      description: `User: ${name || "Anonim"} · Stack: ${String(framework ?? "vite")}`,
    });
  };

  return (
    <section id="playground" className="grid gap-6 lg:grid-cols-2">
      {/* Form Organism */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>Organism: Interactive Form</Card.Title>
            <StatusChip color="warning" variant="soft">
              Organism
            </StatusChip>
          </div>
          <Card.Description>
            Disusun dari FormField (molecule), SelectField (molecule), Slider, dan ActionButton (atom).
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Fieldset className="space-y-4">
              <FormField
                label="Nama Project"
                placeholder="Masukkan nama project..."
                description="Digunakan sebagai label utama di workspace."
                value={name}
                onChange={setName}
                isRequired
              />

              <SelectField
                label="Target Framework"
                options={FRAMEWORK_OPTIONS}
                selectedKey={framework}
                onSelectionChange={setFramework}
              />

              <Slider
                value={progress}
                onChange={(val) => setProgress(Array.isArray(val) ? val[0] : val)}
                minValue={0}
                maxValue={100}
              >
                <div className="flex items-center justify-between text-sm">
                  <FieldLabel>Kesiapan Design System</FieldLabel>
                  <Slider.Output />
                </div>
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>

              <ProgressIndicator aria-label="Progress kesiapan" value={progress} />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <ToggleSwitch
                  label="Notifikasi rilis HeroUI"
                  isSelected={subscribe}
                  onChange={setSubscribe}
                />
                <CheckBoxAtom
                  label="Gunakan struktur Atomic Design"
                  isSelected={agree}
                  onChange={setAgree}
                />
              </div>
            </Fieldset>

            <Divider />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ButtonToolbar
                actions={[
                  {
                    id: "toast",
                    label: "Test Toast",
                    variant: "secondary",
                    onPress: () =>
                      toast("HeroUI v3 Toast", {
                        description: "Notifikasi ringan dari atom/molecule.",
                      }),
                  },
                  {
                    id: "modal",
                    label: "Buka Modal",
                    variant: "tertiary",
                    onPress: () => setIsModalOpen(true),
                  },
                ]}
              />
              <ActionButton type="submit" variant="primary">
                <Sparkles className="h-4 w-4" />
                Simpan
              </ActionButton>
            </div>
          </Form>
        </Card.Content>
      </Card>

      {/* Accordion & Modal Organism */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>Organism: Arsitektur Atomic Design</Card.Title>
            <StatusChip color="accent" variant="soft">
              Konsep
            </StatusChip>
          </div>
          <Card.Description>
            Penjelasan pemetaan folder di <code className="text-xs">src/components/</code>.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Accordion variant="surface" defaultExpandedKeys={["atoms"]}>
            <Accordion.Item id="atoms">
              <Accordion.Heading>
                <Accordion.Trigger>
                  1. Atoms (src/components/atoms)
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  Komponen terkecil yang tidak bisa dipecah lagi: Button, CloseButton, Chip,
                  Input, Label, Switch, Checkbox, Avatar, Separator, dan Spinner.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item id="molecules">
              <Accordion.Heading>
                <Accordion.Trigger>
                  2. Molecules (src/components/molecules)
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  Gabungan beberapa atom yang membentuk satu unit fungsional: FormField
                  (Label + Input + Description + Error), SearchInput, SelectField,
                  StatusAlert, AvatarStack, dan ButtonToolbar.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item id="organisms">
              <Accordion.Heading>
                <Accordion.Trigger>
                  3. Organisms (src/components/organisms)
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  Bagian antarmuka yang kompleks dan mandiri: NavbarHeader,
                  ComponentCatalogSection, InteractivePlayground, dan TeamTableCard.
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Card.Content>
      </Card>

      {/* Modal Organism */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>HeroUI v3 Modal Organism</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-muted">
                  Modal ini dibangun di atas React Aria Dialog dan styling Tailwind CSS v4
                  dari <code>@heroui/styles</code>.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <ActionButton variant="secondary" onPress={() => setIsModalOpen(false)}>
                  Tutup
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onPress={() => {
                    setIsModalOpen(false);
                    toast.success("Modal dikonfirmasi");
                  }}
                >
                  Konfirmasi
                </ActionButton>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </section>
  );
}
