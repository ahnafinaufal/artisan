import { Chip, Kbd, Spinner } from "@heroui/react";
import type { ChipProps, KbdProps, SpinnerProps } from "@heroui/react";

/**
 * Atom: StatusChip
 * Menampilkan label status atau kategori menggunakan HeroUI Chip.
 */
export function StatusChip({
  variant = "soft",
  size = "sm",
  children,
  ...props
}: ChipProps) {
  return (
    <Chip variant={variant} size={size} {...props}>
      <Chip.Label>{children}</Chip.Label>
    </Chip>
  );
}

/**
 * Atom: KeyShortcut
 * Menampilkan kombinasi shortcut keyboard menggunakan HeroUI Kbd.
 */
export function KeyShortcut({ children, ...props }: KbdProps) {
  return <Kbd {...props}>{children}</Kbd>;
}

/**
 * Atom: LoadingSpinner
 * Indikator loading menggunakan HeroUI Spinner.
 */
export function LoadingSpinner({ size = "sm", ...props }: SpinnerProps) {
  return <Spinner size={size} {...props} />;
}
