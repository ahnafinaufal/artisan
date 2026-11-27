import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
} from "@heroui/react";
import { AlertTriangle, MessageSquare, Send, Sparkles } from "lucide-react";
import { BRANDS, CAMPAIGNS, PICS } from "../mockData";
import {
  FORMATS,
  OBJECTIVES,
  PILLARS,
  PLATFORMS,
  PRIORITIES,
  SOURCES,
} from "../options";
import type {
  ContentFormat,
  ContentIdea,
  ContentPillar,
  IdeaSource,
  IdeaStatus,
  Objective,
  Platform,
  Priority,
  UserRole,
} from "../types";
import {
  calculateIdeaScore,
  findSimilarTitleInBrand,
  formatDateTime,
  getAllowedTransitions,
  validateForApproval,
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
  const score = calculateIdeaScore(form);

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
        setErrorMsg(`Field wajib untuk Diajukan belum lengkap: ${missing.join(", ")}`);
        return;
      }
    }

    if (nextStatus === "Disetujui") {
      const missing = validateForApproval(form);
      if (missing.length > 0) {
        setErrorMsg(`Penilaian 1–5 wajib diisi sebelum Disetujui: ${missing.join(", ")}`);
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

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Backdrop>
        <Drawer.Content placement="right" className="w-full max-w-2xl">
          <Drawer.Dialog>
            <Drawer.Header className="border-b border-border pb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Drawer.Heading className="text-lg font-bold">
                    {isNew ? "Tambah Ide Konten" : `${idea.id} — Detail Ide`}
                  </Drawer.Heading>
                  <p className="text-xs text-muted">
                    Role aktif: <strong className="text-foreground">{currentRole}</strong> · Status:{" "}
                    <Chip size="sm" variant="soft" color="accent">
                      {currentStatus}
                    </Chip>
                  </p>
                </div>
                <Drawer.CloseTrigger />
              </div>
            </Drawer.Header>

            <Drawer.Body className="space-y-6 overflow-y-auto py-4">
              {similar ? (
                <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Peringatan: Judul mirip ditemukan di brand <strong>{form.brand}</strong> (
                    {similar.id}: &ldquo;{similar.title}&rdquo;).
                  </span>
                </div>
              ) : null}

              {errorMsg ? (
                <div className="rounded-lg border border-danger/40 bg-danger/10 p-3 text-xs font-medium text-danger">
                  {errorMsg}
                </div>
              ) : null}

              {/* 1. Dasar */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  1. Dasar (Wajib saat Simpan Draft)
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Judul Ide *</Label>
                    <Input
                      value={form.title ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="Judul ide konten..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Brand *</Label>
                    <Select
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
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>PIC (Wajib saat Diajukan)</Label>
                    <Select
                      aria-label="PIC"
                      selectedKey={form.pic ?? ""}
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
                            <ListBox.Item key={pic} id={pic} textValue={pic}>
                              {pic}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>
              </section>

              {/* 2. Klasifikasi */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  2. Klasifikasi (Wajib saat Diajukan)
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Content Pillar *</Label>
                    <Select
                      aria-label="Content Pillar"
                      selectedKey={form.pillar ?? ""}
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
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Format *</Label>
                    <Select
                      aria-label="Format"
                      selectedKey={form.format ?? ""}
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
                          {FORMATS.map((f) => (
                            <ListBox.Item key={f} id={f} textValue={f}>
                              {f}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Objective *</Label>
                    <Select
                      aria-label="Objective"
                      selectedKey={form.objective ?? ""}
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
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Prioritas *</Label>
                    <Select
                      aria-label="Prioritas"
                      selectedKey={form.priority ?? ""}
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
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <Label>Platform * (Multi-pilihan)</Label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((pl) => {
                        const active = (form.platforms ?? []).includes(pl);
                        return (
                          <Button
                            key={pl}
                            size="sm"
                            variant={active ? "primary" : "secondary"}
                            onPress={() => togglePlatform(pl)}
                          >
                            {pl}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Campaign / Momen</Label>
                    <Select
                      aria-label="Campaign"
                      selectedKey={form.campaign ?? ""}
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
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Sumber Ide</Label>
                    <Select
                      aria-label="Sumber Ide"
                      selectedKey={form.source ?? ""}
                      onSelectionChange={(k) =>
                        setForm((p) => ({
                          ...p,
                          source: String(k) as IdeaSource,
                        }))
                      }
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {SOURCES.map((s) => (
                            <ListBox.Item key={s} id={s} textValue={s}>
                              {s}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Target Tayang</Label>
                    <Input
                      type="date"
                      value={form.targetDate ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, targetDate: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </section>

              {/* 3. Isi Ide */}
              <section className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  3. Isi Ide (Hook &amp; Angle Wajib saat Diajukan)
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Hook *</Label>
                    <Input
                      value={form.hook ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, hook: e.target.value }))
                      }
                      placeholder="Kalimat pembuka yang menarik perhatian..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Angle / Deskripsi *</Label>
                    <TextArea
                      rows={3}
                      value={form.angle ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, angle: e.target.value }))
                      }
                      placeholder="Sudut pandang dan ringkasan isi konten..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>CTA &amp; Konsep Visual (Opsional)</Label>
                    <Input
                      value={form.cta ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, cta: e.target.value }))
                      }
                      placeholder="Call to action..."
                    />
                  </div>
                </div>
              </section>

              {/* 4. Penilaian */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                    4. Penilaian (Wajib saat Disetujui)
                  </h4>
                  <span className="text-xs font-semibold text-foreground">
                    Skor Ide: {score !== null ? score.toFixed(1) : "–"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      ["relevanceScore", "Relevansi (1–5)"],
                      ["impactScore", "Potensi Dampak (1–5)"],
                      ["easeScore", "Kemudahan (1–5)"],
                    ] as const
                  ).map(([field, label]) => (
                    <div key={field} className="space-y-1">
                      <Label className="text-xs">{label}</Label>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={form[field] ?? ""}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setForm((p) => ({
                            ...p,
                            [field]:
                              val >= 1 && val <= 5 ? val : undefined,
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Alasan Revisi / Ditolak */}
              {(pendingReasonStatus ||
                allowedTransitions.includes("Revisi") ||
                allowedTransitions.includes("Ditolak")) && (
                <section className="space-y-1.5">
                  <Label>
                    Alasan Revisi / Penolakan (Wajib jika Revisi atau Ditolak)
                  </Label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tuliskan alasan atau catatan perbaikan..."
                  />
                </section>
              )}

              {/* Komentar & Riwayat */}
              {!isNew ? (
                <section className="space-y-3 border-t border-border pt-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Kolaborasi &amp; Riwayat
                  </h4>
                  <div className="flex gap-2">
                    <Input
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
                  <div className="space-y-2">
                    {idea.comments.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-lg bg-surface-secondary/60 p-2.5 text-xs"
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
                </section>
              ) : null}
            </Drawer.Body>

            <Drawer.Footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
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
                <Button variant="ghost" size="sm" onPress={() => onOpenChange(false)}>
                  Tutup
                </Button>
                <Button variant="primary" size="sm" onPress={() => handleAction()}>
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
