# Phase 0 — Scope, Content, and Architecture Lock

> Implementation plan. Read-only inspection output. Tidak ada application code yang diubah pada fase ini.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan — Phase 0: Scope & Architecture Lock |
| Versi | 1.0 |
| Tanggal | 4 September 2026 |
| Phase | 0 dari 0–6 (mengikuti milestone PRD M0–M6) |
| Status akhir | **GO** (lihat Bagian 15 dan penutup) |
| Sumber kebenaran | `docs/product/taretan-media-prd.md` (PRD v1.0) |
| Referensi tata kelola | `docs/planning/00-phase-map.md`, `docs/prompts/AI-AGENT-GUARDRAILS.md`, `docs/prompts/00-scope-architecture-lock.md` |
| Mode kerja | Read-only inspection + satu dokumen perencanaan |
| Keputusan owner | C-1 Strip Teams; C-2 Reduksi ke single-admin session; C-3 Install Filament di Phase 1 (dikonfirmasi 4 September 2026) |

---

## 2. Phase Objective

Mengunci scope, arsitektur, information architecture, field dictionary, konfigurasi, dan strategi data sebelum implementasi dimulai, sehingga Phase 1 dapat dimulai tanpa ambiguitas dan tanpa risiko scope creep.

Batasan fase:

- Tidak mengimplementasikan fitur atau mengubah application code.
- Tidak menjalankan shared-hosting preflight (hanya menyusun checklist).
- Tidak melanjutkan otomatis ke Phase 1.
- Semua klaim tentang repository berasal dari inspeksi aktual; informasi yang belum tersedia ditandai sebagai *open decision* atau *dependency*, bukan fakta.

Traceability: PRD §15 M0 (product discovery & architecture lock), phase-map Fase 0.

---

## 3. Current Repository Assessment

Seluruh butir di bawah adalah hasil inspeksi aktual (bukan asumsi).

### 3.1 Stack terverifikasi

| Layer | Fakta | Sumber file |
|---|---|---|
| Backend | Laravel `^13.17`, PHP `^8.3` | `composer.json` |
| Bridge | Inertia.js `^3.0` (`inertiajs/inertia-laravel`, `@inertiajs/react`) | `composer.json`, `package.json` |
| Frontend | React `^19.2`, TypeScript `^5.7`, Vite `^8`, Tailwind `^4`, Radix UI, lucide-react, sonner | `package.json` |
| Database | SQLite (`DB_CONNECTION=sqlite`); file `database/database.sqlite` **ada** | `.env.example`, `Test-Path` |
| Auth | Laravel Fortify `^1.37`; feature aktif **hanya** `Features::resetPasswords()` | `composer.json`, `config/fortify.php` |
| Admin panel | **Filament TIDAK terpasang** (0 match `"name": "filament"` di `composer.lock`) | `composer.lock` |
| Storage | Disk `public` siap (`storage/app/public`), `storage:link` terdefinisi; AS-06 kompatibel | `config/filesystems.php` |
| Toolchain | Wayfinder, Chisel, Pint, Larastan/PHPStan, PHPUnit `^12`, Pail, Sail; build via `vite-plus` (`vp`) | `composer.json`, `package.json` |

### 3.2 Git state

| Atribut | Nilai |
|---|---|
| Branch | `master` |
| Commit | **0 commit** (`your current branch 'master' does not have any commits yet`) |
| Remote | tidak ada |
| Working tree | clean (belum ada baseline) |

### 3.3 Domain existing (belum sesuai PRD)

- Model: `User`, `Team`, `TeamInvitation`, `Membership`.
- Domain Teams multi-tenant lengkap: `Enums/{TeamRole,TeamPermission}`, `Policies/TeamPolicy`, `Data/{UserTeam,TeamPermissions}`, controller Teams/Settings, middleware `EnsureTeamMembership`, `SetTeamUrlDefaults`.
- Route publik PRD (`/buku`, `/jurnal`, `/artikel`, `/kirim-naskah`, `/profil`, `/layanan`, `/kontak`) **belum ada**.
- Route aktif: `/` (welcome), `{current_team}/dashboard`, invitations, `settings/*` (profile, security, appearance, teams).
- Migration (5): `create_users_table`, `create_cache_table`, `create_jobs_table`, `create_teams_table`, `add_current_team_id_to_users_table`. **Tidak ada** migration domain PRD (Book/Journal/Article/Author/Category/Service).
- Seeder: `DatabaseSeeder` membuat satu `Test User` via factory — **bukan** admin idempotent dari environment (belum sesuai Q8-A).
- Halaman React: `welcome`, `dashboard`, `auth/*`, `settings/*`, `teams/*`. **Tidak ada** halaman publik PRD.
- `.env.example` tidak memuat variabel PRD (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, nomor WhatsApp, email kontak, social URL).

