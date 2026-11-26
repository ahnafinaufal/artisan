import { useState } from "react";
import { Button } from "@heroui/react";

export interface EmojiReactionButtonProps {
  emoji?: string;
  initialCount?: number;
  defaultReacted?: boolean;
}

/**
 * Atom: EmojiReactionButton
 * Tombol reaksi emoji interaktif dengan counter dan state toggle (mengacu pada pola HeroUI Pro).
 */
export function EmojiReactionButton({
  emoji = "🔥",
  initialCount = 12,
  defaultReacted = false,
}: EmojiReactionButtonProps) {
  const [reacted, setReacted] = useState(defaultReacted);
  const count = initialCount + (reacted ? 1 : 0);

  return (
    <Button
      size="sm"
      variant={reacted ? "primary" : "secondary"}
      onPress={() => setReacted((prev) => !prev)}
      className="gap-1.5 rounded-full px-3"
    >
      <span>{emoji}</span>
      <span className="tabular-nums text-xs font-semibold">{count}</span>
    </Button>
  );
}
