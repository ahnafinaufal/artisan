import { useMemo, useState } from "react";
import { Button, Card, Link, Tabs } from "@heroui/react";
import type { Key } from "@heroui/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ActiveSection } from "./Sidebar";
import {
  ATOMIC_LEVEL_META,
  HEROUI_COMPONENTS,
  type AtomicLevel,
  type ComponentCategory,
} from "../../data/componentsCatalog";
import { Divider, StatusChip } from "../atoms";
import {
  ComponentPreview,
  SelectField,
  StatusAlert,
  type SelectOption,
} from "../molecules";

export interface ComponentCatalogSectionProps {
  searchQuery: string;
  selectedLevel?: "all" | AtomicLevel;
  onSelectLevel?: (level: "all" | AtomicLevel) => void;
  selectedCategory?: "all" | ComponentCategory;
  onSelectCategory?: (category: "all" | ComponentCategory) => void;
  onOpenComponent?: (section: ActiveSection) => void;
}

const DETAIL_SECTION_MAP: Partial<Record<string, ActiveSection>> = {
  ActivityHeatmap: "chart-activity-heatmap",
  Accordion: "accordion",
  Alert: "alert",
  AlertDialog: "alert-dialog",
  Autocomplete: "autocomplete",
  Avatar: "avatar",
  AvatarGroup: "avatar-group",
  Badge: "badge",
  Breadcrumbs: "breadcrumbs",
  Button: "button",
  ButtonGroup: "button-group",
  Calendar: "calendar",
  Card: "card",
  Checkbox: "checkbox",
  CheckboxGroup: "checkbox-group",
  Chip: "chip",
  CloseButton: "close-button",
  ColorArea: "color-area",
  ColorField: "color-field",
  ColorPicker: "color-picker",
  ColorSlider: "color-slider",
  ColorSwatch: "color-swatch",
  ColorSwatchPicker: "color-swatch-picker",
  ComboBox: "combo-box",
  DataGrid: "data-grid",
  DateField: "date-field",
  DatePicker: "date-picker",
  DateRangePicker: "date-range-picker",
  Description: "description",
  Disclosure: "disclosure",
  DisclosureGroup: "disclosure-group",
  Drawer: "drawer",
  Dropdown: "dropdown",
  EmptyState: "empty-state",
  ErrorMessage: "error-message",
  FieldError: "field-error",
  Fieldset: "fieldset",
  Form: "form",
  Input: "input",
  InputGroup: "input-group",
  InputOTP: "input-otp",
  ItemCard: "item-card",
  Kanban: "kanban",
  Kbd: "kbd",
  KPI: "kpi",
  Label: "label",
  Link: "link",
  ListBox: "list-box",
  Meter: "meter",
  Modal: "modal",
  NumberField: "number-field",
  Pagination: "pagination",
  Popover: "popover",
  ProgressBar: "progress-bar",
  ProgressCircle: "progress-circle",
  RadioGroup: "radio-group",
  RangeCalendar: "range-calendar",
  ScrollShadow: "scroll-shadow",
  SearchField: "search-field",
  Select: "select",
  Separator: "separator",
  Sheet: "sheet",
  Skeleton: "skeleton",
  Slider: "slider",
  Spinner: "spinner",
  Surface: "surface",
  Switch: "switch",
  Table: "table",
  Tabs: "tabs",
  TagGroup: "tag-group",
  TextArea: "text-area",
  TextField: "text-field",
  TimeField: "time-field",
  Timeline: "timeline",
  Toast: "toast",
  ToggleButton: "toggle-button",
  ToggleButtonGroup: "toggle-button-group",
  Toolbar: "toolbar",
  Tooltip: "tooltip",
  Typography: "typography",
  AreaChart: "chart-area",
  BarChart: "chart-bar",
  LineChart: "chart-line",
  ComposedChart: "chart-composed",
  DonutChart: "chart-donut",
  Earnings: "chart-earnings",
  FunnelChart: "chart-funnel",
  PieChart: "chart-pie",
  RadarChart: "chart-radar",
  RadialChart: "chart-radial",
  ChartTooltip: "chart-tooltip",
};

const CATEGORIES: ComponentCategory[] = [
  "Buttons",
  "Forms",
  "Date and Time",
  "Navigation",
  "Overlays",
  "Collections",
  "Controls",
  "Feedback",
  "Layout",
  "Media",
  "Pickers",
  "Typography",
  "Data Display",
  "Charts",
  "AI",
  "Colors",
  "Utilities",
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { id: "all", label: "Semua Kategori" },
  ...CATEGORIES.map((cat) => ({ id: cat, label: cat })),
];

/**
 * Organism: ComponentCatalogSection
 * Direktori lengkap komponen HeroUI v3 yang dipetakan ke Atomic Design (Atoms, Molecules, Organisms).
 */
