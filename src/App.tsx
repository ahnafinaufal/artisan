import { useEffect, useState } from "react";
import { Drawer, Toast } from "@heroui/react";
import {
  AccordionShowcaseSection,
  AlertDialogShowcaseSection,
  AlertShowcaseSection,
  AutocompleteShowcaseSection,
  AvatarGroupShowcaseSection,
  AvatarShowcaseSection,
  BadgeShowcaseSection,
  BarChartShowcaseSection,
  BreadcrumbsShowcaseSection,
  ButtonGroupShowcaseSection,
  ButtonShowcaseSection,
  CalendarShowcaseSection,
  CardShowcaseSection,
  ChartsShowcaseSection,
  CheckboxGroupShowcaseSection,
  CheckboxShowcaseSection,
  ChipShowcaseSection,
  CloseButtonShowcaseSection,
  ColorAreaShowcaseSection,
  ColorFieldShowcaseSection,
  ColorPickerShowcaseSection,
  ColorSliderShowcaseSection,
  ColorSwatchPickerShowcaseSection,
  ColorSwatchShowcaseSection,
  ComboBoxShowcaseSection,
  ComponentCatalogSection,
  ComponentDetailSection,
  DataGridShowcaseSection,
  DateFieldShowcaseSection,
  DatePickerShowcaseSection,
  DateRangePickerShowcaseSection,
  DescriptionShowcaseSection,
  DisclosureGroupShowcaseSection,
  DisclosureShowcaseSection,
  DrawerShowcaseSection,
  DropdownShowcaseSection,
  EmptyStateShowcaseSection,
  ErrorMessageShowcaseSection,
  FieldErrorShowcaseSection,
  FieldsetShowcaseSection,
  FormShowcaseSection,
  InputGroupShowcaseSection,
  InputOTPShowcaseSection,
  InputShowcaseSection,
  InteractivePlayground,
  ItemCardShowcaseSection,
  KanbanShowcaseSection,
  KbdShowcaseSection,
  KpiShowcaseSection,
  LabelShowcaseSection,
  LineChartShowcaseSection,
  LinkShowcaseSection,
  ListBoxShowcaseSection,
  MeterShowcaseSection,
  ModalShowcaseSection,
  NavbarHeader,
  NumberFieldShowcaseSection,
  PaginationShowcaseSection,
  PopoverShowcaseSection,
  ProgressBarShowcaseSection,
  ProgressCircleShowcaseSection,
  RadioGroupShowcaseSection,
  RangeCalendarShowcaseSection,
  ScrollShadowShowcaseSection,
  SearchFieldShowcaseSection,
  SelectShowcaseSection,
  SeparatorShowcaseSection,
  SheetShowcaseSection,
  Sidebar,
  SkeletonShowcaseSection,
  SliderShowcaseSection,
  SpinnerShowcaseSection,
  SurfaceShowcaseSection,
  SwitchShowcaseSection,
  TableShowcaseSection,
  TabsShowcaseSection,
  TagGroupShowcaseSection,
  TeamTableCard,
  TextAreaShowcaseSection,
  TextFieldShowcaseSection,
  TimeFieldShowcaseSection,
  TimelineShowcaseSection,
  ToastShowcaseSection,
  ToggleButtonGroupShowcaseSection,
  ToggleButtonShowcaseSection,
  ToolbarShowcaseSection,
  TooltipShowcaseSection,
  TypographyShowcaseSection,
  type ActiveSection,
} from "./components/organisms";
import type { AtomicLevel, ComponentCategory } from "./data/componentsCatalog";

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<ActiveSection>("catalog");
  const [selectedComponentName, setSelectedComponentName] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<"all" | AtomicLevel>("all");
  const [selectedCategory, setSelectedCategory] = useState<"all" | ComponentCategory>("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("heroui-theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("heroui-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Jika user mengetik di search bar, otomatis tampilkan katalog komponen
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && activeSection !== "catalog") {
      setActiveSection("catalog");
    }
  };

  const breadcrumbs = [
    {
      label: "Home",
      onPress: () => setActiveSection("overview"),
    },
    {
      label: "Design System",
      onPress: () => {
        setActiveSection("catalog");
        setSelectedCategory("all");
        setSelectedLevel("all");
      },
    },
    ...(activeSection === "overview"
      ? [{ label: "Atomic Overview" }]
      : activeSection === "playground"
        ? [{ label: "Interactive Playground" }]
        : activeSection === "alert"
          ? [{ label: "Alert" }]
          : activeSection === "avatar"
          ? [{ label: "Avatar" }]
          : activeSection === "avatar-group"
            ? [{ label: "AvatarGroup" }]
            : activeSection === "badge"
              ? [{ label: "Badge" }]
              : activeSection === "button"
                ? [{ label: "Button" }]
                : activeSection === "button-group"
                  ? [{ label: "ButtonGroup" }]
                  : activeSection === "checkbox"
                  ? [{ label: "Checkbox" }]
                  : activeSection === "checkbox-group"
                    ? [{ label: "CheckboxGroup" }]
                    : activeSection === "close-button"
                  ? [{ label: "CloseButton" }]
                    : activeSection === "toggle-button"
                      ? [{ label: "ToggleButton" }]
                      : activeSection === "toggle-button-group"
                        ? [{ label: "ToggleButtonGroup" }]
                        : activeSection === "slider"
                          ? [{ label: "Slider" }]
                          : activeSection === "meter"
                            ? [{ label: "Meter" }]
                            : activeSection === "progress-bar"
                              ? [{ label: "ProgressBar" }]
                              : activeSection === "progress-circle"
                                ? [{ label: "ProgressCircle" }]
                                : activeSection === "scroll-shadow"
                                  ? [{ label: "ScrollShadow" }]
                                  : activeSection === "skeleton"
                                    ? [{ label: "Skeleton" }]
                                    : activeSection === "spinner"
                                      ? [{ label: "Spinner" }]
                                      : activeSection === "card"
                                        ? [{ label: "Card" }]
                                        : activeSection === "kbd"
                                          ? [{ label: "Kbd" }]
                                          : activeSection === "separator"
                                            ? [{ label: "Separator" }]
                                            : activeSection === "surface"
                                              ? [{ label: "Surface" }]
                                              : activeSection === "toolbar"
                                                ? [{ label: "Toolbar" }]
                                                : activeSection === "typography"
                                                  ? [{ label: "Typography" }]
                                                  : activeSection === "accordion"
                                                    ? [{ label: "Accordion" }]
                                                    : activeSection === "breadcrumbs"
                                                      ? [{ label: "Breadcrumbs" }]
                                                      : activeSection === "disclosure"
                                                        ? [{ label: "Disclosure" }]
                                                        : activeSection === "disclosure-group"
                                                          ? [{ label: "DisclosureGroup" }]
                                                          : activeSection === "link"
                                                            ? [{ label: "Link" }]
                                                            : activeSection === "pagination"
                                                              ? [{ label: "Pagination" }]
                                                              : activeSection === "alert-dialog"
                                                                ? [{ label: "AlertDialog" }]
                                                                : activeSection === "drawer"
                                                                  ? [{ label: "Drawer" }]
                                                                  : activeSection === "dropdown"
                                                                    ? [{ label: "Dropdown" }]
                                                                    : activeSection === "list-box"
                                                                      ? [{ label: "ListBox" }]
                                                                      : activeSection === "modal"
                                                                        ? [{ label: "Modal" }]
                                                                        : activeSection === "popover"
                                                                          ? [{ label: "Popover" }]
                                                                          : activeSection === "sheet"
                                                                            ? [{ label: "Sheet" }]
                                                                            : activeSection === "tag-group"
                                                                              ? [{ label: "TagGroup" }]
                                                                              : activeSection === "toast"
                                                                                ? [{ label: "Toast" }]
                                                                                : activeSection === "tooltip"
                                                                                  ? [{ label: "Tooltip" }]
                                                                                  : activeSection === "description"
                                                                                    ? [{ label: "Description" }]
                                                                                    : activeSection === "error-message"
                                                                                      ? [{ label: "ErrorMessage" }]
                                                                                      : activeSection === "field-error"
                                                                                        ? [{ label: "FieldError" }]
                                                                                        : activeSection === "fieldset"
                                                                                          ? [{ label: "Fieldset" }]
                                                                                          : activeSection === "form"
                                                                                            ? [{ label: "Form" }]
                                                                                            : activeSection === "input"
                                                                                              ? [{ label: "Input" }]
                                                                                              : activeSection === "input-group"
                                                                                                ? [{ label: "InputGroup" }]
                                                                                                : activeSection === "input-otp"
                                                                                                  ? [{ label: "InputOTP" }]
                                                                                                  : activeSection === "label"
                                                                                                    ? [{ label: "Label" }]
                                                                                                    : activeSection === "number-field"
                                                                                                      ? [{ label: "NumberField" }]
                                                                                                      : activeSection === "radio-group"
                                                                                                        ? [{ label: "RadioGroup" }]
                                                                                                        : activeSection === "search-field"
                                                                                                          ? [{ label: "SearchField" }]
                                                                                                          : activeSection === "text-area"
                                                                                                            ? [{ label: "TextArea" }]
                                                                                                            : activeSection === "text-field"
                                                                                                              ? [{ label: "TextField" }]
                                                                                                              : activeSection === "autocomplete"
                                                                                                                ? [{ label: "Autocomplete" }]
                                                                                                                : activeSection === "combo-box"
                                                                                                                  ? [{ label: "ComboBox" }]
                                                                                                                  : activeSection === "select"
                                                                                                                    ? [{ label: "Select" }]
                                                                                                                    : activeSection === "calendar"
                                                                                                                      ? [{ label: "Calendar" }]
                                                                                                                      : activeSection === "date-field"
                                                                                                                        ? [{ label: "DateField" }]
                                                                                                                        : activeSection === "date-picker"
                                                                                                                          ? [{ label: "DatePicker" }]
                                                                                                                          : activeSection === "date-range-picker"
                                                                                                                            ? [{ label: "DateRangePicker" }]
                                                                                                                            : activeSection === "range-calendar"
                                                                                                                              ? [{ label: "RangeCalendar" }]
                                                                                                                                                             : activeSection === "time-field"
                                                                                                                                ? [{ label: "TimeField" }]
                                                                                                                                : activeSection === "color-area"
                                                                                                                                  ? [{ label: "ColorArea" }]
                                                                                                                                  : activeSection === "color-field"
                                                                                                                                    ? [{ label: "ColorField" }]
                                                                                                                                    : activeSection === "color-picker"
                                                                                                                                      ? [{ label: "ColorPicker" }]
                                                                                                                                      : activeSection === "color-slider"
                                                                                                                                        ? [{ label: "ColorSlider" }]
                                                                                                                                        : activeSection === "color-swatch"
                                                                                                                                          ? [{ label: "ColorSwatch" }]
                                                                                                                                          : activeSection === "color-swatch-picker"
                                                                                                                                            ? [{ label: "ColorSwatchPicker" }]
                                                                                                                                            : activeSection === "switch"
                            ? [{ label: "Switch" }]
                            : activeSection === "data-grid"
                        ? [{ label: "DataGrid" }]
                        : activeSection === "empty-state"
                          ? [{ label: "EmptyState" }]
                          : activeSection === "item-card"
                            ? [{ label: "ItemCard" }]
                            : activeSection === "kanban"
                              ? [{ label: "Kanban" }]
                              : activeSection === "table"
                                ? [{ label: "Table" }]
                                : activeSection === "tabs"
                                  ? [{ label: "Tabs" }]
                                  : activeSection === "timeline"
                                  ? [{ label: "Timeline" }]
          : activeSection === "kpi" || activeSection.startsWith("chart-")
          ? [
              {
                label: "Charts & KPI",
                onPress: () => setActiveSection("kpi"),
              },
              {
                label:
                  activeSection === "kpi"
                    ? "KPI"
                    : activeSection === "chart-area"
                      ? "AreaChart"
                      : activeSection === "chart-bar"
                        ? "BarChart"
                        : activeSection === "chart-line"
                          ? "LineChart"
                          : activeSection === "chart-composed"
                            ? "ComposedChart"
                            : activeSection === "chart-pie"
                              ? "PieChart"
                              : activeSection === "chart-radar"
                                ? "RadarChart"
                                : activeSection === "chart-radial"
                                  ? "RadialChart"
                                  : "ChartTooltip",
              },
            ]
          : [
              {
                label: "Components",
                onPress: () => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                },
              },
              ...(selectedCategory !== "all"
                ? [{ label: selectedCategory }]
                : selectedLevel !== "all"
                  ? [
                      {
                        label:
                          selectedLevel === "atom"
                            ? "Atoms"
                            : selectedLevel === "molecule"
                              ? "Molecules"
                              : "Organisms",
                      },
                    ]
                  : []),
            ]),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toast.Provider placement="bottom end" />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar (Expandable / Collapsible Rail) */}
        <div
          className={[
            "hidden shrink-0 border-r border-border transition-all duration-200 lg:sticky lg:top-0 lg:block lg:h-screen",
            isSidebarCollapsed ? "w-16" : "w-72",
          ].join(" ")}
        >
          <Sidebar
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            selectedComponentName={selectedComponentName}
            onSelectComponent={setSelectedComponentName}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        <Drawer isOpen={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="w-72 p-0">
              <Drawer.Dialog aria-label="Navigasi Sidebar" className="h-full p-0">
                <Sidebar
                  activeSection={activeSection}
                  onSelectSection={setActiveSection}
                  selectedComponentName={selectedComponentName}
                  onSelectComponent={setSelectedComponentName}
                  selectedLevel={selectedLevel}
                  onSelectLevel={setSelectedLevel}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onItemNavigate={() => setIsMobileSidebarOpen(false)}
                />
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        {/* Main Workspace */}
        <div className="flex min-w-0 flex-1 flex-col">
          <NavbarHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            isDark={isDark}
            onToggleDark={setIsDark}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebarCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            breadcrumbs={breadcrumbs}
          />

          <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-8 sm:px-6">
            {activeSection === "overview" ? <TeamTableCard /> : null}
            {activeSection === "playground" ? <InteractivePlayground /> : null}
            {activeSection === "alert" ? <AlertShowcaseSection /> : null}
            {activeSection === "avatar" ? <AvatarShowcaseSection /> : null}
            {activeSection === "avatar-group" ? <AvatarGroupShowcaseSection /> : null}
            {activeSection === "badge" ? <BadgeShowcaseSection /> : null}
            {activeSection === "button" ? <ButtonShowcaseSection /> : null}
            {activeSection === "button-group" ? <ButtonGroupShowcaseSection /> : null}
            {activeSection === "checkbox" ? <CheckboxShowcaseSection /> : null}
            {activeSection === "checkbox-group" ? <CheckboxGroupShowcaseSection /> : null}
            {activeSection === "chip" ? <ChipShowcaseSection /> : null}
            {activeSection === "close-button" ? <CloseButtonShowcaseSection /> : null}
            {activeSection === "component-detail" && selectedComponentName ? (
              <ComponentDetailSection
                componentName={selectedComponentName}
                onBackToCatalog={() => setActiveSection("catalog")}
              />
            ) : null}
            {activeSection === "toggle-button" ? <ToggleButtonShowcaseSection /> : null}
            {activeSection === "toggle-button-group" ? (
              <ToggleButtonGroupShowcaseSection />
            ) : null}
            {activeSection === "slider" ? <SliderShowcaseSection /> : null}
            {activeSection === "meter" ? <MeterShowcaseSection /> : null}
            {activeSection === "progress-bar" ? <ProgressBarShowcaseSection /> : null}
            {activeSection === "progress-circle" ? <ProgressCircleShowcaseSection /> : null}
            {activeSection === "scroll-shadow" ? <ScrollShadowShowcaseSection /> : null}
            {activeSection === "skeleton" ? <SkeletonShowcaseSection /> : null}
            {activeSection === "spinner" ? <SpinnerShowcaseSection /> : null}
            {activeSection === "card" ? <CardShowcaseSection /> : null}
            {activeSection === "kbd" ? <KbdShowcaseSection /> : null}
            {activeSection === "separator" ? <SeparatorShowcaseSection /> : null}
            {activeSection === "surface" ? <SurfaceShowcaseSection /> : null}
            {activeSection === "toolbar" ? <ToolbarShowcaseSection /> : null}
            {activeSection === "typography" ? <TypographyShowcaseSection /> : null}
            {activeSection === "accordion" ? <AccordionShowcaseSection /> : null}
            {activeSection === "breadcrumbs" ? <BreadcrumbsShowcaseSection /> : null}
            {activeSection === "disclosure" ? <DisclosureShowcaseSection /> : null}
            {activeSection === "disclosure-group" ? (
              <DisclosureGroupShowcaseSection />
            ) : null}
            {activeSection === "link" ? <LinkShowcaseSection /> : null}
            {activeSection === "pagination" ? <PaginationShowcaseSection /> : null}
            {activeSection === "alert-dialog" ? <AlertDialogShowcaseSection /> : null}
            {activeSection === "drawer" ? <DrawerShowcaseSection /> : null}
            {activeSection === "dropdown" ? <DropdownShowcaseSection /> : null}
            {activeSection === "list-box" ? <ListBoxShowcaseSection /> : null}
            {activeSection === "modal" ? <ModalShowcaseSection /> : null}
            {activeSection === "popover" ? <PopoverShowcaseSection /> : null}
            {activeSection === "sheet" ? <SheetShowcaseSection /> : null}
            {activeSection === "tag-group" ? <TagGroupShowcaseSection /> : null}
            {activeSection === "toast" ? <ToastShowcaseSection /> : null}
            {activeSection === "tooltip" ? <TooltipShowcaseSection /> : null}
            {activeSection === "description" ? <DescriptionShowcaseSection /> : null}
            {activeSection === "error-message" ? <ErrorMessageShowcaseSection /> : null}
            {activeSection === "field-error" ? <FieldErrorShowcaseSection /> : null}
            {activeSection === "fieldset" ? <FieldsetShowcaseSection /> : null}
            {activeSection === "form" ? <FormShowcaseSection /> : null}
            {activeSection === "input" ? <InputShowcaseSection /> : null}
            {activeSection === "input-group" ? <InputGroupShowcaseSection /> : null}
            {activeSection === "input-otp" ? <InputOTPShowcaseSection /> : null}
            {activeSection === "label" ? <LabelShowcaseSection /> : null}
            {activeSection === "number-field" ? <NumberFieldShowcaseSection /> : null}
            {activeSection === "radio-group" ? <RadioGroupShowcaseSection /> : null}
            {activeSection === "search-field" ? <SearchFieldShowcaseSection /> : null}
            {activeSection === "text-area" ? <TextAreaShowcaseSection /> : null}
            {activeSection === "text-field" ? <TextFieldShowcaseSection /> : null}
            {activeSection === "autocomplete" ? <AutocompleteShowcaseSection /> : null}
            {activeSection === "combo-box" ? <ComboBoxShowcaseSection /> : null}
            {activeSection === "select" ? <SelectShowcaseSection /> : null}
            {activeSection === "calendar" ? <CalendarShowcaseSection /> : null}
            {activeSection === "date-field" ? <DateFieldShowcaseSection /> : null}
            {activeSection === "date-picker" ? <DatePickerShowcaseSection /> : null}
            {activeSection === "date-range-picker" ? (
              <DateRangePickerShowcaseSection />
            ) : null}
            {activeSection === "range-calendar" ? <RangeCalendarShowcaseSection /> : null}
            {activeSection === "time-field" ? <TimeFieldShowcaseSection /> : null}
            {activeSection === "color-area" ? <ColorAreaShowcaseSection /> : null}
            {activeSection === "color-field" ? <ColorFieldShowcaseSection /> : null}
            {activeSection === "color-picker" ? <ColorPickerShowcaseSection /> : null}
            {activeSection === "color-slider" ? <ColorSliderShowcaseSection /> : null}
            {activeSection === "color-swatch" ? <ColorSwatchShowcaseSection /> : null}
            {activeSection === "color-swatch-picker" ? (
              <ColorSwatchPickerShowcaseSection />
            ) : null}
            {activeSection === "switch" ? <SwitchShowcaseSection /> : null}
            {activeSection === "data-grid" ? <DataGridShowcaseSection /> : null}
            {activeSection === "empty-state" ? <EmptyStateShowcaseSection /> : null}
            {activeSection === "item-card" ? <ItemCardShowcaseSection /> : null}
            {activeSection === "kanban" ? <KanbanShowcaseSection /> : null}
            {activeSection === "table" ? <TableShowcaseSection /> : null}
            {activeSection === "tabs" ? <TabsShowcaseSection /> : null}
            {activeSection === "timeline" ? <TimelineShowcaseSection /> : null}
            {activeSection === "kpi" ? <KpiShowcaseSection /> : null}
            {activeSection === "chart-area" ? <ChartsShowcaseSection view="area" /> : null}
            {activeSection === "chart-bar" ? <BarChartShowcaseSection /> : null}
            {activeSection === "chart-line" ? <LineChartShowcaseSection /> : null}
            {activeSection === "chart-composed" ? (
              <ChartsShowcaseSection view="composed" />
            ) : null}
            {activeSection === "chart-pie" ? <ChartsShowcaseSection view="pie" /> : null}
            {activeSection === "chart-radar" ? <ChartsShowcaseSection view="radar" /> : null}
            {activeSection === "chart-radial" ? (
              <ChartsShowcaseSection view="radial" />
            ) : null}
            {activeSection === "chart-tooltip" ? (
              <ChartsShowcaseSection view="tooltip" />
            ) : null}
            {activeSection === "catalog" ? (
              <ComponentCatalogSection
                searchQuery={searchQuery}
                selectedLevel={selectedLevel}
                onSelectLevel={setSelectedLevel}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenComponent={setActiveSection}
              />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
