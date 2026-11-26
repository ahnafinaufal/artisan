import { useMemo, useState } from "react";
import type { Selection, SortDescriptor } from "@heroui/react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  EmptyState,
  Pagination,
  Table,
} from "@heroui/react";
import { Copy, Eye, Inbox, Pencil, Trash2 } from "lucide-react";

interface Member {
  id: number;
  name: string;
  image_url: string;
  role: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
}

const MEMBERS: Member[] = [
  {
    id: 4586932,
    name: "Kate Moore",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    role: "Chief Executive Officer",
    status: "Active",
    email: "kate@acme.com",
  },
  {
    id: 5273849,
    name: "John Smith",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    role: "Chief Technology Officer",
    status: "Active",
    email: "john@acme.com",
  },
  {
    id: 7492836,
    name: "Sara Johnson",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    role: "Chief Marketing Officer",
    status: "On Leave",
    email: "sara@acme.com",
  },
  {
    id: 8293746,
    name: "Michael Brown",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    role: "Chief Financial Officer",
    status: "Active",
    email: "michael@acme.com",
  },
  {
    id: 1234567,
    name: "Emily Davis",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    role: "Product Manager",
    status: "Inactive",
    email: "emily@acme.com",
  },
  {
    id: 2345678,
    name: "Davis Wilson",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    role: "Lead Designer",
    status: "Active",
    email: "davis@acme.com",
  },
  {
    id: 3456789,
    name: "Olivia Martinez",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    role: "Frontend Engineer",
    status: "Active",
    email: "olivia@acme.com",
  },
  {
    id: 4567890,
    name: "James Taylor",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    role: "Backend Engineer",
    status: "Active",
    email: "james@acme.com",
  },
];

const STATUS_COLOR_MAP: Record<Member["status"], "success" | "danger" | "warning"> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

const PAGINATION_COLUMNS = [
  { id: "name", name: "Name" },
  { id: "role", name: "Role" },
  { id: "status", name: "Status" },
  { id: "email", name: "Email" },
] as const;

const ROWS_PER_PAGE = 4;

/**
 * Organism: TableShowcaseSection
 * Implementasi lengkap contoh Table dari dokumentasi HeroUI v3:
 * Usage, Secondary Variant, Sorting, Selection, Pagination, Column Resizing,
 * Empty State, dan Custom Cells.
 */
