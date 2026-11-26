export type AtomicLevel = "atom" | "molecule" | "organism";

export type ComponentCategory =
  | "Buttons"
  | "Forms"
  | "Date and Time"
  | "Navigation"
  | "Overlays"
  | "Collections"
  | "Controls"
  | "Feedback"
  | "Layout"
  | "Media"
  | "Pickers"
  | "Typography"
  | "Data Display"
  | "Charts"
  | "AI"
  | "Colors"
  | "Utilities";

export interface HeroComponentItem {
  name: string;
  category: ComponentCategory;
  atomicLevel: AtomicLevel;
  description: string;
  href: string;
  isPro?: boolean;
}

const DOCS_BASE = "https://heroui.com";

export const HEROUI_COMPONENTS: HeroComponentItem[] = [
  // Buttons
  {
    name: "Button",
    category: "Buttons",
    atomicLevel: "atom",
    description: "A clickable button component with multiple variants and states",
    href: `${DOCS_BASE}/en/docs/react/components/button`,
  },
  {
    name: "ButtonGroup",
    category: "Buttons",
    atomicLevel: "molecule",
    description: "Group related buttons together with consistent styling and spacing",
    href: `${DOCS_BASE}/en/docs/react/components/button-group`,
  },
  {
    name: "CloseButton",
    category: "Buttons",
    atomicLevel: "atom",
    description: "Button component for closing dialogs, modals, or dismissing content",
    href: `${DOCS_BASE}/en/docs/react/components/close-button`,
  },
  {
    name: "EmojiReactionButton",
    category: "Buttons",
    atomicLevel: "atom",
    description: "An animated emoji reaction button with count display and toggle state",
    href: "https://heroui.pro/docs/react/components/emoji-reaction-button",
    isPro: true,
  },
  {
    name: "ToggleButton",
    category: "Buttons",
    atomicLevel: "atom",
    description: "An interactive toggle control for on/off or selected/unselected states",
    href: `${DOCS_BASE}/en/docs/react/components/toggle-button`,
  },
  {
    name: "ToggleButtonGroup",
    category: "Buttons",
    atomicLevel: "molecule",
    description: "Groups multiple ToggleButtons into a unified control",
    href: `${DOCS_BASE}/en/docs/react/components/toggle-button-group`,
  },

  // Forms
  {
    name: "Checkbox",
    category: "Forms",
    atomicLevel: "atom",
    description: "Allow users to select multiple items or mark an individual item as selected",
    href: `${DOCS_BASE}/en/docs/react/components/checkbox`,
  },
  {
    name: "CheckboxGroup",
    category: "Forms",
    atomicLevel: "molecule",
    description: "A checkbox group component for managing multiple checkbox selections",
    href: `${DOCS_BASE}/en/docs/react/components/checkbox-group`,
  },
  {
    name: "Description",
    category: "Forms",
    atomicLevel: "atom",
    description: "Provides supplementary text for form fields and other components",
    href: `${DOCS_BASE}/en/docs/react/components/description`,
  },
  {
    name: "ErrorMessage",
    category: "Forms",
    atomicLevel: "atom",
    description: "A low-level error message component for displaying errors",
    href: `${DOCS_BASE}/en/docs/react/components/error-message`,
  },
  {
    name: "FieldError",
    category: "Forms",
    atomicLevel: "atom",
    description: "Displays validation error messages for form fields",
    href: `${DOCS_BASE}/en/docs/react/components/field-error`,
  },
  {
    name: "Fieldset",
    category: "Forms",
    atomicLevel: "organism",
    description: "Group related form controls with legends, descriptions, and actions",
    href: `${DOCS_BASE}/en/docs/react/components/fieldset`,
  },
  {
    name: "Form",
    category: "Forms",
    atomicLevel: "organism",
    description: "Wrapper component for form validation and submission handling",
    href: `${DOCS_BASE}/en/docs/react/components/form`,
  },
  {
    name: "Input",
    category: "Forms",
    atomicLevel: "atom",
    description: "Primitive single-line text input component",
    href: `${DOCS_BASE}/en/docs/react/components/input`,
  },
  {
    name: "InputGroup",
    category: "Forms",
    atomicLevel: "molecule",
    description: "Group related input controls with prefix and suffix elements",
    href: `${DOCS_BASE}/en/docs/react/components/input-group`,
  },
  {
    name: "InputOTP",
    category: "Forms",
    atomicLevel: "molecule",
    description: "One-time password input component for verification codes",
    href: `${DOCS_BASE}/en/docs/react/components/input-otp`,
  },
  {
    name: "Label",
    category: "Forms",
    atomicLevel: "atom",
    description: "Renders an accessible label associated with form controls",
    href: `${DOCS_BASE}/en/docs/react/components/label`,
  },
  {
    name: "NumberField",
    category: "Forms",
    atomicLevel: "molecule",
    description: "Number input fields with increment/decrement buttons and validation",
    href: `${DOCS_BASE}/en/docs/react/components/number-field`,
  },
  {
    name: "RadioGroup",
    category: "Forms",
    atomicLevel: "molecule",
    description: "Radio group for selecting a single option from a list",
    href: `${DOCS_BASE}/en/docs/react/components/radio-group`,
  },
  {
    name: "SearchField",
    category: "Forms",
    atomicLevel: "molecule",
    description: "Search input field with clear button and search icon",
    href: `${DOCS_BASE}/en/docs/react/components/search-field`,
  },
  {
    name: "TextArea",
    category: "Forms",
    atomicLevel: "atom",
    description: "Primitive multiline text input component",
    href: `${DOCS_BASE}/en/docs/react/components/text-area`,
  },
  {
    name: "TextField",
    category: "Forms",
    atomicLevel: "molecule",
    description: "Composition-friendly text fields with labels, descriptions, and validation",
    href: `${DOCS_BASE}/en/docs/react/components/text-field`,
  },
  {
    name: "DropZone",
    category: "Forms",
    atomicLevel: "organism",
    description: "Drag-and-drop file upload area with filtering and preview",
    href: "https://heroui.pro/docs/react/components/drop-zone",
    isPro: true,
  },
  {
    name: "RichTextEditor",
    category: "Forms",
    atomicLevel: "organism",
    description: "Composable Tiptap editor with toolbar controls and character count",
    href: "https://heroui.pro/docs/react/components/rich-text-editor",
    isPro: true,
  },

  // Date and Time
  {
    name: "Calendar",
    category: "Date and Time",
    atomicLevel: "organism",
    description: "Composable date picker with month grid, navigation, and year picker",
    href: `${DOCS_BASE}/en/docs/react/components/calendar`,
  },
  {
    name: "DateField",
    category: "Date and Time",
    atomicLevel: "molecule",
    description: "Date input field with labels, descriptions, and validation",
    href: `${DOCS_BASE}/en/docs/react/components/date-field`,
  },
  {
    name: "DatePicker",
    category: "Date and Time",
    atomicLevel: "organism",
    description: "Composable date picker with DateField and Calendar composition",
    href: `${DOCS_BASE}/en/docs/react/components/date-picker`,
  },
  {
    name: "DateRangePicker",
    category: "Date and Time",
    atomicLevel: "organism",
    description: "Composable date range picker with DateField and RangeCalendar",
    href: `${DOCS_BASE}/en/docs/react/components/date-range-picker`,
  },
  {
    name: "RangeCalendar",
    category: "Date and Time",
    atomicLevel: "organism",
    description: "Composable date range calendar with month grid and navigation",
    href: `${DOCS_BASE}/en/docs/react/components/range-calendar`,
  },
  {
    name: "TimeField",
    category: "Date and Time",
    atomicLevel: "molecule",
    description: "Time input field with labels, descriptions, and validation",
    href: `${DOCS_BASE}/en/docs/react/components/time-field`,
  },

  // Navigation
  {
    name: "Accordion",
    category: "Navigation",
    atomicLevel: "organism",
    description: "A collapsible content panel for organizing information in a compact space",
    href: `${DOCS_BASE}/en/docs/react/components/accordion`,
  },
  {
    name: "Breadcrumbs",
    category: "Navigation",
    atomicLevel: "molecule",
    description: "Navigation breadcrumbs showing the current page's location",
    href: `${DOCS_BASE}/en/docs/react/components/breadcrumbs`,
  },
  {
    name: "Disclosure",
    category: "Navigation",
    atomicLevel: "molecule",
    description: "Collapsible section with header trigger button and content panel",
    href: `${DOCS_BASE}/en/docs/react/components/disclosure`,
  },
  {
    name: "DisclosureGroup",
    category: "Navigation",
    atomicLevel: "organism",
    description: "Container managing multiple Disclosure items with coordinated states",
    href: `${DOCS_BASE}/en/docs/react/components/disclosure-group`,
  },
  {
    name: "Link",
    category: "Navigation",
    atomicLevel: "atom",
    description: "A styled anchor component for navigation with built-in icon support",
    href: `${DOCS_BASE}/en/docs/react/components/link`,
  },
  {
    name: "Pagination",
    category: "Navigation",
    atomicLevel: "molecule",
    description: "Page navigation with composable page links, previous/next, and ellipsis",
    href: `${DOCS_BASE}/en/docs/react/components/pagination`,
  },
  {
    name: "Tabs",
    category: "Navigation",
    atomicLevel: "organism",
    description: "Organize content into multiple sections and navigate between them",
    href: `${DOCS_BASE}/en/docs/react/components/tabs`,
  },
  {
    name: "AppLayout",
    category: "Navigation",
    atomicLevel: "organism",
    description: "Scaffold layout composing sidebar, sticky navbar, main, and aside",
    href: "https://heroui.pro/docs/react/components/app-layout",
    isPro: true,
  },
  {
    name: "Navbar",
    category: "Navigation",
    atomicLevel: "organism",
    description: "Composable top navigation bar with hide-on-scroll and mobile menu",
    href: "https://heroui.pro/docs/react/components/navbar",
    isPro: true,
  },
  {
    name: "Sidebar",
    category: "Navigation",
    atomicLevel: "organism",
    description: "Responsive sidebar navigation with collapsible groups and rail mode",
    href: "https://heroui.pro/docs/react/components/sidebar",
    isPro: true,
  },

  // Overlays
  {
    name: "AlertDialog",
    category: "Overlays",
    atomicLevel: "organism",
    description: "Modal dialog for critical confirmations requiring explicit action",
    href: `${DOCS_BASE}/en/docs/react/components/alert-dialog`,
  },
  {
    name: "Drawer",
    category: "Overlays",
    atomicLevel: "organism",
    description: "Slide-out panel for supplementary content and actions",
    href: `${DOCS_BASE}/en/docs/react/components/drawer`,
  },
  {
    name: "Modal",
    category: "Overlays",
    atomicLevel: "organism",
    description: "Dialog overlay for focused user interactions and important content",
    href: `${DOCS_BASE}/en/docs/react/components/modal`,
  },
  {
    name: "Popover",
    category: "Overlays",
    atomicLevel: "molecule",
    description: "Displays rich content in a portal triggered by a button or element",
    href: `${DOCS_BASE}/en/docs/react/components/popover`,
  },
  {
    name: "Sheet",
    category: "Overlays",
    atomicLevel: "organism",
    description: "Swipeable overlay with native scroll snapping and nested sheets",
    href: `${DOCS_BASE}/en/docs/react/components/sheet`,
  },
  {
    name: "Toast",
    category: "Overlays",
    atomicLevel: "molecule",
    description: "Display temporary notifications and messages with automatic dismissal",
    href: `${DOCS_BASE}/en/docs/react/components/toast`,
  },
  {
    name: "Tooltip",
    category: "Overlays",
    atomicLevel: "atom",
    description: "Displays informative text when users hover over or focus on an element",
    href: `${DOCS_BASE}/en/docs/react/components/tooltip`,
  },

  // Collections
  {
    name: "Dropdown",
    category: "Collections",
    atomicLevel: "molecule",
    description: "Displays a list of actions or options that a user can choose",
    href: `${DOCS_BASE}/en/docs/react/components/dropdown`,
  },
  {
    name: "ListBox",
    category: "Collections",
    atomicLevel: "molecule",
    description: "Displays a list of options and allows selecting one or more",
    href: `${DOCS_BASE}/en/docs/react/components/list-box`,
  },
  {
    name: "TagGroup",
    category: "Collections",
    atomicLevel: "molecule",
    description: "Focusable list of tags with keyboard navigation and removal",
    href: `${DOCS_BASE}/en/docs/react/components/tag-group`,
  },

  // Controls
  {
    name: "Slider",
    category: "Controls",
    atomicLevel: "molecule",
    description: "Allows a user to select one or more values within a range",
    href: `${DOCS_BASE}/en/docs/react/components/slider`,
  },
  {
    name: "Switch",
    category: "Controls",
    atomicLevel: "atom",
    description: "A toggle switch component for boolean states",
    href: `${DOCS_BASE}/en/docs/react/components/switch`,
  },

  // Feedback
  {
    name: "Alert",
    category: "Feedback",
    atomicLevel: "molecule",
    description: "Display important messages and notifications with status indicators",
    href: `${DOCS_BASE}/en/docs/react/components/alert`,
  },
  {
    name: "Meter",
    category: "Feedback",
    atomicLevel: "atom",
    description: "Represents a quantity within a known range or fractional value",
    href: `${DOCS_BASE}/en/docs/react/components/meter`,
  },
  {
    name: "ProgressBar",
    category: "Feedback",
    atomicLevel: "atom",
    description: "Shows determinate or indeterminate progress of an operation",
    href: `${DOCS_BASE}/en/docs/react/components/progress-bar`,
  },
  {
    name: "ProgressCircle",
    category: "Feedback",
    atomicLevel: "atom",
    description: "Circular progress indicator for determinate or indeterminate progress",
    href: `${DOCS_BASE}/en/docs/react/components/progress-circle`,
  },
  {
    name: "Skeleton",
    category: "Feedback",
    atomicLevel: "atom",
    description: "Placeholder to show a loading state and expected shape",
    href: `${DOCS_BASE}/en/docs/react/components/skeleton`,
  },
  {
    name: "Spinner",
    category: "Feedback",
    atomicLevel: "atom",
    description: "A loading indicator component to show pending states",
    href: `${DOCS_BASE}/en/docs/react/components/spinner`,
  },

  // Layout
  {
    name: "Card",
    category: "Layout",
    atomicLevel: "molecule",
    description: "Flexible container component for grouping related content and actions",
    href: `${DOCS_BASE}/en/docs/react/components/card`,
  },
  {
    name: "Separator",
    category: "Layout",
    atomicLevel: "atom",
    description: "Visually divide content sections",
    href: `${DOCS_BASE}/en/docs/react/components/separator`,
  },
  {
    name: "Surface",
    category: "Layout",
    atomicLevel: "atom",
    description: "Container providing surface-level styling and context",
    href: `${DOCS_BASE}/en/docs/react/components/surface`,
  },
  {
    name: "Toolbar",
    category: "Layout",
    atomicLevel: "molecule",
    description: "Container for interactive controls with arrow key navigation",
    href: `${DOCS_BASE}/en/docs/react/components/toolbar`,
  },

  // Media
  {
    name: "Avatar",
    category: "Media",
    atomicLevel: "atom",
    description: "Display user profile images with customizable fallback content",
    href: `${DOCS_BASE}/en/docs/react/components/avatar`,
  },
  {
    name: "AvatarGroup",
    category: "Media",
    atomicLevel: "molecule",
    description: "Display a stacked or grid group of avatars with overflow counting",
    href: `${DOCS_BASE}/en/docs/react/components/avatar-group`,
  },

  // Pickers
  {
    name: "Autocomplete",
    category: "Pickers",
    atomicLevel: "organism",
    description: "Combines a select with filtering to search and select options",
    href: `${DOCS_BASE}/en/docs/react/components/autocomplete`,
  },
  {
    name: "ComboBox",
    category: "Pickers",
    atomicLevel: "organism",
    description: "Combines a text input with a listbox to filter options",
    href: `${DOCS_BASE}/en/docs/react/components/combo-box`,
  },
  {
    name: "Select",
    category: "Pickers",
    atomicLevel: "molecule",
    description: "Displays a collapsible list of options to select one",
    href: `${DOCS_BASE}/en/docs/react/components/select`,
  },

  // Typography
  {
    name: "Kbd",
    category: "Typography",
    atomicLevel: "atom",
    description: "Display keyboard shortcuts and key combinations",
    href: `${DOCS_BASE}/en/docs/react/components/kbd`,
  },
  {
    name: "Typography",
    category: "Typography",
    atomicLevel: "atom",
    description: "Semantic typography primitive for headings, body copy, and code",
    href: `${DOCS_BASE}/en/docs/react/components/typography`,
  },

  // Data Display
  {
    name: "Badge",
    category: "Data Display",
    atomicLevel: "atom",
    description: "Small indicator positioned relative to another element",
    href: `${DOCS_BASE}/en/docs/react/components/badge`,
  },
  {
    name: "Chip",
    category: "Data Display",
    atomicLevel: "atom",
    description: "Small informational badges for labels, statuses, and categories",
    href: `${DOCS_BASE}/en/docs/react/components/chip`,
  },
  {
    name: "Table",
    category: "Data Display",
    atomicLevel: "organism",
    description: "Display structured data in rows and columns with sorting and selection",
    href: `${DOCS_BASE}/en/docs/react/components/table`,
  },
  {
    name: "DataGrid",
    category: "Data Display",
    atomicLevel: "organism",
    description: "Advanced data grid with virtualization, resizing, and reorder",
    href: "https://heroui.pro/docs/react/components/data-grid",
    isPro: true,
  },
  {
    name: "KPI",
    category: "Data Display",
    atomicLevel: "molecule",
    description: "Key performance indicator card with trend chip and sparkline",
    href: "https://heroui.pro/docs/react/components/kpi",
    isPro: true,
  },

  // Charts
  {
    name: "AreaChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Area chart for visualizing trends with gradient fills",
    href: "https://heroui.pro/docs/react/components/area-chart",
    isPro: true,
  },
  {
    name: "BarChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Bar chart for comparing categorical data",
    href: "https://heroui.pro/docs/react/components/bar-chart",
    isPro: true,
  },
  {
    name: "ChartTooltip",
    category: "Charts",
    atomicLevel: "molecule",
    description: "Composable tooltip for chart data points with indicators and formatters",
    href: "https://heroui.pro/docs/react/components/chart-tooltip",
    isPro: true,
  },
  {
    name: "ComposedChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Combines bar, line, and area series for multi-metric dashboards",
    href: "https://heroui.pro/docs/react/components/composed-chart",
    isPro: true,
  },
  {
    name: "LineChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Line chart for trend data with multi-series and sparkline support",
    href: "https://heroui.pro/docs/react/components/line-chart",
    isPro: true,
  },
  {
    name: "PieChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Pie and donut chart for proportional data with labels and legends",
    href: "https://heroui.pro/docs/react/components/pie-chart",
    isPro: true,
  },
  {
    name: "RadarChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Radar chart for comparing multivariate data with fill, dots, and series",
    href: "https://heroui.pro/docs/react/components/radar-chart",
    isPro: true,
  },
  {
    name: "RadialChart",
    category: "Charts",
    atomicLevel: "organism",
    description: "Radial chart for gauges, progress rings, and circular data",
    href: "https://heroui.pro/docs/react/components/radial-chart",
    isPro: true,
  },

  // AI
  {
    name: "PromptInput",
    category: "AI",
    atomicLevel: "organism",
    description: "Composable AI prompt composer with attachments and send states",
    href: "https://heroui.pro/docs/react/components/prompt-input",
    isPro: true,
  },
  {
    name: "ChatMessage",
    category: "AI",
    atomicLevel: "molecule",
    description: "Composable user and assistant message layouts for AI chat",
    href: "https://heroui.pro/docs/react/components/chat-message",
    isPro: true,
  },

  // Colors
  {
    name: "ColorArea",
    category: "Colors",
    atomicLevel: "molecule",
    description: "2D color picker to select colors from a gradient area",
    href: `${DOCS_BASE}/en/docs/react/components/color-area`,
  },
  {
    name: "ColorField",
    category: "Colors",
    atomicLevel: "molecule",
    description: "Color input field with labels, descriptions, and validation",
    href: `${DOCS_BASE}/en/docs/react/components/color-field`,
  },
  {
    name: "ColorPicker",
    category: "Colors",
    atomicLevel: "organism",
    description: "Composable color picker synchronizing multiple color components",
    href: `${DOCS_BASE}/en/docs/react/components/color-picker`,
  },
  {
    name: "ColorSlider",
    category: "Colors",
    atomicLevel: "molecule",
    description: "Adjust an individual channel of a color value",
    href: `${DOCS_BASE}/en/docs/react/components/color-slider`,
  },
  {
    name: "ColorSwatch",
    category: "Colors",
    atomicLevel: "atom",
    description: "Visual preview of a color value with accessibility support",
    href: `${DOCS_BASE}/en/docs/react/components/color-swatch`,
  },
  {
    name: "ColorSwatchPicker",
    category: "Colors",
    atomicLevel: "molecule",
    description: "List of color swatches to select from a predefined palette",
    href: `${DOCS_BASE}/en/docs/react/components/color-swatch-picker`,
  },

  // Utilities
  {
    name: "ScrollShadow",
    category: "Utilities",
    atomicLevel: "atom",
    description: "Apply visual shadows to indicate scrollable content overflow",
    href: `${DOCS_BASE}/en/docs/react/components/scroll-shadow`,
  },
];

export const ATOMIC_LEVEL_META: Record<
  AtomicLevel,
  { label: string; subtitle: string; color: "accent" | "success" | "warning" }
> = {
  atom: {
    label: "Atoms",
    subtitle: "Primitif UI terkecil: Button, Input, Chip, Badge, Switch, Avatar, Label",
    color: "accent",
  },
  molecule: {
    label: "Molecules",
    subtitle: "Gabungan beberapa atom: TextField, SearchField, Select, Alert, Card, AvatarGroup",
    color: "success",
  },
  organism: {
    label: "Organisms",
    subtitle: "Bagian UI kompleks & mandiri: Form, Table, Modal, Tabs, Accordion, Navbar",
    color: "warning",
  },
};
