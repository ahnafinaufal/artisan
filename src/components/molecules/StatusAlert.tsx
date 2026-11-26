import { Alert } from "@heroui/react";
import type { AlertProps } from "@heroui/react";
import { DismissButton } from "../atoms";

export interface StatusAlertProps extends Omit<AlertProps, "children"> {
  title: string;
  description?: string;
  onDismiss?: () => void;
}

/**
 * Molecule: StatusAlert
 * Menggabungkan Alert indicator, title, description, dan atom DismissButton.
 */
export function StatusAlert({
  title,
  description,
  status = "accent",
  onDismiss,
  ...props
}: StatusAlertProps) {
  return (
    <Alert status={status} {...props}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        {description ? <Alert.Description>{description}</Alert.Description> : null}
      </Alert.Content>
      {onDismiss ? <DismissButton aria-label="Tutup" onPress={onDismiss} /> : null}
    </Alert>
  );
}
