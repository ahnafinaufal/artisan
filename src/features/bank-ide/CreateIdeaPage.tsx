import { useMemo, useState, type ReactNode } from "react";
import {
  AlertDialog,
  Button,
  Card,
  Chip,
  Description,
  Disclosure,
  FieldError,
  Form,
  Input,
  Label,
  NumberField,
  ProgressBar,
  Separator,
  TextArea,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@heroui/react";
import type { Key } from "@heroui/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
} from "lucide-react";
import { FormField } from "../../components/molecules/FormField";
import { SelectField } from "../../components/molecules/SelectField";
import { BRANDS, CAMPAIGNS, PICS } from "./mockData";
import {
  FORMATS,
  OBJECTIVES,
  PILLARS,
  PLATFORMS,
  PRIORITIES,
  SOURCES,
} from "./options";
import type {
  ContentIdea,
  IdeaStatus,
  Platform,
  UserRole,
} from "./types";
import {
  calculateIdeaScore,
  findSimilarTitleInBrand,
  formatShortDate,
  validateForSubmission,
} from "./utils";

interface CreateIdeaPageProps {
  existingIdeas: ContentIdea[];
  currentRole: UserRole;
  onBack: () => void;
  onSave: (
    draft: Partial<ContentIdea>,
    targetStatus?: IdeaStatus,
  ) => { ok: boolean; error?: string };
}

const INITIAL_FORM: Partial<ContentIdea> = {
  title: "",
  brand: BRANDS[0],
  platforms: [],
  tags: [],
  referenceLinks: [],
  status: "Draft",
};

/** Label dari validateForSubmission() → key field form. */
const REQUIRED_FIELD_MAP: Record<string, keyof ContentIdea> = {
  "Judul Ide": "title",
  Brand: "brand",
  "Content Pillar": "pillar",
  Platform: "platforms",
  Format: "format",
  Objective: "objective",
  Hook: "hook",
  "Angle / Deskripsi": "angle",
  PIC: "pic",
  Prioritas: "priority",
};

const hasText = (value?: string) => Boolean(value?.trim());

