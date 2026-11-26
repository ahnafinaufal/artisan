import { Avatar, Card, Chip } from "@heroui/react";
import { AlertTriangle, CheckCircle2, GitCommit, Rocket, Sparkles } from "lucide-react";

type TimelineStatus = "default" | "current" | "success" | "warning" | "danger" | "muted";

const MARKER_TONE: Record<TimelineStatus, string> = {
  default: "border-border bg-surface text-foreground",
  current: "border-accent bg-accent text-accent-foreground ring-4 ring-accent/20",
  success: "border-success bg-success text-success-foreground",
  warning: "border-warning bg-warning text-warning-foreground",
  danger: "border-danger bg-danger text-danger-foreground",
  muted: "border-border bg-surface-secondary text-muted",
};

/**
 * Organism: TimelineShowcaseSection
 * Showcase Timeline (HeroUI Pro pattern) untuk activity feeds, incident response,
 * centered milestones, dan compact log.
 */
export function TimelineShowcaseSection() {
  const incidentEvents: Array<{
    id: string;
    title: string;
    time: string;
    description: string;
    status: TimelineStatus;
  }> = [
    {
      id: "inc-1",
      title: "Incident Resolved",
      time: "14:42 WIB",
      description: "All edge nodes recovered and latency returned to normal.",
      status: "success",
    },
    {
      id: "inc-2",
      title: "Mitigation Deployed",
      time: "14:25 WIB",
      description: "Traffic rerouted to healthy regional clusters.",
      status: "current",
    },
    {
      id: "inc-3",
      title: "Elevated Error Rate Detected",
      time: "14:10 WIB",
      description: "API gateway reported 502 responses on ap-southeast-1.",
      status: "danger",
    },
  ];

  const repoActivities = [
    {
      id: "repo-1",
      user: "Kate Moore",
      avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
      action: "merged PR #412 into main",
      time: "12m ago",
      icon: <GitCommit className="size-3.5" />,
      status: "success" as TimelineStatus,
    },
    {
      id: "repo-2",
      user: "John Smith",
      avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
      action: "published release v3.2.8",
      time: "1h ago",
      icon: <Rocket className="size-3.5" />,
      status: "current" as TimelineStatus,
    },
    {
      id: "repo-3",
      user: "Sara Johnson",
      avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
      action: "flagged token contrast warning",
      time: "3h ago",
      icon: <AlertTriangle className="size-3.5" />,
      status: "warning" as TimelineStatus,
    },
  ];

  const milestones = [
    {
      id: "m1",
      title: "Design System v3",
      date: "Q1 2026",
      desc: "Unified Tailwind v4 theme tokens and React Aria primitives.",
      side: "start" as const,
      status: "success" as TimelineStatus,
    },
    {
      id: "m2",
      title: "Pro Data Components",
      date: "Q2 2026",
      desc: "Launched DataGrid, Kanban, ItemCard, EmptyState, and Timeline.",
      side: "end" as const,
      status: "current" as TimelineStatus,
    },
    {
      id: "m3",
      title: "AI Workflow Kit",
      date: "Q3 2026",
      desc: "Streaming prompt inputs and agentic status cards.",
      side: "start" as const,
      status: "muted" as TimelineStatus,
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Timeline
          </h2>
          <span className="rounded bg-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted">
            PRO
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          Komponen kronologi untuk activity feed, incident history, milestone roadmap,
          dan compact log.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Incident Response */}
        <Card className="p-5">
          <h3 className="mb-5 text-base font-semibold text-foreground">
            Incident Response
          </h3>
          <ol className="space-y-0">
            {incidentEvents.map((ev, index) => {
              const isLast = index === incidentEvents.length - 1;
              return (
                <li key={ev.id} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span
                      className={`z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${MARKER_TONE[ev.status]}`}
                    >
                      {ev.status === "success" ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : (
                        <span className="size-2 rounded-full bg-current" />
                      )}
                    </span>
                    {!isLast ? (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <article className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        {ev.title}
                      </h4>
                      <time className="text-xs text-muted">{ev.time}</time>
                    </div>
                    <p className="mt-1 text-xs text-muted">{ev.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* 2. Repository Activity */}
        <Card className="p-5">
          <h3 className="mb-5 text-base font-semibold text-foreground">
            Repository Activity
          </h3>
          <ol className="space-y-0">
            {repoActivities.map((act, index) => {
              const isLast = index === repoActivities.length - 1;
              return (
                <li key={act.id} className="relative flex gap-3.5 pb-5 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span
                      className={`z-10 flex size-7 shrink-0 items-center justify-center rounded-full border ${MARKER_TONE[act.status]}`}
                    >
                      {act.icon}
                    </span>
                    {!isLast ? (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 pt-0.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm" className="size-6">
                        <Avatar.Image alt={act.user} src={act.avatar} />
                        <Avatar.Fallback>{act.user[0]}</Avatar.Fallback>
                      </Avatar>
                      <p className="text-xs text-foreground">
                        <span className="font-semibold">{act.user}</span>{" "}
                        <span className="text-muted">{act.action}</span>
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-muted">{act.time}</time>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* 3. Centered Milestones */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-6 text-base font-semibold text-foreground">
            Centered Milestones
          </h3>
          <ol className="relative mx-auto max-w-2xl space-y-6">
            {milestones.map((m, index) => {
              const isLast = index === milestones.length - 1;
              return (
                <li
                  key={m.id}
                  className="grid grid-cols-[1fr_auto_1fr] items-start gap-4"
                >
                  <div className={m.side === "start" ? "text-right" : "opacity-0"}>
                    {m.side === "start" ? (
                      <div className="rounded-xl border border-border/70 bg-surface-secondary/50 p-3">
                        <Chip size="sm" variant="soft" className="mb-1">
                          {m.date}
                        </Chip>
                        <h4 className="text-sm font-semibold text-foreground">
                          {m.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted">{m.desc}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center self-stretch">
                    <span
                      className={`z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${MARKER_TONE[m.status]}`}
                    >
                      <Sparkles className="size-3.5" />
                    </span>
                    {!isLast ? (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    ) : null}
                  </div>

                  <div className={m.side === "end" ? "text-left" : "opacity-0"}>
                    {m.side === "end" ? (
                      <div className="rounded-xl border border-border/70 bg-surface-secondary/50 p-3">
                        <Chip size="sm" variant="soft" className="mb-1">
                          {m.date}
                        </Chip>
                        <h4 className="text-sm font-semibold text-foreground">
                          {m.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted">{m.desc}</p>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </section>
  );
}
