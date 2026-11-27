import { useEffect, useState, type ReactNode } from "react";
import { parseDate, type DateValue } from "@internationalized/date";
import {
  Avatar,
  Button,
  Calendar,
  Chip,
  DateField,
  DatePicker,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
} from "@heroui/react";
import {
  AlertTriangle,
  Check,
  Clapperboard,
  FileText,
  Film,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  PenLine,
  Send,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { BRANDS, CAMPAIGNS, PICS } from "../mockData";
import {
  FORMATS,
  OBJECTIVES,
  PILLARS,
  PLATFORMS,
  PRIORITIES,
} from "../options";
import type {
  ContentFormat,
  ContentIdea,
  ContentPillar,
  IdeaStatus,
  Objective,
  Platform,
  Priority,
  UserRole,
} from "../types";
import {
  findSimilarTitleInBrand,
  formatDateTime,
  getAllowedTransitions,
  validateForSubmission,
} from "../utils";

interface IdeaDetailDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  idea: ContentIdea | null;
  existingIdeas: ContentIdea[];
  currentRole: UserRole;
  onSave: (
    draft: Partial<ContentIdea>,
    targetStatus?: IdeaStatus,
    reason?: string,
  ) => { ok: boolean; error?: string };
  onAddComment: (ideaId: string, text: string) => void;
  onConvert: (idea: ContentIdea) => void;
}

export const PIC_IMAGE: Record<string, string> = {
  Naufal: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
  Rania: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
  Dimas: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
  Sinta: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
  Bima: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
};

const FORMAT_ICON: Record<ContentFormat, typeof Clapperboard> = {
  "Reels/Short": Clapperboard,
  Carousel: GalleryHorizontalEnd,
  "Single Image": ImageIcon,
  Story: Smartphone,
  "Video Panjang": Film,
};

