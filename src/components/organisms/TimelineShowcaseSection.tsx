import { useState } from "react";
import { Avatar, Button, Card, Chip, CloseButton, Input } from "@heroui/react";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Flag,
  Globe,
  Mail,
  Megaphone,
  MessageSquare,
  Receipt,
  ShieldAlert,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { Timeline, type TimelineStatus } from "../molecules";

const AVATAR_BLUE =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg";
const AVATAR_ORANGE =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg";
const AVATAR_GREEN =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";
const AVATAR_PURPLE =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg";

/**
 * Organism: TimelineShowcaseSection
 * Showcase lengkap Timeline (HeroUI Pro) mengikuti 7 contoh resmi:
 * Usage (Rollout audit), Incident Response, Centered Milestones, Split Content,
 * Compact Log, Studio Review, dan Version History.
 */
export function TimelineShowcaseSection() {
  const [incidentDraft, setIncidentDraft] = useState(
    "Queue depth is falling after the worker pool restart.",
  );

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
          Komponen kronologi composable menggunakan <code>Timeline</code>,{" "}
          <code>Timeline.Item</code>, <code>Timeline.Rail</code>,{" "}
          <code>Timeline.Marker</code>, <code>Timeline.Connector</code>, dan{" "}
          <code>Timeline.Content</code> sesuai dokumentasi HeroUI Pro.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Usage — Rollout audit / Checkout redesign */}
        <Card className="p-6">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-5">
              <p className="text-xs text-muted">Rollout audit</p>
              <h3 className="text-base font-bold text-foreground">
                Checkout redesign
              </h3>
            </div>
            <Timeline>
              {[
                {
                  id: "u1",
                  title: "Feature flag created",
                  badge: "Owner assigned",
                  badgeColor: "default" as const,
                  desc: (
                    <>
                      Created <strong className="font-semibold text-foreground">checkout-redesign</strong> for the billing workspace.
                    </>
                  ),
                  time: "09:12",
                  status: "default" as TimelineStatus,
                  icon: <Flag className="h-3.5 w-3.5" />,
                },
                {
                  id: "u2",
                  title: "Canary rollout started",
                  badge: "Canary",
                  badgeColor: "accent" as const,
                  desc: (
                    <>
                      Enabled for <strong className="font-semibold text-foreground">5% of workspaces</strong> with session replay sampling on.
                    </>
                  ),
                  time: "09:34",
                  status: "current" as TimelineStatus,
                  icon: <Activity className="h-3.5 w-3.5" />,
                },
                {
                  id: "u3",
                  title: "Regional guardrail tripped",
                  badge: "Paused",
                  badgeColor: "warning" as const,
                  desc: (
                    <>
                      Latency climbed in <strong className="font-semibold text-foreground">eu-central-1</strong>; rollout is holding while routing warms.
                    </>
                  ),
                  time: "09:51",
                  status: "warning" as TimelineStatus,
                  icon: <AlertCircle className="h-3.5 w-3.5" />,
                },
                {
                  id: "u4",
                  title: "Customer messaging prepared",
                  badge: "Docs",
                  badgeColor: "default" as const,
                  desc: (
                    <>
                      Support macro and changelog draft are ready in <strong className="font-semibold text-foreground">Launch notes</strong>.
                    </>
                  ),
                  time: "10:05",
                  status: "default" as TimelineStatus,
                  icon: <Megaphone className="h-3.5 w-3.5" />,
                },
                {
                  id: "u5",
                  title: "Launch window scheduled",
                  badge: "Queued",
                  badgeColor: "default" as const,
                  desc: "Full rollout waits for the next error-budget sweep.",
                  time: "10:30",
                  status: "default" as TimelineStatus,
                  icon: <Clock className="h-3.5 w-3.5" />,
                },
                {
                  id: "u6",
                  title: "Release checklist verified",
                  badge: "Ready",
                  badgeColor: "success" as const,
                  desc: "Rollback owner and dashboard checks are recorded in the release audit.",
                  time: "10:42",
                  status: "success" as TimelineStatus,
                  icon: <Check className="h-3.5 w-3.5" />,
                },
              ].map((item) => (
                <Timeline.Item key={item.id} status={item.status}>
                  <Timeline.Rail>
                    <Timeline.Marker>{item.icon}</Timeline.Marker>
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-foreground">
                            {item.title}
                          </span>
                          <Chip size="sm" variant="soft" color={item.badgeColor}>
                            {item.badge}
                          </Chip>
                        </div>
                        <p className="text-xs text-muted">{item.desc}</p>
                      </div>
                      <time className="shrink-0 text-xs text-muted">
                        {item.time}
                      </time>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Card>

        {/* 2. Incident Response */}
        <Card className="p-6">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-5">
              <p className="text-xs text-muted">Incident response</p>
              <h3 className="text-base font-bold text-foreground">
                Export queue degradation
              </h3>
            </div>
            <Timeline>
              {/* Input post row */}
              <Timeline.Item status="default">
                <Timeline.Rail>
                  <Timeline.Marker className="overflow-hidden border-0 bg-transparent p-0">
                    <Avatar size="sm" className="h-7 w-7">
                      <Avatar.Image alt="Responder" src={AVATAR_BLUE} />
                      <Avatar.Fallback>R</Avatar.Fallback>
                    </Avatar>
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="flex items-center gap-2">
                    <Input
                      variant="secondary"
                      value={incidentDraft}
                      onChange={(e) => setIncidentDraft(e.target.value)}
                      className="h-9 flex-1 text-xs"
                      aria-label="Incident update"
                    />
                    <Button
                      size="sm"
                      variant="primary"
                      className="rounded-full px-4"
                    >
                      Post
                    </Button>
                  </div>
                </Timeline.Content>
              </Timeline.Item>

              {/* Update from Nora Vazquez */}
              <Timeline.Item status="current">
                <Timeline.Rail>
                  <Timeline.Marker>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-muted">Update from</span>
                        <Avatar size="sm" className="h-4 w-4">
                          <Avatar.Image alt="Nora Vazquez" src={AVATAR_BLUE} />
                          <Avatar.Fallback>N</Avatar.Fallback>
                        </Avatar>
                        <strong className="font-semibold text-foreground">
                          Nora Vazquez
                        </strong>
                        <Chip size="sm" variant="soft" color="default">
                          On-call
                        </Chip>
                      </div>
                      <time className="shrink-0 text-xs text-muted">
                        2:28 AM
                      </time>
                    </div>

                    <div className="space-y-3 rounded-xl border border-border bg-surface p-3.5 text-xs">
                      <p className="leading-relaxed text-foreground">
                        Confirmed the delay is isolated to scheduled exports. API
                        requests and dashboard reads are healthy while the
                        backlog drains.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip size="sm" variant="soft" color="default">
                          <FileText className="h-3 w-3" />
                          <Chip.Label>worker-trace.har - 42 KB</Chip.Label>
                        </Chip>
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-foreground hover:text-accent"
                        >
                          Open runbook
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Timeline.Content>
              </Timeline.Item>

              {[
                {
                  id: "ir-3",
                  status: "warning" as TimelineStatus,
                  icon: <Zap className="h-3.5 w-3.5" />,
                  time: "2:24 AM",
                  content: (
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className="text-muted">Escalation acknowledged by</span>
                      <Avatar size="sm" className="h-4 w-4">
                        <Avatar.Image alt="Kaito Reed" src={AVATAR_ORANGE} />
                        <Avatar.Fallback>K</Avatar.Fallback>
                      </Avatar>
                      <strong className="font-semibold text-foreground">
                        Kaito Reed
                      </strong>
                    </span>
                  ),
                },
                {
                  id: "ir-4",
                  status: "default" as TimelineStatus,
                  icon: <UserPlus className="h-3.5 w-3.5" />,
                  time: "2:23 AM",
                  content: (
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className="text-muted">Incident channel joined by</span>
                      <Avatar size="sm" className="h-4 w-4">
                        <Avatar.Image alt="Mira Stone" src={AVATAR_GREEN} />
                        <Avatar.Fallback>M</Avatar.Fallback>
                      </Avatar>
                      <strong className="font-semibold text-foreground">
                        Mira Stone
                      </strong>
                    </span>
                  ),
                },
                {
                  id: "ir-5",
                  status: "default" as TimelineStatus,
                  icon: <Mail className="h-3.5 w-3.5" />,
                  time: "2:21 AM",
                  content: (
                    <span className="text-xs text-muted">
                      Customer update sent to{" "}
                      <strong className="font-semibold text-foreground">
                        finance-ops
                      </strong>
                    </span>
                  ),
                },
                {
                  id: "ir-6",
                  status: "success" as TimelineStatus,
                  icon: <Check className="h-3.5 w-3.5" />,
                  time: "2:18 AM",
                  content: (
                    <span className="text-xs text-muted">
                      Mitigation deployed to{" "}
                      <strong className="font-semibold text-foreground">
                        export-worker-3
                      </strong>
                    </span>
                  ),
                },
                {
                  id: "ir-7",
                  status: "default" as TimelineStatus,
                  icon: <Clock className="h-3.5 w-3.5" />,
                  time: "2:14 AM",
                  content: (
                    <span className="text-xs text-muted">
                      <strong className="font-semibold text-foreground">
                        Postmortem reminder
                      </strong>{" "}
                      scheduled
                    </span>
                  ),
                },
              ].map((row) => (
                <Timeline.Item key={row.id} status={row.status}>
                  <Timeline.Rail>
                    <Timeline.Marker>{row.icon}</Timeline.Marker>
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      {row.content}
                      <time className="shrink-0 text-xs text-muted">
                        {row.time}
                      </time>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Card>

        {/* 3. Centered Milestones */}
        <Card className="p-6">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <Chip size="sm" variant="soft" color="accent">
                2026 expansion
              </Chip>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Timeline axis="center" placement="alternate">
              <Timeline.Item status="default" side="end">
                <Timeline.Rail>
                  <Timeline.Marker>
                    <Users className="h-3.5 w-3.5" />
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">Jan 2026</span>
                      <Chip size="sm" variant="soft" color="default">
                        Research
                      </Chip>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Private beta
                    </h4>
                    <p className="text-xs text-muted">
                      Invited design partners to stress-test billing,
                      permissions, and reporting workflows.
                    </p>
                    <span className="block pt-0.5 text-xs text-muted">
                      24 teams
                    </span>
                  </div>
                </Timeline.Content>
              </Timeline.Item>

              <Timeline.Item status="default" side="start">
                <Timeline.Rail>
                  <Timeline.Marker>
                    <Activity className="h-3.5 w-3.5" />
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="space-y-1">
                    <div className="flex items-center justify-end gap-2">
                      <Chip size="sm" variant="soft" color="accent">
                        Billing
                      </Chip>
                      <span className="text-xs text-muted">Mar 2026</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Usage-based pricing
                    </h4>
                    <p className="text-xs text-muted">
                      Metered plans went live for sandbox workspaces after
                      invoice previews cleared review.
                    </p>
                    <span className="block pt-0.5 text-xs text-muted">
                      3 plans
                    </span>
                  </div>
                </Timeline.Content>
              </Timeline.Item>

              <Timeline.Item status="default" side="end">
                <Timeline.Rail>
                  <Timeline.Marker>
                    <Globe className="h-3.5 w-3.5" />
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">May 2026</span>
                      <Chip size="sm" variant="soft" color="success">
                        Expansion
                      </Chip>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Regional launch
                    </h4>
                    <p className="text-xs text-muted">
                      Opened the EU data boundary with local support coverage and
                      a <strong className="font-semibold text-foreground">launch brief</strong>.
                    </p>
                    <span className="block pt-0.5 text-xs text-muted">
                      2 regions
                    </span>
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </div>
        </Card>

        {/* 4. Split Content */}
        <Card className="p-6">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6 text-center">
              <p className="text-xs text-muted">Launch review</p>
              <h3 className="text-base font-bold text-foreground">
                Billing rollout
              </h3>
            </div>

            <Timeline axis="center">
              {[
                {
                  id: "sp-1",
                  time: "09:15",
                  tag: "Design",
                  tagColor: "default" as const,
                  author: "Nina Park",
                  title: "Checkout language approved",
                  desc: (
                    <>
                      Invoice copy, empty states, and seat-change messages passed
                      the{" "}
                      <strong className="font-semibold text-foreground">
                        annotation review
                      </strong>
                      .
                    </>
                  ),
                  m1Label: "Screens",
                  m1Val: "18",
                  m2Label: "Open notes",
                  m2Val: "2",
                  status: "default" as TimelineStatus,
                  icon: <Flag className="h-3.5 w-3.5" />,
                },
                {
                  id: "sp-2",
                  time: "10:40",
                  tag: "Risk",
                  tagColor: "warning" as const,
                  author: "Omar Lee",
                  title: "Upgrade holds confirmed",
                  desc: "Fraud review added a manual hold rule for high-value upgrades during the first rollout window.",
                  m1Label: "Threshold",
                  m1Val: "$750",
                  m2Label: "Review SLA",
                  m2Val: "4 h",
                  status: "warning" as TimelineStatus,
                  icon: <CheckCircle2 className="h-3.5 w-3.5" />,
                },
              ].map((row) => (
                <Timeline.Item key={row.id} status={row.status}>
                  <Timeline.Content side="start">
                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-center justify-end gap-2">
                        <time className="text-xs font-medium text-foreground">
                          {row.time}
                        </time>
                        <Chip size="sm" variant="soft" color={row.tagColor}>
                          {row.tag}
                        </Chip>
                      </div>
                      <p className="text-xs text-muted">{row.author}</p>
                    </div>
                  </Timeline.Content>
                  <Timeline.Rail>
                    <Timeline.Marker>{row.icon}</Timeline.Marker>
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content side="end">
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-semibold text-foreground">
                        {row.title}
                      </h4>
                      <div className="space-y-3 rounded-xl border border-border bg-surface p-3.5 text-xs">
                        <p className="leading-relaxed text-muted">{row.desc}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[11px] text-muted">
                              {row.m1Label}
                            </p>
                            <p className="font-semibold text-foreground">
                              {row.m1Val}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-muted">
                              {row.m2Label}
                            </p>
                            <p className="font-semibold text-foreground">
                              {row.m2Val}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Card>

        {/* 5. Compact Log */}
        <Card className="p-6">
          <div className="mx-auto w-full max-w-xl">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Compact Log
            </h3>
            <Timeline density="compact" size="sm">
              {[
                {
                  id: "cl-1",
                  title: "Chargeback case opened",
                  desc: "The customer disputed a renewal charge, and the finance team has seven days to submit evidence.",
                  time: "Mar 6, 10:34 AM",
                  status: "warning" as TimelineStatus,
                  icon: <ShieldAlert className="h-3 w-3" />,
                },
                {
                  id: "cl-2",
                  title: "Payment captured",
                  time: "Mar 6, 10:21 AM",
                  status: "success" as TimelineStatus,
                  icon: <CreditCard className="h-3 w-3" />,
                },
                {
                  id: "cl-3",
                  title: "Payment authorized",
                  time: "Mar 6, 10:21 AM",
                  status: "default" as TimelineStatus,
                  icon: <CheckCircle2 className="h-3 w-3" />,
                },
                {
                  id: "cl-4",
                  title: "Invoice generated",
                  time: "Mar 6, 10:20 AM",
                  status: "default" as TimelineStatus,
                  icon: <Receipt className="h-3 w-3" />,
                },
              ].map((log) => (
                <Timeline.Item key={log.id} status={log.status}>
                  <Timeline.Rail>
                    <Timeline.Marker>{log.icon}</Timeline.Marker>
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-foreground">
                          {log.title}
                        </p>
                        {log.desc ? (
                          <p className="text-xs text-muted">{log.desc}</p>
                        ) : null}
                      </div>
                      <time className="shrink-0 text-xs text-muted">
                        {log.time}
                      </time>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Card>

        {/* 6. Studio Review & 7. Version History */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* 6. Studio Review */}
          <Card className="p-6 lg:col-span-7">
            <div className="mb-5">
              <p className="text-xs text-muted">Studio review</p>
              <h3 className="text-base font-bold text-foreground">
                Runner launch assets
              </h3>
            </div>
            <Timeline>
              <Timeline.Item status="default">
                <Timeline.Rail>
                  <Timeline.Marker className="overflow-hidden border-0 bg-transparent p-0">
                    <Avatar size="sm" className="h-7 w-7">
                      <Avatar.Image alt="Mina Sol" src={AVATAR_BLUE} />
                      <Avatar.Fallback>M</Avatar.Fallback>
                    </Avatar>
                  </Timeline.Marker>
                  <Timeline.Connector />
                </Timeline.Rail>
                <Timeline.Content>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          Product asset uploaded
                        </span>
                        <Chip size="sm" variant="soft" color="accent">
                          Review
                        </Chip>
                      </div>
                      <span className="shrink-0 text-xs text-muted">
                        Mina Sol &nbsp; 10:18 AM
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3.5 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-muted">
                        <span className="text-[11px] font-medium">
                          Hero Crop
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-xs leading-relaxed text-muted">
                          Final hero crop is ready for retouch review with the
                          side profile, lace detail, and marketplace thumbnail
                          queued.
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Chip size="sm" variant="soft" color="default">
                            PDP hero
                          </Chip>
                          <Chip size="sm" variant="soft" color="default">
                            4 crops
                          </Chip>
                          <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-1 pl-1 text-xs font-medium text-foreground hover:text-accent"
                          >
                            Open board
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Timeline.Content>
              </Timeline.Item>

              {[
                {
                  id: "sr-2",
                  title: "Lighting pass reviewed",
                  desc: "The side profile reads clearly on the landing page. Keep the outsole shadow soft so the sole texture stays visible.",
                  meta: "Orin Vale   10:27 AM",
                  avatar: AVATAR_ORANGE,
                },
                {
                  id: "sr-3",
                  title: "Copy note resolved",
                  desc: "Updated the launch tile copy and aligned the product badge with the approved campaign language.",
                  meta: "Paz Kim   10:43 AM",
                  avatar: AVATAR_GREEN,
                },
                {
                  id: "sr-4",
                  title: "Review package ready",
                  desc: "Exported the square crop, PDP detail view, and marketplace thumbnail for final QA.",
                  meta: "Mina Sol   11:06 AM",
                  avatar: AVATAR_BLUE,
                },
              ].map((row) => (
                <Timeline.Item key={row.id} status="default">
                  <Timeline.Rail>
                    <Timeline.Marker className="overflow-hidden border-0 bg-transparent p-0">
                      <Avatar size="sm" className="h-7 w-7">
                        <Avatar.Image alt={row.title} src={row.avatar} />
                        <Avatar.Fallback>{row.title[0]}</Avatar.Fallback>
                      </Avatar>
                    </Timeline.Marker>
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {row.title}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {row.meta}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted">
                        {row.desc}
                      </p>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          {/* 7. Version History */}
          <Card className="p-6 lg:col-span-5">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">
                Version history
              </h3>
              <CloseButton aria-label="Close version history" />
            </div>

            <Timeline>
              {[
                {
                  id: "v8",
                  version: "v8",
                  badge: "Draft",
                  badgeColor: "accent" as const,
                  status: "current" as TimelineStatus,
                  desc: "Prepared billing copy, tax preview states, and the final approval checklist.",
                  author: "Maya Chen",
                  avatar: AVATAR_BLUE,
                  time: "Current",
                },
                {
                  id: "v7",
                  version: "v7",
                  badge: "Live",
                  badgeColor: "success" as const,
                  status: "success" as TimelineStatus,
                  desc: "Published the pricing table refresh after support macros cleared review.",
                  author: "Nora Vazquez",
                  avatar: AVATAR_PURPLE,
                  time: "May 22, 2026, 11:18 AM",
                },
                {
                  id: "v6",
                  version: "v6",
                  status: "default" as TimelineStatus,
                  desc: "Added regional tax notes and restored the upgrade confirmation banner.",
                  author: "Eli Wong",
                  avatar: AVATAR_ORANGE,
                  time: "May 21, 2026, 04:42 PM",
                },
                {
                  id: "v5",
                  version: "v5",
                  status: "default" as TimelineStatus,
                  desc: "Reworked mobile spacing for plan cards and invoice preview rows.",
                  author: "Maya Chen",
                  avatar: AVATAR_BLUE,
                  time: "May 20, 2026, 09:06 AM",
                },
              ].map((ver) => (
                <Timeline.Item key={ver.id} status={ver.status}>
                  <Timeline.Rail>
                    <Timeline.Marker />
                    <Timeline.Connector />
                  </Timeline.Rail>
                  <Timeline.Content>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {ver.version}
                        </span>
                        {ver.badge ? (
                          <Chip size="sm" variant="soft" color={ver.badgeColor}>
                            {ver.badge}
                          </Chip>
                        ) : null}
                      </div>
                      <p className="text-xs leading-relaxed text-muted">
                        {ver.desc}
                      </p>
                      <div className="flex items-center gap-1.5 pt-0.5 text-xs text-muted">
                        <Avatar size="sm" className="h-4 w-4">
                          <Avatar.Image alt={ver.author} src={ver.avatar} />
                          <Avatar.Fallback>{ver.author[0]}</Avatar.Fallback>
                        </Avatar>
                        <span>
                          {ver.author} - {ver.time}
                        </span>
                      </div>
                    </div>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </div>
      </div>
    </section>
  );
}
