# Agent Guidelines (`AGENTS.md`)

Panduan operasional untuk AI coding agents dan kontributor yang bekerja pada repositori ini.

---

## 1. Perintah Utama
- **Dev Server:** `npm run dev` (berjalan di `http://localhost:5173/`)
- **Typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Production Build:** `npm run build` (`tsc -b && vite build`)

> **Aturan Wajib:** Setiap perubahan kode harus diverifikasi dengan `npm run typecheck && npm run build` dan lulus tanpa error sebelum selesai.

---

## 2. Referensi Dokumen Proyek
- Baca [ARCHITECTURE.md](./ARCHITECTURE.md) untuk memahami struktur Atomic Design, katalog komponen, dan alur navigasi/state.
- Baca [DESIGN.md](./DESIGN.md) untuk memahami token tema HeroUI v3 → Tailwind v4, aturan dark mode, dan konvensi layout showcase.

---

## 3. Aturan Ketat HeroUI v3 (`@heroui/react`)
1. **Gunakan API v3 Resmi:** Proyek ini memakai `@heroui/react` `^3.2.8` (berbasis React Aria & Tailwind v4), **bukan** HeroUI v2 / NextUI. Jangan gunakan `NextUIProvider` atau prop lama yang tidak ada di v3.
2. **Verifikasi Props & Compound Parts:** Sebelum menulis komponen baru, periksa definisi tipe terpasang di `node_modules/@heroui/react/dist/components/<slug>/<slug>.d.ts` (dan `index.d.ts`) atau dokumentasi resmi `https://heroui.com/en/docs/react/components/<slug>.mdx`.
3. **Gunakan Semantic Tokens:** Jangan menulis warna *hardcoded* untuk surface, text, atau border; gunakan class Tailwind yang terhubung ke token di `src/index.css` (`bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-accent`, dll.).

---

## 4. Checklist Menambah Showcase Komponen
Saat menambahkan atau mengupdate halaman detail komponen:
1. Buat `<Name>ShowcaseSection.tsx` di `src/components/organisms/`.
2. Export di `src/components/organisms/index.ts`.
3. Daftarkan `ActiveSection` & `COMPONENT_SECTION_MAP` di `src/components/organisms/Sidebar.tsx`.
4. Daftarkan `DETAIL_SECTION_MAP` di `src/components/organisms/ComponentCatalogSection.tsx`.
5. Tambahkan import, `breadcrumbs`, dan render route di `src/App.tsx`.

---

## 5. Batasan & Ruang Lingkup
- **Komponen Pro (`isPro: true`):** Jangan mengubah implementasi komponen Pro yang sudah ada (`ProOrganisms.tsx`, `ProMolecules.tsx`, `charts/`, `DataGridShowcaseSection`, `EmptyStateShowcaseSection`, `ItemCardShowcaseSection`, `KanbanShowcaseSection`, `KpiShowcaseSection`, `TimelineShowcaseSection`) kecuali diminta secara eksplisit oleh pengguna.
- **Konservatif & Rapi:** Pertahankan komentar dan struktur Atomic Design yang sudah ada; hindari duplikasi logika antar komponen.
- **Pagination Tabel:** Setiap tabel data wajib menampilkan maksimal **10 baris per halaman** (`pageSize = 10`).