### 3.4 Kesimpulan penilaian

Stack inti (Laravel + Inertia + React + SQLite + Storage public disk) **sesuai** PRD. Lapisan admin/auth/domain **belum** sesuai dan mengandung konflik struktural (Teams multi-tenant, Fortify visitor-style, Filament absen) yang keputusannya sudah diambil (C-1/C-2/C-3) dan akan dieksekusi pada Phase 1.

---

## 4. Confirmed Scope

Scope MVP mengikuti PRD §6.1 (Must Have) sebagai wajib, §6.2 (Should Have) dan §6.3 (Could Have) sebagai opsional terkontrol.

### 4.1 Must Have (wajib MVP)

| FR | Ringkas | US |
|---|---|---|
| FR-M01 | Halaman: Beranda, Katalog Buku, Detail Buku, Jurnal, Detail Jurnal, Artikel, Detail Artikel, Kirim Naskah, Profil, Layanan, Kontak | US-01..US-09 |
| FR-M02 | Katalog buku: search, kategori, rentang harga, tahun, sorting, pagination via query string | US-01 |
| FR-M03 | Field buku lengkap + multiple authors + kategori | US-02 |
| FR-M04 | CTA WhatsApp deep link dari template + nomor konfigurasi | US-03 |
| FR-M05 | Share native / salin tautan | US-04 |
| FR-M06 | Jurnal metadata + external URL (no PDF internal) | US-05 |
| FR-M07 | Artikel rich text + kategori M2M + status | US-06 |
| FR-M08 | Form Kirim Naskah client-only → WhatsApp, tanpa persistensi | US-07 |
| FR-M09 | Layanan dengan harga tetap + CTA konsultasi | US-08 |
| FR-M10 | Global text dari source/config; nomor/email/social/env dari environment; layanan tetap via Filament | US-03,07,08,09 |
| FR-M11 | Panel Filament hanya admin terautentikasi | US-10 |
| FR-M12 | CRUD + status draft/published seluruh konten dinamis | US-11 |
| FR-M13 | Route publik hanya record published & tidak terhapus | US-01,02,05,06,11 |
| FR-M14 | Validasi upload media & external URL | US-12 |
| FR-M15 | Title, meta description, canonical, Open Graph minimum | US-02,04,05,06 |

### 4.2 Should Have (opsional MVP, terkontrol)

FR-S01 (beranda unggulan), FR-S02 (flag featured + urutan), FR-S03 (sitemap/robots/breadcrumb/structured data), FR-S04 (analytics agregat), FR-S05 (soft delete + restore), FR-S06 (preview sebelum publikasi).

### 4.3 Could Have (hanya bila kapasitas tersedia)

FR-C01 (related), FR-C02 (impor/ekspor CSV), FR-C03 (penjadwalan publikasi), FR-C04 (optimasi gambar WebP).

---

## 5. Explicit Non-Goals

### 5.1 Won't Have (PRD §6.4) — dilarang implementasi

FR-W01 akun/auth pengunjung · FR-W02 cart/checkout/payment/ongkir/inventori · FR-W03 penyimpanan submission naskah · FR-W04 hosting PDF jurnal/artikel · FR-W05 kalkulator atau paket harga dinamis layanan · FR-W06 komentar/rating/newsletter/notifikasi · FR-W07 REST API publik / mobile native.

### 5.2 Out of Scope (PRD §16)

Registrasi/login/profil/wishlist pengunjung; checkout/payment/keranjang/kupon/ongkir/invoice/stok; lead/CRM internal; upload file naskah; WhatsApp Business API/chatbot; PDF jurnal internal/viewer/DOI/peer review/submission/volume-issue; kalkulator atau paket harga dinamis layanan; komentar/rating/forum/newsletter/push; REST/GraphQL API publik & mobile native; multi-role editorial & multi-tenant; multibahasa & multi-currency; integrasi marketplace; pengelolaan global config via dashboard (SITE_SETTINGS).