function PlatformLogo({ platform }: { platform: Platform }) {
  if (platform === "Instagram") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-xs">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
        </svg>
      </span>
    );
  }
  if (platform === "TikTok") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white shadow-xs">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF0000] text-white shadow-xs">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95C1.96 8.91 1.96 12 1.96 12s0 3.09.46 4.81a2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95c.46-1.72.46-4.81.46-4.81s0-3.09-.46-4.81M9.95 15.05V8.95L15.23 12z" />
      </svg>
    </span>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h4>
        {subtitle ? (
          <p className="text-[11px] text-muted">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

function toDateValue(dateStr?: string): DateValue | null {
  if (!dateStr) return null;
  try {
    return parseDate(dateStr.slice(0, 10));
  } catch {
    return null;
  }
}

export function IdeaDetailDrawer({
  isOpen,
  onOpenChange,
  idea,
  existingIdeas,
  currentRole,
  onSave,
  onAddComment,
  onConvert,
}: IdeaDetailDrawerProps) {
  const [form, setForm] = useState<Partial<ContentIdea>>({});
  const [reason, setReason] = useState("");
  const [commentText, setCommentText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingReasonStatus, setPendingReasonStatus] =
    useState<IdeaStatus | null>(null);

  useEffect(() => {
    if (idea) {
      setForm({ ...idea });
    } else {
      setForm({
        title: "",
        brand: BRANDS[0],
        platforms: [],
        tags: [],
        referenceLinks: [],
        status: "Draft",
      });
    }
    setReason("");
    setErrorMsg("");
    setPendingReasonStatus(null);
  }, [idea, isOpen]);

  const currentStatus: IdeaStatus = form.status ?? "Draft";
  const isNew = !idea;
  const allowedTransitions = isNew
    ? (["Diajukan"] as IdeaStatus[])
    : getAllowedTransitions(currentStatus, currentRole);

  const similar = findSimilarTitleInBrand(
    existingIdeas,
    form.title ?? "",
    form.brand ?? "",
    idea?.id,
  );

  const togglePlatform = (p: Platform) => {
    const current = form.platforms ?? [];
    const next = current.includes(p)
      ? current.filter((x) => x !== p)
      : [...current, p];
    setForm((prev) => ({ ...prev, platforms: next }));
  };

  const handleAction = (nextStatus?: IdeaStatus) => {
    setErrorMsg("");

    if (!form.title?.trim() || !form.brand?.trim()) {
      setErrorMsg("Judul Ide dan Brand wajib diisi.");
      return;
    }

    if (nextStatus === "Diajukan") {
      const missing = validateForSubmission(form);
      if (missing.length > 0) {
        setErrorMsg(
          `Field wajib untuk Diajukan belum lengkap: ${missing.join(", ")}`,
        );
        return;
      }
    }

    if (nextStatus === "Revisi" || nextStatus === "Ditolak") {
      if (!reason.trim()) {
        setPendingReasonStatus(nextStatus);
        setErrorMsg(`Status ${nextStatus} wajib disertai alasan.`);
        return;
      }
    }

    const res = onSave(form, nextStatus, reason.trim() || undefined);
    if (!res.ok) {
      setErrorMsg(res.error ?? "Gagal menyimpan perubahan.");
      return;
    }
    onOpenChange(false);
  };

  const targetDateValue = toDateValue(form.targetDate);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Backdrop>
        <Drawer.Content placement="right" className="w-full max-w-2xl bg-background">
          <Drawer.Dialog className="flex h-full flex-col bg-background">
            <Drawer.Header className="border-b border-border bg-surface px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Drawer.Heading className="truncate text-lg font-bold text-foreground">
                    {isNew ? "Tambah Ide Konten" : `${idea.id} — Detail Ide`}
                  </Drawer.Heading>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>
                      Role aktif:{" "}
                      <strong className="text-foreground">{currentRole}</strong>
                    </span>
                    <span>·</span>
                    <Chip size="sm" variant="soft" color="accent">
                      {currentStatus}
                    </Chip>
                  </div>
                </div>
                <Drawer.CloseTrigger />
              </div>
            </Drawer.Header>

            <Drawer.Body className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {similar ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/10 p-3.5 text-xs text-warning">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Peringatan: Judul mirip ditemukan di brand{" "}
                    <strong>{form.brand}</strong> ({similar.id}: &ldquo;
                    {similar.title}&rdquo;).
                  </span>
                </div>
              ) : null}

              {errorMsg ? (
                <div className="rounded-xl border border-danger/40 bg-danger/10 p-3.5 text-xs font-medium text-danger">
                  {errorMsg}
                </div>
              ) : null}

              {/* 1. Dasar */}
              <section className="space-y-4 rounded-xl border border-border bg-surface p-4">
                <SectionHeading
                  icon={<FileText className="h-4 w-4" />}
                  title="1. Dasar"
                  subtitle="Wajib diisi saat Simpan Draft"
                />
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label>Judul Ide *</Label>
                    <Input
                      variant="secondary"
                      value={form.title ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="Judul ide konten..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Brand *</Label>
                    <Select
                      variant="secondary"
                      aria-label="Brand"
                      selectedKey={form.brand ?? BRANDS[0]}
                      onSelectionChange={(k) =>
                        setForm((p) => ({ ...p, brand: String(k) }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {BRANDS.map((b) => (
                            <ListBox.Item key={b} id={b} textValue={b}>
                              {b}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>PIC (Wajib saat Diajukan)</Label>
                    <Select
                      variant="secondary"
                      aria-label="PIC"
                      placeholder="Pilih PIC"
                      selectedKey={form.pic ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({ ...p, pic: String(k) }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
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
                                <Avatar.Image
                                  alt={pic}
                                  src={PIC_IMAGE[pic]}
                                />
                                <Avatar.Fallback>
                                  {pic.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                              </Avatar>
                              <div className="flex flex-1 flex-col">
                                <span className="text-xs font-medium text-foreground">
                                  {pic}
                                </span>
                                <span className="text-[11px] text-muted">
                                  Content Team
                                </span>
                              </div>
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>
              </section>

              {/* 2. Klasifikasi */}
              <section className="space-y-4 rounded-xl border border-border bg-surface p-4">
                <SectionHeading
                  icon={<Layers className="h-4 w-4" />}
                  title="2. Klasifikasi & Jadwal"
                  subtitle="Wajib diisi saat Diajukan"
                />
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Content Pillar *</Label>
                    <Select
                      variant="secondary"
                      aria-label="Content Pillar"
                      placeholder="Pilih pillar"
                      selectedKey={form.pillar ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({
                          ...p,
                          pillar: String(k) as ContentPillar,
                        }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {PILLARS.map((pl) => (
                            <ListBox.Item key={pl} id={pl} textValue={pl}>
                              {pl}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Format *</Label>
                    <Select
                      variant="secondary"
                      aria-label="Format"
                      placeholder="Pilih format"
                      selectedKey={form.format ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({
                          ...p,
                          format: String(k) as ContentFormat,
                        }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {FORMATS.map((f) => {
                            const Icon = FORMAT_ICON[f];
                            return (
                              <ListBox.Item
                                key={f}
                                id={f}
                                textValue={f}
                                className="flex items-center gap-2"
                              >
                                <Icon className="h-3.5 w-3.5 shrink-0 text-muted" />
                                <span className="flex-1 text-xs">{f}</span>
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            );
                          })}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Objective *</Label>
                    <Select
                      variant="secondary"
                      aria-label="Objective"
                      placeholder="Pilih objective"
                      selectedKey={form.objective ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({
                          ...p,
                          objective: String(k) as Objective,
                        }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {OBJECTIVES.map((o) => (
                            <ListBox.Item key={o} id={o} textValue={o}>
                              {o}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Prioritas *</Label>
                    <Select
                      variant="secondary"
                      aria-label="Prioritas"
                      placeholder="Pilih prioritas"
                      selectedKey={form.priority ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({
                          ...p,
                          priority: String(k) as Priority,
                        }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {PRIORITIES.map((pr) => (
                            <ListBox.Item key={pr} id={pr} textValue={pr}>
                              {pr}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Platform: 3-column card select */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label>Platform * (Multi-pilihan)</Label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {PLATFORMS.map((pl) => {
                        const active = (form.platforms ?? []).includes(pl);
                        return (
                          <button
                            key={pl}
                            type="button"
                            onClick={() => togglePlatform(pl)}
                            aria-pressed={active}
                            className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${
                              active
                                ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                                : "border-border bg-input-secondary hover:border-muted/60"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <PlatformLogo platform={pl} />
                              <span className="truncate text-xs font-medium text-foreground">
                                {pl}
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
                  </div>

                  <div className="space-y-1.5">
                    <Label>Campaign / Momen</Label>
                    <Select
                      variant="secondary"
                      aria-label="Campaign"
                      placeholder="Pilih campaign"
                      selectedKey={form.campaign ?? null}
                      onSelectionChange={(k) =>
                        setForm((p) => ({ ...p, campaign: String(k) }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {CAMPAIGNS.map((c) => (
                            <ListBox.Item key={c} id={c} textValue={c}>
                              {c}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <DatePicker
                      value={targetDateValue}
                      onChange={(val) =>
                        setForm((p) => ({
                          ...p,
                          targetDate: val ? val.toString() : undefined,
                        }))
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
                </div>
              </section>

              {/* 3. Isi Ide */}
              <section className="space-y-4 rounded-xl border border-border bg-surface p-4">
                <SectionHeading
                  icon={<PenLine className="h-4 w-4" />}
                  title="3. Isi Ide"
                  subtitle="Hook & Angle wajib diisi saat Diajukan"
                />
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <Label>Hook *</Label>
                    <Input
                      variant="secondary"
                      value={form.hook ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, hook: e.target.value }))
                      }
                      placeholder="Kalimat pembuka yang menarik perhatian..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Angle / Deskripsi *</Label>
                    <TextArea
                      variant="secondary"
                      rows={3}
                      value={form.angle ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, angle: e.target.value }))
                      }
                      placeholder="Sudut pandang dan ringkasan isi konten..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>CTA &amp; Konsep Visual (Opsional)</Label>
                    <Input
                      variant="secondary"
                      value={form.cta ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, cta: e.target.value }))
                      }
                      placeholder="Call to action..."
                    />
                  </div>
                </div>
              </section>

              {/* Alasan Revisi / Ditolak */}
              {(pendingReasonStatus ||
                allowedTransitions.includes("Revisi") ||
                allowedTransitions.includes("Ditolak")) && (
                <section className="space-y-2 rounded-xl border border-border bg-surface p-4">
                  <Label>
                    Alasan Revisi / Penolakan (Wajib jika Revisi atau Ditolak)
                  </Label>
                  <Input
                    variant="secondary"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tuliskan alasan atau catatan perbaikan..."
                  />
                </section>
              )}

              {/* Kolaborasi & Riwayat */}
              {!isNew ? (
                <section className="space-y-4 rounded-xl border border-border bg-surface p-4">
                  <SectionHeading
                    icon={<MessageSquare className="h-4 w-4" />}
                    title="Kolaborasi & Riwayat"
                    subtitle="Diskusi tim & log aktivitas ide"
                  />
                  <div className="flex gap-2">
                    <Input
                      variant="secondary"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis komentar..."
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => {
                        if (!commentText.trim()) return;
                        onAddComment(idea.id, commentText.trim());
                        setCommentText("");
                      }}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {idea.comments.length > 0 ? (
                    <div className="space-y-2">
                      {idea.comments.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-lg border border-border/60 bg-surface-secondary/50 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between text-muted">
                            <span className="font-semibold text-foreground">
                              {c.author} ({c.role})
                            </span>
                            <span>{formatDateTime(c.createdAt)}</span>
                          </div>
                          <p className="mt-1 text-foreground">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}
            </Drawer.Body>

            <Drawer.Footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface px-6 py-3.5">
              <div className="flex flex-wrap gap-2">
                {allowedTransitions.map((next) => {
                  if (next === "Jadi Konten" && idea) {
                    return (
                      <Button
                        key={next}
                        size="sm"
                        variant="primary"
                        isDisabled={Boolean(idea.linkedContentId)}
                        onPress={() => {
                          onConvert(idea);
                          onOpenChange(false);
                        }}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Jadikan Konten
                      </Button>
                    );
                  }
                  const variant =
                    next === "Disetujui"
                      ? "primary"
                      : next === "Ditolak"
                        ? "danger-soft"
                        : "secondary";
                  return (
                    <Button
                      key={next}
                      size="sm"
                      variant={variant}
                      onPress={() => handleAction(next)}
                    >
                      {next}
                    </Button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => onOpenChange(false)}
                >
                  Tutup
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => handleAction()}
                >
                  Simpan
                </Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
