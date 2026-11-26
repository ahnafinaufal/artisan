import type { ReactNode } from "react";
import { Tooltip } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";

export interface SidebarNavItemProps {
  icon?: ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: string | number;
  isExternal?: boolean;
  href?: string;
  onClick?: () => void;
}

/**
 * Molecule: SidebarNavItem
 * Item navigasi sidebar bergaya dokumentasi HeroUI v3 (ikon, label, badge/count, status aktif, & rail mode).
 */
export function SidebarNavItem({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  badge,
  isExternal = false,
  href,
  onClick,
}: SidebarNavItemProps) {
  if (isCollapsed) {
    const railClass = [
      "mx-auto flex h-9 w-9 items-center justify-center rounded-lg transition-colors cursor-pointer",
      isActive
        ? "bg-surface-secondary text-foreground shadow-2xs"
        : "text-muted hover:bg-surface-secondary/60 hover:text-foreground",
    ].join(" ");

    const trigger = href ? (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        aria-label={label}
        className={railClass}
        onClick={onClick}
      >
        {icon}
      </a>
    ) : (
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={railClass}
      >
        {icon}
      </button>
    );

    return (
      <Tooltip>
        <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
        <Tooltip.Content placement="right">{label}</Tooltip.Content>
      </Tooltip>
    );
  }
  const baseClass = [
    "group flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer",
    isActive
      ? "bg-surface-secondary font-medium text-foreground shadow-2xs"
      : "text-muted hover:bg-surface-secondary/60 hover:text-foreground",
  ].join(" ");

  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2.5">
        {icon ? (
          <span
            className={
              isActive
                ? "shrink-0 text-foreground"
                : "shrink-0 text-muted group-hover:text-foreground"
            }
          >
            {icon}
          </span>
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        {badge !== undefined ? (
          <span className="rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted bg-surface-secondary">
            {badge}
          </span>
        ) : null}
        {isExternal ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-muted opacity-70 group-hover:opacity-100" />
        ) : null}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={baseClass}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClass}>
      {content}
    </button>
  );
}