### 5.3 Rekonsiliasi konflik starter kit → non-goal

| Elemen starter kit | Status | Alasan (PRD) |
|---|---|---|
| Teams multi-tenant (routing `{current_team}`, invitations, roles) | **Dihapus (C-1)** | Out-of-Scope #10 multi-tenant; AS-03 single admin |
| Fortify register publik | **Dinonaktifkan (C-2)** | AS-02 no visitor account; feature register saat ini memang belum aktif |
| Fortify password reset mandiri | **Dinonaktifkan (C-2)** | PRD §12.1 self-reset bukan MVP; recovery via prosedur operasional |
| Fortify 2FA / email verification pengunjung | **Dinonaktifkan (C-2)** | Tidak diperlukan single-admin MVP |

---

## 6. Architecture Decisions

Daftar ADR yang perlu dibuat (dokumen ADR aktual disusun saat Phase 1; di sini dikunci keputusannya).

| ADR | Keputusan | Traceability |
|---|---|---|
| ADR-001 | Strip domain Teams multi-tenant (model, migration, routes, policies, pages, middleware terkait) | Out-of-Scope #10; AS-03; keputusan C-1 |
| ADR-002 | Auth single-admin berbasis session; nonaktifkan register & self-reset; admin dibuat via seeder idempotent dari environment | AS-02, AS-03, Q8-A, §12.1; C-2 |
| ADR-003 | Install Filament sebagai admin panel privat pada Phase 1 | Tech stack PRD, FR-M11/M12; C-3 |
| ADR-004 | Data publik dikirim via Inertia props; tidak ada REST API publik | §8.3, FR-W07 |
| ADR-005 | SQLite untuk MVP; production hanya setelah preflight lulus; fallback MySQL/PostgreSQL | §7.2, §7.3, R-01 |
| ADR-006 | Media disimpan via Laravel Storage disk `public` (path + metadata di DB), bukan BLOB | AS-06, §8.2 |
| ADR-007 | Pembagian nilai: teks global → source/config; credential/nomor/email/social/per-env → environment | Q9-C, AS-05, FR-M10 |
| ADR-008 | Form Kirim Naskah client-only, tanpa endpoint POST, tanpa persistensi | FR-M08, US-07, §8.3 |
| ADR-009 | Rich text disanitasi dengan allowlist (memerlukan pustaka sanitizer — dependency baru Phase 2/3) | §12.2, R-04, US-06 |
| ADR-010 | Soft delete + restore untuk entitas konten utama | FR-S05, US-11, R-11 |

---

## 7. Information Architecture and Route Inventory

### 7.1 Navigasi global (PRD §11.1)

Beranda · Buku · Jurnal · Artikel · Layanan · Kirim Naskah · Profil · Kontak.

### 7.2 Route publik (target — PRD §10.1)

| Method | Path | Inertia page | Status |
|---|---|---|---|
| GET | `/` | `Home/Index` | 200 |
| GET | `/buku` | `Books/Index` | 200, 422 |
| GET | `/buku/{slug}` | `Books/Show` | 200, 404 |
| GET | `/jurnal` | `Journals/Index` | 200 |
| GET | `/jurnal/{slug}` | `Journals/Show` | 200, 404 |
| GET | `/artikel` | `Articles/Index` | 200 |
| GET | `/artikel/{slug}` | `Articles/Show` | 200, 404 |
| GET | `/kirim-naskah` | `Manuscripts/Create` | 200 |
| GET | `/profil` | `Profile/Show` | 200 |
| GET | `/layanan` | `Services/Index` | 200 |
| GET | `/kontak` | `Contact/Show` | 200 |
| GET | `/sitemap.xml` | XML | 200 |
| GET | `/robots.txt` | Text | 200 |

### 7.3 Route admin (target — PRD §10.3, via Filament)

`/admin/login` (guest), `/admin/logout`, `/admin` (dashboard), CRUD `/admin/{books,journals,articles,authors,categories,services}/*` — semua di belakang session auth.

### 7.4 Route existing yang akan dihapus/diganti (Phase 1)

