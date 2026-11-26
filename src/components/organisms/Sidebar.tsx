import { useState, type ReactNode } from "react";
import { ScrollShadow, Tabs } from "@heroui/react";
import {
  Activity,
  AreaChart as AreaChartIcon,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Cpu,
  Database,
  FileCode2,
  FormInput,
  Globe,
  Image,
  Layers,
  LayoutGrid,
  Lightbulb,
  LineChart as LineChartIcon,
  ListFilter,
  MessageSquare,
  MousePointerClick,
  Navigation,
  Palette,
  PanelTop,
  PieChart,
  Radar,
  Sliders,
  Sparkles,
  TrendingUp,
  Type,
  Wrench,
} from "lucide-react";
import {
  HEROUI_COMPONENTS,
  type AtomicLevel,
  type ComponentCategory,
} from "../../data/componentsCatalog";
import { StatusChip } from "../atoms";
import { SidebarNavItem } from "../molecules";

export type ActiveSection =
  | "bank-ide"
  | "overview"
  | "playground"
  | "accordion"
  | "alert"
  | "alert-dialog"
  | "autocomplete"
  | "avatar"
  | "avatar-group"
  | "badge"
  | "breadcrumbs"
  | "button"
  | "button-group"
  | "calendar"
  | "card"
  | "checkbox"
  | "checkbox-group"
  | "chip"
  | "close-button"
  | "color-area"
  | "color-field"
  | "color-picker"
  | "color-slider"
  | "color-swatch"
  | "color-swatch-picker"
  | "combo-box"
  | "component-detail"
  | "data-grid"
  | "date-field"
  | "date-picker"
  | "date-range-picker"
  | "description"
  | "disclosure"
  | "disclosure-group"
  | "drawer"
  | "dropdown"
  | "empty-state"
  | "error-message"
  | "field-error"
  | "fieldset"
  | "form"
  | "input"
  | "input-group"
  | "input-otp"
  | "item-card"
  | "kanban"
  | "kbd"
  | "label"
  | "link"
  | "list-box"
  | "meter"
  | "modal"
  | "number-field"
  | "pagination"
  | "popover"
  | "progress-bar"
  | "progress-circle"
  | "radio-group"
  | "range-calendar"
  | "scroll-shadow"
  | "search-field"
  | "select"
  | "separator"
  | "sheet"
  | "skeleton"
  | "slider"
  | "spinner"
  | "surface"
  | "switch"
  | "table"
  | "tabs"
  | "tag-group"
  | "text-area"
  | "text-field"
  | "time-field"
  | "timeline"
  | "toast"
  | "toggle-button"
  | "toggle-button-group"
  | "toolbar"
  | "tooltip"
  | "typography"
  | "catalog"
  | "kpi"
  | "chart-area"
  | "chart-bar"
  | "chart-line"
  | "chart-composed"
  | "chart-pie"
  | "chart-radar"
  | "chart-radial"
  | "chart-tooltip";

export interface SidebarProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  selectedComponentName?: string | null;
  onSelectComponent?: (componentName: string) => void;
  selectedLevel: "all" | AtomicLevel;
  onSelectLevel: (level: "all" | AtomicLevel) => void;
  selectedCategory: "all" | ComponentCategory;
  onSelectCategory: (category: "all" | ComponentCategory) => void;
  isCollapsed?: boolean;
  onItemNavigate?: () => void;
}

const CATEGORY_ICONS: Record<ComponentCategory, ReactNode> = {
  Buttons: <MousePointerClick className="h-4 w-4" />,
  Forms: <FormInput className="h-4 w-4" />,
  "Date and Time": <Calendar className="h-4 w-4" />,
  Navigation: <Navigation className="h-4 w-4" />,
  Overlays: <PanelTop className="h-4 w-4" />,
  Collections: <ListFilter className="h-4 w-4" />,
  Controls: <Sliders className="h-4 w-4" />,
  Feedback: <Bell className="h-4 w-4" />,
  Layout: <LayoutGrid className="h-4 w-4" />,
  Media: <Image className="h-4 w-4" />,
  Pickers: <ChevronDown className="h-4 w-4" />,
  Typography: <Type className="h-4 w-4" />,
  "Data Display": <Database className="h-4 w-4" />,
  Charts: <PieChart className="h-4 w-4" />,
  AI: <Cpu className="h-4 w-4" />,
  Colors: <Palette className="h-4 w-4" />,
  Utilities: <Wrench className="h-4 w-4" />,
};

const CATEGORIES = Object.keys(CATEGORY_ICONS) as ComponentCategory[];

const COMPONENT_SECTION_MAP: Partial<Record<string, ActiveSection>> = {
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
  PieChart: "chart-pie",
  RadarChart: "chart-radar",
  RadialChart: "chart-radial",
  ChartTooltip: "chart-tooltip",
};

