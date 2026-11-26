import { ButtonGroup } from "@heroui/react";
import { ActionButton } from "../atoms";

export interface ToolbarAction {
  id: string;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
}

export interface ButtonToolbarProps {
  actions: ToolbarAction[];
}

/**
 * Molecule: ButtonToolbar
 * Mengelompokkan beberapa ActionButton (atom) ke dalam HeroUI ButtonGroup.
 */
export function ButtonToolbar({ actions }: ButtonToolbarProps) {
  return (
    <ButtonGroup>
      {actions.map((action) => (
        <ActionButton
          key={action.id}
          variant={action.variant ?? "secondary"}
          size="sm"
          onPress={action.onPress}
        >
          {action.label}
        </ActionButton>
      ))}
    </ButtonGroup>
  );
}