function FormSection({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs text-muted">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function DiscardDialog({ onDiscard }: { onDiscard: () => void }) {
  return (
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="warning" />
            <AlertDialog.Heading>Buang perubahan ide?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p className="text-sm text-muted">
              Informasi yang sudah kamu isi akan hilang dan tidak bisa
              dikembalikan.
            </p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Lanjut mengisi
            </Button>
            <Button slot="close" variant="danger" onPress={onDiscard}>
              Buang perubahan
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  );
}

export function CreateIdeaPage({
  existingIdeas,
  currentRole,
  onBack,
  onSave,
}: CreateIdeaPageProps) {
  const [form, setForm] = useState<Partial<ContentIdea>>({ ...INITIAL_FORM });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topError, setTopError] = useState("");
  const [discardOpen, setDiscardOpen] = useState(false);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(INITIAL_FORM),
    [form],
  );

  const update = <K extends keyof ContentIdea>(
    key: K,
    value: ContentIdea[K] | undefined,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
    setTopError("");
  };

  const similar = useMemo(
    () =>
      findSimilarTitleInBrand(
        existingIdeas,
        form.title ?? "",
        form.brand ?? "",
      ),
    [existingIdeas, form.title, form.brand],
  );

  const score = calculateIdeaScore(form);
  const missing = validateForSubmission(form);
  const requiredDone = 10 - missing.length;

  const checks = [
    {
      label: "Informasi dasar",
      done:
        hasText(form.title) && hasText(form.brand) && hasText(form.pic),
    },
    {
      label: "Klasifikasi",
      done:
        Boolean(form.pillar && form.format && form.objective && form.priority) &&
        (form.platforms?.length ?? 0) > 0,
    },
    {
      label: "Isi ide",
      done: hasText(form.hook) && hasText(form.angle),
    },
    {
      label: "Penilaian",
      done: Boolean(
        form.relevanceScore && form.impactScore && form.easeScore,
      ),
    },
  ];

  const links = form.referenceLinks ?? [];
  const setLink = (index: number, value: string) =>
    update(
      "referenceLinks",
      links.map((link, i) => (i === index ? value : link)),
    );
  const addLink = () => update("referenceLinks", [...links, ""]);
  const removeLink = (index: number) =>
    update(
      "referenceLinks",
      links.filter((_, i) => i !== index),
    );

  const requestBack = () => {
    if (isDirty) {
      setDiscardOpen(true);
      return;
    }
    onBack();
  };

  const validateBase = () => {
    const next: Record<string, string> = {};
    if (!hasText(form.title)) next.title = "Judul ide wajib diisi.";
    if (!hasText(form.brand)) next.brand = "Brand wajib dipilih.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setTopError("Lengkapi field wajib sebelum menyimpan.");
      return false;
    }
    return true;
  };

  const handleSave = (targetStatus: IdeaStatus) => {
    setTopError("");
    if (!validateBase()) return;

    if (targetStatus === "Diajukan") {
      if (missing.length > 0) {
        const nextErrors: Record<string, string> = {};
        for (const label of missing) {
          const field = REQUIRED_FIELD_MAP[label];
          if (field) nextErrors[field] = `${label} wajib diisi untuk pengajuan.`;
        }
        setErrors(nextErrors);
        setTopError(
          `Lengkapi field wajib berikut sebelum mengajukan: ${missing.join(", ")}.`,
        );
        return;
      }
    }

    const result = onSave(form, targetStatus);
    if (!result.ok) {
      setTopError(result.error ?? "Gagal menyimpan ide.");
      return;
    }
    onBack();
  };

  const brandOptions = BRANDS.map((brand) => ({
    id: brand,
    label: brand,
  }));
  const picOptions = PICS.map((pic) => ({ id: pic, label: pic }));
  const campaignOptions = CAMPAIGNS.map((campaign) => ({
    id: campaign,
    label: campaign,
  }));
  const sourceOptions = SOURCES.map((source) => ({
    id: source,
    label: source,
  }));
  const pillarOptions = PILLARS.map((pillar) => ({
    id: pillar,
    label: pillar,
  }));
  const formatOptions = FORMATS.map((format) => ({
    id: format,
    label: format,
  }));
  const objectiveOptions = OBJECTIVES.map((objective) => ({
    id: objective,
    label: objective,
  }));
  const priorityOptions = PRIORITIES.map((priority) => ({
    id: priority,
    label: priority,
  }));

  return (
    <section className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          {isDirty ? (
            <AlertDialog
              isOpen={discardOpen}
              onOpenChange={setDiscardOpen}
            >
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2"
                onPress={requestBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Bank Ide
              </Button>
              <DiscardDialog onDiscard={onBack} />
            </AlertDialog>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2"
              onPress={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Bank Ide
            </Button>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Tambah Ide Konten
            </h1>
            <Chip size="sm" variant="soft" color="accent">
              Draft
            </Chip>
          </div>
          <p className="max-w-2xl text-sm text-muted">
            Lengkapi informasi ide sebelum masuk tahap review. Role aktif:{" "}
            <strong className="text-foreground">{currentRole}</strong>.
          </p>
        </div>
      </div>

      <Form onSubmit={() => handleSave("Draft")}>
        <Card className="border border-border">
          <Card.Content className="p-0">
            <div className="grid lg:grid-cols-12">
              {/* Form utama */}
              <div className="space-y-6 p-5 sm:p-6 lg:col-span-8 lg:p-8">
                {topError ? (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 p-3 text-xs font-medium text-danger"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{topError}</span>
                  </div>
                ) : null}

                <FormSection
                  title="Informasi Dasar"
                  description="Identitas ide dan konteks campaign."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <FormField
                        label="Judul Ide *"
                        value={form.title ?? ""}
                        onChange={(value) => update("title", value)}
                        placeholder="Contoh: 5 kesalahan skincare yang bikin kulit kusam"
                        description="Gunakan judul yang spesifik dan mudah dipahami."
                        isRequired
                        isInvalid={Boolean(errors.title)}
                        errorMessage={errors.title}
                      />
                      {similar ? (
                        <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-2.5 text-xs text-warning">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span>
                            Judul mirip ditemukan di brand{" "}
                            <strong>{form.brand}</strong> ({similar.id}:{" "}
                            &ldquo;{similar.title}&rdquo;).
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <SelectField
                      label="Brand *"
                      options={brandOptions}
                      selectedKey={form.brand ?? null}
                      onSelectionChange={(key) =>
                        update("brand", key ? String(key) : undefined)
                      }
                      isRequired
                      isInvalid={Boolean(errors.brand)}
                      errorMessage={errors.brand}
                    />

                    <SelectField
                      label="PIC"
                      options={picOptions}
                      selectedKey={form.pic ?? null}
                      onSelectionChange={(key) =>
                        update("pic", key ? String(key) : undefined)
                      }
                      isInvalid={Boolean(errors.pic)}
                      errorMessage={errors.pic}
                    />

                    <div className="sm:col-span-2">
                      <SelectField
                        label="Campaign / Momen"
                        options={campaignOptions}
                        selectedKey={form.campaign ?? null}
                        onSelectionChange={(key) =>
                          update("campaign", key ? String(key) : undefined)
                        }
                      />
                    </div>

                    <TextField
                      value={form.targetDate ?? ""}
                      onChange={(value) => update("targetDate", value)}
                    >
                      <Label>Target Tayang</Label>
                      <Input type="date" />
                      <Description>
                        Perkiraan tanggal konten akan tayang.
                      </Description>
                    </TextField>

                    <SelectField
                      label="Sumber Ide"
                      options={sourceOptions}
                      selectedKey={form.source ?? null}
                      onSelectionChange={(key) =>
                        update(
                          "source",
                          key
                            ? (String(key) as ContentIdea["source"])
                            : undefined,
                        )
                      }
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Klasifikasi"
                  description="Kategori dan kanal distribusi konten."
                  className="border-t border-border pt-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Content Pillar"
                      options={pillarOptions}
                      selectedKey={form.pillar ?? null}
                      onSelectionChange={(key) =>
                        update(
                          "pillar",
                          key
                            ? (String(key) as ContentIdea["pillar"])
                            : undefined,
                        )
                      }
                      isInvalid={Boolean(errors.pillar)}
                      errorMessage={errors.pillar}
                    />

                    <SelectField
                      label="Format"
                      options={formatOptions}
                      selectedKey={form.format ?? null}
                      onSelectionChange={(key) =>
                        update(
                          "format",
                          key
                            ? (String(key) as ContentIdea["format"])
                            : undefined,
                        )
                      }
                      isInvalid={Boolean(errors.format)}
                      errorMessage={errors.format}
                    />

                    <SelectField
                      label="Objective"
                      options={objectiveOptions}
                      selectedKey={form.objective ?? null}
                      onSelectionChange={(key) =>
                        update(
                          "objective",
                          key
                            ? (String(key) as ContentIdea["objective"])
                            : undefined,
                        )
                      }
                      isInvalid={Boolean(errors.objective)}
                      errorMessage={errors.objective}
                    />

                    <SelectField
                      label="Prioritas"
                      options={priorityOptions}
                      selectedKey={form.priority ?? null}
                      onSelectionChange={(key) =>
                        update(
                          "priority",
                          key
                            ? (String(key) as ContentIdea["priority"])
                            : undefined,
                        )
                      }
                      isInvalid={Boolean(errors.priority)}
                      errorMessage={errors.priority}
                    />

                    <div className="space-y-2 sm:col-span-2">
                      <Label>Platform</Label>
                      <ToggleButtonGroup
                        selectionMode="multiple"
                        selectedKeys={new Set(form.platforms ?? [])}
                        onSelectionChange={(keys: Set<Key>) =>
                          update(
                            "platforms",
                            Array.from(keys).map(String) as Platform[],
                          )
                        }
                        aria-label="Platform"
                        isDetached
                        size="sm"
                      >
                        {PLATFORMS.map((platform) => (
                          <ToggleButton key={platform} id={platform}>
                            {platform}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                      {errors.platforms ? (
                        <p className="text-xs font-medium text-danger">
                          {errors.platforms}
                        </p>
                      ) : (
                        <p className="text-xs text-muted">
                          Bisa pilih lebih dari satu platform.
                        </p>
                      )}
                    </div>
                  </div>
                </FormSection>

                <FormSection
                  title="Isi Ide"
                  description="Inti pesan dan sudut pandang konten."
                  className="border-t border-border pt-6"
                >
                  <div className="space-y-4">
                    <FormField
                      label="Hook"
                      value={form.hook ?? ""}
                      onChange={(value) => update("hook", value)}
                      placeholder="Kalimat pembuka yang menarik perhatian..."
                      isInvalid={Boolean(errors.hook)}
                      errorMessage={errors.hook}
                    />

                    <TextField
                      value={form.angle ?? ""}
                      onChange={(value) => update("angle", value)}
                      isInvalid={Boolean(errors.angle)}
                    >
                      <Label>Angle / Deskripsi</Label>
                      <TextArea
                        rows={4}
                        placeholder="Sudut pandang dan ringkasan isi konten..."
                      />
                      <FieldError>{errors.angle}</FieldError>
                    </TextField>

                    <FormField
                      label="CTA & Konsep Visual"
                      value={form.cta ?? ""}
                      onChange={(value) => update("cta", value)}
                      placeholder="Call to action atau arahan visual..."
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Penilaian"
                  description="Nilai 1–5. Diperlukan saat ide akan disetujui."
                  className="border-t border-border pt-6"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <NumberField
                      value={form.relevanceScore ?? NaN}
                      onChange={(value) =>
                        update(
                          "relevanceScore",
                          Number.isNaN(value) ? undefined : value,
                        )
                      }
                      minValue={1}
                      maxValue={5}
                      step={1}
                    >
                      <Label>Relevansi (1–5)</Label>
                      <NumberField.Group>
                        <NumberField.DecrementButton />
                        <NumberField.Input />
                        <NumberField.IncrementButton />
                      </NumberField.Group>
                    </NumberField>

                    <NumberField
                      value={form.impactScore ?? NaN}
                      onChange={(value) =>
                        update(
                          "impactScore",
                          Number.isNaN(value) ? undefined : value,
                        )
                      }
                      minValue={1}
                      maxValue={5}
                      step={1}
                    >
                      <Label>Potensi Dampak (1–5)</Label>
                      <NumberField.Group>
                        <NumberField.DecrementButton />
                        <NumberField.Input />
                        <NumberField.IncrementButton />
                      </NumberField.Group>
                    </NumberField>

                    <NumberField
                      value={form.easeScore ?? NaN}
                      onChange={(value) =>
                        update(
                          "easeScore",
                          Number.isNaN(value) ? undefined : value,
                        )
                      }
                      minValue={1}
                      maxValue={5}
                      step={1}
                    >
                      <Label>Kemudahan (1–5)</Label>
                      <NumberField.Group>
                        <NumberField.DecrementButton />
                        <NumberField.Input />
                        <NumberField.IncrementButton />
                      </NumberField.Group>
                    </NumberField>
                  </div>
                </FormSection>

                <Disclosure className="border-t border-border pt-6">
                  <Disclosure.Heading>
                    <Disclosure.Trigger className="flex w-full items-center justify-between gap-4 text-left">
                      <span className="space-y-0.5">
                        <span className="block text-sm font-semibold text-foreground">
                          Referensi
                        </span>
                        <span className="block text-xs font-normal text-muted">
                          Opsional — tambahkan link inspirasi atau sumber ide.
                        </span>
                      </span>
                      <Disclosure.Indicator />
                    </Disclosure.Trigger>
                  </Disclosure.Heading>
                  <Disclosure.Content>
                    <Disclosure.Body className="space-y-3 pt-4">
                      {links.length === 0 ? (
                        <p className="text-xs text-muted">
                          Belum ada referensi.
                        </p>
                      ) : null}

                      {links.map((link, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Input
                            type="url"
                            value={link}
                            onChange={(event) =>
                              setLink(index, event.target.value)
                            }
                            placeholder="https://..."
                            aria-label={`Referensi ${index + 1}`}
                            className="flex-1"
                          />
                          <Button
                            isIconOnly
                            variant="ghost"
                            aria-label={`Hapus referensi ${index + 1}`}
                            onPress={() => removeLink(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onPress={addLink}
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Tambah link
                      </Button>
                    </Disclosure.Body>
                  </Disclosure.Content>
                </Disclosure>
              </div>

              {/* Rail ringkasan */}
              <aside className="space-y-5 border-t border-border bg-surface-secondary/40 p-5 sm:p-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:sticky lg:top-6 lg:self-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Ringkasan Ide
                  </p>
                  <h2 className="mt-1 text-base font-semibold leading-snug text-foreground">
                    {hasText(form.title)
                      ? form.title
                      : "Judul ide belum diisi"}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {hasText(form.brand) ? (
                      <Chip size="sm" variant="soft" color="accent">
                        {form.brand}
                      </Chip>
                    ) : null}
                    {(form.platforms ?? []).map((platform) => (
                      <Chip key={platform} size="sm" variant="soft">
                        {platform}
                      </Chip>
                    ))}
                  </div>

                  <dl className="mt-4 space-y-2 text-xs">
                    {[
                      ["Format", form.format ?? "–"],
                      ["Pillar", form.pillar ?? "–"],
                      ["Prioritas", form.priority ?? "–"],
                      ["PIC", form.pic ?? "–"],
                      ["Target", formatShortDate(form.targetDate)],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3"
                      >
                        <dt className="text-muted">{label}</dt>
                        <dd className="text-right font-medium text-foreground">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Skor Ide
                    </p>
                    <span className="text-sm font-semibold text-foreground">
                      {score !== null ? `${score.toFixed(1)} / 5` : "–"}
                    </span>
                  </div>
                  <ProgressBar
                    value={score !== null ? score * 20 : 0}
                    color="accent"
                    size="sm"
                    aria-label="Skor ide"
                    className="mt-2"
                  >
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                  <p className="mt-1.5 text-xs text-muted">
                    Rata-rata relevansi, dampak, dan kemudahan.
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Kelengkapan
                    </p>
                    <span className="text-xs font-semibold text-foreground">
                      {requiredDone}/10
                    </span>
                  </div>
                  <ProgressBar
                    value={(requiredDone / 10) * 100}
                    color={requiredDone === 10 ? "success" : "accent"}
                    size="sm"
                    aria-label="Kelengkapan field wajib"
                    className="mt-2"
                  >
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                  <p className="mt-1.5 text-xs text-muted">
                    10 field wajib untuk pengajuan review.
                  </p>

                  <ul className="mt-3 space-y-2">
                    {checks.map((check) => (
                      <li
                        key={check.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        {check.done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 shrink-0 text-muted" />
                        )}
                        <span
                          className={
                            check.done ? "text-foreground" : "text-muted"
                          }
                        >
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="text-xs font-semibold text-foreground">Tips</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Ide yang lengkap mempercepat proses review. Pastikan hook
                    dan angle sudah menjelaskan pesan utama konten.
                  </p>
                </div>
              </aside>
            </div>
          </Card.Content>

          <Card.Footer className="sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Button type="button" variant="ghost" onPress={requestBack}>
              Batal
            </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                onPress={() => handleSave("Draft")}
              >
                Simpan Draft
              </Button>
              <Button
                type="button"
                variant="primary"
                onPress={() => handleSave("Diajukan")}
              >
                Ajukan Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Form>
    </section>
  );
}
