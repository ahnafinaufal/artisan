import { useState, type ReactNode } from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Input,
} from "@heroui/react";
import {
  ArrowLeft,
  Clapperboard,
  Copy,
  Edit3,
  FileText,
  Film,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Send,
  Smartphone,
  Sparkles,
  Trash2,
} from "lucide-react";
import { ConceptStoryboard } from "./components/ConceptStoryboard";
import { IdeaAuditTimeline } from "./components/IdeaAuditTimeline";
import { PIC_IMAGE } from "./components/IdeaDetailDrawer";
import { PlatformLogo } from "./components/PlatformLogo";
import { ReferenceLinksCell } from "./components/ReferenceLinksCell";
import type { ContentIdea, Platform, UserRole } from "./types";
import { formatDateTime } from "./utils";

const FORMAT_ICON: Record<string, typeof Clapperboard> = {
  "Reels/Short": Clapperboard,
  Carousel: GalleryHorizontalEnd,
  "Single Image": ImageIcon,
  Story: Smartphone,
  "Video Panjang": Film,
};

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </span>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  );
}

export interface IdeaDetailPageProps {
  idea: ContentIdea | null;
  currentRole: UserRole;
  onBack: () => void;
  onEdit: (idea: ContentIdea) => void;
  onConvert: (idea: ContentIdea) => void;
  onDuplicate: (idea: ContentIdea) => void;
  onDelete: (idea: ContentIdea) => void;
  onAddComment: (ideaId: string, text: string) => void;
}

