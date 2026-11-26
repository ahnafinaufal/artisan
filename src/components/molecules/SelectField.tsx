import { ListBox, Select } from "@heroui/react";
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
  className?: string;
}

/**
 * Molecule: SelectField
 * Menggabungkan FieldLabel, Select trigger/popover, dan ListBox.
 */
export function SelectField({
  label,
  placeholder = "Pilih opsi...",
  options,
  selectedKey,
  onSelectionChange,
  className,
}: SelectFieldProps) {
  return (
    <Select
      className={className}
      placeholder={placeholder}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
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
    </Select>
  );
}
