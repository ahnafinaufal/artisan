import type { Key, Selection, SortDescriptor } from "@heroui/react";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Dropdown,
  EmptyState,
  Pagination,
  Skeleton,
  Table,
} from "@heroui/react";
import {
  Trash2,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Clapperboard,
  Copy,
  Edit3,
  Eye,
  Film,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Inbox,
  MoreVertical,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { COLUMNS_CONFIG } from "../mockData";
import type {
  ColumnKey,
  ContentFormat,
  ContentIdea,
  IdeaStatus,
  Priority,
} from "../types";
import {
  formatDateTime,
  formatShortDate,
  isNearTargetDate,
} from "../utils";
import { PlatformLogo } from "./PlatformLogo";
import { ReferenceLinksCell } from "./ReferenceLinksCell";

export type SortField = ColumnKey;
export type SortDirection = "asc" | "desc";

/** Key sentinel agar React Aria tidak menandai kolom mana pun sebagai aktif. */
const NO_SORT_COLUMN = "__no_sort__";

interface IdeaTableProps {
  ideas: ContentIdea[];
  isLoading?: boolean;
  visibleColumns: ColumnKey[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (pageIds: string[]) => void;
  sortField: ColumnKey | null;
  sortDirection: SortDirection;
  onSort: (field: ColumnKey, direction: SortDirection) => void;
  onClearSort: () => void;
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onView: (idea: ContentIdea) => void;
  onEdit: (idea: ContentIdea) => void;
  onDuplicate: (idea: ContentIdea) => void;
  onConvert: (idea: ContentIdea) => void;
  onDelete: (idea: ContentIdea) => void;
}

const STATUS_COLOR: Record<
  IdeaStatus,
  "default" | "accent" | "success" | "warning" | "danger"
> = {
  Draft: "default",
  Diajukan: "warning",
  Revisi: "warning",
  Disetujui: "success",
  Ditunda: "default",
  Ditolak: "danger",
  "Jadi Konten": "accent",
};

const PRIORITY_COLOR: Record<Priority, "danger" | "warning" | "default"> = {
  Tinggi: "danger",
  Sedang: "warning",
  Rendah: "default",
};

const FORMAT_ICON: Record<ContentFormat, typeof Clapperboard> = {
  "Reels/Short": Clapperboard,
  Carousel: GalleryHorizontalEnd,
  "Single Image": ImageIcon,
  Story: Smartphone,
  "Video Panjang": Film,
};

/** Avatar gambar gradient (contoh Usage/Sizes docs HeroUI). */
const PIC_IMAGE: Record<string, string> = {
  Naufal: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
  Rania: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
  Dimas: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
  Sinta: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
  Bima: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
};

export function IdeaTable({
  ideas,
  isLoading = false,
  visibleColumns,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  sortField,
  sortDirection,
  onSort,
  onClearSort,
  page,
  pageSize = 10,
  onPageChange,
  onView,
  onEdit,
  onDuplicate,
  onConvert,
  onDelete,
}: IdeaTableProps) {
  const totalPages = Math.max(1, Math.ceil(ideas.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pageIdeas = ideas.slice(startIndex, startIndex + pageSize);
  const pageIds = pageIdeas.map((i) => i.id);

  const activeColumns = COLUMNS_CONFIG.filter((c) =>
    visibleColumns.includes(c.key),
  );

  const allSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  const selectedKeys: Selection = allSelectedOnPage
    ? "all"
    : new Set<Key>(pageIds.filter((id) => selectedIds.includes(id)));

  const sortDescriptor: SortDescriptor = {
    column: sortField ?? NO_SORT_COLUMN,
    direction: sortDirection === "asc" ? "ascending" : "descending",
  };

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      if (!allSelectedOnPage) {
        onToggleSelectAll(pageIds);
      }
      return;
    }
    const nextSet = new Set(Array.from(keys).map(String));
    if (nextSet.size === 0 && allSelectedOnPage) {
      onToggleSelectAll(pageIds);
      return;
    }
    const currentSet = new Set(pageIds.filter((id) => selectedIds.includes(id)));

    for (const id of pageIds) {
      const wasSelected = currentSet.has(id);
      const isNowSelected = nextSet.has(id);
      if (wasSelected !== isNowSelected) {
        onToggleSelect(id);
      }
    }
  };

  const handleSortChange = (descriptor: SortDescriptor) => {
    if (!descriptor.column) return;
    const field = String(descriptor.column) as ColumnKey;
    if (!COLUMNS_CONFIG.some((col) => col.key === field)) return;

    // Siklus: asc -> desc -> reset (tanpa sort).
    if (sortField !== field) {
      onSort(field, "asc");
      return;
    }
    if (sortDirection === "asc") {
      onSort(field, "desc");
      return;
    }
    onClearSort();
  };

  return (
    <div className="space-y-3">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Tabel Bank Ide Konten"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            sortDescriptor={sortDescriptor}
            onSortChange={handleSortChange}
          >
            <Table.Header className="bg-surface-secondary">
              <Table.Column className="w-10 pr-0">
                <Checkbox aria-label="Pilih semua baris" slot="selection">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Column>

              <Table.Column className="w-12 pr-0">No.</Table.Column>

              {activeColumns.map((col) => {
                const isSorted = sortField === col.key;

                return (
                  <Table.Column
                    key={col.key}
                    id={col.key}
                    allowsSorting
                    isRowHeader={col.key === "title"}
                    width={col.key === "title" ? 220 : undefined}
                  >
                    <span className="flex w-full items-center justify-between gap-1">
                      <span className="truncate">{col.label}</span>
                      {isSorted ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 shrink-0 text-foreground" />
                        ) : (
                          <ArrowDown className="h-3 w-3 shrink-0 text-foreground" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 shrink-0 text-muted" />
                      )}
                    </span>
                  </Table.Column>
                );
              })}

              <Table.Column className="w-12 text-end">Aksi</Table.Column>
            </Table.Header>

            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="py-10">
                  <Inbox className="h-8 w-8 text-muted" />
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Belum ada ide konten
                  </p>
                  <p className="text-xs text-muted">
                    Tidak ada ide yang sesuai dengan filter saat ini.
                  </p>
                </EmptyState>
              )}
            >
              {isLoading
                ? Array.from({ length: 6 }, (_, idx) => (
                    <Table.Row key={`skeleton-${idx}`} id={`skeleton-${idx}`}>
                      <Table.Cell className="pr-0">
                        <Skeleton
                          animationType="shimmer"
                          className="size-4 rounded"
                        />
                      </Table.Cell>
                      <Table.Cell className="pr-0">
                        <Skeleton
                          animationType="shimmer"
                          className="h-3 w-4 rounded"
                        />
                      </Table.Cell>
                      {activeColumns.map((col) => (
                        <Table.Cell key={col.key}>
                          <Skeleton
                            animationType="shimmer"
                            className={`h-4 rounded-md ${
                              col.key === "title"
                                ? "w-48"
                                : col.key === "id"
                                  ? "w-16"
                                  : "w-20"
                            }`}
                          />
                        </Table.Cell>
                      ))}
                      <Table.Cell className="text-end">
                        <div className="flex items-center justify-end gap-1">
                          <Skeleton
                            animationType="shimmer"
                            className="size-7 rounded-full"
                          />
                          <Skeleton
                            animationType="shimmer"
                            className="size-7 rounded-full"
                          />
                          <Skeleton
                            animationType="shimmer"
                            className="size-7 rounded-full"
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                : pageIdeas.map((idea, index) => {
                const nearTarget = isNearTargetDate(
                  idea.targetDate,
                  idea.status,
                );

                return (
                  <Table.Row key={idea.id} id={idea.id}>
                    <Table.Cell className="pr-0">
                      <Checkbox
                        aria-label={`Pilih ${idea.id}`}
                        slot="selection"
                        variant="secondary"
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Content>
                      </Checkbox>
                    </Table.Cell>

                    <Table.Cell className="pr-0 text-xs tabular-nums text-muted">
                      {startIndex + index + 1}
                    </Table.Cell>

                    {activeColumns.map((col) => (
                      <Table.Cell key={col.key}>
                        {renderCustomCell(
                          col.key,
                          idea,
                          nearTarget,
                          onView,
                        )}
                      </Table.Cell>
                    ))}

                    <Table.Cell className="text-end">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                          aria-label={`Lihat ${idea.id}`}
                          onPress={() => onView(idea)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                          aria-label={`Edit ${idea.id}`}
                          onPress={() => onEdit(idea)}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Dropdown>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="secondary"
                            className="rounded-full"
                            aria-label={`Aksi lainnya untuk ${idea.id}`}
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                          <Dropdown.Popover placement="bottom end">
                            <Dropdown.Menu
                              onAction={(key) => {
                                const action = String(key);
                                if (action === "duplicate") onDuplicate(idea);
                                if (action === "convert") onConvert(idea);
                                if (action === "delete") onDelete(idea);
                              }}
                            >
                              <Dropdown.Item id="duplicate" textValue="Duplikat">
                                <Copy className="h-3.5 w-3.5" />
                                Duplikat
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="convert"
                                textValue="Jadikan Konten"
                                isDisabled={
                                  idea.status !== "Disetujui" ||
                                  Boolean(idea.linkedContentId)
                                }
                              >
                                <Sparkles className="h-3.5 w-3.5" />
                                Jadikan Konten
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="delete"
                                textValue="Hapus"
                                variant="danger"
                                 className="text-danger"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-danger" />
                                Hapus
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer className="w-full">
          <Pagination size="sm" className="w-full justify-between">
            <Pagination.Summary className="text-xs text-muted">
              Halaman {safePage} dari {totalPages} ({ideas.length} ide)
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={safePage <= 1}
                  onPress={() => onPageChange(Math.max(1, safePage - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === safePage}
                      onPress={() => onPageChange(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={safePage >= totalPages}
                  onPress={() =>
                    onPageChange(Math.min(totalPages, safePage + 1))
                  }
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  );
}

function renderCustomCell(
  key: ColumnKey,
  idea: ContentIdea,
  nearTarget: boolean,
  onView: (idea: ContentIdea) => void,
) {
  switch (key) {
    case "id":
      return (
        <button
          type="button"
          onClick={() => onView(idea)}
          className="cursor-pointer font-mono text-xs font-medium text-accent hover:underline"
        >
          {idea.id}
        </button>
      );
    case "title": {
      const secondary = idea.objective ?? "";
      return (
        <div className="flex max-w-[220px] flex-col">
          <button
            type="button"
            onClick={() => onView(idea)}
            className="cursor-pointer truncate text-left text-xs font-medium text-foreground hover:text-accent"
            title={idea.title}
          >
            {idea.title}
          </button>
          {secondary ? (
            <span className="truncate text-[11px] text-muted" title={secondary}>
              {secondary}
            </span>
          ) : null}
        </div>
      );
    }
    case "brand":
      return (
        <span className="text-xs text-foreground">{idea.brand || "–"}</span>
      );
    case "pillar":
      return (
        <span className="text-xs text-foreground">{idea.pillar ?? "–"}</span>
      );
    case "platforms":
      return idea.platforms.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {idea.platforms.map((p) => (
            <Chip key={p} size="sm" variant="soft" color="default">
              <PlatformLogo platform={p} className="h-3.5 w-3.5" />
              <Chip.Label>{p}</Chip.Label>
            </Chip>
          ))}
        </div>
      ) : (
        <span className="text-xs text-muted">–</span>
      );
    case "format": {
      if (!idea.format) {
        return <span className="text-xs text-muted">–</span>;
      }
      const FormatIcon = FORMAT_ICON[idea.format] ?? Clapperboard;
      return (
        <Chip size="sm" variant="soft" color="default">
          <FormatIcon className="h-3 w-3" />
          <Chip.Label>{idea.format}</Chip.Label>
        </Chip>
      );
    }
    case "priority":
      return idea.priority ? (
        <Chip size="sm" variant="soft" color={PRIORITY_COLOR[idea.priority]}>
          {idea.priority}
        </Chip>
      ) : (
        <span className="text-xs text-muted">–</span>
      );
    case "targetDate":
      return (
        <span
          className={`text-xs ${
            nearTarget ? "font-semibold text-danger" : "text-foreground"
          }`}
        >
          {formatShortDate(idea.targetDate)}
        </span>
      );
    case "pic":
      return idea.pic ? (
        <div className="flex items-center gap-2">
          <Avatar size="sm" className="h-6 w-6 text-[10px]">
            <Avatar.Image alt={idea.pic} src={PIC_IMAGE[idea.pic]} />
            <Avatar.Fallback>
              {idea.pic.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <span className="text-xs text-foreground">{idea.pic}</span>
        </div>
      ) : (
        <span className="text-xs text-muted">–</span>
      );
    case "status":
      return (
        <Chip size="sm" variant="soft" color={STATUS_COLOR[idea.status]}>
          {idea.status}
        </Chip>
      );
    case "campaign":
      return (
        <span className="text-xs text-foreground">{idea.campaign ?? "–"}</span>
      );
    case "references":
      return <ReferenceLinksCell links={idea.referenceLinks ?? []} />;
    case "createdBy":
      return <span className="text-xs text-foreground">{idea.createdBy}</span>;
    case "createdAt":
      return (
        <span className="text-xs text-muted">
          {formatDateTime(idea.createdAt)}
        </span>
      );
    case "updatedAt":
      return (
        <span className="text-xs text-muted">
          {formatDateTime(idea.updatedAt)}
        </span>
      );
    default:
      return <span className="text-xs text-muted">–</span>;
  }
}
