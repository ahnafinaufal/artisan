import { useEffect, useMemo, useState } from "react";
import { AlertDialog, Button, Chip, toast } from "@heroui/react";
import { COLUMNS_CONFIG, INITIAL_IDEAS } from "./mockData";
import type {
  ColumnKey,
  ContentIdea,
  IdeaFilters,
  IdeaStatus,
  Priority,
  SummaryCardKey,
  UserRole,
} from "./types";
import {
  compareIdeas,
  isNearTargetDate,
  matchesPeriod,
} from "./utils";
import { SummaryCards } from "./components/SummaryCards";
import { IdeaToolbar } from "./components/IdeaToolbar";
import {
  IdeaTable,
  type SortDirection,
} from "./components/IdeaTable";
import { IdeaDetailDrawer } from "./components/IdeaDetailDrawer";
import { CreateIdeaPage } from "./CreateIdeaPage";
import { IdeaDetailPage } from "./IdeaDetailPage";

const DEFAULT_FILTERS: IdeaFilters = {
  search: "",
  brand: "all",
  platform: "all",
  format: "all",
  pillar: "all",
  status: "all",
  priority: "all",
  pic: "all",
  campaign: "all",
  period: "all",
  nearTargetOnly: false,
};

// Tampilkan semua kolom secara default
const DEFAULT_COLUMNS: ColumnKey[] = COLUMNS_CONFIG.map((c) => c.key);

export interface BankIdePageProps {
  mode?: "list" | "create" | "edit" | "view";
  onModeChange?: (mode: "list" | "create" | "edit" | "view", id?: string) => void;
}

