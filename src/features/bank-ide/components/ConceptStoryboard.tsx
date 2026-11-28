import { useState, type ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Chip,
  Description,
  Dropdown,
  Label,
  Tabs,
} from "@heroui/react";
import {
  Camera,
  ChevronDown,
  Clapperboard,
  Download,
  FileCode2,
  FileDown,
  Image as ImageIcon,
  Music2,
} from "lucide-react";
import { Timeline } from "../../../components/molecules/Timeline";
import type { ContentIdea } from "../types";

type FrameTone = "default" | "accent" | "success" | "warning";

interface FrameImage {
  src: string;
  alt: string;
}

interface StoryboardFrame {
  id: string;
  time: string;
  label: string;
  title: string;
  description: string;
  voTitle: string;
  voDescription: string;
  shot: string;
  camera: string;
  audio: string;
  status: "default" | "current" | "success" | "warning";
  tone: FrameTone;
  image: FrameImage;
}

interface BrandStoryboard {
  note: string;
  images: FrameImage[];
}

const BRAND_STORYBOARD: Record<string, BrandStoryboard> = {
  "GlowSkin ID": {
    note: "Cahaya alami, tekstur dewy, tone hangat",
    images: [
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Botol skincare ungu dengan tekstur krim",
      },
      {
        src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Lotion tubuh di atas kain putih",
      },
      {
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Rangkaian produk skincare di atas meja",
      },
      {
        src: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Botol skincare di atas alas warna pastel",
      },
    ],
  },
  "Kopi Nusantara": {
    note: "Tone earthy, close-up tekstur, cahaya sore",
    images: [
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Secangkir kopi di meja kayu",
      },
      {
        src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Biji kopi sangrai close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Proses pour-over kopi",
      },
      {
        src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Beberapa cangkir kopi dilihat dari atas",
      },
    ],
  },
  "Artisan Studio": {
    note: "Natural light, ruang kerja rapi, aksen netral",
    images: [
      {
        src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Meja kerja kreatif dengan laptop",
      },
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Ruang kantor dengan partisi kaca",
      },
      {
        src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Meja kerja dengan kopi dan alat tulis",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Tangan bekerja di depan laptop",
      },
    ],
  },
  "FitLife Daily": {
    note: "Kontras tinggi, gerak dinamis, tone energik",
    images: [
      {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Pria berlatih di gym",
      },
      {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Wanita melakukan sit-up",
      },
      {
        src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Kelas yoga di studio",
      },
      {
        src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=320&h=320&q=80",
        alt: "Yoga di luar ruangan saat matahari terbenam",
      },
    ],
  },
};

const DEFAULT_STORYBOARD: BrandStoryboard = {
  note: "Natural light, komposisi bersih, aksen netral",
  images: [
    {
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=320&h=320&q=80",
      alt: "Meja kerja kreatif dengan laptop",
    },
    {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=320&h=320&q=80",
      alt: "Ruang kerja dengan partisi kaca",
    },
    {
      src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=320&h=320&q=80",
      alt: "Meja kerja dengan kopi dan alat tulis",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=320&h=320&q=80",
      alt: "Tangan bekerja di depan laptop",
    },
  ],
};

function getAspect(format?: ContentIdea["format"]) {
  if (format === "Video Panjang") return "16:9";
  if (format === "Carousel" || format === "Single Image") return "4:5";
  return "9:16";
}

function firstKeyPoint(keyPoints?: string) {
  if (!keyPoints) return null;
  const firstLine = keyPoints
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);
  return firstLine ?? null;
}

const ORDINALS = ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"];

function asSentence(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function spokenSteps(keyPoints?: string) {
  if (!keyPoints) return null;
  const items = keyPoints
    .split("\n")
    .map((line) => line.replace(/^\s*\d+[.)]\s*/, "").trim())
    .filter(Boolean);
  if (!items.length) return null;
  return items
    .map((item, index) => {
      const label = ORDINALS[index] ?? "Lalu";
      const spoken = item.charAt(0).toLowerCase() + item.slice(1);
      return `${label}, ${spoken}${/[.!?]$/.test(spoken) ? "" : "."}`;
    })
    .join(" ");
}

