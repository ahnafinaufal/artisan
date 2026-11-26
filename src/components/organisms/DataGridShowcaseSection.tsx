import { useMemo, useState } from "react";
import type { Selection, SortDescriptor } from "@heroui/react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  Input,
  Pagination,
  Table,
} from "@heroui/react";
import { Columns3, MoreHorizontal, Search } from "lucide-react";

interface Payment {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "succeeded" | "pending" | "failed";
  date: string;
}

const PAYMENTS: Payment[] = [
  {
    id: "pay_01",
    customer: "Kate Moore",
    email: "kate@acme.com",
    amount: 420.0,
    status: "succeeded",
    date: "2026-11-24",
  },
  {
    id: "pay_02",
    customer: "John Smith",
    email: "john@acme.com",
    amount: 185.5,
    status: "pending",
    date: "2026-11-23",
  },
  {
    id: "pay_03",
    customer: "Sara Johnson",
    email: "sara@acme.com",
    amount: 960.0,
    status: "succeeded",
    date: "2026-11-22",
  },
  {
    id: "pay_04",
    customer: "Michael Brown",
    email: "michael@acme.com",
    amount: 75.25,
    status: "failed",
    date: "2026-11-21",
  },
  {
    id: "pay_05",
    customer: "Emily Davis",
    email: "emily@acme.com",
    amount: 540.0,
    status: "succeeded",
    date: "2026-11-20",
  },
];

const PAYMENT_STATUS_COLOR: Record<
  Payment["status"],
  "success" | "warning" | "danger"
> = {
  succeeded: "success",
  pending: "warning",
  failed: "danger",
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: "Engineering" | "Design" | "Product";
  status: "Active" | "On Leave";
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm_1",
    name: "Kate Moore",
    email: "kate@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    role: "Staff Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "tm_2",
    name: "John Smith",
    email: "john@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    role: "Product Designer",
    department: "Design",
    status: "Active",
  },
  {
    id: "tm_3",
    name: "Sara Johnson",
    email: "sara@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    role: "Product Manager",
    department: "Product",
    status: "On Leave",
  },
  {
    id: "tm_4",
    name: "Michael Brown",
    email: "michael@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    role: "Frontend Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "tm_5",
    name: "Emily Davis",
    email: "emily@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    role: "Design Lead",
    department: "Design",
    status: "Active",
  },
  {
    id: "tm_6",
    name: "James Taylor",
    email: "james@acme.com",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    role: "Backend Engineer",
    department: "Engineering",
    status: "Active",
  },
];

const ROWS_PER_PAGE = 3;

/**
 * Organism: DataGridShowcaseSection
 * Showcase Data Grid (HeroUI Pro pattern dibangun di atas @heroui/react Table):
 * 1. Payments: client-side sorting, column resizing, multi-selection, dan actions.
 * 2. Team Members: search, filter status, column visibility toggle, dan pagination.
 */
