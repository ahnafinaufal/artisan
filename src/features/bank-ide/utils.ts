import type {
  ColumnKey,
  ContentIdea,
  IdeaFilters,
  IdeaStatus,
  UserRole,
} from "./types";

export function calculateIdeaScore(idea: Pick<ContentIdea, "relevanceScore" | "impactScore" | "easeScore">): number | null {
  const { relevanceScore, impactScore, easeScore } = idea;
  if (!relevanceScore || !impactScore || !easeScore) return null;
  return Math.round(((relevanceScore + impactScore + easeScore) / 3) * 10) / 10;
}

const sortCollator = new Intl.Collator("id-ID", {
  sensitivity: "base",
  numeric: true,
});

/** Nilai yang dipakai untuk sorting tiap kolom tabel Bank Ide. */
export function getIdeaSortValue(
  idea: ContentIdea,
  field: ColumnKey,
): string | number | null {
  switch (field) {
    case "references":
      return idea.referenceLinks?.length ?? 0;
    case "platforms":
      return idea.platforms.join(", ");
    case "targetDate":
      return idea.targetDate ?? "";
    case "createdAt":
      return idea.createdAt;
    case "updatedAt":
      return idea.updatedAt;
    case "id":
      return idea.id;
    case "title":
      return idea.title;
    case "brand":
      return idea.brand;
    case "pillar":
      return idea.pillar ?? "";
    case "format":
      return idea.format ?? "";
    case "priority":
      return idea.priority ?? "";
    case "pic":
      return idea.pic ?? "";
    case "status":
      return idea.status;
    case "campaign":
      return idea.campaign ?? "";
    case "createdBy":
      return idea.createdBy;
    default:
      return null;
  }
}

/**
 * Comparator generik untuk semua kolom.
 * Teks memakai localeCompare (A-Z / Z-A), angka dibandingkan numerik,
 * dan nilai kosong selalu diletakkan di akhir.
 */
export function compareIdeas(
  a: ContentIdea,
  b: ContentIdea,
  field: ColumnKey,
  direction: "asc" | "desc",
): number {
  const aValue = getIdeaSortValue(a, field);
  const bValue = getIdeaSortValue(b, field);

  const aEmpty = aValue === null || aValue === undefined || aValue === "";
  const bEmpty = bValue === null || bValue === undefined || bValue === "";

  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  let cmp: number;
  if (typeof aValue === "number" && typeof bValue === "number") {
    cmp = aValue - bValue;
  } else {
    cmp = sortCollator.compare(String(aValue), String(bValue));
  }

  return direction === "asc" ? cmp : -cmp;
}

export function isNearTargetDate(targetDate?: string, status?: IdeaStatus): boolean {
  if (!targetDate) return false;
  const activeStatuses: IdeaStatus[] = ["Draft", "Diajukan", "Revisi", "Disetujui"];
  if (status && !activeStatuses.includes(status)) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

export function matchesPeriod(createdAt: string, period: IdeaFilters["period"]): boolean {
  if (period === "all") return true;
  const created = new Date(createdAt);
  const now = new Date();
  if (period === "7d") {
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 7);
    return created >= cutoff;
  }
  if (period === "30d") {
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 30);
    return created >= cutoff;
  }
  if (period === "this_month") {
    return (
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth()
    );
  }
  return true;
}

export function findSimilarTitleInBrand(
  ideas: ContentIdea[],
  title: string,
  brand: string,
  excludeId?: string,
): ContentIdea | undefined {
  const normalized = title.trim().toLowerCase();
  if (normalized.length < 4 || !brand) return undefined;
  return ideas.find(
    (item) =>
      !item.isArchived &&
      item.id !== excludeId &&
      item.brand === brand &&
      (item.title.toLowerCase().includes(normalized) ||
        normalized.includes(item.title.toLowerCase())),
  );
}

export function getAllowedTransitions(
  currentStatus: IdeaStatus,
  role: UserRole,
): IdeaStatus[] {
  const rules: Record<IdeaStatus, Array<{ to: IdeaStatus; roles: UserRole[] }>> = {
    Draft: [{ to: "Diajukan", roles: ["Pengusul", "Planner"] }],
    Diajukan: [
      { to: "Disetujui", roles: ["Approver"] },
      { to: "Revisi", roles: ["Approver"] },
      { to: "Ditunda", roles: ["Approver"] },
      { to: "Ditolak", roles: ["Approver"] },
    ],
    Revisi: [{ to: "Diajukan", roles: ["Pengusul", "Planner"] }],
    Disetujui: [
      { to: "Jadi Konten", roles: ["Planner"] },
      { to: "Ditunda", roles: ["Planner"] },
    ],
    Ditunda: [{ to: "Diajukan", roles: ["Planner"] }],
    Ditolak: [{ to: "Draft", roles: ["Approver"] }],
    "Jadi Konten": [],
  };

  return (rules[currentStatus] || [])
    .filter((rule) => rule.roles.includes(role))
    .map((rule) => rule.to);
}

export function validateForSubmission(idea: Partial<ContentIdea>): string[] {
  const missing: string[] = [];
  if (!idea.title?.trim()) missing.push("Judul Ide");
  if (!idea.brand?.trim()) missing.push("Brand");
  if (!idea.pillar) missing.push("Content Pillar");
  if (!idea.platforms || idea.platforms.length === 0) missing.push("Platform");
  if (!idea.format) missing.push("Format");
  if (!idea.objective) missing.push("Objective");
  if (!idea.hook?.trim()) missing.push("Hook");
  if (!idea.angle?.trim()) missing.push("Angle / Deskripsi");
  if (!idea.pic?.trim()) missing.push("PIC");
  if (!idea.priority) missing.push("Prioritas");
  return missing;
}

export function validateForApproval(idea: Partial<ContentIdea>): string[] {
  const missing: string[] = [];
  if (!idea.relevanceScore) missing.push("Relevansi (1-5)");
  if (!idea.impactScore) missing.push("Potensi Dampak (1-5)");
  if (!idea.easeScore) missing.push("Kemudahan Produksi (1-5)");
  return missing;
}

export function formatShortDate(dateStr?: string): string {
  if (!dateStr) return "–";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "–";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStr?: string): string {
  if (!dateStr) return "–";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "–";
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