const CHART_MENU_ITEMS: Array<{
  id: ActiveSection;
  label: string;
  icon: ReactNode;
}> = [
  { id: "kpi", label: "KPI", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "chart-area", label: "AreaChart", icon: <AreaChartIcon className="h-3.5 w-3.5" /> },
  { id: "chart-bar", label: "BarChart", icon: <BarChart3 className="h-3.5 w-3.5" /> },
  { id: "chart-line", label: "LineChart", icon: <LineChartIcon className="h-3.5 w-3.5" /> },
  { id: "chart-composed", label: "ComposedChart", icon: <Activity className="h-3.5 w-3.5" /> },
  { id: "chart-pie", label: "PieChart", icon: <PieChart className="h-3.5 w-3.5" /> },
  { id: "chart-radar", label: "RadarChart", icon: <Radar className="h-3.5 w-3.5" /> },
  { id: "chart-radial", label: "RadialChart", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "chart-tooltip", label: "ChartTooltip", icon: <MessageSquare className="h-3.5 w-3.5" /> },
];

/**
 * Organism: Sidebar
 * Sidebar navigasi bergaya dokumentasi HeroUI v3 dengan switcher mode Atomic,
 * menu collapsible untuk Component Showcases, Charts & KPI, Atomic Design, dan Categories.
 */
