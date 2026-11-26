import type { ReactNode } from "react";
import {
  Checkbox,
  Description,
  FieldError,
  Input,
  Label,
  Switch,
  TextArea,
} from "@heroui/react";
import type {
  CheckboxProps,
  DescriptionProps,
  FieldErrorProps,
  InputProps,
  LabelProps,
  SwitchProps,
  TextAreaProps,
} from "@heroui/react";

export function FieldLabel(props: LabelProps) {
  return <Label {...props} />;
}

export function FieldDescription(props: DescriptionProps) {
  return <Description {...props} />;
}

export function FieldValidationError(props: FieldErrorProps) {
  return <FieldError {...props} />;
}

export function TextInput(props: InputProps) {
  return <Input {...props} />;
}

export function MultilineInput(props: TextAreaProps) {
  return <TextArea {...props} />;
}

export interface ToggleSwitchProps extends Omit<SwitchProps, "children"> {
  label?: string;
  children?: ReactNode;
}

/**
 * Atom: ToggleSwitch
 * Switch boolean dengan label opsional.
 */
export function ToggleSwitch({ label, children, ...props }: ToggleSwitchProps) {
  return (
    <Switch {...props}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      {label ? <Switch.Content>{label}</Switch.Content> : children}
    </Switch>
  );
}

export interface CheckBoxAtomProps extends Omit<CheckboxProps, "children"> {
  label?: string;
  children?: ReactNode;
}

/**
 * Atom: CheckBoxAtom
 * Checkbox dengan indikator bawaan HeroUI v3.
 */
export function CheckBoxAtom({ label, children, ...props }: CheckBoxAtomProps) {
  return (
    <Checkbox {...props}>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      {label ? <Checkbox.Content>{label}</Checkbox.Content> : children}
    </Checkbox>
  );
}
