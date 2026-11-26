import { Card, Table } from "@heroui/react";
import { StatusChip, UserAvatar } from "../atoms";

interface AtomicMappingRow {
  id: string;
  layer: string;
  folder: string;
  examples: string;
  status: "Ready" | "Composed" | "Interactive";
}

const ROWS: AtomicMappingRow[] = [
  {
    id: "1",
    layer: "Atoms",
    folder: "src/components/atoms",
    examples: "ActionButton, StatusChip, ToggleSwitch, UserAvatar, TextInput",
    status: "Ready",
  },
  {
    id: "2",
    layer: "Molecules",
    folder: "src/components/molecules",
    examples: "FormField, SearchInput, SelectField, StatusAlert, AvatarStack",
    status: "Composed",
  },
  {
    id: "3",
    layer: "Organisms",
    folder: "src/components/organisms",
    examples: "NavbarHeader, ComponentCatalogSection, InteractivePlayground, TeamTableCard",
    status: "Interactive",
  },
];

/**
 * Organism: TeamTableCard
 * Contoh penggunaan HeroUI Table di dalam Card untuk merangkum struktur Atomic Design.
 */
export function TeamTableCard() {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Ringkasan Struktur Atomic Design</Card.Title>
          <StatusChip color="success" variant="soft">
            Table Organism
          </StatusChip>
        </div>
        <Card.Description>
          Hierarki file yang sudah dibuat di proyek ini menggunakan HeroUI v3.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Atomic Design Structure">
              <Table.Header>
                <Table.Column isRowHeader>Layer</Table.Column>
                <Table.Column>Folder</Table.Column>
                <Table.Column>Komponen</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>
              <Table.Body items={ROWS}>
                {(row) => (
                  <Table.Row id={row.id}>
                    <Table.Cell>
                      <div className="flex items-center gap-2 font-medium">
                        <UserAvatar
                          size="sm"
                          alt={row.layer}
                          fallback={row.layer.slice(0, 2).toUpperCase()}
                        />
                        {row.layer}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <code className="text-xs text-muted">{row.folder}</code>
                    </Table.Cell>
                    <Table.Cell className="text-sm">{row.examples}</Table.Cell>
                    <Table.Cell>
                      <StatusChip
                        color={
                          row.status === "Ready"
                            ? "accent"
                            : row.status === "Composed"
                              ? "success"
                              : "warning"
                        }
                        variant="soft"
                      >
                        {row.status}
                      </StatusChip>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Card.Content>
    </Card>
  );
}