export function Sidebar({
  activeSection,
  onSelectSection,
  selectedComponentName,
  onSelectComponent,
  selectedLevel,
  onSelectLevel,
  selectedCategory,
  onSelectCategory,
  isCollapsed = false,
  onItemNavigate,
}: SidebarProps) {
  const [isChartsOpen, setIsChartsOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Buttons: true,
    "Data Display": true,
    Media: true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleSelectComponentItem = (componentName: string) => {
    const mapped = COMPONENT_SECTION_MAP[componentName];
    if (mapped) {
      onSelectSection(mapped);
    } else {
      onSelectComponent?.(componentName);
      onSelectSection("component-detail");
    }
    onItemNavigate?.();
  };
  const handleSelectSection = (section: ActiveSection) => {
    onSelectSection(section);
    onItemNavigate?.();
  };

  const handleSelectCategory = (category: "all" | ComponentCategory) => {
    onSelectSection("catalog");
    onSelectCategory(category);
    onItemNavigate?.();
  };

  if (isCollapsed) {
    return (
      <aside className="flex h-full w-full flex-col items-center bg-surface/60 py-3">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
          DS
        </div>

        <ScrollShadow className="flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto px-2 pb-4">
          <SidebarNavItem
            isCollapsed
            icon={<Lightbulb className="h-4 w-4" />}
            label="Bank Ide Konten"
            isActive={activeSection === "bank-ide"}
            onClick={() => handleSelectSection("bank-ide")}
          />

          <div className="my-2 h-px w-6 bg-border" />

          <SidebarNavItem
            isCollapsed
            icon={<BookOpen className="h-4 w-4" />}
            label="Atomic Overview"
            isActive={activeSection === "overview"}
            onClick={() => handleSelectSection("overview")}
          />
          <SidebarNavItem
            isCollapsed
            icon={<Sparkles className="h-4 w-4" />}
            label="Interactive Playground"
            isActive={activeSection === "playground"}
            onClick={() => handleSelectSection("playground")}
          />
          <SidebarNavItem
            isCollapsed
            icon={<LayoutGrid className="h-4 w-4" />}
            label="All Components"
            isActive={activeSection === "catalog"}
            onClick={() => {
              onSelectLevel("all");
              handleSelectCategory("all");
            }}
          />

          <div className="my-2 h-px w-6 bg-border" />

          {CHART_MENU_ITEMS.slice(0, 6).map((item) => (
            <SidebarNavItem
              key={item.id}
              isCollapsed
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.id}
              onClick={() => handleSelectSection(item.id)}
            />
          ))}

          <div className="my-2 h-px w-6 bg-border" />

          <SidebarNavItem
            isCollapsed
            icon={<FileCode2 className="h-4 w-4" />}
            label="HeroUI Docs"
            href="https://heroui.com/en/docs/react/components"
            isExternal
          />
        </ScrollShadow>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-full flex-col bg-surface/60">
      {/* Brand + Version */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
            <Layers className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Artisan
          </span>
          <StatusChip variant="soft" color="default" size="sm">
            v3.2.8
          </StatusChip>
        </div>
      </div>

      {/* Mode Switcher: Workspace (fitur) | Components (showcase HeroUI) */}
      <div className="px-4 pb-3">
        <Tabs
          selectedKey={activeSection === "bank-ide" ? "workspace" : "components"}
          onSelectionChange={(key) => {
            handleSelectSection(key === "workspace" ? "bank-ide" : "catalog");
          }}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Sidebar Mode" className="w-full">
              <Tabs.Tab id="workspace" className="flex-1 px-2 text-xs">
                <Lightbulb className="mr-1 h-3.5 w-3.5 shrink-0" />
                Workspace
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="components" className="flex-1 px-2 text-xs">
                <Globe className="mr-1 h-3.5 w-3.5 shrink-0" />
                Components
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>

      {/* Scrollable Navigation Groups */}
      <ScrollShadow className="flex-1 space-y-4 overflow-y-auto px-3 pb-6">
        {activeSection === "bank-ide" ? (
          /* Tab Workspace — hanya fitur-fitur aplikasi */
          <div className="space-y-1">
            <p className="px-2.5 pb-1 text-xs font-medium text-muted">
              Workspace
            </p>
            <SidebarNavItem
              icon={<Lightbulb className="h-4 w-4" />}
              label="Bank Ide Konten"
              isActive={activeSection === "bank-ide"}
              badge="NEW"
              onClick={() => handleSelectSection("bank-ide")}
            />
          </div>
        ) : (
          /* Tab Components — semua kecuali Workspace */
          <>
            {/* Getting Started */}
            <div className="space-y-1">
              <p className="px-2.5 pb-1 text-xs font-medium text-muted">
                Getting Started
              </p>
              <SidebarNavItem
                icon={<BookOpen className="h-4 w-4" />}
                label="Atomic Overview"
                isActive={activeSection === "overview"}
                onClick={() => handleSelectSection("overview")}
              />
              <SidebarNavItem
                icon={<Sparkles className="h-4 w-4" />}
                label="Interactive Playground"
                isActive={activeSection === "playground"}
                badge="LIVE"
                onClick={() => handleSelectSection("playground")}
              />
              <SidebarNavItem
                icon={<LayoutGrid className="h-4 w-4" />}
                label="All Components"
                isActive={
                  activeSection === "catalog" &&
                  selectedCategory === "all" &&
                  selectedLevel === "all"
                }
                badge={HEROUI_COMPONENTS.length}
                onClick={() => {
                  onSelectLevel("all");
                  handleSelectCategory("all");
                }}
              />
            </div>

            {/* Atomic Design Layers */}
            <div className="space-y-1">
              <p className="px-2.5 pb-1 text-xs font-medium text-muted">
                Atomic Design
              </p>
              {(["atom", "molecule", "organism"] as const).map((level) => {
                const count = HEROUI_COMPONENTS.filter((c) => c.atomicLevel === level).length;
                const label =
                  level === "atom"
                    ? "Atoms"
                    : level === "molecule"
                      ? "Molecules"
                      : "Organisms";
                return (
                  <SidebarNavItem
                    key={level}
                    icon={<Layers className="h-4 w-4" />}
                    label={label}
                    isActive={activeSection === "catalog" && selectedLevel === level}
                    badge={count}
                    onClick={() => {
                      onSelectSection("catalog");
                      onSelectCategory("all");
                      onSelectLevel(level);
                      onItemNavigate?.();
                    }}
                  />
                );
              })}
            </div>

            {/* Component Categories (flat, sejajar tanpa child indent) */}
            <div className="space-y-1">
              <p className="px-2.5 pb-1 text-xs font-medium text-muted">
                Categories
              </p>
              {CATEGORIES.map((category) => {
                if (category === "Charts") {
                  return (
                    <div key={category} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setIsChartsOpen((prev) => !prev)}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                      >
                        <span className="flex items-center gap-2.5">
                          <PieChart className="h-4 w-4" />
                          <span>Charts &amp; KPI</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="rounded bg-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted">
                            PRO
                          </span>
                          {isChartsOpen ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </button>

                      {isChartsOpen ? (
                        <div className="ml-3 space-y-0.5 border-l border-border pl-2">
                          {CHART_MENU_ITEMS.map((item) => (
                            <SidebarNavItem
                              key={item.id}
                              icon={item.icon}
                              label={item.label}
                              isActive={activeSection === item.id}
                              onClick={() => handleSelectSection(item.id)}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                const categoryComponents = HEROUI_COMPONENTS.filter(
                  (c) => c.category === category,
                );
                const isOpen = Boolean(openCategories[category]);

                return (
                  <div key={category} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                    >
                      <span className="flex items-center gap-2.5">
                        {CATEGORY_ICONS[category]}
                        <span>{category}</span>
                      </span>
                      {isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {isOpen ? (
                      <div className="ml-3 space-y-0.5 border-l border-border pl-2">
                        {categoryComponents.map((comp) => {
                          const mappedSection = COMPONENT_SECTION_MAP[comp.name];
                          const isActive = mappedSection
                            ? activeSection === mappedSection
                            : activeSection === "component-detail" &&
                              selectedComponentName === comp.name;
                          return (
                            <SidebarNavItem
                              key={comp.name}
                              icon={CATEGORY_ICONS[category]}
                              label={comp.name}
                              badge={comp.isPro ? "PRO" : undefined}
                              isActive={isActive}
                              onClick={() => handleSelectComponentItem(comp.name)}
                            />
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* External Resources */}
            <div className="space-y-1">
              <p className="px-2.5 pb-1 text-xs font-medium text-muted">
                Resources
              </p>
              <SidebarNavItem
                icon={<FileCode2 className="h-4 w-4" />}
                label="HeroUI Docs"
                href="https://heroui.com/en/docs/react/components"
                isExternal
              />
            </div>
          </>
        )}
      </ScrollShadow>
    </aside>
  );
}