export function BankIdePage({ mode, onModeChange }: BankIdePageProps = {}) {
  const [ideas, setIdeas] = useState<ContentIdea[]>(INITIAL_IDEAS);
  const [isLoading, setIsLoading] = useState(true);
  const currentRole: UserRole = "Planner";
  const [view, setView] = useState<"table" | "kanban">("table");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);
  const [filters, setFilters] = useState<IdeaFilters>(DEFAULT_FILTERS);
  const [activeCard, setActiveCard] = useState<SummaryCardKey | null>(null);
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnKey[]>(DEFAULT_COLUMNS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<ColumnKey | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContentIdea | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [viewingIdea, setViewingIdea] = useState<ContentIdea | null>(() => {
    if (typeof window === "undefined") return null;
    const match = window.location.pathname.match(/^\/bank-ide\/view\/(.+)$/);
    if (!match) return null;
    const id = decodeURIComponent(match[1]);
    return INITIAL_IDEAS.find((item) => item.id === id) ?? null;
  });
  const [editingIdea, setEditingIdea] = useState<ContentIdea | null>(() => {
    if (typeof window === "undefined") return null;
    const match = window.location.pathname.match(/^\/bank-ide\/edit\/(.+)$/);
    if (!match) return null;
    const id = decodeURIComponent(match[1]);
    return INITIAL_IDEAS.find((item) => item.id === id) ?? null;
  });
  const [internalPageMode, setInternalPageMode] = useState<"list" | "create" | "edit" | "view">("list");
  const pageMode = mode ?? internalPageMode;
  const setPageMode = (nextMode: "list" | "create" | "edit" | "view", id?: string) => {
    setInternalPageMode(nextMode);
    onModeChange?.(nextMode, id);
  };

  // Summary cards follow brand, platform, and period filters, NOT status
  const scopedForSummary = useMemo(() => {
    return ideas.filter((idea) => {
      if (idea.isArchived) return false;
      if (filters.brand !== "all" && idea.brand !== filters.brand) return false;
      if (
        filters.platform !== "all" &&
        !idea.platforms.includes(filters.platform as ContentIdea["platforms"][number])
      ) {
        return false;
      }
      if (!matchesPeriod(idea.createdAt, filters.period)) return false;
      return true;
    });
  }, [ideas, filters.brand, filters.platform, filters.period]);

  const filteredIdeas = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const list = scopedForSummary.filter((idea) => {
      if (q) {
        const hay = [
          idea.id,
          idea.title,
          idea.hook ?? "",
          ...idea.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.format !== "all" && idea.format !== filters.format) return false;
      if (filters.pillar !== "all" && idea.pillar !== filters.pillar) return false;
      if (filters.status !== "all" && idea.status !== filters.status) return false;
      if (filters.priority !== "all" && idea.priority !== filters.priority)
        return false;
      if (filters.pic !== "all" && idea.pic !== filters.pic) return false;
      if (filters.campaign !== "all" && idea.campaign !== filters.campaign)
        return false;
      if (
        filters.nearTargetOnly &&
        !isNearTargetDate(idea.targetDate, idea.status)
      ) {
        return false;
      }
      return true;
    });

    if (!sortField) return list;
    return [...list].sort((a, b) =>
      compareIdeas(a, b, sortField, sortDirection),
    );
  }, [scopedForSummary, filters, sortField, sortDirection]);

  const handleSelectSummaryCard = (key: SummaryCardKey) => {
    if (activeCard === key) {
      setActiveCard(null);
      setFilters((p) => ({ ...p, status: "all", nearTargetOnly: false }));
      return;
    }
    setActiveCard(key);
    setPage(1);
    if (key === "total") {
      setFilters((p) => ({ ...p, status: "all", nearTargetOnly: false }));
    } else if (key === "review") {
      setFilters((p) => ({ ...p, status: "Diajukan", nearTargetOnly: false }));
    } else if (key === "ready") {
      setFilters((p) => ({ ...p, status: "Disetujui", nearTargetOnly: false }));
    } else if (key === "converted") {
      setFilters((p) => ({
        ...p,
        status: "Jadi Konten",
        nearTargetOnly: false,
      }));
    } else if (key === "near_target") {
      setFilters((p) => ({ ...p, status: "all", nearTargetOnly: true }));
    }
  };

  const handleSaveDrawer = (
    draft: Partial<ContentIdea>,
    targetStatus?: IdeaStatus,
    reason?: string,
  ): { ok: boolean; error?: string } => {
    const now = new Date().toISOString();
    if (editingIdea) {
      const nextStatus = targetStatus ?? editingIdea.status;
      setIdeas((prev) =>
        prev.map((item) =>
          item.id === editingIdea.id
            ? {
                ...item,
                ...draft,
                status: nextStatus,
                statusReason: reason ?? item.statusReason,
                updatedAt: now,
                history: [
                  ...item.history,
                  {
                    id: `h-${Date.now()}`,
                    actor: currentRole,
                    action: targetStatus
                      ? `Mengubah status menjadi ${targetStatus}${reason ? `: ${reason}` : ""}`
                      : "Memperbarui detail ide",
                    timestamp: now,
                  },
                ],
              }
            : item,
        ),
      );
      toast.success(`Ide ${editingIdea.id} diperbarui`);
      return { ok: true };
    }

    const nextNum = ideas.length + 1;
    const id = `IDE-${String(nextNum).padStart(4, "0")}`;
    const newIdea: ContentIdea = {
      id,
      title: draft.title ?? "",
      brand: draft.brand ?? "",
      pillar: draft.pillar,
      platforms: draft.platforms ?? [],
      format: draft.format,
      priority: draft.priority,
      objective: draft.objective,
      campaign: draft.campaign,
      source: draft.source,
      tags: draft.tags ?? [],
      hook: draft.hook,
      angle: draft.angle,
      cta: draft.cta,
      referenceLinks: draft.referenceLinks ?? [],
      pic: draft.pic,
      targetDate: draft.targetDate,
      relevanceScore: draft.relevanceScore,
      impactScore: draft.impactScore,
      easeScore: draft.easeScore,
      status: targetStatus ?? "Draft",
      statusReason: reason,
      isArchived: false,
      createdBy: "Naufal",
      createdAt: now,
      updatedAt: now,
      comments: [],
      history: [
        {
          id: `h-${Date.now()}`,
          actor: currentRole,
          action: `Membuat ide (${targetStatus ?? "Draft"})`,
          timestamp: now,
        },
      ],
    };
    setIdeas((prev) => [newIdea, ...prev]);
    toast.success(`Ide ${id} berhasil ditambahkan`);
    return { ok: true };
  };

  const handleConvert = (idea: ContentIdea) => {
    if (idea.status !== "Disetujui" || idea.linkedContentId) return;
    const now = new Date().toISOString();
    const contentId = `KNT-${String(Math.floor(100 + Math.random() * 900))}`;
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === idea.id
          ? {
              ...item,
              status: "Jadi Konten",
              linkedContentId: contentId,
              updatedAt: now,
              history: [
                ...item.history,
                {
                  id: `h-${Date.now()}`,
                  actor: "Sistem",
                  action: `Dikonversi menjadi Konten ${contentId}`,
                  timestamp: now,
                },
              ],
            }
          : item,
      ),
    );
    toast.success(`Ide ${idea.id} berhasil dikonversi menjadi ${contentId}`);
  };

  const handleDuplicate = (idea: ContentIdea) => {
    const now = new Date().toISOString();
    const id = `IDE-${String(ideas.length + 1).padStart(4, "0")}`;
    const copy: ContentIdea = {
      ...idea,
      id,
      title: `${idea.title} (Salinan)`,
      status: "Draft",
      linkedContentId: undefined,
      createdAt: now,
      updatedAt: now,
      comments: [],
      history: [{ id: `h-${Date.now()}`, actor: currentRole, action: `Duplikat dari ${idea.id}`, timestamp: now }],
    };
    setIdeas((prev) => [copy, ...prev]);
    toast.success(`Ide diduplikasi menjadi ${id}`);
  };

  const handleDelete = (idea: ContentIdea) => {
    setIdeas((prev) => prev.filter((item) => item.id !== idea.id));
    setSelectedIds((prev) => prev.filter((id) => id !== idea.id));
    toast.success(`Ide ${idea.id} dihapus`);
  };

  const handleBulkDelete = () => {
    const count = selectedIds.length;
    setIdeas((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(`${count} ide dihapus`);
  };

  if (pageMode === "view") {
    return (
      <IdeaDetailPage
        idea={viewingIdea}
        currentRole={currentRole}
        onBack={() => {
          setViewingIdea(null);
          setPageMode("list");
        }}
        onEdit={(idea) => {
          setViewingIdea(null);
          setEditingIdea(idea);
          setPageMode("edit", idea.id);
        }}
        onConvert={handleConvert}
        onDuplicate={handleDuplicate}
        onDelete={(idea) => setDeleteTarget(idea)}
        onAddComment={(ideaId, text) => {
          const now = new Date().toISOString();
          setIdeas((prev) =>
            prev.map((item) =>
              item.id === ideaId
                ? {
                    ...item,
                    comments: [
                      ...item.comments,
                      {
                        id: `c-${Date.now()}`,
                        author: "Naufal",
                        role: currentRole,
                        text,
                        createdAt: now,
                      },
                    ],
                  }
                : item,
            ),
          );
          setViewingIdea((prev) =>
            prev && prev.id === ideaId
              ? {
                  ...prev,
                  comments: [
                    ...prev.comments,
                    {
                      id: `c-${Date.now()}`,
                      author: "Naufal",
                      role: currentRole,
                      text,
                      createdAt: now,
                    },
                  ],
                }
              : prev,
          );
        }}
      />
    );
  }

  if (pageMode !== "list") {
    return (
      <CreateIdeaPage
        existingIdeas={ideas}
        currentRole={currentRole}
        initialIdea={editingIdea}
        onBack={() => {
          setEditingIdea(null);
          setPageMode("list");
        }}
        onSave={(draft, targetStatus) => {
          const result = handleSaveDrawer(draft, targetStatus);
          if (result.ok) {
            setFilters(DEFAULT_FILTERS);
            setActiveCard(null);
            setSortField("createdAt");
            setSortDirection("desc");
            setPage(1);
          }
          return result;
        }}
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Bank Ide Konten
            </h1>
            <Chip size="sm" variant="soft" color="accent">
              Artisan
            </Chip>
          </div>
          <p className="mt-1 text-sm text-muted">
            Tangkap, lengkapi, nilai, dan pilih ide konten sebelum masuk tahap produksi.
          </p>
        </div>
      </div>

      {/* 6 Summary Cards */}
      <SummaryCards
        scopedIdeas={scopedForSummary}
        activeCard={activeCard}
        onSelectCard={handleSelectSummaryCard}
      />

      {/* Toolbar, Search, Filter & Bulk Actions */}
      <IdeaToolbar
        totalCount={filteredIdeas.length}
        filters={filters}
        onChangeFilters={(next) => {
          setFilters((p) => ({ ...p, ...next }));
          setPage(1);
        }}
        onResetFilters={() => {
          setFilters(DEFAULT_FILTERS);
          setActiveCard(null);
          setPage(1);
        }}
        visibleColumns={visibleColumns}
        onToggleColumn={(key) => {
          setVisibleColumns((prev) =>
            prev.includes(key)
              ? prev.filter((k) => k !== key)
              : [...prev, key],
          );
        }}
        selectedCount={selectedIds.length}
        onBulkStatus={(status) => {
          setIdeas((prev) =>
            prev.map((i) =>
              selectedIds.includes(i.id) ? { ...i, status } : i,
            ),
          );
          toast.success(`Status ${selectedIds.length} ide diubah ke ${status}`);
          setSelectedIds([]);
        }}
        onBulkPic={(pic) => {
          setIdeas((prev) =>
            prev.map((i) => (selectedIds.includes(i.id) ? { ...i, pic } : i)),
          );
          toast.success(`PIC ${selectedIds.length} ide diubah ke ${pic}`);
          setSelectedIds([]);
        }}
        onBulkPriority={(priority: Priority) => {
          setIdeas((prev) =>
            prev.map((i) =>
              selectedIds.includes(i.id) ? { ...i, priority } : i,
            ),
          );
          toast.success(
            `Prioritas ${selectedIds.length} ide diubah ke ${priority}`,
          );
          setSelectedIds([]);
        }}
        onBulkDelete={() => setBulkDeleteOpen(true)}
        onOpenNewIdea={() => {
          setEditingIdea(null);
          setDrawerOpen(false);
          setPageMode("create");
        }}
        view={view}
        onChangeView={setView}
      />

      {/* Main Table / Kanban */}
      {view === "table" ? (
      <IdeaTable
        ideas={filteredIdeas}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        selectedIds={selectedIds}
        onToggleSelect={(id) =>
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
          )
        }
        onToggleSelectAll={(pageIds) => {
          const allSelected =
            pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
          if (allSelected) {
            setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
          } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
          }
        }}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={(field, direction) => {
          setSortField(field);
          setSortDirection(direction);
          setPage(1);
        }}
        onClearSort={() => {
          setSortField(null);
          setPage(1);
        }}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        onView={(idea) => {
          setViewingIdea(idea);
          setPageMode("view", idea.id);
        }}
        onEdit={(idea) => {
          setEditingIdea(idea);
          setDrawerOpen(false);
          setPageMode("edit", idea.id);
        }}
        onDuplicate={handleDuplicate}
        onConvert={handleConvert}
        onDelete={(idea) => setDeleteTarget(idea)}
      />
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-surface text-sm text-muted">
          Tampilan Kanban (segera hadir)
        </div>
      )}
      {/* Side Drawer Form */}
      <IdeaDetailDrawer
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
        idea={editingIdea}
        existingIdeas={ideas}
        currentRole={currentRole}
        onSave={handleSaveDrawer}
        onAddComment={(ideaId, text) => {
          const now = new Date().toISOString();
          setIdeas((prev) =>
            prev.map((item) =>
              item.id === ideaId
                ? {
                    ...item,
                    comments: [
                      ...item.comments,
                      {
                        id: `c-${Date.now()}`,
                        author: "Naufal",
                        role: currentRole,
                        text,
                        createdAt: now,
                      },
                    ],
                  }
                : item,
            ),
          );
          if (editingIdea?.id === ideaId) {
            setEditingIdea((prev) =>
              prev
                ? {
                    ...prev,
                    comments: [
                      ...prev.comments,
                      {
                        id: `c-${Date.now()}`,
                        author: "Naufal",
                        role: currentRole,
                        text,
                        createdAt: now,
                      },
                    ],
                  }
                : prev,
            );
          }
        }}
        onConvert={handleConvert}
      />

      {/* Alert konfirmasi hapus ide */}
      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Hapus ide ini?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm text-muted">
                  Ide {deleteTarget?.id} akan dihapus permanen dan tidak bisa
                  dikembalikan.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" onPress={() => setDeleteTarget(null)}>
                  Batal
                </Button>
                <Button
                  variant="danger"
                  onPress={() => {
                    if (deleteTarget) handleDelete(deleteTarget);
                    setDeleteTarget(null);
                  }}
                >
                  Hapus
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* Alert konfirmasi hapus massal */}
      <AlertDialog
        isOpen={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Hapus ide terpilih?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm text-muted">
                  {selectedIds.length} ide akan dihapus permanen dan tidak bisa
                  dikembalikan.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" onPress={() => setBulkDeleteOpen(false)}>
                  Batal
                </Button>
                <Button
                  variant="danger"
                  onPress={() => {
                    handleBulkDelete();
                    setBulkDeleteOpen(false);
                  }}
                >
                  Hapus
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

    </section>
  );
}
