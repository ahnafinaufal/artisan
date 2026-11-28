# Architecture Guide (`ARCHITECTURE.md`)

Dokumentasi arsitektur kode, konsep **Atomic Design**, struktur direktori, dan alur state aplikasi pada proyek **HeroUI v3 Design System**.

---

## 1. Tech Stack
- **Framework:** React `19.3.x` + TypeScript
- **Build Tool:** Vite `8.3.x`
- **UI & Aksesibilitas:** `@heroui/react` `^3.2.8`, `@heroui/styles` `^3.2.8`, `react-aria`, `react-aria-components`, `@internationalized/date`
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons & Charts:** `lucide-react`, `recharts`

---

## 2. Struktur Direktori
```text
src/
├── App.tsx                       # Shell utama, state tema, breadcrumbs, dan route section
├── index.css                     # Import Tailwind v4 + @heroui/styles + token bridge @theme
├── main.tsx                      # Entry point React
├── data/
│   └── componentsCatalog.ts      # Katalog 91 komponen HeroUI (kategori, atomicLevel, docs href, isPro)
└── components/
    ├── atoms/                    # Primitif UI terkecil tanpa state kompleks
    ├── molecules/                # Komposisi beberapa atom (FormField, SearchInput, KPI, ComponentPreview, dll.)
    └── organisms/                # Section mandiri, Sidebar, NavbarHeader, Catalog, & *ShowcaseSection
        └── charts/               # Komponen chart berbasis Recharts
```

---

## 3. Konsep Atomic Design
Pemetaan komponen mengikuti tiga lapisan utama:

1. **Atoms (`src/components/atoms/`)**
   - Blok penyusun terkecil dan *reusable* tanpa ketergantungan bisnis.
   - Contoh: `ActionButton`, `StatusChip`/`StatusBadge`, `Divider`, `FormPrimitives`, `EmojiReactionButton`.
2. **Molecules (`src/components/molecules/`)**
   - Gabungan beberapa atom yang membentuk satu unit fungsional.
   - Contoh: `FormField`, `SearchInput`, `SelectField`, `StatusAlert`, `SidebarNavItem`, `ComponentPreview`, `KPI`, `ChartTooltip`.
3. **Organisms (`src/components/organisms/`)**
   - Bagian antarmuka mandiri yang menyusun atoms & molecules menjadi halaman atau section lengkap.
   - Contoh: `Sidebar`, `NavbarHeader`, `ComponentCatalogSection`, `InteractivePlayground`, serta seluruh `*ShowcaseSection.tsx`.

---

## 4. Alur Navigasi & State (`src/App.tsx`)
Aplikasi menggunakan *section-based state routing* di `src/App.tsx` dan pemetaan URL di `src/navigation.ts`:
- **`activeSection` (`ActiveSection` union):** Menentukan section yang dirender di `<main>`.
- **Workspace:** `/workspace` membuka Dashboard; `/workspace/bank-ide` membuka Bank Ide, dengan turunan `/create`, `/edit/:id`, dan `/view/:id`. URL lama `/bank-ide` dialihkan ke jalur Workspace.
- **Components:** `/components` membuka katalog; `/components/:section` membuka showcase, sedangkan `/components/detail/:name` membuka detail generik. Navigasi browser *back/forward* memulihkan section dari URL.
- **Catalog Filters:** `selectedLevel` (`"all" | "atom" | "molecule" | "organism"`), `selectedCategory` (`"all" | ComponentCategory`), dan `searchQuery` (otomatis mengarahkan ke `"catalog"` saat diketik).
- **Mapping Komponen:**
  - `COMPONENT_SECTION_MAP` di `src/components/organisms/Sidebar.tsx` memetakan nama komponen → `ActiveSection`.
  - `DETAIL_SECTION_MAP` di `src/components/organisms/ComponentCatalogSection.tsx` mengaktifkan klik judul & tombol `Detail →` pada kartu katalog.
  - Komponen yang tidak ada di map jatuh ke fallback generik `ComponentDetailSection` menggunakan `selectedComponentName`.
- **Global Providers:** `<Toast.Provider placement="bottom end" />` terpasang di root `App.tsx`.

---

## 5. Kontrak Penambahan Komponen Showcase Baru
1. Buat `src/components/organisms/<Name>ShowcaseSection.tsx`.
2. Export di `src/components/organisms/index.ts`.
3. Tambahkan union key ke `ActiveSection` dan entri ke `COMPONENT_SECTION_MAP` di `src/components/organisms/Sidebar.tsx`.
4. Tambahkan entri ke `DETAIL_SECTION_MAP` di `src/components/organisms/ComponentCatalogSection.tsx`.
5. Tambahkan import, entri `breadcrumbs`, dan conditional render di `src/App.tsx`.
