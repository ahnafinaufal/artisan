import { useState } from "react";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { ArrowRight, GripVertical, MoreHorizontal, Plus } from "lucide-react";

type ColumnId = "todo" | "in-progress" | "done";

interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  column: ColumnId;
}

const INITIAL_TASKS: KanbanTask[] = [
  {
    id: "t1",
    title: "Design token audit for dark mode",
    tag: "Design",
    priority: "High",
    assignee: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    column: "todo",
  },
  {
    id: "t2",
    title: "Add keyboard navigation to DataGrid",
    tag: "A11y",
    priority: "Medium",
    assignee: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    column: "todo",
  },
  {
    id: "t3",
    title: "Implement EmptyState variants",
    tag: "UI",
    priority: "Medium",
    assignee: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    column: "in-progress",
  },
  {
    id: "t4",
    title: "Optimize chart tooltip animations",
    tag: "Perf",
    priority: "Low",
    assignee: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    column: "in-progress",
  },
  {
    id: "t5",
    title: "Release HeroUI v3.2.8 showcase",
    tag: "Release",
    priority: "High",
    assignee: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    column: "done",
  },
];

const COLUMNS: Array<{
  id: ColumnId;
  title: string;
  dotColor: string;
}> = [
  { id: "todo", title: "To do", dotColor: "bg-muted" },
  { id: "in-progress", title: "In Progress", dotColor: "bg-accent" },
  { id: "done", title: "Done", dotColor: "bg-success" },
];

const PRIORITY_COLOR: Record<KanbanTask["priority"], "danger" | "warning" | "default"> = {
  High: "danger",
  Medium: "warning",
  Low: "default",
};

/**
 * Organism: KanbanShowcaseSection
 * Showcase Kanban Board (HeroUI Pro pattern) dengan kolom To do / In Progress / Done,
 * drag-and-drop antar kolom, indikator jumlah, dan ukuran kartu (sm, md, lg).
 */
export function KanbanShowcaseSection() {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const moveTask = (taskId: string, toColumn: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: toColumn } : t)),
    );
  };

  const nextColumn = (col: ColumnId): ColumnId =>
    col === "todo" ? "in-progress" : col === "in-progress" ? "done" : "todo";

  const colWidthClass =
    size === "sm" ? "w-60" : size === "lg" ? "w-80" : "w-72";
  const cardPadClass =
    size === "sm" ? "p-2.5 text-xs" : size === "lg" ? "p-4 text-base" : "p-3 text-sm";

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Kanban
            </h2>
            <span className="rounded bg-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted">
              PRO
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Papan kanban drag-and-drop dengan kolom, kartu, indikator status, dan
            pilihan ukuran (<code>sm</code>, <code>md</code>, <code>lg</code>).
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={size === s ? "primary" : "tertiary"}
              onPress={() => setSize(s)}
            >
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <Card className="overflow-x-auto p-5">
        <div className="flex min-w-max gap-4">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.column === col.id);
            return (
              <div
                key={col.id}
                className={`flex shrink-0 flex-col gap-3 ${colWidthClass}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedId) {
                    moveTask(draggedId, col.id);
                    setDraggedId(null);
                  }
                }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${col.dotColor}`} />
                    <span className="text-sm font-semibold text-foreground">
                      {col.title}
                    </span>
                    <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-xs text-muted">
                      {colTasks.length}
                    </span>
                  </div>
                  <Button
                    isIconOnly
                    aria-label={`Options for ${col.title}`}
                    size="sm"
                    variant="ghost"
                  >
                    <MoreHorizontal className="size-4 text-muted" />
                  </Button>
                </div>

                {/* Column Body */}
                <div className="flex min-h-[260px] flex-col gap-2.5 rounded-2xl bg-surface-secondary/50 p-2.5">
                  {colTasks.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted">
                      Drop card here
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => setDraggedId(task.id)}
                        onDragEnd={() => setDraggedId(null)}
                        className={`group flex cursor-grab flex-col gap-2 rounded-xl border border-border/70 bg-surface shadow-sm transition-all hover:border-border hover:shadow-md active:cursor-grabbing ${cardPadClass} ${
                          draggedId === task.id ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-foreground">
                            {task.title}
                          </span>
                          <GripVertical className="size-4 shrink-0 text-muted opacity-50 group-hover:opacity-100" />
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <Chip
                              color={PRIORITY_COLOR[task.priority]}
                              size="sm"
                              variant="soft"
                            >
                              {task.priority}
                            </Chip>
                            <Chip size="sm" variant="secondary">
                              {task.tag}
                            </Chip>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Button
                              isIconOnly
                              aria-label="Move to next column"
                              size="sm"
                              variant="ghost"
                              onPress={() => moveTask(task.id, nextColumn(col.id))}
                            >
                              <ArrowRight className="size-3.5 text-muted" />
                            </Button>
                            <Avatar size="sm" className="size-6">
                              <Avatar.Image alt={task.title} src={task.assignee} />
                              <Avatar.Fallback>U</Avatar.Fallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <Button
                    className="mt-auto w-full justify-start text-muted"
                    size="sm"
                    variant="ghost"
                    onPress={() =>
                      setTasks((prev) => [
                        ...prev,
                        {
                          id: `t_${Date.now()}`,
                          title: "New task item",
                          tag: "Task",
                          priority: "Medium",
                          assignee:
                            "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
                          column: col.id,
                        },
                      ])
                    }
                  >
                    <Plus className="size-3.5" />
                    Add card
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
