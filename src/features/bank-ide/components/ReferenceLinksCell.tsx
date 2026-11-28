import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
} from "@heroui/react";
import { ChevronDown, ExternalLink, Globe, Link2 } from "lucide-react";
import { PlatformLogo } from "./PlatformLogo";

interface ReferenceLinksCellProps {
  links: string[];
  variant?: "dropdown" | "list";
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return "Lainnya";
  }
}

/** Deteksi platform dari domain agar header grup bisa memakai logogram brand. */
function getPlatformFromDomain(
  domain: string,
): "Instagram" | "TikTok" | "YouTube" | undefined {
  if (domain === "instagram.com" || domain.endsWith(".instagram.com")) {
    return "Instagram";
  }
  if (domain === "tiktok.com" || domain.endsWith(".tiktok.com")) {
    return "TikTok";
  }
  if (
    domain === "youtube.com" ||
    domain.endsWith(".youtube.com") ||
    domain === "youtu.be" ||
    domain.endsWith(".youtu.be")
  ) {
    return "YouTube";
  }
  return undefined;
}

/** Path ringkas untuk label utama item. */
function getPathLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const path = `${parsed.pathname}${parsed.search}`;
    return path === "/" ? parsed.hostname : path;
  } catch {
    return url;
  }
}

function groupLinksByDomain(links: string[]) {
  const groups = new Map<string, string[]>();

  for (const link of links) {
    const domain = getDomain(link);
    const bucket = groups.get(domain);
    if (bucket) {
      bucket.push(link);
    } else {
      groups.set(domain, [link]);
    }
  }

  return Array.from(groups, ([domain, items]) => ({ domain, items }));
}

/** Header grup: logogram brand berwarna (sama seperti chip Platform), fallback Globe. */
function GroupHeader({ domain, label }: { domain: string; label: string }) {
  const platform = getPlatformFromDomain(domain);

  return (
    <Header className="flex items-center gap-2">
      {platform ? (
        <PlatformLogo platform={platform} className="h-4 w-4 shrink-0" />
      ) : (
        <Globe className="h-4 w-4 shrink-0 text-muted" />
      )}
      <span>{label}</span>
    </Header>
  );
}

export function ReferenceLinksCell({
  links,
  variant = "dropdown",
}: ReferenceLinksCellProps) {
  if (links.length === 0) {
    return <span className="text-xs text-muted">–</span>;
  }

  const groups = groupLinksByDomain(links);
  const isSingleGroup = groups.length === 1;

  if (variant === "list") {
    return (
      <div className="space-y-1">
        {groups.map((group) => (
          <div key={group.domain} className="space-y-0.5">
            <div className="flex items-center gap-2 px-1 py-1">
              {getPlatformFromDomain(group.domain) ? (
                <PlatformLogo
                  platform={getPlatformFromDomain(group.domain)!}
                  className="h-4 w-4 shrink-0"
                />
              ) : (
                <Globe className="h-4 w-4 shrink-0 text-muted" />
              )}
              <span className="text-[11px] font-medium text-muted">
                {isSingleGroup
                  ? `Referensi (${links.length})`
                  : group.domain}
              </span>
            </div>

            <div className="space-y-0.5">
              {group.items.map((url, index) => (
                <a
                  key={`${group.domain}-${index}`}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-secondary/60"
                >
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Link2 className="h-4 w-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="block truncate">
                      {getPathLabel(url)}
                    </Label>
                    <Description className="block truncate" title={url}>
                      {url}
                    </Description>
                  </div>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Dropdown>
      <Button
        size="sm"
        variant="secondary"
        className="h-6 gap-1 rounded-full px-2 text-xs"
        aria-label={`Buka ${links.length} referensi`}
      >
        <Link2 className="h-3.5 w-3.5" />
        {links.length} link
        <ChevronDown className="h-3 w-3 text-muted" />
      </Button>

      <Dropdown.Popover placement="bottom end" className="w-80">
        <Dropdown.Menu>
          {groups.map((group) => (
            <Dropdown.Section key={group.domain}>
              <GroupHeader
                domain={group.domain}
                label={
                  isSingleGroup
                    ? `Referensi (${links.length})`
                    : group.domain
                }
              />

              {group.items.map((url, index) => (
                <Dropdown.Item
                  key={`${group.domain}-${index}`}
                  id={`${group.domain}-${index}`}
                  textValue={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="gap-2"
                >
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Link2 className="h-4 w-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="block truncate">
                      {getPathLabel(url)}
                    </Label>
                    <Description className="block truncate" title={url}>
                      {url}
                    </Description>
                  </div>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted" />
                </Dropdown.Item>
              ))}
            </Dropdown.Section>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
