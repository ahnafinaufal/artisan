import { useState, type ReactNode } from "react";
import { Card, Chip } from "@heroui/react";
import {
  AlertTriangle,
  Camera,
  Check,
  Clapperboard,
  Image as ImageIcon,
  Music2,
  Send,
  Sparkles,
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
  shot: string;
  camera: string;
  audio: string;
  status: "default" | "current" | "success" | "warning";
  tone: FrameTone;
  icon: typeof Sparkles;
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

function buildFrames(
  idea: Partial<ContentIdea> | null | undefined,
  images: FrameImage[],
): StoryboardFrame[] {
  return [
    {
      id: "hook",
      time: "0–3 dtk",
      label: "Hook",
      title: "Buka dengan pertanyaan",
      description:
        idea?.hook ??
        "Tampilkan masalah yang paling relatable di 3 detik pertama, langsung ke visual inti.",
      shot: "Close-up",
      camera: "Handheld",
      audio: "VO + musik",
      status: "current",
      tone: "accent",
      icon: Sparkles,
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
      shot: "Medium shot",
      camera: "Static",
      audio: "SFX ringan",
      status: "warning",
      tone: "warning",
      icon: AlertTriangle,
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
      shot: "Top-down",
      camera: "Slow push-in",
      audio: "VO + musik",
      status: "success",
      tone: "success",
      icon: Check,
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
      shot: "Close-up",
      camera: "Static",
      audio: "Musik fade out",
      status: "default",
      tone: "default",
      icon: Send,
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
  className?: string;
}

export function ConceptStoryboard({
  idea,
  compact = false,
  className = "",
}: ConceptStoryboardProps) {
  const storyboard = BRAND_STORYBOARD[idea?.brand ?? ""] ?? DEFAULT_STORYBOARD;
  const frames = buildFrames(idea, storyboard.images);
  const aspect = getAspect(idea?.format);
  const formatLabel = idea?.format ?? "Reels/Short";

  return (
    <Card className={`overflow-hidden p-0 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
        <StoryboardHeading compact={compact} note={storyboard.note} />
        <div className="flex flex-wrap items-center gap-2">
          <Chip size="sm" variant="soft" color="accent">
            {formatLabel}
          </Chip>
          <span className="text-[11px] text-muted">
            4 frame · 25 detik · {aspect}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <Timeline axis="start" size="md" density="compact">
          {frames.map((frame) => {
            const Icon = frame.icon;
            return (
              <Timeline.Item key={frame.id} status={frame.status}>
                <Timeline.Rail>
                  <Timeline.Marker>
                    <Icon className="h-3.5 w-3.5" />
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
                          {frame.title}
                        </p>
                        <p className="text-xs leading-relaxed text-muted">
                          {frame.description}
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
            );
          })}
        </Timeline>
      </div>
    </Card>
  );
}
