import { FieldError, ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";
import { FieldLabel } from "../atoms";

export interface SelectOption {
  id: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  selectedKey?: Key | null;
  onSelectionChange?: (key: Key | null) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * Molecule: SelectField
 * Menggabungkan FieldLabel, Select trigger/popover, ListBox, dan FieldError.
 */
export function SelectField({
  label,
  placeholder = "Pilih opsi...",
  options,
  selectedKey,
  onSelectionChange,
  isRequired,
  isInvalid,
  errorMessage,
  className,
}: SelectFieldProps) {
  return (
    <Select
      className={className}
      placeholder={placeholder}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      <FieldLabel>{label}</FieldLabel>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((opt) => (
            <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
              {opt.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError>{errorMessage}</FieldError>
    </Select>
  );
}
