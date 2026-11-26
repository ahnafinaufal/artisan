import { useState } from "react";
import { Card, Label, SearchField } from "@heroui/react";

/**
 * Organism: SearchFieldShowcaseSection
 * Showcase komponen SearchField dari @heroui/react.
 */
export function SearchFieldShowcaseSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          SearchField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kolom pencarian dengan ikon search dan tombol hapus menggunakan{" "}
          <code>SearchField</code>, <code>SearchField.Group</code>,{" "}
          <code>SearchField.SearchIcon</code>, <code>SearchField.Input</code>, dan{" "}
          <code>SearchField.ClearButton</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Controlled SearchField
        </h3>
        <div className="space-y-3">
          <SearchField value={query} onChange={setQuery}>
            <Label>Cari Dokumentasi</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Ketik nama komponen..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <p className="text-xs text-muted">
            Query: <span className="font-medium text-foreground">{query || "—"}</span>
          </p>
        </div>
      </Card>
    </section>
  );
}