export function ComponentCatalogSection({
  searchQuery,
  selectedLevel: controlledLevel,
  onSelectLevel,
  selectedCategory: controlledCategory,
  onSelectCategory,
  onOpenComponent,
}: ComponentCatalogSectionProps) {
  const [internalLevel, setInternalLevel] = useState<"all" | AtomicLevel>("all");
  const [internalCategory, setInternalCategory] = useState<Key | null>("all");
  const [showProAlert, setShowProAlert] = useState(true);

  const selectedLevel = controlledLevel ?? internalLevel;
  const setSelectedLevel = (val: "all" | AtomicLevel) => {
    setInternalLevel(val);
    onSelectLevel?.(val);
  };

  const selectedCategory = controlledCategory ?? internalCategory;
  const setSelectedCategory = (val: Key | null) => {
    setInternalCategory(val);
    onSelectCategory?.((val ? String(val) : "all") as "all" | ComponentCategory);
  };

  const filteredComponents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HEROUI_COMPONENTS.filter((item) => {
      if (selectedLevel !== "all" && item.atomicLevel !== selectedLevel) {
        return false;
      }
      if (selectedCategory && selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  const isCategoryView = Boolean(selectedCategory && selectedCategory !== "all");

  const renderCardsGrid = () => {
    if (filteredComponents.length === 0) {
      return (
        <Card variant="secondary" className="p-8 text-center">
          <Card.Title>Tidak ada komponen yang cocok</Card.Title>
          <Card.Description>
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </Card.Description>
        </Card>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((comp) => {
          const levelMeta = ATOMIC_LEVEL_META[comp.atomicLevel];
          const detailSection = DETAIL_SECTION_MAP[comp.name];
          return (
            <Card key={comp.name} className="flex flex-col justify-between">
              <Card.Header>
                <div className="flex items-start justify-between gap-2">
                  {detailSection && onOpenComponent ? (
                    <button
                      type="button"
                      onClick={() => onOpenComponent(detailSection)}
                      className="cursor-pointer text-left transition-colors hover:text-accent"
                    >
                      <Card.Title className="text-base">{comp.name}</Card.Title>
                    </button>
                  ) : (
                    <Card.Title className="text-base">{comp.name}</Card.Title>
                  )}
                  <div className="flex items-center gap-1.5">
                    <StatusChip color={levelMeta.color} variant="soft">
                      {levelMeta.label.slice(0, -1)}
                    </StatusChip>
                    {comp.isPro ? (
                      <StatusChip color="default" variant="primary">
                        Pro
                      </StatusChip>
                    ) : null}
                  </div>
                </div>
                <Card.Description className="line-clamp-2">
                  {comp.description}
                </Card.Description>
              </Card.Header>
              <Card.Content className="pt-2">
                <ComponentPreview name={comp.name} isPro={comp.isPro} />
              </Card.Content>
              <Divider className="my-2" />
              <Card.Footer className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted">{comp.category}</span>
                <div className="flex items-center gap-2">
                  {detailSection && onOpenComponent ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs font-medium"
                      onPress={() => onOpenComponent(detailSection)}
                    >
                      Detail <ArrowRight className="h-3 w-3" />
                    </Button>
                  ) : null}
                  <Link
                    href={comp.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium"
                  >
                    Docs <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    );
  };

  if (isCategoryView) {
    return (
      <section id="catalog" className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {String(selectedCategory)}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Daftar komponen HeroUI v3 pada kategori {String(selectedCategory)}.
          </p>
        </div>

        {renderCardsGrid()}
      </section>
    );
  }

  return (
    <section id="catalog" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            All Components (React)
          </h2>
          <p className="mt-1 text-sm text-muted">
            Pemetaan komponen HeroUI v3 ke konsep Atomic Design: Atoms, Molecules, dan Organisms.
          </p>
        </div>
        <SelectField
          className="w-full sm:w-56"
          label="Filter Kategori"
          options={CATEGORY_OPTIONS}
          selectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
        />
      </div>

      {showProAlert ? (
        <StatusAlert
          status="accent"
          title="Free & Pro Components"
          description="Semua komponen gratis dari @heroui/react sudah terpasang di proyek ini. Komponen berlabel Pro berasal dari heroui.pro dan berbagi token tema yang sama."
          onDismiss={() => setShowProAlert(false)}
        />
      ) : null}

      <Tabs
        selectedKey={selectedLevel}
        onSelectionChange={(key) => setSelectedLevel(String(key) as "all" | AtomicLevel)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Atomic Design Levels">
            <Tabs.Tab id="all">
              Semua ({HEROUI_COMPONENTS.length})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="atom">
              Atoms ({HEROUI_COMPONENTS.filter((c) => c.atomicLevel === "atom").length})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="molecule">
              Molecules ({HEROUI_COMPONENTS.filter((c) => c.atomicLevel === "molecule").length})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="organism">
              Organisms ({HEROUI_COMPONENTS.filter((c) => c.atomicLevel === "organism").length})
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        {(["all", "atom", "molecule", "organism"] as const).map((tabId) => (
          <Tabs.Panel key={tabId} id={tabId} className="pt-4">
            {tabId !== "all" ? (
              <p className="mb-4 text-sm text-muted">
                {ATOMIC_LEVEL_META[tabId as AtomicLevel].subtitle}
              </p>
            ) : null}

            {renderCardsGrid()}
          </Tabs.Panel>
        ))}
      </Tabs>
    </section>
  );
}