export function IdeaDetailPage({
  idea,
  currentRole,
  onBack,
  onEdit,
  onConvert,
  onDuplicate,
  onDelete,
  onAddComment,
}: IdeaDetailPageProps) {
  const [commentText, setCommentText] = useState("");

  if (!idea) {
    return (
      <section className="mx-auto w-full max-w-[1280px] space-y-6">
        <Button variant="ghost" size="sm" className="-ml-2" onPress={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Bank Ide
        </Button>
        <Card className="p-8 text-center text-sm text-muted">
          Ide tidak ditemukan.
        </Card>
      </section>
    );
  }

  const FormatIcon = idea.format ? FORMAT_ICON[idea.format] ?? Layers : Layers;

  const submitComment = () => {
    const text = commentText.trim();
    if (!text) return;
    onAddComment(idea.id, text);
    setCommentText("");
  };

  return (
    <section className="mx-auto w-full max-w-[1280px] space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="-ml-2" onPress={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bank Ide
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {idea.title}
            </h1>
            <Chip size="sm" variant="soft" color="accent">
              {idea.status}
            </Chip>
          </div>
          <p className="max-w-2xl text-sm text-muted">
            {idea.id} · Role aktif: <strong className="text-foreground">{currentRole}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" className="rounded-full" onPress={() => onEdit(idea)}>
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="rounded-full"
            isDisabled={idea.status !== "Disetujui" || Boolean(idea.linkedContentId)}
            onPress={() => onConvert(idea)}
          >
            <Sparkles className="h-4 w-4" />
            Jadikan Konten
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full" onPress={() => onDuplicate(idea)}>
            <Copy className="h-4 w-4" />
            Duplikat
          </Button>
          <Button variant="danger-soft" size="sm" className="rounded-full" onPress={() => onDelete(idea)}>
            <Trash2 className="h-4 w-4" />
            Hapus
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="space-y-4 p-5">
            <SectionHeading icon={<FileText className="h-4 w-4" />} title="Informasi Dasar" />
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">Judul</dt>
                <dd className="text-sm font-medium text-foreground">{idea.title}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Brand</dt>
                <dd className="text-sm text-foreground">{idea.brand}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">PIC</dt>
                <dd className="flex items-center gap-2 text-sm text-foreground">
                  {idea.pic ? (
                    <>
                      <Avatar size="sm" className="h-6 w-6">
                        <Avatar.Image alt={idea.pic} src={PIC_IMAGE[idea.pic]} />
                        <Avatar.Fallback>{idea.pic.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                      </Avatar>
                      {idea.pic}
                    </>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Target Tayang</dt>
                <dd className="text-sm text-foreground">{idea.targetDate ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Dibuat</dt>
                <dd className="text-sm text-foreground">{formatDateTime(idea.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Diubah</dt>
                <dd className="text-sm text-foreground">{formatDateTime(idea.updatedAt)}</dd>
              </div>
            </dl>
          </Card>

          <Card className="space-y-4 p-5">
            <SectionHeading icon={<Layers className="h-4 w-4" />} title="Klasifikasi" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Instagram", "TikTok", "YouTube"].map((platform) => {
                const active = (idea.platforms ?? []).includes(platform as Platform);
                return (
                  <div
                    key={platform}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/30"
                        : "border-border bg-surface opacity-60"
                    }`}
                  >
                    <PlatformLogo platform={platform as Platform} className="h-5 w-5 shrink-0" />
                    <span className="truncate text-xs font-medium text-foreground">{platform}</span>
                  </div>
                );
              })}
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">Content Pillar</dt>
                <dd className="text-sm text-foreground">{idea.pillar ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Format</dt>
                <dd className="flex items-center gap-2 text-sm text-foreground">
                  <FormatIcon className="h-4 w-4 text-muted" />
                  {idea.format ?? "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Objective</dt>
                <dd className="text-sm text-foreground">{idea.objective ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Prioritas</dt>
                <dd>
                  {idea.priority ? (
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        idea.priority === "Tinggi"
                          ? "danger"
                          : idea.priority === "Sedang"
                            ? "warning"
                            : "default"
                      }
                    >
                      {idea.priority}
                    </Chip>
                  ) : (
                    <span className="text-sm text-foreground">-</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Campaign</dt>
                <dd className="text-sm text-foreground">{idea.campaign ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Tags</dt>
                <dd className="text-sm text-foreground">{idea.tags?.join(", ") || "-"}</dd>
              </div>
            </dl>
          </Card>

          <Card className="space-y-4 p-5">
            <SectionHeading icon={<FileText className="h-4 w-4" />} title="Isi Ide" />
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted">Hook</p>
                <p className="text-sm text-foreground">{idea.hook || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Angle</p>
                <p className="text-sm text-foreground">{idea.angle || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">CTA</p>
                <p className="text-sm text-foreground">{idea.cta || "-"}</p>
              </div>
              {idea.referenceLinks?.length ? (
                <div>
                  <p className="text-xs text-muted">Referensi</p>
                  <ul className="space-y-1 text-sm text-foreground">
                    {idea.referenceLinks.map((link, index) => (
                      <li key={index} className="break-all">{link}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Card>

          <ConceptStoryboard idea={idea} showScriptVoTabs />

          <Card className="space-y-4 p-5">
            <SectionHeading icon={<MessageSquare className="h-4 w-4" />} title="Komentar" />
            {idea.comments?.length ? (
              <ul className="space-y-3">
                {idea.comments.map((comment) => (
                  <li key={comment.id} className="rounded-xl bg-surface p-3">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" className="h-6 w-6">
                        <Avatar.Fallback>{comment.author.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium text-foreground">{comment.author}</p>
                        <p className="text-[11px] text-muted">{formatDateTime(comment.createdAt)}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-foreground">{comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">Belum ada komentar.</p>
            )}
            <div className="flex gap-2">
              <Input
                variant="secondary"
                className="flex-1"
                placeholder="Tulis komentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitComment();
                }}
              />
              <Button variant="primary" size="sm" onPress={submitComment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>

        </div>

        <aside className="space-y-4 lg:self-start">
          <Card className="space-y-3 p-5">
            <h3 className="text-sm font-semibold text-foreground">Referensi</h3>
            <ReferenceLinksCell links={idea.referenceLinks ?? []} variant="list" />
          </Card>
          <IdeaAuditTimeline idea={idea} />
        </aside>
      </div>
    </section>
  );
}
