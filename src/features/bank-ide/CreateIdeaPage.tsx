import { useMemo, useState, type ReactNode } from "react";
import { parseDate, type DateValue } from "@internationalized/date";
import {
  AlertDialog,
  Avatar,
  Button,
  Calendar,
  Card,
  Chip,
  DateField,
  DatePicker,
  Description,
  Disclosure,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  ProgressBar,
  Select,
  Separator,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Clapperboard,
  FileText,
  Film,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Layers,
  Link2,
  PenLine,
  Plus,
  Smartphone,
  Sparkles,
  Trash2,
} from "lucide-react";
import { PlatformLogo } from "./components/PlatformLogo";
import { BRANDS, CAMPAIGNS, PICS } from "./mockData";
import {
  FORMATS,
  OBJECTIVES,
  PILLARS,
  PLATFORMS,
  PRIORITIES,
} from "./options";
import type {
  ContentFormat,
  ContentIdea,
  ContentPillar,
  IdeaStatus,
  Platform,
  Priority,
  UserRole,
} from "./types";
import {
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
  initialIdea?: ContentIdea | null;
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

const FORMAT_ICON: Record<ContentFormat, typeof Clapperboard> = {
  "Reels/Short": Clapperboard,
  Carousel: GalleryHorizontalEnd,
  "Single Image": ImageIcon,
  Story: Smartphone,
  "Video Panjang": Film,
};

const PIC_IMAGE: Record<string, string> = {
  Naufal: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
  Rania: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
  Dimas: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
  Sinta: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
  Bima: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
};

const PRIORITY_COLOR: Record<Priority, "danger" | "warning" | "default"> = {
  Tinggi: "danger",
  Sedang: "warning",
  Rendah: "default",
};

const hasText = (value?: string) => Boolean(value?.trim());

function toDateValue(dateStr?: string): DateValue | null {
  if (!dateStr) return null;
  try {
    return parseDate(dateStr.slice(0, 10));
  } catch {
    return null;
  }
}

function FormSection({
  icon,
  title,
  description,
  children,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-foreground">
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs text-muted">{description}</p>
          ) : null}
        </div>
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
  initialIdea = null,
}: CreateIdeaPageProps) {
  const initialSnapshot = useMemo(
    () =>
      JSON.stringify(
        initialIdea ? { ...INITIAL_FORM, ...initialIdea } : { ...INITIAL_FORM },
      ),
    [initialIdea],
  );
  const [form, setForm] = useState<Partial<ContentIdea>>(() =>
    initialIdea ? { ...INITIAL_FORM, ...initialIdea } : { ...INITIAL_FORM },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topError, setTopError] = useState("");
  const [discardOpen, setDiscardOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<IdeaStatus | null>(null);

  const [campaignList, setCampaignList] = useState<string[]>(CAMPAIGNS);
  const [pillarList, setPillarList] = useState<string[]>(PILLARS);
  const [addModalType, setAddModalType] = useState<
    "campaign" | "pillar" | null
  >(null);
  const [newOptionValue, setNewOptionValue] = useState("");
  const [newOptionError, setNewOptionError] = useState("");

  const isDirty = useMemo(
    () => JSON.stringify(form) !== initialSnapshot,
    [form, initialSnapshot],
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

  const togglePlatform = (platform: Platform) => {
    const current = form.platforms ?? [];
    const next = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    update("platforms", next);
  };

  const similar = useMemo(
    () =>
      findSimilarTitleInBrand(
        existingIdeas,
        form.title ?? "",
        form.brand ?? "",
        initialIdea?.id,
      ),
    [existingIdeas, form.title, form.brand, initialIdea?.id],
  );

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

  const requestSave = (targetStatus: IdeaStatus) => {
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

    setConfirmStatus(targetStatus);
  };

  const executeSave = () => {
    if (!confirmStatus) return;
    const result = onSave(form, confirmStatus);
    if (!result.ok) {
      setConfirmStatus(null);
      setTopError(result.error ?? "Gagal menyimpan ide.");
      return;
    }
    setConfirmStatus(null);
    toast.success(
      confirmStatus === "Diajukan"
        ? "Ide berhasil diajukan"
        : "Ide berhasil disimpan",
      {
        description:
          confirmStatus === "Diajukan"
            ? `"${form.title}" masuk ke daftar untuk ditinjau.`
            : `"${form.title}" tersimpan sebagai draft.`,
      },
    );
    onBack();
  };

  const openAddModal = (type: "campaign" | "pillar") => {
    setAddModalType(type);
    setNewOptionValue("");
    setNewOptionError("");
  };

  const handleSaveNewOption = () => {
    const trimmed = newOptionValue.trim();
    if (!trimmed) {
      setNewOptionError("Nama tidak boleh kosong.");
      return;
    }
    if (addModalType === "campaign") {
      if (
        campaignList.some((c) => c.toLowerCase() === trimmed.toLowerCase())
      ) {
        setNewOptionError("Campaign sudah ada di daftar.");
        return;
      }
      setCampaignList((prev) => [...prev, trimmed]);
      update("campaign", trimmed);
      toast.success("Campaign berhasil disimpan", {
        description: `"${trimmed}" sudah ditambahkan ke daftar pilihan.`,
      });
    } else if (addModalType === "pillar") {
      if (pillarList.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
        setNewOptionError("Content Pillar sudah ada di daftar.");
        return;
      }
      setPillarList((prev) => [...prev, trimmed]);
      update("pillar", trimmed as ContentPillar);
      toast.success("Content Pillar berhasil disimpan", {
        description: `"${trimmed}" sudah ditambahkan ke daftar pilihan.`,
      });
    }
    setAddModalType(null);
  };

  const targetDateValue = toDateValue(form.targetDate);
  const SelectedFormatIcon = form.format ? FORMAT_ICON[form.format] : null;

  return (
    <section className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          {isDirty ? (
            <AlertDialog isOpen={discardOpen} onOpenChange={setDiscardOpen}>
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
              {initialIdea ? "Edit Konten" : "Tambah Ide Konten"}
            </h1>
            <Chip size="sm" variant="soft" color="accent">
              {initialIdea?.status ?? "Draft"}
            </Chip>
          </div>
          <p className="max-w-2xl text-sm text-muted">
            Lengkapi informasi ide sebelum masuk tahap review. Role aktif:{" "}
            <strong className="text-foreground">{currentRole}</strong>.
          </p>
        </div>
      </div>

      <Form onSubmit={() => requestSave("Draft")}>
        <div className="grid items-start gap-6 lg:grid-cols-12">
          {/* Kolom Kiri: Card Form Utama */}
          <Card className="overflow-hidden border border-border p-0 lg:col-span-8">
            <Card.Content className="space-y-6 p-6 sm:p-8">
              {topError ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-xs font-medium text-danger"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{topError}</span>
                </div>
              ) : null}

              {/* 1. Informasi Dasar */}
              <FormSection
                icon={<FileText className="h-4 w-4" />}
                title="Informasi Dasar"
                description="Identitas ide, penanggung jawab, dan jadwal tayang."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <TextField
                      value={form.title ?? ""}
                      onChange={(value) => update("title", value)}
                      isRequired
                      isInvalid={Boolean(errors.title)}
                    >
                      <Label>Judul Ide *</Label>
                      <Input
                        variant="secondary"
                        placeholder="Contoh: 5 kesalahan skincare yang bikin kulit kusam"
                      />
                      <Description>
                        Gunakan judul yang spesifik dan mudah dipahami.
                      </Description>
                      <FieldError>{errors.title}</FieldError>
                    </TextField>

                    {similar ? (
                      <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-2.5 text-xs text-warning">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>
                          Judul mirip ditemukan di brand{" "}
                          <strong>{form.brand}</strong> ({similar.id}: &ldquo;
                          {similar.title}&rdquo;).
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Brand */}
                  <Select
                    variant="secondary"
                    aria-label="Brand"
                    placeholder="Pilih brand"
                    selectedKey={form.brand ?? null}
                    onSelectionChange={(key) =>
                      update("brand", key ? String(key) : undefined)
                    }
                    isRequired
                    isInvalid={Boolean(errors.brand)}
                  >
                    <Label>Brand *</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {BRANDS.map((brand) => (
                          <ListBox.Item key={brand} id={brand} textValue={brand}>
                            {brand}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.brand}</FieldError>
                  </Select>

                  {/* PIC: ListBox custom style dengan Avatar sejajar 1 row */}
                  <Select
                    variant="secondary"
                    aria-label="PIC"
                    placeholder="Pilih PIC"
                    selectedKey={form.pic ?? null}
                    onSelectionChange={(key) =>
                      update("pic", key ? String(key) : undefined)
                    }
                    isInvalid={Boolean(errors.pic)}
                  >
                    <Label>PIC</Label>
                    <Select.Trigger>
                      <Select.Value>
                        {form.pic ? (
                          <span className="flex items-center gap-2">
                            <Avatar size="sm" className="h-5 w-5 shrink-0">
                              <Avatar.Image
                                alt={form.pic}
                                src={PIC_IMAGE[form.pic]}
                              />
                              <Avatar.Fallback>
                                {form.pic.slice(0, 2).toUpperCase()}
                              </Avatar.Fallback>
                            </Avatar>
                            <span className="truncate text-xs font-medium text-foreground">
                              {form.pic}
                            </span>
                          </span>
                        ) : null}
                      </Select.Value>
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {PICS.map((pic) => (
                          <ListBox.Item
                            key={pic}
                            id={pic}
                            textValue={pic}
                            className="flex items-center gap-2.5 py-1.5"
                          >
                            <Avatar size="sm" className="h-6 w-6 shrink-0">
                              <Avatar.Image alt={pic} src={PIC_IMAGE[pic]} />
                              <Avatar.Fallback>
                                {pic.slice(0, 2).toUpperCase()}
                              </Avatar.Fallback>
                            </Avatar>
                            <span className="flex-1 truncate text-xs font-medium text-foreground">
                              {pic}
                            </span>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.pic}</FieldError>
                  </Select>

                  {/* Campaign / Momen */}
                  <Select
                    variant="secondary"
                    aria-label="Campaign / Momen"
                    placeholder="Pilih campaign"
                    selectedKey={form.campaign ?? null}
                    onSelectionChange={(key) => {
                      const val = key ? String(key) : "";
                      if (val === "__add_campaign__") {
                        openAddModal("campaign");
                        return;
                      }
                      update("campaign", val || undefined);
                    }}
                  >
                    <Label>Campaign / Momen</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {campaignList.map((campaign) => (
                          <ListBox.Item
                            key={campaign}
                            id={campaign}
                            textValue={campaign}
                          >
                            {campaign}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                        <ListBox.Item
                          id="__add_campaign__"
                          textValue="Tambah Campaign baru"
                          className="mt-1 border-t border-border pt-2 font-medium text-accent"
                        >
                          <span className="flex items-center gap-1.5">
                            <Plus className="h-3.5 w-3.5" />
                            Tambah Campaign
                          </span>
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Target Tayang: HeroUI DatePicker */}
                  <DatePicker
                    value={targetDateValue}
                    onChange={(val) =>
                      update("targetDate", val ? val.toString() : undefined)
                    }
                  >
                    <Label>Target Tayang</Label>
                    <DateField.Group
                      fullWidth
                      className="bg-input-secondary"
                    >
                      <DateField.Input>
                        {(segment) => <DateField.Segment segment={segment} />}
                      </DateField.Input>
                      <DateField.Suffix>
                        <DatePicker.Trigger>
                          <DatePicker.TriggerIndicator />
                        </DatePicker.Trigger>
                      </DateField.Suffix>
                    </DateField.Group>
                    <Description>
                      Perkiraan tanggal konten akan tayang.
                    </Description>
                    <DatePicker.Popover>
                      <Calendar aria-label="Pilih target tayang">
                        <Calendar.Header>
                          <Calendar.NavButton slot="previous" />
                          <Calendar.Heading />
                          <Calendar.NavButton slot="next" />
                        </Calendar.Header>
                        <Calendar.Grid>
                          <Calendar.GridHeader>
                            {(day) => (
                              <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                            )}
                          </Calendar.GridHeader>
                          <Calendar.GridBody>
                            {(d) => <Calendar.Cell date={d} />}
                          </Calendar.GridBody>
                        </Calendar.Grid>
                      </Calendar>
                    </DatePicker.Popover>
                  </DatePicker>
                </div>
              </FormSection>

              {/* 2. Klasifikasi */}
              <FormSection
                icon={<Layers className="h-4 w-4" />}
                title="Klasifikasi"
                description="Kategori, format, dan kanal distribusi konten."
                className="border-t border-border pt-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Content Pillar */}
                  <Select
                    variant="secondary"
                    aria-label="Content Pillar"
                    placeholder="Pilih pillar"
                    selectedKey={form.pillar ?? null}
                    onSelectionChange={(key) => {
                      const val = key ? String(key) : "";
                      if (val === "__add_pillar__") {
                        openAddModal("pillar");
                        return;
                      }
                      update(
                        "pillar",
                        val ? (val as ContentIdea["pillar"]) : undefined,
                      );
                    }}
                    isInvalid={Boolean(errors.pillar)}
                  >
                    <Label>Content Pillar</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {pillarList.map((pillar) => (
                          <ListBox.Item
                            key={pillar}
                            id={pillar}
                            textValue={pillar}
                          >
                            {pillar}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                        <ListBox.Item
                          id="__add_pillar__"
                          textValue="Tambah Content Pillar baru"
                          className="mt-1 border-t border-border pt-2 font-medium text-accent"
                        >
                          <span className="flex items-center gap-1.5">
                            <Plus className="h-3.5 w-3.5" />
                            Tambah Content Pillar
                          </span>
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.pillar}</FieldError>
                  </Select>

                  {/* Format: dropdown dengan icon di kiri sesuai tabel */}
                  <Select
                    variant="secondary"
                    aria-label="Format"
                    placeholder="Pilih format"
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
                  >
                    <Label>Format</Label>
                    <Select.Trigger>
                      <Select.Value>
                        {form.format && SelectedFormatIcon ? (
                          <span className="flex items-center gap-2">
                            <SelectedFormatIcon className="h-3.5 w-3.5 shrink-0 text-muted" />
                            <span className="truncate text-xs font-medium text-foreground">
                              {form.format}
                            </span>
                          </span>
                        ) : null}
                      </Select.Value>
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {FORMATS.map((format) => {
                          const Icon = FORMAT_ICON[format];
                          return (
                            <ListBox.Item
                              key={format}
                              id={format}
                              textValue={format}
                              className="flex items-center gap-2"
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0 text-muted" />
                              <span className="flex-1 text-xs">{format}</span>
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.format}</FieldError>
                  </Select>

                  {/* Objective */}
                  <Select
                    variant="secondary"
                    aria-label="Objective"
                    placeholder="Pilih objective"
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
                  >
                    <Label>Objective</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {OBJECTIVES.map((objective) => (
                          <ListBox.Item
                            key={objective}
                            id={objective}
                            textValue={objective}
                          >
                            {objective}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.objective}</FieldError>
                  </Select>

                  {/* Prioritas */}
                  <Select
                    variant="secondary"
                    aria-label="Prioritas"
                    placeholder="Pilih prioritas"
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
                  >
                    <Label>Prioritas</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {PRIORITIES.map((priority) => (
                          <ListBox.Item
                            key={priority}
                            id={priority}
                            textValue={priority}
                          >
                            {priority}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>{errors.priority}</FieldError>
                  </Select>

                  {/* Platform: Card select sejajar 3 kolom dengan logogram berwarna di kiri */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Platform</Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {PLATFORMS.map((platform) => {
                        const active = (form.platforms ?? []).includes(platform);
                        return (
                          <button
                            key={platform}
                            type="button"
                            onClick={() => togglePlatform(platform)}
                            aria-pressed={active}
                            className={`flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                              active
                                ? "border-accent bg-accent/10 ring-1 ring-accent/30"
                                : "border-border bg-input-secondary hover:border-muted/60"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              <PlatformLogo
                                platform={platform}
                                className="h-5 w-5 shrink-0"
                              />
                              <span className="truncate text-xs font-medium text-foreground">
                                {platform}
                              </span>
                            </div>
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                active
                                  ? "border-accent bg-accent text-accent-foreground"
                                  : "border-border bg-surface"
                              }`}
                            >
                              {active ? <Check className="h-2.5 w-2.5" /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
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

              {/* 3. Isi Ide */}
              <FormSection
                icon={<PenLine className="h-4 w-4" />}
                title="Isi Ide"
                description="Inti pesan, hook, dan sudut pandang konten."
                className="border-t border-border pt-6"
              >
                <div className="space-y-4">
                  <TextField
                    value={form.hook ?? ""}
                    onChange={(value) => update("hook", value)}
                    isInvalid={Boolean(errors.hook)}
                  >
                    <Label>Hook</Label>
                    <Input
                      variant="secondary"
                      placeholder="Kalimat pembuka yang menarik perhatian..."
                    />
                    <FieldError>{errors.hook}</FieldError>
                  </TextField>

                  <TextField
                    value={form.angle ?? ""}
                    onChange={(value) => update("angle", value)}
                    isInvalid={Boolean(errors.angle)}
                  >
                    <Label>Angle / Deskripsi</Label>
                    <TextArea
                      variant="secondary"
                      rows={4}
                      placeholder="Sudut pandang dan ringkasan isi konten..."
                    />
                    <FieldError>{errors.angle}</FieldError>
                  </TextField>

                  <TextField
                    value={form.cta ?? ""}
                    onChange={(value) => update("cta", value)}
                  >
                    <Label>CTA &amp; Konsep Visual</Label>
                    <Input
                      variant="secondary"
                      placeholder="Call to action atau arahan visual..."
                    />
                  </TextField>
                </div>
              </FormSection>

              {/* 4. Referensi */}
              <Disclosure className="border-t border-border pt-6">
                <Disclosure.Heading>
                  <Disclosure.Trigger className="flex w-full items-center justify-between gap-4 text-left">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-foreground">
                        <Link2 className="h-4 w-4" />
                      </span>
                      <span className="space-y-0.5">
                        <span className="block text-sm font-semibold text-foreground">
                          Referensi
                        </span>
                        <span className="block text-xs font-normal text-muted">
                          Opsional — tambahkan link inspirasi konten.
                        </span>
                      </span>
                    </span>
                    <Disclosure.Indicator />
                  </Disclosure.Trigger>
                </Disclosure.Heading>
                <Disclosure.Content>
                  <Disclosure.Body className="space-y-3 pt-4">
                    {links.length === 0 ? (
                      <p className="text-xs text-muted">Belum ada referensi.</p>
                    ) : null}

                    {links.map((link, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Input
                          variant="secondary"
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
            </Card.Content>

            <Card.Footer className="flex flex-col-reverse gap-2 border-t border-border bg-surface-secondary/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <Button type="button" variant="ghost" onPress={requestBack}>
                Batal
              </Button>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  onPress={() => requestSave("Draft")}
                >
                  Simpan Draft
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onPress={() => requestSave("Diajukan")}
                >
                  Ajukan Review
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card.Footer>
          </Card>

          {/* Kolom Kanan: Preview Modern & Theme-Aware */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20">
            <Card className="overflow-hidden border border-border p-0">
              <Card.Content className="space-y-5 p-6">
                {/* Preview Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-accent">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Live Preview
                    </span>
                  </div>
                  <Chip size="sm" variant="soft" color="accent">
                    Draft
                  </Chip>
                </div>

                {/* Title & Campaign Preview Card */}
                <div className="space-y-2.5 rounded-xl border border-border bg-surface-secondary/50 p-4">
                  <h2 className="break-words whitespace-normal text-base font-semibold leading-snug text-foreground">
                    {hasText(form.title)
                      ? form.title
                      : "Judul ide belum diisi"}
                  </h2>
                  <p className="text-xs text-muted">
                    {hasText(form.campaign)
                      ? form.campaign
                      : "Belum ada campaign"}
                  </p>

                  {hasText(form.brand) ? (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <Chip size="sm" variant="soft" color="accent">
                        {form.brand}
                      </Chip>
                    </div>
                  ) : null}
                </div>

                {/* Metadata Grid */}
                <dl className="space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="pt-0.5 text-muted">Platform</dt>
                    <dd className="flex flex-wrap justify-end gap-1">
                      {(form.platforms ?? []).length > 0 ? (
                        (form.platforms ?? []).map((platform) => (
                          <Chip
                            key={platform}
                            size="sm"
                            variant="soft"
                            color="default"
                          >
                            <PlatformLogo
                              platform={platform}
                              className="h-3 w-3 shrink-0"
                            />
                            <Chip.Label>{platform}</Chip.Label>
                          </Chip>
                        ))
                      ) : (
                        <span className="font-medium text-foreground">–</span>
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Format</dt>
                    <dd>
                      {form.format && SelectedFormatIcon ? (
                        <Chip size="sm" variant="soft" color="default">
                          <SelectedFormatIcon className="h-3 w-3" />
                          <Chip.Label>{form.format}</Chip.Label>
                        </Chip>
                      ) : (
                        <span className="font-medium text-foreground">–</span>
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Pillar</dt>
                    <dd className="font-medium text-foreground">
                      {form.pillar ?? "–"}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Prioritas</dt>
                    <dd>
                      {form.priority ? (
                        <Chip
                          size="sm"
                          variant="soft"
                          color={PRIORITY_COLOR[form.priority]}
                        >
                          {form.priority}
                        </Chip>
                      ) : (
                        <span className="font-medium text-foreground">–</span>
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">PIC</dt>
                    <dd className="flex items-center gap-1.5 font-medium text-foreground">
                      {form.pic ? (
                        <>
                          <Avatar size="sm" className="h-5 w-5">
                            <Avatar.Image
                              alt={form.pic}
                              src={PIC_IMAGE[form.pic]}
                            />
                            <Avatar.Fallback>
                              {form.pic.slice(0, 2).toUpperCase()}
                            </Avatar.Fallback>
                          </Avatar>
                          <span>{form.pic}</span>
                        </>
                      ) : (
                        "–"
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Target Tayang</dt>
                    <dd className="font-medium text-foreground">
                      {formatShortDate(form.targetDate)}
                    </dd>
                  </div>
                </dl>

                {/* Info Hook & Deskripsi / Angle (dipindah ke atas Kelengkapan) */}
                <div className="space-y-3 rounded-xl border border-border bg-surface-secondary/50 p-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Hook
                    </p>
                    <p className="mt-1 break-words text-xs leading-relaxed text-foreground">
                      {hasText(form.hook)
                        ? `"${form.hook}"`
                        : "Belum ada hook."}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Angle / Deskripsi
                    </p>
                    <p className="mt-1 break-words text-xs leading-relaxed text-muted">
                      {hasText(form.angle)
                        ? form.angle
                        : "Belum ada deskripsi atau sudut pandang konten."}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Kelengkapan */}
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
              </Card.Content>
            </Card>
          </aside>
        </div>
      </Form>

      {/* Alert Konfirmasi Simpan / Ajukan Review */}
      <AlertDialog
        isOpen={Boolean(confirmStatus)}
        onOpenChange={(open) => {
          if (!open) setConfirmStatus(null);
        }}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[420px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>
                  {confirmStatus === "Diajukan"
                    ? "Ajukan ide untuk review?"
                    : "Simpan ide sebagai Draft?"}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="space-y-2">
                <p className="text-sm text-muted">
                  {confirmStatus === "Diajukan"
                    ? "Ide akan dikirim ke antrean review Approver."
                    : "Ide akan disimpan ke Bank Ide dengan status Draft dan bisa dilengkapi lagi nanti."}
                </p>
                {hasText(form.title) ? (
                  <div className="rounded-lg border border-border bg-surface-secondary/50 px-3 py-2 text-xs font-medium text-foreground">
                    &ldquo;{form.title}&rdquo;
                  </div>
                ) : null}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onPress={() => setConfirmStatus(null)}
                >
                  Periksa lagi
                </Button>
                <Button variant="primary" onPress={executeSave}>
                  {confirmStatus === "Diajukan"
                    ? "Ya, Ajukan Review"
                    : "Ya, Simpan Draft"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* Modal Tambah Campaign / Content Pillar (style selaras dengan AlertDialog konfirmasi simpan) */}
      <Modal
        isOpen={Boolean(addModalType)}
        onOpenChange={(open) => {
          if (!open) setAddModalType(null);
        }}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[420px]">
              <Modal.CloseTrigger />
              <Modal.Header className="gap-0.5 pb-1">
                <Modal.Icon className="bg-accent/15 text-accent">
                  <Plus className="h-5 w-5" />
                </Modal.Icon>
                <Modal.Heading>
                  {addModalType === "campaign"
                    ? "Tambah Campaign / Momen"
                    : "Tambah Content Pillar"}
                </Modal.Heading>
                <p className="text-xs text-muted">
                  {addModalType === "campaign"
                    ? "Tambahkan opsi campaign baru ke daftar pilihan."
                    : "Tambahkan opsi content pillar baru ke daftar pilihan."}
                </p>
              </Modal.Header>
              <Modal.Body className="space-y-2.5 pt-0">
                <TextField
                  isRequired
                  isInvalid={Boolean(newOptionError)}
                  value={newOptionValue}
                  onChange={(val) => {
                    setNewOptionValue(val);
                    if (newOptionError) setNewOptionError("");
                  }}
                >
                  <Label>
                    {addModalType === "campaign"
                      ? "Nama Campaign"
                      : "Nama Content Pillar"}{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    variant="secondary"
                    autoFocus
                    placeholder={
                      addModalType === "campaign"
                        ? "Contoh: Promo Akhir Tahun"
                        : "Contoh: Behind The Scene"
                    }
                  />
                  <FieldError>{newOptionError}</FieldError>
                </TextField>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onPress={() => setAddModalType(null)}
                >
                  Batal
                </Button>
                <Button variant="primary" onPress={handleSaveNewOption}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </section>
  );
}
