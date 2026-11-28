import {
  CHART_MENU_ITEMS,
  COMPONENT_SECTION_MAP,
  type ActiveSection,
} from "./components/organisms/Sidebar";

export type BankIdeMode = "list" | "create" | "edit" | "view";

export interface AppRoute {
  section: ActiveSection;
  bankIdeMode: BankIdeMode;
  componentName: string | null;
  path: string;
}

const componentSections = new Set<ActiveSection>([
  "catalog",
  "overview",
  "playground",
  ...Object.values(COMPONENT_SECTION_MAP).filter((section): section is ActiveSection => Boolean(section)),
  ...CHART_MENU_ITEMS.map((item) => item.id),
]);

export function pathForSection(section: ActiveSection, componentName?: string | null): string {
  if (section === "dashboard") return "/workspace";
  if (section === "bank-ide") return "/workspace/bank-ide";
  if (section === "catalog") return "/components";
  if (section === "component-detail" && componentName) {
    return `/components/detail/${encodeURIComponent(componentName)}`;
  }
  return `/components/${section}`;
}

export function pathForBankIdeMode(mode: BankIdeMode, id?: string): string {
  const base = "/workspace/bank-ide";
  if (mode === "list") return base;
  if (mode === "create") return `${base}/create`;
  return id ? `${base}/${mode}/${encodeURIComponent(id)}` : base;
}

export function parseAppRoute(pathname: string): AppRoute {
  // Keep existing Bank Ide bookmarks working under the Workspace URL.
  const path = pathname.startsWith("/bank-ide")
    ? `/workspace${pathname}`
    : pathname;

  if (path === "/workspace/bank-ide" || path === "/workspace/bank-ide/create") {
    return {
      section: "bank-ide",
      bankIdeMode: path.endsWith("/create") ? "create" : "list",
      componentName: null,
      path,
    };
  }

  if (/^\/workspace\/bank-ide\/(edit|view)\/[^/]+$/.test(path)) {
    return {
      section: "bank-ide",
      bankIdeMode: path.includes("/edit/") ? "edit" : "view",
      componentName: null,
      path,
    };
  }

  if (path === "/components" || path === "/components/") {
    return { section: "catalog", bankIdeMode: "list", componentName: null, path: "/components" };
  }

  if (path.startsWith("/components/detail/")) {
    const componentName = decodeURIComponent(path.slice("/components/detail/".length));
    return {
      section: "component-detail",
      bankIdeMode: "list",
      componentName,
      path,
    };
  }

  if (path.startsWith("/components/")) {
    const section = path.slice("/components/".length);
    if (componentSections.has(section as ActiveSection)) {
      return {
        section: section as ActiveSection,
        bankIdeMode: "list",
        componentName: null,
        path,
      };
    }
  }

  return { section: "dashboard", bankIdeMode: "list", componentName: null, path: "/workspace" };
}