export function DataGridShowcaseSection() {
  // Payments state
  const [paymentSelection, setPaymentSelection] = useState<Selection>(new Set());
  const [paymentSort, setPaymentSort] = useState<SortDescriptor>({
    column: "customer",
    direction: "ascending",
  });

  // Team Members state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "On Leave">("all");
  const [showDepartment, setShowDepartment] = useState(true);
  const [teamPage, setTeamPage] = useState(1);

  const sortedPayments = useMemo(() => {
    return [...PAYMENTS].sort((a, b) => {
      const col = paymentSort.column as keyof Payment;
      const cmp =
        col === "amount"
          ? a.amount - b.amount
          : String(a[col]).localeCompare(String(b[col]));
      return paymentSort.direction === "descending" ? -cmp : cmp;
    });
  }, [paymentSort]);

  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TEAM_MEMBERS.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / ROWS_PER_PAGE));
  const currentPage = Math.min(teamPage, totalPages);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredMembers.slice(start, start + ROWS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Data Grid
          </h2>
          <Chip size="sm" variant="primary">
            Pro
          </Chip>
        </div>
        <p className="mt-1 text-sm text-muted">
          Grid data interaktif dengan sorting, multi-selection, column resizing,
          search, filter, dan pagination menggunakan <code>Table</code> HeroUI v3.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Payments Data Grid */}
        <Card className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">Payments</h3>
              <p className="text-xs text-muted">
                Client-side sorting, column resizing, dan multi-selection.
              </p>
            </div>
            <span className="text-xs text-muted">
              Selected:{" "}
              {paymentSelection === "all"
                ? "All"
                : paymentSelection.size === 0
                  ? "0"
                  : paymentSelection.size}
            </span>
          </div>

          <Table>
            <Table.ResizableContainer>
              <Table.Content
                aria-label="Payments data grid"
                className="min-w-[680px]"
                selectedKeys={paymentSelection}
                selectionMode="multiple"
                sortDescriptor={paymentSort}
                onSelectionChange={setPaymentSelection}
                onSortChange={setPaymentSort}
              >
                <Table.Header>
                  <Table.Column className="pe-0" width={40}>
                    <Checkbox aria-label="Select all payments" slot="selection">
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Column>
                  <Table.Column
                    allowsSorting
                    isRowHeader
                    defaultWidth="1.5fr"
                    id="customer"
                    minWidth={180}
                  >
                    <Table.SortableColumnHeader
                      sortDirection={
                        paymentSort.column === "customer"
                          ? paymentSort.direction
                          : undefined
                      }
                    >
                      Customer
                    </Table.SortableColumnHeader>
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column allowsSorting defaultWidth="1fr" id="amount" minWidth={120}>
                    <Table.SortableColumnHeader
                      sortDirection={
                        paymentSort.column === "amount"
                          ? paymentSort.direction
                          : undefined
                      }
                    >
                      Amount
                    </Table.SortableColumnHeader>
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column allowsSorting defaultWidth="1fr" id="status" minWidth={120}>
                    <Table.SortableColumnHeader
                      sortDirection={
                        paymentSort.column === "status"
                          ? paymentSort.direction
                          : undefined
                      }
                    >
                      Status
                    </Table.SortableColumnHeader>
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="date" minWidth={120}>
                    Date
                  </Table.Column>
                  <Table.Column className="text-end" width={64}>
                    Actions
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {sortedPayments.map((item) => (
                    <Table.Row key={item.id} id={item.id}>
                      <Table.Cell className="pe-0">
                        <Checkbox
                          aria-label={`Select ${item.customer}`}
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
                      <Table.Cell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {item.customer}
                          </span>
                          <span className="text-xs text-muted">{item.email}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="font-mono text-sm">
                        ${item.amount.toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          color={PAYMENT_STATUS_COLOR[item.status]}
                          size="sm"
                          variant="soft"
                        >
                          {item.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="text-xs text-muted">{item.date}</Table.Cell>
                      <Table.Cell className="text-end">
                        <Button
                          isIconOnly
                          aria-label={`Actions for ${item.customer}`}
                          size="sm"
                          variant="ghost"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        </Card>

        {/* 2. Team Members Data Grid */}
        <Card className="p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Team Members
              </h3>
              <p className="text-xs text-muted">
                Search, filter status, column visibility toggle, dan pagination.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted" />
                <Input
                  aria-label="Search team members"
                  className="pl-8 text-xs"
                  placeholder="Cari anggota..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setTeamPage(1);
                  }}
                />
              </div>
              <Button
                size="sm"
                variant={statusFilter === "all" ? "primary" : "tertiary"}
                onPress={() => {
                  setStatusFilter("all");
                  setTeamPage(1);
                }}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={statusFilter === "Active" ? "primary" : "tertiary"}
                onPress={() => {
                  setStatusFilter("Active");
                  setTeamPage(1);
                }}
              >
                Active
              </Button>
              <Button
                size="sm"
                variant={statusFilter === "On Leave" ? "primary" : "tertiary"}
                onPress={() => {
                  setStatusFilter("On Leave");
                  setTeamPage(1);
                }}
              >
                On Leave
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() => setShowDepartment((prev) => !prev)}
              >
                <Columns3 className="size-3.5" />
                {showDepartment ? "Hide Dept" : "Show Dept"}
              </Button>
            </div>
          </div>

          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members data grid" className="min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader>Member</Table.Column>
                  <Table.Column>Role</Table.Column>
                  {showDepartment ? <Table.Column>Department</Table.Column> : null}
                  <Table.Column>Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  {paginatedMembers.map((member) => (
                    <Table.Row key={member.id} id={member.id}>
                      <Table.Cell>
                        <div className="flex items-center gap-2.5">
                          <Avatar size="sm">
                            <Avatar.Image alt={member.name} src={member.avatar} />
                            <Avatar.Fallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {member.name}
                            </span>
                            <span className="text-xs text-muted">{member.email}</span>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-sm">{member.role}</Table.Cell>
                      {showDepartment ? (
                        <Table.Cell className="text-sm text-muted">
                          {member.department}
                        </Table.Cell>
                      ) : null}
                      <Table.Cell>
                        <Chip
                          color={member.status === "Active" ? "success" : "warning"}
                          size="sm"
                          variant="soft"
                        >
                          {member.status}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  {filteredMembers.length === 0
                    ? "0 results"
                    : `${(currentPage - 1) * ROWS_PER_PAGE + 1} to ${Math.min(
                        currentPage * ROWS_PER_PAGE,
                        filteredMembers.length,
                      )} of ${filteredMembers.length} results`}
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={currentPage === 1}
                      onPress={() => setTeamPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon />
                      Prev
                    </Pagination.Previous>
                  </Pagination.Item>
                  {pages.map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() => setTeamPage(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={currentPage === totalPages}
                      onPress={() => setTeamPage((p) => Math.min(totalPages, p + 1))}
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
      </div>
    </section>
  );
}
