import { useState } from "react";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Dropdown,
  Popover,
} from "@heroui/react";
import { Bell, Menu, Moon, PanelLeft, Search, Sun } from "lucide-react";
import { SearchInput } from "../molecules";

export interface BreadcrumbNode {
  label: string;
  onPress?: () => void;
}

export interface NavbarHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isDark: boolean;
  onToggleDark: (selected: boolean) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
  onOpenMobileMenu?: () => void;
  breadcrumbs?: BreadcrumbNode[];
}

/**
 * Organism: NavbarHeader
 * Top bar dengan tombol collapse sidebar, breadcrumbs multi-level di kiri,
 * dan ikon Search, Notification Bell, Theme Toggle, serta single Avatar di kanan.
 */
export function NavbarHeader({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleDark,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
  onOpenMobileMenu,
  breadcrumbs = [
    { label: "Home" },
    { label: "Design System" },
    { label: "Components" },
  ],
}: NavbarHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        {/* Left: Collapse Toggle + Multi-level Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-2.5">
          {onOpenMobileMenu ? (
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label="Buka sidebar"
              className="lg:hidden"
              onPress={onOpenMobileMenu}
            >
              <Menu className="h-4 w-4" />
            </Button>
          ) : null}

          {onToggleSidebarCollapse ? (
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:inline-flex"
              onPress={onToggleSidebarCollapse}
            >
              <PanelLeft className="h-4 w-4 text-muted" />
            </Button>
          ) : null}

          <Breadcrumbs className="text-xs sm:text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <Breadcrumbs.Item
                  key={`${crumb.label}-${index}`}
                  onPress={!isLast ? crumb.onPress : undefined}
                  className={
                    isLast
                      ? "font-medium text-foreground"
                      : "cursor-pointer text-muted hover:text-foreground"
                  }
                >
                  {crumb.label}
                </Breadcrumbs.Item>
              );
            })}
          </Breadcrumbs>
        </div>

        {/* Right: Search Icon, Notification Bell, Theme Toggle, Single Gradient Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isSearchOpen ? (
            <SearchInput
              className="w-48 sm:w-64"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Cari komponen..."
              autoFocus
              onBlur={() => {
                if (!searchQuery.trim()) setIsSearchOpen(false);
              }}
            />
          ) : (
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label="Cari komponen"
              onPress={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 text-muted" />
            </Button>
          )}

          <Popover>
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label="Notifikasi"
            >
              <Bell className="h-4 w-4 text-muted" />
            </Button>
            <Popover.Content className="w-64 p-3 text-xs">
              <p className="font-semibold text-foreground">Notifikasi</p>
              <p className="mt-1 text-muted">
                Semua 91 komponen HeroUI v3 &amp; Charts siap digunakan.
              </p>
            </Popover.Content>
          </Popover>

          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            onPress={() => onToggleDark(!isDark)}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-muted" />
            ) : (
              <Moon className="h-4 w-4 text-muted" />
            )}
          </Button>

          <Dropdown>
            <Dropdown.Trigger aria-label="Profil pengguna" className="cursor-pointer rounded-full outline-none">
              <Avatar size="sm" color="accent" className="h-8 w-8">
                <Avatar.Image
                  alt="Ahnafi Naufal"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                />
                <Avatar.Fallback>AN</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu
                onAction={(key) => {
                  if (key === "theme") onToggleDark(!isDark);
                }}
              >
                <Dropdown.Item id="profile" textValue="Ahnafi Naufal">
                  Ahnafi Naufal
                </Dropdown.Item>
                <Dropdown.Item id="theme" textValue="Toggle Theme">
                  {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
