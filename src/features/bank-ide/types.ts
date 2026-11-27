export type IdeaStatus =
  | "Draft"
  | "Diajukan"
  | "Revisi"
  | "Disetujui"
  | "Ditunda"
  | "Ditolak"
  | "Jadi Konten";

export type UserRole = "Pengusul" | "Planner" | "Approver";

export type ContentPillar = "Edukasi" | "Hiburan" | "Promosi" | "Interaksi";

export type Platform = "Instagram" | "TikTok" | "YouTube";

export type ContentFormat =
  | "Reels/Short"
  | "Carousel"
  | "Single Image"
  | "Story"
  | "Video Panjang";

export type Priority = "Tinggi" | "Sedang" | "Rendah";

export type Objective = "Awareness" | "Engagement" | "Traffic" | "Konversi";

export type IdeaSource =
  | "Tim"
  | "Klien"
  | "Tren"
  | "Kompetitor"
  | "Komentar audiens";

export type PeriodFilter = "all" | "7d" | "30d" | "this_month";

export type SummaryCardKey =
  | "total"
  | "review"
  | "ready"
  | "converted"
  | "near_target";

export interface IdeaComment {
  id: string;
  author: string;
  role: UserRole;
  text: string;
  createdAt: string;
}

export interface IdeaHistoryItem {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  brand: string;
  pillar?: ContentPillar;
  platforms: Platform[];
  format?: ContentFormat;
  priority?: Priority;
  objective?: Objective;
  campaign?: string;
  source?: IdeaSource;
  tags: string[];
  persona?: string;
  audienceProblem?: string;
  hook?: string;
  angle?: string;
  keyPoints?: string;
  cta?: string;
  visualConcept?: string;
  draftCaption?: string;
  referenceLinks?: string[];
  referenceNotes?: string;
  pic?: string;
  targetDate?: string; // YYYY-MM-DD
  relevanceScore?: number; // 1-5
  impactScore?: number; // 1-5
  easeScore?: number; // 1-5
  status: IdeaStatus;
  statusReason?: string;
  linkedContentId?: string;
  isArchived: boolean;
  createdBy: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  comments: IdeaComment[];
  history: IdeaHistoryItem[];
}

export type ColumnKey =
  | "id"
  | "title"
  | "brand"
  | "pillar"
  | "platforms"
  | "format"
  | "priority"
  | "targetDate"
  | "pic"
  | "status"
  | "campaign"
  | "references"
  | "createdBy"
  | "createdAt"
  | "updatedAt";

export interface ColumnConfig {
  key: ColumnKey;
  label: string;
  defaultVisible: boolean;
  sortable?: boolean;
}

export interface IdeaFilters {
  search: string;
  brand: string;
  platform: string;
  format: string;
  pillar: string;
  status: string;
  priority: string;
  pic: string;
  campaign: string;
  period: PeriodFilter;
  nearTargetOnly: boolean;
}