export function TableShowcaseSection() {
  // Sorting state
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  // Selection state
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  // Pagination state
  const [page, setPage] = useState(1);

  // Custom cells state
  const [customSelectedKeys, setCustomSelectedKeys] = useState<Selection>(new Set());
  const [customSortDescriptor, setCustomSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedMembers = useMemo(() => {
    return [...MEMBERS.slice(0, 5)].sort((a, b) => {
      const col = sortDescriptor.column as keyof Member;
      const cmp = String(a[col]).localeCompare(String(b[col]));
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor]);

  const customSortedMembers = useMemo(() => {
    return [...MEMBERS.slice(0, 5)].sort((a, b) => {
      const col = customSortDescriptor.column as keyof Member;
      const cmp = String(a[col]).localeCompare(String(b[col]));
      return customSortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [customSortDescriptor]);

  const totalPages = Math.ceil(MEMBERS.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return MEMBERS.slice(start, start + ROWS_PER_PAGE);
  }, [page]);

  const startIndex = (page - 1) * ROWS_PER_PAGE + 1;
  const endIndex = Math.min(page * ROWS_PER_PAGE, MEMBERS.length);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Table</h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan data terstruktur dalam baris dan kolom menggunakan compound parts{" "}
          <code>Table</code>, <code>Table.ScrollContainer</code>,{" "}
          <code>Table.Content</code>, <code>Table.Header</code>, <code>Table.Body</code>,
          dan <code>Table.Footer</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members" className="min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader>Name</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Email</Table.Column>
                </Table.Header>
                <Table.Body>
                  {MEMBERS.slice(0, 4).map((user) => (
                    <Table.Row key={user.id} id={user.id}>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>{user.status}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>

        {/* 2. Secondary Variant */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Secondary Variant
          </h3>
          <Table variant="secondary">
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members secondary" className="min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader>Name</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Email</Table.Column>
                </Table.Header>
                <Table.Body>
                  {MEMBERS.slice(0, 4).map((user) => (
                    <Table.Row key={user.id} id={user.id}>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>{user.status}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>

        {/* 3. Sorting */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sorting</h3>
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Sortable table"
                className="min-w-[600px]"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
              >
                <Table.Header>
                  <Table.Column allowsSorting isRowHeader id="name">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Name
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="role">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Role
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="status">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Status
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="email">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Email
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {sortedMembers.map((user) => (
                    <Table.Row key={user.id} id={user.id}>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>{user.status}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>

        {/* 4. Selection */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Selection</h3>
          <div className="flex flex-col gap-3">
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Table with selection"
                  className="min-w-[600px]"
                  selectedKeys={selectedKeys}
                  selectionMode="multiple"
                  onSelectionChange={setSelectedKeys}
                >
                  <Table.Header>
                    <Table.Column className="pe-0">
                      <Checkbox aria-label="Select all" slot="selection">
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Content>
                      </Checkbox>
                    </Table.Column>
                    <Table.Column isRowHeader>Name</Table.Column>
                    <Table.Column>Role</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Email</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {MEMBERS.slice(0, 4).map((user) => (
                      <Table.Row key={user.id} id={user.id}>
                        <Table.Cell className="pe-0">
                          <Checkbox
                            aria-label={`Select ${user.name}`}
                            slot="selection"
                            variant="secondary"
                          >
                            <Checkbox.Content>
                              <Checkbox.Control>
                                <Checkbox.Indicator />
                              </Checkbox.Control>
                            </Checkbox.Content>
                          </Checkbox>
                        </Table.Cell>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>{user.status}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
            <p className="text-xs text-muted">
              Selected:{" "}
              {selectedKeys === "all"
                ? "All rows"
                : selectedKeys.size === 0
                  ? "None"
                  : `${selectedKeys.size} row(s)`}
            </p>
          </div>
        </Card>

        {/* 5. Pagination */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Pagination</h3>
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
                <Table.Header columns={[...PAGINATION_COLUMNS]}>
                  {(column) => (
                    <Table.Column isRowHeader={column.id === "name"}>
                      {column.name}
                    </Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={paginatedItems}>
                  {(user) => (
                    <Table.Row id={user.id}>
                      <Table.Collection items={[...PAGINATION_COLUMNS]}>
                        {(column) => (
                          <Table.Cell>{user[column.id]}</Table.Cell>
                        )}
                      </Table.Collection>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  {startIndex} to {endIndex} of {MEMBERS.length} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon />
                      Prev
                    </Pagination.Previous>
                  </Pagination.Item>
                  {pages.map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </Table.Footer>
          </Table>
        </Card>

        {/* 6. Column Resizing */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Column Resizing
          </h3>
          <Table>
            <Table.ResizableContainer>
              <Table.Content
                aria-label="Table with resizable columns"
                className="min-w-[700px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
                    Name
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="role" minWidth={220}>
                    Role
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
                    Email
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {MEMBERS.slice(0, 5).map((user) => (
                    <Table.Row key={user.id} id={user.id}>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <Chip color={STATUS_COLOR_MAP[user.status]} size="sm" variant="soft">
                          {user.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        </Card>

        {/* 7. Empty State */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Empty State</h3>
          <Table className="min-h-[200px]">
            <Table.ScrollContainer>
              <Table.Content aria-label="Empty table" className="h-full min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader>Name</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Email</Table.Column>
                </Table.Header>
                <Table.Body
                  renderEmptyState={() => (
                    <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                      <Inbox className="size-6 text-muted" />
                      <span className="text-sm text-muted">No results found</span>
                    </EmptyState>
                  )}
                >
                  {[]}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>

        {/* 8. Custom Cells */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Cells
          </h3>
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Table with custom cells"
                className="min-w-[800px]"
                selectedKeys={customSelectedKeys}
                selectionMode="multiple"
                sortDescriptor={customSortDescriptor}
                onSelectionChange={setCustomSelectedKeys}
                onSortChange={setCustomSortDescriptor}
              >
                <Table.Header>
                  <Table.Column className="pe-0">
                    <Checkbox aria-label="Select all custom rows" slot="selection">
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Column>
                  <Table.Column allowsSorting isRowHeader className="after:hidden" id="id">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Worker ID
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="name">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Member
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="role">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Role
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="status">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Status
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column className="text-end">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {customSortedMembers.map((user) => (
                    <Table.Row key={user.id} id={user.id}>
                      <Table.Cell className="pe-0">
                        <Checkbox
                          aria-label={`Select ${user.name}`}
                          slot="selection"
                          variant="secondary"
                        >
                          <Checkbox.Content>
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                          </Checkbox.Content>
                        </Checkbox>
                      </Table.Cell>
                      <Table.Cell className="font-medium">
                        <div className="flex items-center gap-2">
                          #{user.id.toString()}
                          <Button
                            isIconOnly
                            aria-label={`Copy ID #${user.id}`}
                            size="sm"
                            variant="ghost"
                          >
                            <Copy className="size-4 text-muted" />
                          </Button>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <Avatar.Image alt={user.name} src={user.image_url} />
                            <Avatar.Fallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-xs">{user.name}</span>
                            <span className="text-xs text-muted">{user.email}</span>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="min-w-52">{user.role}</Table.Cell>
                      <Table.Cell className="min-w-25">
                        <Chip color={STATUS_COLOR_MAP[user.status]} size="sm" variant="soft">
                          {user.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            isIconOnly
                            aria-label={`View ${user.name}`}
                            size="sm"
                            variant="tertiary"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            isIconOnly
                            aria-label={`Edit ${user.name}`}
                            size="sm"
                            variant="tertiary"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            isIconOnly
                            aria-label={`Delete ${user.name}`}
                            size="sm"
                            variant="danger-soft"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>
      </div>
    </section>
  );
}
