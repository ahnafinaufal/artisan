import { useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  Input,
  ListBox,
  Popover,
  Select,
  Tooltip,
} from "@heroui/react";
import {
  Trash2,
  Columns3,
  Filter,
  Kanban,
  Plus,
  RotateCcw,
  Search,
  Table as TableIcon,
} from "lucide-react";
import { BRANDS, CAMPAIGNS, COLUMNS_CONFIG, PICS } from "../mockData";
import type {
  ColumnKey,
  IdeaFilters,
  IdeaStatus,
  PeriodFilter,
  Priority,
} from "../types";

interface IdeaToolbarProps {
  totalCount: number;
  filters: IdeaFilters;
  onChangeFilters: (next: Partial<IdeaFilters>) => void;
  onResetFilters: () => void;
  visibleColumns: ColumnKey[];
  onToggleColumn: (key: ColumnKey) => void;
  selectedCount: number;
  onBulkStatus: (status: IdeaStatus) => void;
  onBulkPic: (pic: string) => void;
  onBulkPriority: (priority: Priority) => void;
  onBulkDelete: () => void;
  onOpenNewIdea: () => void;
  view: "table" | "kanban";
  onChangeView: (view: "table" | "kanban") => void;
}

const STATUSES: IdeaStatus[] = [
  "Draft",
  "Diajukan",
  "Revisi",
  "Disetujui",
  "Ditunda",
  "Ditolak",
  "Jadi Konten",
];

const FORMATS = [
  "Reels/Short",
  "Carousel",
  "Single Image",
  "Story",
  "Video Panjang",
];
const PILLARS = ["Edukasi", "Hiburan", "Promosi", "Interaksi"];
const PRIORITIES: Priority[] = ["Tinggi", "Sedang", "Rendah"];

