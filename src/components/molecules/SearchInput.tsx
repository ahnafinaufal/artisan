import { SearchField } from "@heroui/react";
import type { SearchFieldProps } from "@heroui/react";
import { KeyShortcut } from "../atoms";

export interface SearchInputProps extends Omit<SearchFieldProps, "children"> {
  placeholder?: string;
  shortcut?: string;
}

/**
 * Molecule: SearchInput
 * Menggabungkan SearchField (icon, input, clear button) dengan atom KeyShortcut.
 */
export function SearchInput({
  placeholder = "Cari komponen HeroUI v3...",
  shortcut,
  className,
  ...props
}: SearchInputProps) {
  return (
    <SearchField className={className} {...props}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={placeholder} />
        <SearchField.ClearButton />
        {shortcut ? (
          <div className="pr-2 hidden sm:flex items-center">
            <KeyShortcut>{shortcut}</KeyShortcut>
          </div>
        ) : null}
      </SearchField.Group>
    </SearchField>
  );
}