`/` welcome (diganti Home), `{current_team}/dashboard`, `invitations/*`, `settings/teams/*`, sebagian `settings/*` (profile/security/appearance pengunjung) — dievaluasi & di-strip sesuai ADR-001/002.

---

## 8. Domain and Field Dictionary

Berdasarkan ERD PRD §9 dan aturan data §9.1. Tipe final dikunci saat migration (Phase 2A).

### 8.1 Admin (`ADMINS`)

| Field | Tipe | Aturan |
|---|---|---|
| id | bigint PK | kunci teknis |
| username | string UK | identitas login |
| password | string | hashed (algoritma default Laravel) |

Tidak menyimpan nama/profil/last_login. Session via driver Laravel, bukan atribut entitas.

### 8.2 Author (`AUTHORS`)

| Field | Tipe | Aturan |
|---|---|---|
| id | bigint PK | |
| name | string | nama penulis |
| about | string(≤255) | bio singkat, boleh kosong; `CHECK (length(about) <= 255)` |

Tanpa foto/slug/timestamp. Relasi M2M ke Book via `AUTHOR_BOOK` (+`sort_order`); relasi 1-M ke Article.

### 8.3 Category (`CATEGORIES`)

| Field | Tipe | Aturan |
|---|---|---|
| id | bigint PK | |
| name | string | |
| slug | string UK | |
| type | string | `book` \| `journal` \| `article` |
| timestamps, deleted_at | | soft delete |

Validasi server menolak pemasangan kategori dengan tipe publikasi berbeda.

### 8.4 Book (`BOOKS`)

id PK; title; slug UK; isbn UK (nullable, dinormalisasi); publisher; page_count int; publication_year int; price decimal (≥0, nominal bukan float); cover_path; synopsis text; table_of_contents text; status (draft/published); published_at (wajib saat published); is_featured bool; timestamps; deleted_at. Relasi: M2M authors (`AUTHOR_BOOK`), M2M categories (`BOOK_CATEGORY`).

### 8.5 Journal (`JOURNALS`)

id PK; title; slug UK; theme; edition_label; publication_year int; cover_path; description text; external_url (wajib, HTTPS, valid); status; published_at; is_featured; timestamps; deleted_at. Relasi: M2M categories (`JOURNAL_CATEGORY`).

### 8.6 Article (`ARTICLES`)

id PK; author_id FK; title; slug UK; excerpt text; body longtext (sanitized saat render); featured_image_path; status; published_at; is_featured; timestamps; deleted_at. Relasi: M2M categories (`ARTICLE_CATEGORY`), 1-M author.

### 8.7 Service (`SERVICES`)

id PK; name; price integer default 0; slug UK; summary text; description longtext; features json; cta_label; sort_order int; is_active bool; timestamps; deleted_at. Harga kosong menjadi 0 dan ditampilkan sebagai Rupiah.

### 8.8 Aturan relasi & kategori

- Pivot M2M: `AUTHOR_BOOK`, `BOOK_CATEGORY`, `JOURNAL_CATEGORY`, `ARTICLE_CATEGORY`. Kombinasi dua FK tiap pivot **unik**.
- Kategori `type` membatasi penggunaan sesuai publikasi; validasi server wajib.
- `status` ∈ {draft, published}; `published_at` wajib saat published.
- Route publik hanya published & tidak soft-deleted (FR-M13).

---

## 9. Configuration and Environment Inventory

### 9.1 Pembagian source/config vs environment (Q9-C, AS-05, FR-M10)

| Sumber | Isi |
|---|---|
| **Source/config** (file di repo) | Profil, visi, misi, nilai, alamat teks, copy statis global, daftar jenis publikasi untuk form naskah, template pesan WhatsApp (struktur), navigasi |
| **Environment** (`.env` / hosting) | Credential admin, nomor WhatsApp, email kontak, URL social media, APP_KEY, koneksi DB, nilai per-environment |

