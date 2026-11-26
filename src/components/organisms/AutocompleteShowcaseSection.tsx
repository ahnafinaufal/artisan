import { useState } from "react";
import {
  Autocomplete,
  Card,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";
import type { Key } from "@heroui/react";

const COUNTRIES = [
  { id: "id", name: "Indonesia" },
  { id: "sg", name: "Singapura" },
  { id: "my", name: "Malaysia" },
  { id: "jp", name: "Jepang" },
  { id: "us", name: "Amerika Serikat" },
];

/**
 * Organism: AutocompleteShowcaseSection
 * Showcase komponen Autocomplete dari @heroui/react dengan filter pencarian.
 */
export function AutocompleteShowcaseSection() {
  const [selectedKey, setSelectedKey] = useState<Key | null>("id");
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Autocomplete
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menggabungkan select dengan filter pencarian menggunakan{" "}
          <code>Autocomplete</code>, <code>Autocomplete.Trigger</code>,{" "}
          <code>Autocomplete.Value</code>, <code>Autocomplete.Popover</code>, dan{" "}
          <code>Autocomplete.Filter</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Filterable Country Picker
        </h3>
        <Autocomplete
          value={selectedKey}
          onChange={setSelectedKey}
          placeholder="Pilih negara"
          className="w-full"
        >
          <Label>Negara</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField aria-label="Cari negara" className="p-2 pb-1">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Cari negara..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox>
                {COUNTRIES.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </Card>
    </section>
  );
}
