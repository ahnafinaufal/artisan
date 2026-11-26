# Design System Guide (`DESIGN.md`)

Panduan visual, token tema, dan konvensi UI untuk proyek **HeroUI v3 Design System** (`@heroui/react` + Tailwind CSS v4).

---

## 1. Prinsip Dasar
- **HeroUI v3 Native First:** Gunakan komponen dan compound parts resmi dari `@heroui/react` (`v3.2.8`) beserta `@heroui/styles`.
- **Token-Driven Styling:** Seluruh warna, permukaan, border, dan status harus memakai semantic tokens dari tema HeroUI—hindari warna *hardcoded* (`#hex`, `rgb()`) untuk elemen UI umum.
- **Responsive & Accessible:** Setiap kontrol interaktif wajib mendukung navigasi keyboard (React Aria) dan kontras warna yang memadai di mode terang maupun gelap.

---

## 2. Token Tema (HeroUI v3 → Tailwind CSS v4)
Token HeroUI dipetakan ke utilitas Tailwind v4 melalui blok `@theme` di `src/index.css`:

| Kategori | CSS Variable | Utility Tailwind v4 | Kegunaan |
| --- | --- | --- | --- |
| **Canvas** | `--background` / `--foreground` | `bg-background`, `text-foreground` | Latar utama aplikasi & teks utama |
| **Muted & Border** | `--muted` / `--border` / `--ring` | `text-muted`, `border-border`, `ring-ring` | Teks sekunder, garis pemisah, fokus |
| **Surface** | `--surface` / `--surface-secondary` / `--overlay` | `bg-surface`, `bg-surface-secondary`, `bg-overlay` | Kartu, panel, popover, dan lapisan kontainer |
| **Brand / Accent** | `--accent` / `--accent-foreground` / `--accent-surface` | `bg-accent`, `text-accent-foreground` | Aksi utama dan highlight interaktif |
| **Primary** | `--default` / `--default-foreground` | `bg-primary`, `text-primary-foreground` | Token default HeroUI |
| **Semantic Status** | `--success`, `--warning`, `--danger` (+ `-foreground`) | `bg-success`, `bg-warning`, `bg-danger` | Status validasi, notifikasi, alert |

---

## 3. Dark & Light Mode
- Tailwind v4 menggunakan custom variant:
  `@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));`
- State tema dikelola di `src/App.tsx`:
  - Menambahkan/menghapus class `.dark` pada `document.documentElement`.
  - Mengatur `data-theme="dark" | "light"` dan `style.colorScheme`.
  - Disimpan ke `localStorage` dengan key `"heroui-theme"`.

---

## 4. Konvensi Layout Halaman Showcase
Setiap komponen showcase (`src/components/organisms/*ShowcaseSection.tsx`) mengikuti struktur konsisten:

1. **Wrapper Section:** `<section className="space-y-8">`
2. **Header:**
   - Judul komponen: `<h2 className="text-2xl font-bold tracking-tight text-foreground">`
   - Deskripsi singkat: `<p className="mt-1 text-sm text-muted">` dengan nama compound parts di dalam `<code>`.
3. **Grid Contoh:** `<div className="grid gap-6 lg:grid-cols-2">` (atau `lg:grid-cols-3` / `max-w-md` untuk komponen tunggal).
4. **Kartu Contoh:** `<Card className="p-5">` dengan sub-judul `<h3 className="mb-4 text-base font-semibold text-foreground">`.

---

## 5. Visualisasi Data & Charts
- Komponen chart menggunakan `recharts` dengan kelas pembungkus `.heroui-chart` (serta `.pie-chart`, `.radial-chart`, `.radar-chart`) di `src/index.css` agar tick, gridline, dan tooltip otomatis mengikuti `--muted`, `--surface`, dan `--border`.
- Tooltip chart menggunakan molecule `src/components/molecules/ChartTooltip.tsx`.

---

## 6. Aksesibilitas (React Aria)
- Tombol `isIconOnly` wajib memiliki `aria-label`.
- Komponen form wajib menyertakan `<Label>`, serta `<Description>` / `<FieldError>` bila relevan.
- Grup kontrol (`ToggleButtonGroup`, `RadioGroup`, `ListBox`, `Calendar`, `RangeCalendar`) wajib memiliki `<Label>` atau `aria-label`.