function spokenCta(cta?: string) {
  if (!cta) return null;
  return asSentence(cta.replace(/^save\s*&\s*share/i, "Simpan dan bagikan"));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildFrames(
  idea: Partial<ContentIdea> | null | undefined,
  images: FrameImage[],
): StoryboardFrame[] {
  const hook = idea?.hook?.trim();
  const hookFollowUp = hook?.endsWith("?")
    ? "Kalau iya, kamu nggak sendirian. Banyak orang ngerasain hal yang sama, dan penyebabnya sering lebih sederhana dari yang kita kira."
    : "Kedengarannya sederhana, tapi banyak orang justru melewatkan bagian ini.";
  return [
    {
      id: "hook",
      time: "0–3 dtk",
      label: "Hook",
      title: "Buka dengan pertanyaan",
      description:
        idea?.hook ??
        "Tampilkan masalah yang paling relatable di 3 detik pertama, langsung ke visual inti.",
      voTitle:
        hook ??
        "Pernah nggak sih, kamu udah berusaha tapi hasilnya belum berubah?",
      voDescription: hookFollowUp,
      shot: "Close-up",
      camera: "Handheld",
      audio: "VO + musik",
      status: "current",
      tone: "accent",
      image: images[0],
    },
    {
      id: "problem",
      time: "3–8 dtk",
      label: "Masalah",
      title: "Perlihatkan masalahnya",
      description:
        idea?.angle ??
        "Visualkan kebiasaan yang bikin hasilnya kurang maksimal. Pakai split screen atau before-after.",
      voTitle: "Masalahnya bukan karena kamu kurang usaha.",
      voDescription: idea?.audienceProblem
        ? `${asSentence(idea.audienceProblem)} Sering kali ada satu kebiasaan kecil yang bikin semua usaha jadi kurang maksimal.`
        : "Sering kali ada satu kebiasaan kecil yang bikin semua usaha jadi kurang maksimal.",
      shot: "Medium shot",
      camera: "Static",
      audio: "SFX ringan",
      status: "warning",
      tone: "warning",
      image: images[1],
    },
    {
      id: "solution",
      time: "8–18 dtk",
      label: "Solusi",
      title: "Tunjukkan cara benar",
      description:
        firstKeyPoint(idea?.keyPoints) ??
        "Pecah solusi jadi 3 langkah singkat. Satu langkah, satu shot, supaya mudah diikuti.",
      voTitle: "Coba cek lagi tiga hal ini.",
      voDescription:
        spokenSteps(idea?.keyPoints) ??
        "Pertama, pilih satu langkah kecil yang paling gampang. Kedua, lakukan konsisten tiap hari. Ketiga, cek hasilnya seminggu sekali.",
      shot: "Top-down",
      camera: "Slow push-in",
      audio: "VO + musik",
      status: "success",
      tone: "success",
      image: images[2],
    },
    {
      id: "cta",
      time: "18–25 dtk",
      label: "CTA",
      title: "Tutup dengan ajakan",
      description:
        idea?.cta ??
        "Akhiri dengan CTA yang jelas dan satu gerakan saja. Beri ruang untuk teks di layar.",
      voTitle: "Kalau ini relate, simpan videonya sekarang.",
      voDescription:
        spokenCta(idea?.cta) ??
        "Simpan dan bagikan ke teman yang juga lagi berusaha di hal yang sama. Sampai ketemu di video berikutnya!",
      shot: "Close-up",
      camera: "Static",
      audio: "Musik fade out",
      status: "default",
      tone: "default",
      image: images[3],
    },
  ];
}

function StoryboardHeading({
  compact,
  note,
}: {
  compact?: boolean;
  note: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Clapperboard className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground">
          Konsep Visual / Story Board
        </h3>
        <p className="text-[11px] text-muted">
          {compact ? `Template preview · ${note}` : `Acuan visual: ${note}`}
        </p>
      </div>
    </div>
  );
}

function FrameMeta({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
      <span className="text-muted/80">{icon}</span>
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </span>
  );
}

function FrameThumb({ src, alt }: FrameImage) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-secondary">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center text-muted">
          <ImageIcon className="h-4 w-4" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export interface ConceptStoryboardProps {
  idea?: Partial<ContentIdea> | null;
  compact?: boolean;
  showScriptVoTabs?: boolean;
  className?: string;
}

function StoryboardTimeline({
  frames,
  mode,
  className = "",
}: {
  frames: StoryboardFrame[];
  mode: "concept" | "vo";
  className?: string;
}) {
  return (
    <div className={className}>
      <Timeline axis="start" size="md" density="compact">
        {frames.map((frame, index) => (
          <Timeline.Item key={frame.id} status={frame.status}>
            <Timeline.Rail>
              <Timeline.Marker>
                <span className="tabular-nums">{index + 1}</span>
              </Timeline.Marker>
              <Timeline.Connector />
            </Timeline.Rail>
            <Timeline.Content>
              <div className="rounded-xl border border-border bg-surface-secondary/40 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip size="sm" variant="soft" color={frame.tone}>
                    {frame.time}
                  </Chip>
                  <span className="text-[11px] font-medium text-muted">
                    {frame.label}
                  </span>
                  <span className="text-[11px] text-muted">
                    {frame.shot}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <FrameThumb src={frame.image.src} alt={frame.image.alt} />

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                      {mode === "vo" ? frame.voTitle : frame.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted">
                      {mode === "vo" ? frame.voDescription : frame.description}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <FrameMeta
                    icon={<Camera className="h-3 w-3" />}
                    label="Kamera"
                    value={frame.camera}
                  />
                  <FrameMeta
                    icon={<Music2 className="h-3 w-3" />}
                    label="Audio"
                    value={frame.audio}
                  />
                </div>
              </div>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}

export function ConceptStoryboard({
  idea,
  compact = false,
  showScriptVoTabs = false,
  className = "",
}: ConceptStoryboardProps) {
  const storyboard = BRAND_STORYBOARD[idea?.brand ?? ""] ?? DEFAULT_STORYBOARD;
  const frames = buildFrames(idea, storyboard.images);
  const aspect = getAspect(idea?.format);
  const formatLabel = idea?.format ?? "Reels/Short";

  const storyboardName = `storyboard-${(idea?.id ?? "konsep").toLowerCase()}`;
  const [exportOpen, setExportOpen] = useState(false);

  const exportMarkdown = () => {
    const lines = [
      `# Konsep Visual / Storyboard — ${idea?.title ?? "Storyboard"}`,
      "",
      `**Brand:** ${idea?.brand ?? "-"} · **Format:** ${formatLabel} · ${frames.length} frame · 25 detik · ${aspect}`,
      "",
      ...frames.flatMap((frame, index) => [
        `## Frame ${index + 1} · ${frame.time} · ${frame.label}`,
        "",
        `**Konsep:** ${frame.title}`,
        "",
        frame.description,
        "",
        `**VO:** ${frame.voTitle}`,
        "",
        frame.voDescription,
        "",
        `**Shot:** ${frame.shot} · **Kamera:** ${frame.camera} · **Audio:** ${frame.audio}`,
        "",
      ]),
    ];
    downloadBlob(
      new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" }),
      `${storyboardName}.md`,
    );
  };

  const exportPdf = () => {
    const frameSections = frames
      .map(
        (frame, index) => `
          <section class="frame">
            <p class="frame-caption">Frame ${index + 1} · ${escapeHtml(frame.time)} · ${escapeHtml(frame.label)}</p>
            <h2>${escapeHtml(frame.title)}</h2>
            <p>${escapeHtml(frame.description)}</p>
            <h2>${escapeHtml(frame.voTitle)}</h2>
            <p>${escapeHtml(frame.voDescription)}</p>
            <p class="note">Shot: ${escapeHtml(frame.shot)} · Kamera: ${escapeHtml(frame.camera)} · Audio: ${escapeHtml(frame.audio)}</p>
          </section>`,
      )
      .join("");

    const html = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(idea?.title ?? "Storyboard")}</title>
<style>
  @page { margin: 20mm; }
  body { margin: 0; color: #18181b; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  h1 { margin: 0 0 4px; font-size: 20px; }
  h2 { margin: 0 0 4px; font-size: 13px; }
  p { margin: 0 0 6px; font-size: 12px; line-height: 1.6; }
  .meta { margin: 0 0 18px; color: #71717a; font-size: 11px; }
  .frame { padding: 10px 0; }
  .frame + .frame { margin-top: 6px; }
  .frame-caption { margin: 0 0 6px; color: #71717a; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
  .note { color: #52525b; font-size: 11px; }
</style>
</head>
<body>
  <h1>${escapeHtml(idea?.title ?? "Konsep Visual / Storyboard")}</h1>
  <p class="meta">${escapeHtml(idea?.brand ?? "-")} · ${escapeHtml(formatLabel)} · ${frames.length} frame · 25 detik · ${escapeHtml(aspect)}</p>
  ${frameSections}
</body>
</html>`;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText =
      "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      window.setTimeout(() => iframe.remove(), 1000);
    };
    document.body.appendChild(iframe);
    iframe.srcdoc = html;
  };

  return (
    <Card className={`overflow-hidden p-0 ${className}`}>
      {showScriptVoTabs ? (
        <Tabs defaultSelectedKey="concept" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-secondary/30 px-5 py-4">
            <StoryboardHeading compact={compact} note={storyboard.note} />
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="sm" variant="soft" color="accent">{formatLabel}</Chip>
              <span className="text-[11px] text-muted">4 frame · 25 detik · {aspect}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
            <Tabs.ListContainer className="w-fit">
              <Tabs.List
                aria-label="Tampilan storyboard"
                className="w-max! min-w-0!"
              >
                <Tabs.Tab id="concept" className="w-auto!">
                  Konsep
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="vo" className="w-auto!">
                  Script VO
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <ButtonGroup>
              <Dropdown isOpen={exportOpen} onOpenChange={setExportOpen}>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Dropdown.Popover placement="bottom end" className="min-w-[240px]">
                  <Dropdown.Menu
                    onAction={(key) => {
                      if (key === "pdf") exportPdf();
                      else exportMarkdown();
                    }}
                  >
                    <Dropdown.Item id="md" textValue="Export .md">
                      <div className="flex h-8 items-start justify-center pt-px">
                        <FileCode2 className="size-4 shrink-0 text-muted" />
                      </div>
                      <div className="flex flex-col">
                        <Label>Export .md</Label>
                        <Description>File Markdown, siap diedit ulang</Description>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item id="pdf" textValue="Export PDF">
                      <div className="flex h-8 items-start justify-center pt-px">
                        <FileDown className="size-4 shrink-0 text-muted" />
                      </div>
                      <div className="flex flex-col">
                        <Label>Export PDF</Label>
                        <Description>Dokumen siap cetak dan dibagikan</Description>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
              <Button
                variant="secondary"
                size="sm"
                isIconOnly
                aria-label="Pilih format export"
                onPress={() => setExportOpen(true)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
          <Tabs.Panel id="concept">
            <StoryboardTimeline
              frames={frames}
              mode="concept"
              className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-3"
            />
          </Tabs.Panel>
          <Tabs.Panel id="vo">
            <StoryboardTimeline
              frames={frames}
              mode="vo"
              className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-3"
            />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3 bg-surface-secondary/30 px-5 py-4">
            <StoryboardHeading compact={compact} note={storyboard.note} />
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="sm" variant="soft" color="accent">{formatLabel}</Chip>
              <span className="text-[11px] text-muted">4 frame · 25 detik · {aspect}</span>
            </div>
          </div>
          <StoryboardTimeline frames={frames} mode="concept" className="p-4 sm:p-5" />
        </>
      )}
    </Card>
  );
}
