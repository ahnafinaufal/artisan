import { useRef, useState } from "react";
import { Card, Table, toast } from "@heroui/react";
import {
  Bold,
  Code,
  Italic,
  List,
  Paperclip,
  Send,
  UploadCloud,
} from "lucide-react";
import {
  ActionButton,
  DismissButton,
  StatusChip,
  ToggleChipButton,
} from "../atoms";

/**
 * Organism: DropZoneCard
 * Area drag-and-drop upload file dengan daftar file & tombol hapus.
 */
export function DropZoneCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>(["design-tokens.json"]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const names = Array.from(fileList).map((f) => f.name);
    setFiles((prev) => Array.from(new Set([...prev, ...names])));
  };

  return (
    <div className="w-full max-w-[240px] space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={[
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-3 text-center transition-colors",
          isDragging
            ? "border-accent bg-accent/10"
            : "border-border bg-surface hover:border-accent/60",
        ].join(" ")}
      >
        <UploadCloud className="mb-1 h-5 w-5 text-accent" />
        <p className="text-xs font-medium text-foreground">Drop files here</p>
        <p className="text-[10px] text-muted">atau klik untuk memilih</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {files.slice(0, 2).map((file) => (
            <StatusChip key={file} size="sm" variant="soft" color="default">
              <span className="inline-flex items-center gap-1">
                <span className="max-w-[110px] truncate">{file}</span>
                <DismissButton
                  aria-label={`Hapus ${file}`}
                  onPress={() => setFiles((prev) => prev.filter((f) => f !== file))}
                />
              </span>
            </StatusChip>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Organism: RichTextEditorCard
 * Editor teks dengan toolbar format (Bold, Italic, Code, List) & penghitung karakter.
 */
export function RichTextEditorCard() {
  const [text, setText] = useState("HeroUI v3 + Atomic Design");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-2 py-1">
        <div className="flex items-center gap-1">
          <ToggleChipButton
            size="sm"
            isSelected={bold}
            onChange={setBold}
            aria-label="Bold"
            className="h-6 w-6 min-w-6 p-0"
          >
            <Bold className="h-3 w-3" />
          </ToggleChipButton>
          <ToggleChipButton
            size="sm"
            isSelected={italic}
            onChange={setItalic}
            aria-label="Italic"
            className="h-6 w-6 min-w-6 p-0"
          >
            <Italic className="h-3 w-3" />
          </ToggleChipButton>
          <ToggleChipButton
            size="sm"
            aria-label="Code"
            className="h-6 w-6 min-w-6 p-0"
          >
            <Code className="h-3 w-3" />
          </ToggleChipButton>
          <ToggleChipButton
            size="sm"
            aria-label="List"
            className="h-6 w-6 min-w-6 p-0"
          >
            <List className="h-3 w-3" />
          </ToggleChipButton>
        </div>
        <span className="text-[10px] tabular-nums text-muted">{text.length} ch</span>
      </div>
      <textarea
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Rich text editor"
        className={[
          "w-full resize-none bg-transparent p-2 text-xs text-foreground outline-none",
          bold ? "font-bold" : "",
          italic ? "italic" : "",
        ].join(" ")}
      />
    </div>
  );
}

/**
 * Organism: PromptInputBox
 * AI Prompt composer dengan attachment, pilihan model, dan tombol kirim.
 */
export function PromptInputBox() {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;
    toast.success("Prompt dikirim", { description: prompt });
    setPrompt("");
  };

  return (
    <div className="w-full max-w-[240px] rounded-xl border border-border bg-surface p-2 shadow-2xs">
      <textarea
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Tanya AI tentang HeroUI..."
        aria-label="Prompt input"
        className="w-full resize-none bg-transparent text-xs text-foreground placeholder:text-muted outline-none"
      />
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ActionButton isIconOnly size="sm" variant="ghost" aria-label="Attach">
            <Paperclip className="h-3.5 w-3.5" />
          </ActionButton>
          <StatusChip size="sm" variant="soft" color="accent">
            v3.2
          </StatusChip>
        </div>
        <ActionButton
          isIconOnly
          size="sm"
          variant="primary"
          aria-label="Send prompt"
          onPress={handleSend}
        >
          <Send className="h-3.5 w-3.5" />
        </ActionButton>
      </div>
    </div>
  );
}

/**
 * Organism: DataGridPreview
 * DataGrid interaktif dengan selection & status chip berbasis HeroUI Table.
 */
export function DataGridPreview() {
  const rows = [
    { id: "1", name: "Button", status: "Stable" },
    { id: "2", name: "DataGrid", status: "Custom" },
  ];

  return (
    <Table className="w-full max-w-[240px]">
      <Table.Content
        aria-label="DataGrid preview"
        selectionMode="multiple"
        defaultSelectedKeys={["1"]}
      >
        <Table.Header>
          <Table.Column isRowHeader className="text-[11px]">
            Comp
          </Table.Column>
          <Table.Column className="text-[11px]">Status</Table.Column>
        </Table.Header>
        <Table.Body items={rows}>
          {(row) => (
            <Table.Row id={row.id}>
              <Table.Cell className="text-xs font-medium">{row.name}</Table.Cell>
              <Table.Cell>
                <StatusChip size="sm" variant="soft" color="success">
                  {row.status}
                </StatusChip>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}

/**
 * Organism: MiniAreaChart & MiniBarChart
 * Visualisasi grafik SVG interaktif dengan hover crosshair & tooltip bertoken HeroUI v3.
 */
const AREA_DATA = [
  { label: "Mon", value: 420 },
  { label: "Tue", value: 680 },
  { label: "Wed", value: 590 },
  { label: "Thu", value: 980 },
  { label: "Fri", value: 890 },
  { label: "Sat", value: 1240 },
  { label: "Sun", value: 1380 },
];

export function MiniAreaChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const width = 180;
  const height = 56;
  const maxVal = 1500;

  const points = AREA_DATA.map((d, i) => ({
    ...d,
    x: (i / (AREA_DATA.length - 1)) * width,
    y: height - (d.value / maxVal) * (height - 10) - 4,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <div className="relative w-full max-w-[230px] rounded-xl bg-surface p-2.5">
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-medium text-foreground">Traffic</span>
        <span className="tabular-nums text-muted">
          {activePoint ? `${activePoint.label}: ${activePoint.value}` : "7d"}
        </span>
      </div>

      {activePoint ? (
        <div
          style={{
            left: `${Math.min(Math.max((activePoint.x / width) * 100, 18), 82)}%`,
          }}
          className="pointer-events-none absolute top-6 z-10 -translate-x-1/2 rounded-md border border-border bg-overlay px-1.5 py-0.5 text-[10px] font-medium text-foreground shadow-sm whitespace-nowrap"
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {activePoint.label} · {activePoint.value}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-14 w-full cursor-crosshair overflow-visible"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <defs>
          <linearGradient id="herouiAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#herouiAreaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {activePoint ? (
          <>
            <line
              x1={activePoint.x}
              y1={0}
              x2={activePoint.x}
              y2={height}
              stroke="var(--border)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="3.5"
              fill="var(--accent)"
              stroke="var(--surface)"
              strokeWidth="1.5"
            />
          </>
        ) : null}

        {/* Invisible hover columns per point */}
        {points.map((p, i) => (
          <rect
            key={p.label}
            x={p.x - width / (points.length * 2)}
            y={0}
            width={width / points.length}
            height={height}
            fill="transparent"
            onMouseEnter={() => setActiveIndex(i)}
          />
        ))}
      </svg>
    </div>
  );
}

const BAR_DATA = [
  { label: "Jan", value: 240, pct: 38 },
  { label: "Feb", value: 380, pct: 60 },
  { label: "Mar", value: 300, pct: 48 },
  { label: "Apr", value: 480, pct: 80 },
  { label: "May", value: 360, pct: 58 },
  { label: "Jun", value: 520, pct: 90 },
];

export function MiniBarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeBar = activeIndex !== null ? BAR_DATA[activeIndex] : null;

  return (
    <div className="relative w-full max-w-[230px] rounded-xl bg-surface p-2.5">
      <div className="mb-1.5 flex items-center justify-between text-[11px]">
        <span className="font-medium text-foreground">Components</span>
        <span className="tabular-nums text-muted">
          {activeBar ? `${activeBar.label}: ${activeBar.value}` : "Monthly"}
        </span>
      </div>

      <div
        className="flex h-14 items-end justify-between gap-2 px-1"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {BAR_DATA.map((bar, i) => {
          const isActive = activeIndex === i;
          const isDimmed = activeIndex !== null && !isActive;
          return (
            <div
              key={bar.label}
              onMouseEnter={() => setActiveIndex(i)}
              className="group relative flex h-full flex-1 cursor-pointer items-end"
            >
              {isActive ? (
                <div className="pointer-events-none absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-md border border-border bg-overlay px-1.5 py-0.5 text-[10px] font-medium text-foreground shadow-sm whitespace-nowrap">
                  {bar.label}: {bar.value}
                </div>
              ) : null}
              <div
                style={{ height: `${bar.pct}%` }}
                className={[
                  "w-full rounded-t transition-all duration-150",
                  isActive
                    ? "bg-accent shadow-xs"
                    : isDimmed
                      ? "bg-accent/35"
                      : "bg-accent/80",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Organism: AppLayoutPreview
 * Miniatur AppLayout & Navbar dengan sidebar, topbar, dan konten utama.
 */
export function AppLayoutPreview({ mode = "layout" }: { mode?: "layout" | "navbar" }) {
  if (mode === "navbar") {
    return (
      <Card className="w-full max-w-[230px] p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground">HeroUI</span>
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span className="text-foreground font-medium">Docs</span>
            <span>UI</span>
            <StatusChip size="sm" variant="soft" color="accent">
              v3
            </StatusChip>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid h-20 w-full max-w-[230px] grid-cols-[52px_1fr] overflow-hidden rounded-lg border border-border bg-surface text-[10px]">
      <div className="border-r border-border bg-surface-secondary p-1.5 font-medium text-muted">
        Sidebar
      </div>
      <div className="flex flex-col">
        <div className="border-b border-border px-2 py-1 font-medium text-foreground">
          Navbar
        </div>
        <div className="flex-1 p-2 text-muted">Main Content</div>
      </div>
    </div>
  );
}
