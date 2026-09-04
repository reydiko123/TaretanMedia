# Taretan Media — Phase Map

## Rekomendasi Pembagian

Proyek dibagi menjadi **7 fase utama**, bernomor 0–6. Pembagian ini mengikuti milestone M0–M6 dalam PRD sehingga governance delivery tetap konsisten dengan requirement produk.

| Fase | Nama | Hasil Utama |
|---:|---|---|
| 0 | Scope & Architecture Lock | Requirement, field, konfigurasi, information architecture, dan dependency terkunci |
| 1 | Technical Foundation & Design System | Project berjalan, admin login, CI, storage, dan UI shell tersedia |
| 2 | Data Model & Admin CMS | Database, domain rules, Filament CRUD, upload, dan publishing lifecycle selesai |
| 3 | Public Discovery Experience | Seluruh halaman publik, katalog, filter, detail, share, dan SEO dasar selesai |
| 4 | Conversion & Application Hardening | WhatsApp flow, form naskah, analytics, security, accessibility, dan performance |
| 5 | UAT & Release Candidate | QA menyeluruh, kandidat konten production, backup rehearsal, dan deployment artifact |
| 6 | Hosting Preflight & Production Release | Go/no-go SQLite, deployment, smoke test, monitoring, dan sign-off |

## Work Package Internal

### Phase 2

- **Phase 2A:** Data Model and Domain Rules
- **Phase 2B:** Filament CMS and Content Lifecycle

Phase 2B tidak boleh dianggap siap sebelum exit gate Phase 2A terpenuhi.

### Phase 3

- **Phase 3A:** Public Shell and Informational Pages
- **Phase 3B:** Publication Catalogs and Detail Pages

## Penempatan US-03

US-03, pemesanan buku melalui WhatsApp, diperlakukan selesai pada Phase 4. Phase 3 menyiapkan detail buku, CTA, canonical URL, dan data pendukung. Phase 4 mengaktifkan, menguji, dan mengukur conversion flow secara lengkap.

Alasan pemisahan: milestone public discovery dan milestone conversion pada PRD sama-sama menyentuh US-03. Menetapkan completion hanya di Phase 4 mencegah acceptance criteria ganda.

## Dependency Utama

```text
Phase 0
  ↓
Phase 1
  ↓
Phase 2A → Phase 2B
  ↓
Phase 3A → Phase 3B
  ↓
Phase 4
  ↓
Phase 5
  ↓
Phase 6
```

## Delivery Rule

- Phase berikutnya tidak dimulai sebelum exit criteria phase aktif terpenuhi.
- Shared-hosting access tidak memblokir Phase 0–5.
- Phase 6 hanya dimulai setelah akses hosting tersedia.
- SQLite production harus melewati technical preflight.
- Fallback database production adalah MySQL atau PostgreSQL yang disediakan hosting bila SQLite gagal gate.