Tidak ada tabel `SITE_SETTINGS`, tidak ada menu pengaturan global di Filament (Out-of-Scope #13).

### 9.2 Environment variable inventory

Kategori: **R** required · **O** optional · **S** secret · **P** public-safe (boleh terekspos ke client) · **Prod** production-only.

| Variable | Kategori | Keterangan | Status |
|---|---|---|---|
| APP_NAME | R, P | Nama aplikasi (ubah dari `Laravel` → `Taretan Media`) | Ada di `.env.example`, perlu ubah nilai |
| APP_ENV | R | local/staging/production | Ada |
| APP_KEY | R, S | Generated `key:generate` | Ada (kosong di example) |
| APP_DEBUG | R | `false` di production (§12.2) | Ada |
| APP_URL | R, P | Base URL, dipakai canonical & storage URL | Ada |
| DB_CONNECTION | R | `sqlite` | Ada |
| DB_DATABASE | R (bila sqlite path kustom) | Path file SQLite; di production **di luar public root** | Perlu penegasan path |
| SESSION_DRIVER | R | `database` (default starter) | Ada |
| SESSION_ENCRYPT / SESSION_SECURE_COOKIE / SESSION_SAME_SITE | R, Prod | Cookie aman di production (§12.1) | Perlu ditambah/ditegaskan |
| FILESYSTEM_DISK | R | `public` untuk media | Ada (`local` default) |
| **ADMIN_USERNAME** | R | Username admin seeder (Q8-A) | **Belum ada — tambah** |
| **ADMIN_PASSWORD** | R, S | Password admin seeder, di-hash, tolak kosong (Q8-A) | **Belum ada — tambah** |
| **WHATSAPP_NUMBER** | R, P | Nomor tujuan deep link (FR-M04) | **Belum ada — tambah** |
| **CONTACT_EMAIL** | R, P | Email kontak (`mailto:`) | **Belum ada — tambah** |
| **SOCIAL_INSTAGRAM_URL** | O, P | URL Instagram | **Belum ada — tambah** |
| **MAPS_URL** | O, P | Tautan peta/alamat | **Belum ada — tambah** |
| BCRYPT_ROUNDS | O | Hashing cost | Ada |
| LOG_CHANNEL / LOG_LEVEL | R | Logging tanpa secret (§7.7) | Ada |

Nilai production aktual (nomor WhatsApp, email, social, path SQLite) = **open decision**, dikonfirmasi menjelang deployment (PRD §15 M0 memakai placeholder non-rahasia selama development).

---

## 10. Demo Data Strategy

### 10.1 Prinsip (Q10-B, §9.1)

- Demo seed (buku, jurnal, artikel, author, kategori, layanan) hanya untuk **local / testing / staging**.
- **Dilarang** demo content masuk production tanpa persetujuan eksplisit.
- Seeder production tidak boleh memasukkan demo content.

### 10.2 Admin seeder (Q8-A, §9.1)

- Idempotent: jalan berkali-kali tanpa duplikasi.
- Baca `ADMIN_USERNAME` & `ADMIN_PASSWORD` dari environment.
- Hash password; **tolak** nilai kosong; **tidak** mencetak password ke log/console.
- Tidak menyimpan password plaintext di repository.

### 10.3 Guard environment

Demo seeder dibungkus guard `app()->environment(['local','testing','staging'])`; production seeder hanya menjalankan admin seeder.

---

## 11. Cross-Phase Dependency Map

```text
Phase 0 (dokumen ini)
  ↓  GO
Phase 1  Foundation: strip Teams, reduksi auth, install Filament, admin seeder, storage, CI, design shell
  ↓
Phase 2A Data Model & Domain Rules (migration, model, pivot, validasi)
  ↓
Phase 2B Filament CMS & Content Lifecycle (CRUD, upload, publishing)
  ↓
Phase 3A Public Shell & Informational Pages
  ↓
Phase 3B Publication Catalogs & Detail Pages
  ↓
Phase 4  Conversion & Hardening (WhatsApp flow, form naskah, analytics, security, a11y, perf) — US-03 selesai di sini
  ↓
Phase 5  UAT & Release Candidate
  ↓
Phase 6  Hosting Preflight & Production Release (gate akses hosting)
```

Aturan: phase berikut tidak dimulai sebelum exit criteria phase aktif terpenuhi. Akses shared hosting **tidak** memblokir Phase 0–5; hanya memblokir Phase 6.

---

## 12. Ordered Work Breakdown

Task Phase 0 (dokumen ini) + persiapan pra-Phase 1. Kompleksitas S/M/L.

| ID | Tujuan | Input/Dependency | Aktivitas | Artifact | Area repo | Acceptance check | Ukuran | Blok |
|---|---|---|---|---|---|---|---|---|
| P0-T1 | Inspeksi repository aktual | PRD, akses repo | Baca composer/package/lock, config, routes, git state | Bagian 3 dokumen | seluruh repo (read-only) | Semua klaim terverifikasi dari file nyata | S | blocks P0-T2..T8 |
| P0-T2 | Kunci scope & non-goal | PRD §6, §16 | Petakan Must/Should/Could + Won't/Out | Bagian 4–5 | — | Setiap FR/US termuat | S | blocked-by T1 |
| P0-T3 | Rekonsiliasi konflik starter kit | Temuan T1 + keputusan owner | Dokumentasi C-1/C-2/C-3 | Bagian 5.3, 6 | — | 3 konflik punya keputusan | S | blocked-by T1 |
| P0-T4 | IA & route inventory | PRD §10, §11 | Susun route publik/admin + route dihapus | Bagian 7 | routes/* (read-only) | Semua route PRD termuat | S | blocked-by T1 |
| P0-T5 | Field dictionary | PRD §9 | Susun 7 entitas + relasi + aturan kategori | Bagian 8 | — | ERD PRD termuat lengkap | M | blocked-by T2 |
| P0-T6 | Env & config inventory | PRD Q9-C, §12 | Tabel env var berkategori + split source/config | Bagian 9 | `.env.example` (read-only) | Var PRD teridentifikasi | M | blocked-by T1 |
| P0-T7 | Demo data & seeder strategy | PRD Q8-A, Q10-B | Rancang guard + admin seeder idempotent | Bagian 10 | database/seeders (read-only) | Aturan production-safe jelas | S | blocked-by T2 |
| P0-T8 | ADR list, dependency map, risk, DoR | Semua di atas | Susun bagian 6,11,13,14,15,16 | Bagian 6,11,13–16 | — | Status GO/BLOCKED tegas | M | blocked-by T2..T7 |

Task implementasi (strip Teams, install Filament, dll) **bukan** milik Phase 0 — dijadwalkan Phase 1.

---

## 13. Risks and Open Decisions

### 13.1 Risiko relevan (PRD §14)

| ID | Risiko | Level | Relevansi Phase 0 |
|---|---|---|---|
| R-01 | Shared hosting tak dukung SQLite aman | Tinggi | Checklist preflight disiapkan (Bagian 14) |
| R-03 | Draft terekspos publik | Sedang | Dikunci aturan FR-M13 di field dictionary |
| R-04 | XSS rich text | Tinggi | ADR-009 sanitizer allowlist |
| R-05 | Upload berbahaya | Tinggi | Aturan upload FR-M14 dicatat |
| R-06 | External URL jurnal berbahaya | Tinggi | HTTPS-only dikunci di entitas Journal |
| R-11 | Admin salah hapus | Tinggi | Soft delete + restore (ADR-010) |

### 13.2 Open decisions (butuh owner)

| ID | Keputusan | Owner | Status |
|---|---|---|---|
| OD-1 | Nilai production: nomor WhatsApp, email, social URL, path SQLite | Product/Owner | Terbuka — placeholder saat development |
| OD-2 | Pilihan pustaka sanitizer HTML (mis. HTMLPurifier) | Engineering | Terbuka — diputuskan Phase 2/3 |
| OD-3 | Akses & paket shared hosting | Owner/DevOps | Terbuka — memblokir Phase 6 saja |
| OD-4 | Buat initial git commit sebagai baseline (repo 0 commit) | Engineering | Terbuka — disarankan sebelum Phase 1 |

### 13.3 Keputusan terkunci (bukan lagi terbuka)

C-1 Strip Teams · C-2 Single-admin session (disable register & self-reset) · C-3 Install Filament di Phase 1.

---

## 14. Review Checklist

### 14.1 Kepatuhan PRD & guardrails

- [x] Tidak ada REST API publik direncanakan (FR-W07).
- [x] Tidak ada akun pengunjung / cart / checkout / lead DB / persistensi naskah.
- [x] Form Kirim Naskah client-only (ADR-008).
- [x] Teks global → source/config; credential/nomor/social → environment (Q9-C).
- [x] Draft & soft-deleted tidak di route publik (FR-M13).
- [x] External URL jurnal HTTPS-only.
- [x] Rich text sanitasi allowlist direncanakan (ADR-009).
- [x] Admin seeder idempotent env-based, tanpa plaintext (Q8-A).
- [x] Semua klaim repo dari inspeksi aktual.
- [x] Informasi belum tersedia ditandai open decision (Bagian 13.2).

### 14.2 Shared-hosting readiness checklist (disiapkan, belum dijalankan — PRD §7.2)

- [ ] PHP kompatibel Laravel 13 (`^8.3`) tersedia di hosting.
- [ ] Ekstensi `pdo_sqlite` aktif.
- [ ] Filesystem persisten & writable untuk file SQLite **di luar public web root**.
- [ ] File locking berfungsi.
- [ ] Composer/CLI atau strategi deployment tanpa Composer.
- [ ] Cron/backup terjadwal tersedia.
- [ ] `storage:link` didukung.
- [ ] Fallback MySQL/PostgreSQL tersedia bila SQLite gagal gate.

Preflight = hard gate Phase 6; tidak dijalankan pada Phase 0.

---

## 15. Definition of Ready for Phase 1

Phase 1 dapat dimulai bila:

- [x] Dokumen Phase 0 lengkap 16 bagian & disetujui.
- [x] Scope & non-goal terkunci (Bagian 4–5).
- [x] Field dictionary disetujui (Bagian 8).
- [x] Env inventory terdefinisi (Bagian 9); nilai production boleh placeholder.
- [x] Keputusan C-1/C-2/C-3 terkonfirmasi.
- [ ] (Disarankan) Baseline git commit dibuat (OD-4).

Nilai production aktual (OD-1) & sanitizer (OD-2) **tidak** memblokir Phase 1 — dipakai placeholder / diputuskan fase berikutnya.

---

## 16. PRD Traceability Matrix

| Outcome | User Stories | Functional Req | NFR | Risk | Milestone |
|---|---|---|---|---|---|
| Discovery & pemesanan buku | US-01..US-04 | FR-M02..M05 | §7.1 | R-09, R-12 | M3, M4 |
| Reputasi publikasi ilmiah | US-05 | FR-M06 | — | R-06, R-13 | M3 |
| Konten edukatif/artikel | US-06 | FR-M07 | §7.4 | R-04 | M3 |
| Lead naskah & layanan | US-07, US-08 | FR-M08, FR-M09 | §7.7 | R-08 | M4 |
| Kredibilitas & kontak | US-08, US-09 | FR-M10 | — | R-07, R-13 | M3 |
| CMS aman | US-10..US-12 | FR-M11..M14 | §12 | R-03, R-05, R-11 | M1, M2 |
| SEO & kualitas publik | US-01..US-09 | FR-M15, FR-S01, FR-S03 | §7.1, §7.4 | R-12 | M3, M4 |
| Foundation & auth (fase ini menyiapkan) | US-10 | FR-M11 | §12.1 | R-10 | M1 |

---

## Status Penutup

**GO** — Phase 1 siap dimulai.

Konflik struktural (Teams, Fortify, Filament) telah diputuskan owner (C-1/C-2/C-3) dan dijadwalkan sebagai pekerjaan Phase 1, sehingga tidak lagi menjadi blocker.

Pra-syarat tercatat sebelum eksekusi Phase 1:

1. Eksekusi C-1: strip domain Teams multi-tenant.
2. Eksekusi C-2: reduksi auth ke single-admin session (nonaktifkan register & self-reset).
3. Eksekusi C-3: install Filament sebagai admin panel.
4. Tambah environment variable PRD (ADMIN_USERNAME, ADMIN_PASSWORD, WHATSAPP_NUMBER, CONTACT_EMAIL, social/maps).
5. Ganti seeder Test User → admin seeder idempotent env-based.
6. (Disarankan) Buat baseline git commit (OD-4).

Open decisions OD-1/OD-2/OD-3 tidak memblokir Phase 1; OD-3 hanya memblokir Phase 6.

*Catatan tata kelola: Phase 1 tidak dimulai otomatis. Membutuhkan instruksi eksplisit pada sesi terpisah beserta `AI-AGENT-GUARDRAILS.md`.*
