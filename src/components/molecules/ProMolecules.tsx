import { Bot, Copy, DollarSign, ThumbsUp, User } from "lucide-react";
import { ActionButton, UserAvatar } from "../atoms";
import { KPI, type KpiDataPoint } from "./KPI";

const REVENUE_DATA: KpiDataPoint[] = [
  { label: "May", value: 198400 },
  { label: "Jun", value: 204100 },
  { label: "Jul", value: 201500 },
  { label: "Aug", value: 215800 },
  { label: "Sep", value: 219200 },
  { label: "Oct", value: 221150 },
  { label: "Nov", value: 228451 },
];

/**
 * Molecule: KpiCard
 * Contoh KPI Card mengacu pada https://heroui.pro/docs/react/components/kpi
 */
export function KpiCard() {
  return (
    <KPI className="max-w-[260px]">
      <KPI.Header>
        <KPI.Icon status="success">
          <DollarSign className="h-4 w-4" />
        </KPI.Icon>
        <KPI.Title>Revenue</KPI.Title>
      </KPI.Header>
      <KPI.Actions />
      <KPI.Content>
        <div className="flex items-baseline justify-between gap-2">
          <KPI.Value value={228451} prefix="$" />
          <KPI.Trend trend="up">+3.3%</KPI.Trend>
        </div>
        <KPI.Chart data={REVENUE_DATA} valuePrefix="$" />
      </KPI.Content>
      <KPI.Separator />
      <KPI.Footer>vs. $221,150 last month</KPI.Footer>
    </KPI>
  );
}

export interface ChatMessageBubbleProps {
  role?: "user" | "assistant";
  message?: string;
}

/**
 * Molecule: ChatMessageBubble
 * Layout pesan chat AI composable untuk user dan assistant.
 */
export function ChatMessageBubble({
  role = "assistant",
  message = "Komponen HeroUI v3 siap dipakai dengan Atomic Design.",
}: ChatMessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className="flex w-full max-w-[240px] items-start gap-2 text-xs">
      <UserAvatar
        size="sm"
        alt={isUser ? "User" : "AI"}
        fallback={isUser ? "U" : "AI"}
        className={isUser ? "" : "bg-accent text-accent-foreground"}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-1 font-medium text-foreground">
          {isUser ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3 text-accent" />}
          <span>{isUser ? "You" : "HeroUI AI"}</span>
        </div>
        <div className="rounded-lg bg-surface p-2 text-[11px] leading-relaxed text-foreground shadow-2xs">
          {message}
        </div>
        <div className="flex items-center gap-1">
          <ActionButton isIconOnly size="sm" variant="ghost" aria-label="Copy">
            <Copy className="h-3 w-3" />
          </ActionButton>
          <ActionButton isIconOnly size="sm" variant="ghost" aria-label="Like">
            <ThumbsUp className="h-3 w-3" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