export function IdeaToolbar({
  totalCount,
  filters,
  onChangeFilters,
  onResetFilters,
  visibleColumns,
  onToggleColumn,
  selectedCount,
  onBulkStatus,
  onBulkPic,
  onBulkPriority,
  onBulkDelete,
  onOpenNewIdea,
  view,
  onChangeView,
}: IdeaToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount =
    [
      filters.brand,
      filters.platform,
      filters.format,
      filters.pillar,
      filters.status,
      filters.priority,
      filters.pic,
      filters.campaign,
      filters.period,
    ].filter((v) => v && v !== "all").length + (filters.nearTargetOnly ? 1 : 0);

  const hasAnyFilter = activeFilterCount > 0 || Boolean(filters.search.trim());

  return (
    <div className="space-y-3">
      {/* Baris 1: Judul Daftar + Count Badge (kiri) & Tambah Ide (kanan) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Daftar Ide
          </h2>
          <Chip size="sm" variant="soft" color="default">
            {totalCount}
          </Chip>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="rounded-full px-4"
          onPress={onOpenNewIdea}
        >
          Tambah Ide
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Baris 2: Search + Pill Filter Controls sejajar horizontal */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            fullWidth
            className="pl-9"
            placeholder="Cari ID, judul, hook, atau tag..."
            value={filters.search}
            onChange={(e) => onChangeFilters({ search: e.target.value })}
          />
        </div>

        {/* Pill: Columns */}
        <Popover>
          <Button variant="secondary" size="sm" className="rounded-full">
            <Columns3 className="h-3.5 w-3.5" />
            Columns
          </Button>
          <Popover.Content className="w-80 p-3.5">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">
                Tampilkan Kolom
              </p>
              <span className="text-[11px] text-muted">
                {visibleColumns.length}/{COLUMNS_CONFIG.length} aktif
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {COLUMNS_CONFIG.map((col) => {
                const checked = visibleColumns.includes(col.key);
                return (
                  <Checkbox
                    key={col.key}
                    isSelected={checked}
                    onChange={() => onToggleColumn(col.key)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                      <span className="truncate text-xs text-foreground">
                        {col.label}
                      </span>
                    </Checkbox.Content>
                  </Checkbox>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>

        {/* Pill: Filter Lanjutan */}
        <Button
          variant="secondary"
          size="sm"
          className={`rounded-full ${
            showFilters || activeFilterCount > 0
              ? "ring-1 ring-accent/50 text-accent"
              : ""
          }`}
          onPress={() => setShowFilters((p) => !p)}
        >
          <Filter className="h-3.5 w-3.5" />
          Filter
          {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </Button>

        {hasAnyFilter ? (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-muted hover:text-foreground"
            onPress={onResetFilters}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        ) : null}

        {/* Toggle view: Tabel / Kanban — paling kanan, sejajar di bawah tombol Tambah Ide */}
        <div className="ml-auto flex items-center rounded-full border border-border bg-surface p-0.5">
          <Tooltip delay={0}>
            <Button
              isIconOnly
              size="sm"
              variant={view === "table" ? "secondary" : "ghost"}
              className="h-7 w-7 rounded-full"
              aria-label="Tampilan Tabel"
              onPress={() => onChangeView("table")}
            >
              <TableIcon className="h-3.5 w-3.5" />
            </Button>
            <Tooltip.Content>Tampilan Tabel</Tooltip.Content>
          </Tooltip>
          <Tooltip delay={0}>
            <Button
              isIconOnly
              size="sm"
              variant={view === "kanban" ? "secondary" : "ghost"}
              className="h-7 w-7 rounded-full"
              aria-label="Tampilan Kanban"
              onPress={() => onChangeView("kanban")}
            >
              <Kanban className="h-3.5 w-3.5" />
            </Button>
            <Tooltip.Content>Tampilan Kanban</Tooltip.Content>
          </Tooltip>
        </div>
      </div>

      {/* Baris 3: Collapsible Filter Grid Lanjutan */}
      {showFilters ? (
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-3 lg:grid-cols-5">
          <FilterSelect
            label="Brand"
            value={filters.brand}
            options={BRANDS}
            onChange={(v) => onChangeFilters({ brand: v })}
          />
          <FilterSelect
            label="Format"
            value={filters.format}
            options={FORMATS}
            onChange={(v) => onChangeFilters({ format: v })}
          />
          <FilterSelect
            label="Content Pillar"
            value={filters.pillar}
            options={PILLARS}
            onChange={(v) => onChangeFilters({ pillar: v })}
          />
          <FilterSelect
            label="Prioritas"
            value={filters.priority}
            options={PRIORITIES}
            onChange={(v) => onChangeFilters({ priority: v })}
          />
          <FilterSelect
            label="PIC"
            value={filters.pic}
            options={PICS}
            onChange={(v) => onChangeFilters({ pic: v })}
          />
          <FilterSelect
            label="Campaign"
            value={filters.campaign}
            options={CAMPAIGNS}
            onChange={(v) => onChangeFilters({ campaign: v })}
          />
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-muted">
              Periode
            </span>
            <Select
              variant="secondary"
              aria-label="Periode"
              selectedKey={filters.period}
              onSelectionChange={(k) =>
                onChangeFilters({ period: String(k) as PeriodFilter })
              }
            >
              <Select.Trigger className="h-9 text-xs">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="all" textValue="Semua Periode">
                    Semua Periode
                  </ListBox.Item>
                  <ListBox.Item id="7d" textValue="7 Hari Terakhir">
                    7 Hari Terakhir
                  </ListBox.Item>
                  <ListBox.Item id="30d" textValue="30 Hari Terakhir">
                    30 Hari Terakhir
                  </ListBox.Item>
                  <ListBox.Item id="this_month" textValue="Bulan Ini">
                    Bulan Ini
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-full"
              onPress={onResetFilters}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filter
            </Button>
          </div>
        </div>
      ) : null}

      {/* Baris 4: Bulk Actions Bar */}
      {selectedCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/40 bg-accent/5 px-3 py-2">
          <span className="text-xs font-medium text-foreground">
            {selectedCount} ide dipilih
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown>
              <Button size="sm" variant="secondary">
                Ubah Status
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => onBulkStatus(String(key) as IdeaStatus)}
                >
                  {STATUSES.map((s) => (
                    <Dropdown.Item key={s} id={s} textValue={s}>
                      {s}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Dropdown>
              <Button size="sm" variant="secondary">
                Ubah PIC
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => onBulkPic(String(key))}>
                  {PICS.map((p) => (
                    <Dropdown.Item key={p} id={p} textValue={p}>
                      {p}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Dropdown>
              <Button size="sm" variant="secondary">
                Ubah Prioritas
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => onBulkPriority(String(key) as Priority)}
                >
                  {PRIORITIES.map((pr) => (
                    <Dropdown.Item key={pr} id={pr} textValue={pr}>
                      {pr}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Button size="sm" variant="danger-soft" onPress={onBulkDelete}>
              <Trash2 className="h-3.5 w-3.5" />
              Hapus
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="block text-[11px] font-medium text-muted">{label}</span>
      <Select
        variant="secondary"
        aria-label={label}
        selectedKey={value}
        onSelectionChange={(k) => onChange(String(k))}
      >
        <Select.Trigger className="h-9 text-xs">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="all" textValue={`Semua ${label}`}>
              Semua {label}
            </ListBox.Item>
            {options.map((opt) => (
              <ListBox.Item key={opt} id={opt} textValue={opt}>
                {opt}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
