import { Button, CloseButton, ToggleButton } from "@heroui/react";
import type { ButtonProps, CloseButtonProps, ToggleButtonProps } from "@heroui/react";

/**
 * Atom: ActionButton
 * Wrapper tipis di atas HeroUI Button untuk konsistensi aksi utama/sekunder.
 */
export function ActionButton({ variant = "primary", size = "md", ...props }: ButtonProps) {
  return <Button variant={variant} size={size} {...props} />;
}

/**
 * Atom: DismissButton
 * Wrapper untuk CloseButton HeroUI.
 */
export function DismissButton(props: CloseButtonProps) {
  return <CloseButton {...props} />;
}

/**
 * Atom: ToggleChipButton
 * Wrapper untuk ToggleButton HeroUI.
 */
export function ToggleChipButton(props: ToggleButtonProps) {
  return <ToggleButton {...props} />;
}
