import { useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Activity, ChevronDown, MessageSquare, Pencil, RefreshCw } from "lucide-react";
import { Timeline, type TimelineStatus } from "../../../components/molecules/Timeline";
import type { ContentIdea, IdeaHistoryItem } from "../types";
import { formatDateTime } from "../utils";

type AuditKind = NonNullable<IdeaHistoryItem["kind"]> | "comment";

interface AuditEvent {
  id: string;
  title: string;
  details?: string;
  actor: string;
  timestamp: string;
  kind: AuditKind;
}

const KIND_LABEL: Record<AuditKind, string> = {
  edit: "Edit",
  status: "Status",
  activity: "Aktivitas",
  comment: "Komentar",
};

const KIND_ICON = {
  edit: Pencil,
  status: RefreshCw,
  activity: Activity,
  comment: MessageSquare,
};

function classifyHistory(item: IdeaHistoryItem): AuditKind {
  if (item.kind) return item.kind;
  if (/status|menyetujui|mengajukan|revisi|ditunda|ditolak|dikonversi|mengonversi/i.test(item.action)) {
    return "status";
  }
  if (/memperbarui|mengedit/i.test(item.action)) return "edit";
  return "activity";
}

function getAuditEvents(idea: ContentIdea): AuditEvent[] {
  const events: AuditEvent[] = idea.history.map((item) => ({
    id: `history-${item.id}`,
    title: item.action,
    details: item.details,
    actor: item.actor,
    timestamp: item.timestamp,
    kind: classifyHistory(item),
  }));

  if (!idea.history.some((item) => /membuat ide|duplikat dari|menyimpan draft/i.test(item.action))) {
    events.push({
      id: `created-${idea.id}`,
      title: "Ide dibuat",
      actor: idea.createdBy,
      timestamp: idea.createdAt,
      kind: "activity",
    });
  }

  events.push(...idea.comments.map((comment) => ({
    id: `comment-${comment.id}`,
    title: "Komentar ditambahkan",
    details: comment.text,
    actor: comment.author,
    timestamp: comment.createdAt,
    kind: "comment" as const,
  })));

  return events.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function IdeaAuditTimeline({ idea }: { idea: ContentIdea }) {
  const [expanded, setExpanded] = useState(false);
  const events = getAuditEvents(idea);
  const visibleEvents = expanded ? events : events.slice(0, 5);

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">Audit aktivitas</h3>
        <p className="mt-1 text-xs text-muted">Perubahan dan aktivitas terbaru ide ini.</p>
      </div>

      <Timeline size="sm" density="compact">
        {visibleEvents.map((event, index) => {
          const Icon = KIND_ICON[event.kind];
          const status: TimelineStatus = index === 0 ? "current" : "default";
          return (
            <Timeline.Item key={event.id} status={status}>
              <Timeline.Rail>
                <Timeline.Marker><Icon className="h-3 w-3" /></Timeline.Marker>
                <Timeline.Connector />
              </Timeline.Rail>
              <Timeline.Content>
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className="text-xs font-semibold leading-snug text-foreground">{event.title}</p>
                  <Chip size="sm" variant="soft" color="default">{KIND_LABEL[event.kind]}</Chip>
                </div>
                {event.details ? (
                  <p className="mt-1 break-words text-xs leading-relaxed text-muted">{event.details}</p>
                ) : null}
                <p className="mt-1 text-[11px] text-muted">
                  {event.actor} · {formatDateTime(event.timestamp)}
                </p>
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>

      {events.length > 5 ? (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full"
          onPress={() => setExpanded((value) => !value)}
        >
          {expanded ? "Tampilkan lebih sedikit" : `Lihat semua ${events.length} aktivitas`}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </Button>
      ) : null}
    </Card>
  );
}
