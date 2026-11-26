import { TextField } from "@heroui/react";
import type { TextFieldProps } from "@heroui/react";
import {
  FieldDescription,
  FieldLabel,
  FieldValidationError,
  TextInput,
} from "../atoms";

export interface FormFieldProps extends Omit<TextFieldProps, "children"> {
  label: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}

/**
 * Molecule: FormField
 * Gabungan atom Label, Input, Description, dan FieldError dalam TextField.
 */
export function FormField({
  label,
  placeholder,
  description,
  errorMessage,
  ...props
}: FormFieldProps) {
  return (
    <TextField {...props}>
      <FieldLabel>{label}</FieldLabel>
      <TextInput placeholder={placeholder} />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <FieldValidationError>{errorMessage}</FieldValidationError>
    </TextField>
  );
}
