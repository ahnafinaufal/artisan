import type {
  ContentFormat,
  ContentPillar,
  IdeaSource,
  Objective,
  Platform,
  Priority,
} from "./types";

/**
 * Opsi form ide konten.
 * Dipakai bersama oleh IdeaDetailDrawer dan CreateIdeaPage agar urutan
 * serta nilai pilihan tetap konsisten.
 */
export const PILLARS: ContentPillar[] = [
  "Edukasi",
  "Hiburan",
  "Promosi",
  "Interaksi",
];

export const PLATFORMS: Platform[] = ["Instagram", "TikTok", "YouTube"];

export const FORMATS: ContentFormat[] = [
  "Reels/Short",
  "Carousel",
  "Single Image",
  "Story",
  "Video Panjang",
];

export const OBJECTIVES: Objective[] = [
  "Awareness",
  "Engagement",
  "Traffic",
  "Konversi",
];

export const PRIORITIES: Priority[] = ["Tinggi", "Sedang", "Rendah"];

export const SOURCES: IdeaSource[] = [
  "Tim",
  "Klien",
  "Tren",
  "Kompetitor",
  "Komentar audiens",
];
