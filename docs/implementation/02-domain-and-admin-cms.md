# Phase 2 — Domain Model, Data Integrity, and Filament CMS

> Implementation plan. Read-only inspection output. Tidak ada application code yang diubah pada dokumen perencanaan ini. Eksekusi kode dilakukan pada sesi implementasi terpisah beserta `AI-AGENT-GUARDRAILS.md`.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan — Phase 2: Domain Model, Data Integrity & Filament CMS |
| Versi | 1.0 |
| Tanggal | 7 September 2026 |
| Phase | 2 dari 0–6 (milestone PRD M2) |
| Work package | Phase 2A (Data Model & Domain Rules) + Phase 2B (Filament CMS & Content Lifecycle) |
| Status akhir | **READY FOR IMPLEMENTATION** (lihat Bagian 19 & penutup) |
| Sumber kebenaran | `docs/product/taretan-media-prd.md` (PRD v1.0), `docs/implementation/00-scope-architecture-lock.md` (Phase 0 = GO), `docs/implementation/01-technical-foundation.md` (Phase 1 = READY) |
| Referensi | `docs/prompts/02-domain-and-admin-cms.md`, `docs/planning/00-phase-map.md`, `docs/prompts/AI-AGENT-GUARDRAILS.md` |
| Mode kerja | Read-only inspection + satu dokumen perencanaan |
| Keputusan owner | Sanitizer rich text (OD-2) tetap open decision dengan rekomendasi (Bagian 17); nilai production tetap placeholder (OD-1) |

---

## 2. Phase Objective

Merencanakan domain model, integritas data, dan CMS Filament sehingga admin dapat mengelola seluruh konten dinamis (buku, jurnal, artikel, author, kategori, layanan) secara aman, tervalidasi, dan siap dikonsumsi halaman publik pada Phase 3.

Fase dipecah menjadi dua work package internal:

- **Phase 2A — Data Model and Domain Rules:** migration, model, relasi, constraint, scope, validasi domain, factory, dan demo seeder.
- **Phase 2B — Filament CMS and Content Lifecycle:** resource Filament, form, table, relation manager, lifecycle publikasi, upload, policy, dan dashboard.

**Aturan gate:** Phase 2B tidak boleh dianggap siap sebelum exit criteria Phase 2A (Bagian 6) terpenuhi.

Batasan fase:

- Tidak membangun halaman publik (route publik, controller publik, Inertia page publik) — itu Phase 3.
- Tidak membangun WhatsApp flow, form kirim naskah, atau analytics — itu Phase 4.
- Tidak menjalankan shared-hosting preflight — itu Phase 6.
- Tidak menyederhanakan requirement PRD demi kemudahan implementasi.

Traceability: PRD §15 M2, US-11, US-12, FR-M03, FR-M06, FR-M07, FR-M09, FR-M12, FR-M14, FR-S02, FR-S05, FR-S06.

---

## 3. Scope and Non-Goals

### 3.1 Dalam scope

Entitas: `Admin` (sudah ada, referensi authorization), `Author`, `Category`, `Book`, `Journal`, `Article`, `Service`, serta pivot `AuthorBook`, `BookCategory`, `JournalCategory`, `ArticleCategory`.

Kapabilitas:

- Migration, model, relasi many-to-many, constraint DB, index, casts.
- Published scope, slug generation, ISBN normalization, category-type validation, publication-state transition.
- Soft delete + restore + force delete untuk konten utama.
- Media path lifecycle untuk cover/featured image.
- Factory + demo seeder (local/testing/staging only).
- Resource Filament CRUD + lifecycle publikasi + upload + policy + dashboard minimum.

### 3.2 Non-Goals (dilarang implementasi pada fase ini)

Mengikuti PRD §6.4 dan §16 serta `AI-AGENT-GUARDRAILS.md`:

- Tidak ada halaman/route publik, Inertia props publik, atau REST API publik (Phase 3, FR-W07).
- Tidak ada cart/checkout/payment/inventory/order.
- Tidak ada akun pengunjung, lead DB, atau persistensi form naskah.
- Tidak ada PDF jurnal internal, DOI, peer review, volume/issue.
- Harga Service berupa satu nominal Rupiah tetap; kalkulator/paket harga dinamis tetap di luar scope.
- Tidak ada tabel `SITE_SETTINGS` atau menu pengaturan global di Filament (Out-of-Scope #13).
- Tidak ada multi-role editorial workflow atau multi-tenant.
- Author tidak menyimpan foto atau slug (PRD §9.1).

---

## 4. Current Repository Assessment

Seluruh butir dari inspeksi aktual repository.

### 4.1 Yang sudah tersedia (hasil Phase 1)

| Area | Fakta | Sumber |
|---|---|---|
| Admin panel | Filament `v5.7.8` terpasang | `composer.lock` |
| Model admin | `App\Models\Admin` implements `FilamentUser`, `HasName`; cast `password => hashed` | `app/Models/Admin.php` |
| Migration admin | `0001_01_01_000000_create_admins_table.php` (admins, password_reset_tokens, sessions) | `database/migrations/` |
| Panel provider | `app/Providers/Filament/AdminPanelProvider.php`; login kustom `app/Filament/Auth/Login.php` | inspeksi |
| Seeder | `AdminSeeder` idempotent env-based; `DatabaseSeeder` | `database/seeders/` |
| Config domain | `config/taretan.php` (kredensial admin, WhatsApp, kontak, social) | inspeksi |
| Auth | Guard `admin` aktif (login via username, commit `7e48870`) | `config/auth.php`, git log |
| Test | `Feature/Admin/AdminPanelTest.php`, `AdminSeederTest.php` | `tests/` |
| Runtime | PHP 8.5.0 lokal; constraint `^8.3`; target hosting 8.3/8.4 | `php -v`, `composer.json` |

### 4.2 Gap yang harus ditutup Phase 2

- **Belum ada** migration domain: Book, Journal, Article, Author, Category, Service, dan 4 pivot.
- **Belum ada** model domain apa pun selain `Admin`.
- **Belum ada** factory (`database/factories/` kosong).
- **Belum ada** demo seeder konten (hanya `AdminSeeder`).
- **Belum ada** HTML sanitizer terpasang (0 match `purif|sanitiz` di `composer.json`) — kebutuhan rich text artikel (ADR-009, OD-2).
- **Belum ada** Filament resource konten (`app/Filament/` hanya berisi `Auth/Login.php`).
- **Belum ada** policy authorization konten.

### 4.3 Kesimpulan

Fondasi auth + panel siap. Phase 2 membangun seluruh lapisan domain dan CMS konten di atasnya tanpa mengubah keputusan auth Phase 1. Satu dependency baru diperlukan (sanitizer HTML) dengan keputusan final ditunda ke sesi implementasi (Bagian 17, OD-2).

---

## 5. Phase 2A Plan

Data Model & Domain Rules. Tidak menyentuh Filament pada 2A.

### 5.1 Urutan migration

Urutan wajib karena ketergantungan foreign key (parent sebelum pivot):

1. `create_authors_table`
2. `create_categories_table`
3. `create_books_table`
4. `create_journals_table`
5. `create_articles_table` (FK ke `authors`)
6. `create_services_table`
7. `create_author_book_table` (FK `authors`, `books`)
8. `create_book_category_table` (FK `books`, `categories`)
9. `create_journal_category_table` (FK `journals`, `categories`)
10. `create_article_category_table` (FK `articles`, `categories`)

Timestamp filename mengikuti urutan di atas agar `migrate:fresh` deterministik. Migration domain ditempatkan **setelah** migration Phase 1 (`0001_01_01_*`).

### 5.2 Foreign keys

| Tabel | Kolom | Referensi | On delete |
|---|---|---|---|
| articles | author_id | authors.id | RESTRICT (cegah hapus author yang masih dipakai artikel) |
| author_book | author_id | authors.id | CASCADE |
| author_book | book_id | books.id | CASCADE |
| book_category | book_id | books.id | CASCADE |
| book_category | category_id | categories.id | CASCADE |
| journal_category | journal_id | journals.id | CASCADE |
| journal_category | category_id | categories.id | CASCADE |
| article_category | article_id | articles.id | CASCADE |
| article_category | category_id | categories.id | CASCADE |

Catatan SQLite: foreign key enforcement memerlukan `PRAGMA foreign_keys=ON` (Laravel mengaktifkan default pada koneksi SQLite). Karena entitas utama memakai soft delete, CASCADE pivot hanya terpicu pada **force delete**; soft delete tidak menghapus baris pivot (lihat 5.14).

### 5.3 Unique constraints

- `authors`: tidak ada unique wajib (nama boleh sama; author dibedakan by id).
- `categories`: `slug` unique; `(name, type)` unique (cegah duplikat kategori tipe sama).
- `books`: `slug` unique; `isbn` unique **jika diisi** (lihat 5.11 untuk NULL handling).
- `journals`: `slug` unique.
- `articles`: `slug` unique.
- `services`: `slug` unique.
- Pivot: composite unique pada kedua FK (`author_book(author_id, book_id)`, `book_category(book_id, category_id)`, `journal_category(journal_id, category_id)`, `article_category(article_id, category_id)`).

### 5.4 Database checks yang realistis untuk SQLite

SQLite mendukung `CHECK` constraint kolom/tabel sederhana. Yang diterapkan:

| Tabel | CHECK | Tujuan |
|---|---|---|
| authors | `length(about) <= 255` | Batas bio (PRD §9.1) |
| categories | `type IN ('book','journal','article')` | Batasi tipe kategori |
| books | `price >= 0` | Harga non-negatif (FR domain #6) |
| books | `status IN ('draft','published')` | Enum status |
| journals | `status IN ('draft','published')` | Enum status |
| articles | `status IN ('draft','published')` | Enum status |

**Trade-off didokumentasikan (bukan disederhanakan):** aturan "`published_at` wajib saat published" adalah kondisi lintas-kolom. SQLite mendukung table-level CHECK lintas-kolom, namun ekspresi seperti `NOT (status='published' AND published_at IS NULL)` rapuh terhadap perubahan skema dan tidak seragam di seluruh entitas. Keputusan: enforce di **application layer** (model saving hook + Form Request/Filament rule, lihat 5.12), bukan DB CHECK, agar pesan error ramah dan konsisten. CHECK enum status tetap dipasang sebagai jaring pengaman DB.

### 5.5 Indexes

Selain unique index di 5.3, tambahkan index performa (PRD §7.1):

| Tabel | Index | Alasan |
|---|---|---|
| books | `status`, `published_at`, `publication_year`, `is_featured` | Filter katalog & featured |
| journals | `status`, `published_at`, `publication_year`, `is_featured` | Filter katalog |
| articles | `status`, `published_at`, `is_featured`, `author_id` | Filter & join author |
| services | `is_active`, `sort_order` | Urutan layanan aktif |
| categories | `type` | Filter kategori per tipe |

Slug sudah ter-index via unique. Kolom pencarian teks (title, publisher) dibiarkan tanpa index khusus pada MVP SQLite; strategi FTS ditunda ke Phase 3 bila diperlukan (dicatat sebagai catatan, bukan janji).

### 5.6 Model casts

| Model | Casts |
|---|---|
| Book | `price => integer`, `publication_year => integer`, `page_count => integer`, `is_featured => boolean`, `published_at => datetime`, `status => PublicationStatus` (enum) |
| Journal | `publication_year => integer`, `is_featured => boolean`, `published_at => datetime`, `status => PublicationStatus` |
| Article | `is_featured => boolean`, `published_at => datetime`, `status => PublicationStatus` |
| Service | `features => array`, `sort_order => integer`, `is_active => boolean` |
| Category | `type => CategoryType` (enum) |
| Author | — (name, about string) |

Semua model konten memakai `SoftDeletes` trait.

### 5.7 Enum / value-object strategy

- `App\Enums\PublicationStatus`: PHP backed enum `Draft = 'draft'`, `Published = 'published'`. Dipakai cast + validasi + Filament select.
- `App\Enums\CategoryType`: PHP backed enum `Book = 'book'`, `Journal = 'journal'`, `Article = 'article'`.
- Harga: **bukan** value object; disimpan integer nominal Rupiah. Formatting Rupiah dilakukan di layer presentasi (Phase 3), bukan di model. Alasan: hindari floating-point (FR domain #6), sederhana untuk SQLite integer.

### 5.8 Relationship definitions

| Model | Relasi |
|---|---|
| Author | `belongsToMany(Book)` withPivot `sort_order` withTimestamps; `hasMany(Article)` |
| Book | `belongsToMany(Author)` withPivot `sort_order` orderBy pivot `sort_order`; `belongsToMany(Category)` |
| Journal | `belongsToMany(Category)` |
| Article | `belongsTo(Author)`; `belongsToMany(Category)` |
| Category | `belongsToMany(Book)`; `belongsToMany(Journal)`; `belongsToMany(Article)` |
| Service | — (mandiri) |

Relasi kategori pada Book/Journal/Article dibatasi tipe via validasi (5.13), bukan lewat relasi terpisah, agar tetap satu tabel `categories`.

### 5.9 Published scopes

Scope terpusat agar aturan FR-M13 tidak tersebar:

- Trait `App\Models\Concerns\HasPublicationState` menyediakan `scopePublished(Builder)`: `where('status', PublicationStatus::Published)->whereNotNull('published_at')->where('published_at', '<=', now())`.
- Soft delete otomatis mengecualikan record terhapus (global scope `SoftDeletes`).
- Scope publik = `published()` + tidak trashed. Dipakai Phase 3; disediakan di 2A agar teruji lebih awal.

### 5.10 Slug generation dan collision handling

- Slug dihasilkan dari `title`/`name` via `Str::slug`.
- Collision handling: jika slug sudah ada (termasuk record soft-deleted, agar tidak bentrok saat restore), tambahkan suffix incremental `-2`, `-3`, dst.
- Slug dapat diedit manual di Filament (US-11 AC-2) namun tetap divalidasi unik dan diformat ulang.
- Helper `App\Support\SlugGenerator::unique(string $model, string $value, ?int $ignoreId)` dipakai model saving hook & Filament.

### 5.11 ISBN normalization

- Normalisasi: buang spasi & tanda hubung, uppercase (untuk ISBN-10 dengan `X`). Simpan bentuk ternormalisasi di kolom `isbn`.
- Nullable: buku boleh tanpa ISBN (PRD §9.1).
- Unik jika diisi. **Trade-off SQLite:** SQLite memperlakukan setiap `NULL` sebagai distinct, sehingga unique index standar pada kolom nullable **sudah** mengizinkan banyak baris NULL sekaligus menolak duplikat non-NULL. Maka cukup unique index biasa pada `isbn`; tidak perlu partial index. Didokumentasikan agar jelas bahwa perilaku ini disengaja.
- Normalisasi dijalankan via mutator model (`setIsbnAttribute`) sehingga konsisten dari Filament maupun seeder.

### 5.12 Publication-state transition rules

- Nilai status hanya `draft` dan `published` (enum).
- Transisi diperbolehkan: `draft → published`, `published → draft`.
- Saat `published`: `published_at` wajib terisi. Bila admin publish tanpa mengisi, sistem mengisi `now()` secara default (Filament action + model hook), atau menolak bila diisi eksplisit kosong.
- Saat kembali ke `draft`: `published_at` dipertahankan (histori) namun record tidak lolos published scope.
- Enforcement: model `saving` hook memvalidasi invariant + Filament validation rule pada form.

### 5.13 Category-type validation

- Kategori hanya boleh dipasang pada publikasi yang tipenya cocok: Book hanya `type=book`, Journal hanya `type=journal`, Article hanya `type=article`.
- Rule `App\Rules\CategoryMatchesType` memvalidasi seluruh `category_id` saat attach/sync.
- Di Filament, opsi kategori pada relation manager/field difilter berdasarkan tipe publikasi (2B), sehingga UI mencegah + rule server menolak (defense in depth).

### 5.14 Transaction boundaries

- Create/update entitas konten yang melibatkan upload media + sync relasi dibungkus `DB::transaction`.
- Urutan: simpan file ke storage → persist record + path → sync pivot. Jika persist gagal, file yang sudah terunggah dihapus (kompensasi) agar tidak ada orphan (FR-M14 AC-5 / aturan #14).
- Filament menjalankan mutasi dalam transaksi; hook `after` untuk cleanup file pada kegagalan.

### 5.15 Soft delete behavior

- `books`, `journals`, `articles`, `services`, `categories`, `authors` memakai `SoftDeletes` (FR-S05).
- Soft-deleted **tidak** menghapus baris pivot dan **tidak** menghapus file media (agar restore utuh).
- Query publik mengecualikan trashed (FR-M13).

### 5.16 Media path lifecycle

- Disk `public` (AS-06, ADR-006). Path disimpan di kolom `cover_path` / `featured_image_path`.
- Nama file dibuat ulang sistem (UUID/hash) — tidak memakai nama asli (FR-M14 AC-2, aturan #13).
- Direktori: `books/`, `journals/`, `articles/` di dalam disk `public`.
- Detail lengkap di Bagian 11.

### 5.17 Deletion and restore implications

- Soft delete: hilang dari publik, tetap di panel (filter trashed), media & pivot dipertahankan.
- Restore: mengembalikan record + relasi utuh; slug tetap (collision handling 5.10 sudah memperhitungkan trashed).
- Force delete: hapus record + pivot (CASCADE) + file media (event `deleting`/`forceDeleted` menghapus file). Author dengan artikel terkait tidak bisa force-delete (FK RESTRICT) — ditangani sebagai error ramah di 2B.

### 5.18 Factory dan demo seeder

- Factory untuk semua entitas: `AuthorFactory`, `CategoryFactory` (state per tipe), `BookFactory`, `JournalFactory`, `ArticleFactory`, `ServiceFactory`.
- Factory menghasilkan data valid (slug unik, ISBN ternormalisasi, status, published_at konsisten).
- `DemoContentSeeder`: membuat set konten realistis + relasi (multiple authors, kategori sesuai tipe, campuran draft/published).
- Guard environment: hanya jalan pada `local`/`testing`/`staging` (Q10-B, §10.3). `DatabaseSeeder` memanggil `AdminSeeder` selalu, `DemoContentSeeder` di balik guard.

### 5.19 Unit dan feature test matrix (2A)

Lihat Bagian 14 untuk matriks lengkap; ringkas: enum, slug, ISBN normalization, published scope, category-type rule, soft delete/restore, transaction rollback, factory validity, demo seeder guard.

---

## 6. Phase 2A Exit Gate

Phase 2B **tidak** boleh dimulai sebelum seluruh item berikut terbukti:

- [ ] Seluruh migration 2A jalan via `migrate:fresh` tanpa error; `migrate:rollback` bersih.
- [ ] Seluruh model + relasi + casts + enum berfungsi (test relasi lulus).
- [ ] Unique constraint, CHECK, dan index terpasang (verifikasi skema).
- [ ] Slug generation + collision handling teruji.
- [ ] ISBN normalization + NULL-multiple + unik-non-NULL teruji.
- [ ] Published scope mengecualikan draft & trashed (teruji).
- [ ] Category-type validation menolak lintas-tipe (teruji).
- [ ] Publication-state invariant (`published_at` wajib saat published) teruji.
- [ ] Soft delete/restore/force delete + media cleanup teruji.
- [ ] Transaction rollback tidak meninggalkan orphan file (teruji).
- [ ] Factory + demo seeder valid; demo seeder terguard non-production (teruji).
- [ ] `composer ci:check` lulus.

Bila salah satu gagal, Phase 2B ditunda dan blocker didokumentasikan.

---

## 7. Phase 2B Plan

Filament CMS & Content Lifecycle. Hanya dimulai setelah gate 2A (Bagian 6) lulus.

### 7.1 Resource Filament untuk seluruh konten

Resource: `AuthorResource`, `CategoryResource`, `BookResource`, `JournalResource`, `ArticleResource`, `ServiceResource`. Semua di panel `admin` (guard `admin`, Phase 1).

- Create, Edit, List untuk semua.
- View page: untuk Book/Journal/Article (mendukung preview, 7.9). Author/Category/Service cukup List+Edit (data ringkas).

### 7.2 Form schemas

| Resource | Field utama |
|---|---|
| Author | name (required), about (textarea, max 255) |
| Category | name (required), slug (auto+editable), type (select enum, required) |
| Book | title, slug, isbn (nullable, dinormalisasi), publisher, publication_year, page_count, price (integer Rupiah), cover upload, synopsis, table_of_contents, status, published_at, is_featured; relasi authors (repeater/relation manager dengan sort_order), categories (multi-select type=book) |
| Journal | title, slug, theme, edition_label, publication_year, cover upload, description, external_url (HTTPS), status, published_at, is_featured; categories (type=journal) |
| Article | title, slug, author (select), excerpt, body (rich editor, disanitasi), featured_image upload, status, published_at, is_featured; categories (type=article) |
| Service | name, price integer default 0, slug, summary, description, features (repeater→array), cta_label, sort_order, is_active. Harga kosong menjadi 0. |

Validasi form mengikuti Domain Validation Matrix (Bagian 9).

### 7.3 Table columns dan filters

| Resource | Kolom | Filter |
|---|---|---|
| Book | title, authors (ringkas), price, year, status badge, is_featured, deleted | status, category (type=book), year, featured, trashed |
| Journal | title, theme, year, status, is_featured | status, category (type=journal), year, trashed |
| Article | title, author, status, published_at, is_featured | status, category (type=article), author, trashed |
| Service | name, is_active, sort_order | is_active, trashed |
| Author | name, jumlah buku, jumlah artikel | trashed |
| Category | name, type, jumlah pemakaian | type, trashed |

### 7.4 Relation managers

- `BookResource` → `AuthorsRelationManager` (attach/detach + edit `sort_order`).
- `BookResource` → `CategoriesRelationManager` (opsi difilter type=book).
- `JournalResource` → `CategoriesRelationManager` (type=journal).
- `ArticleResource` → `CategoriesRelationManager` (type=article).
- Alternatif: multi-select field pada form utama; relation manager dipilih untuk authors (butuh ordering).

### 7.5 Ordering multiple authors

- `AuthorsRelationManager` pada Book menampilkan kolom `sort_order`, mendukung reorder (drag/tabel) dan menyimpan ke pivot.
- Tampilan publik (Phase 3) membaca author terurut via relasi `orderBy pivot sort_order` (5.8).

### 7.6 Category filtering berdasarkan publication type

- Field/relation kategori pada tiap resource hanya menampilkan kategori dengan `type` cocok (query `where('type', ...)`).
- Server tetap memvalidasi via `CategoryMatchesType` (5.13) — UI filter + server rule.

### 7.7 Draft/published actions

- Field `status` (select) + `published_at`.
- Action cepat "Publish" dan "Jadikan Draft" pada table row & view page.
- "Publish" mengisi `published_at = now()` bila kosong; "Jadikan Draft" tidak menghapus `published_at`.
- Konsisten dengan invariant 5.12.

### 7.8 Preview strategy

- FR-S06 (Should Have): admin dapat melihat pratinjau sebelum publikasi.
- Strategi Phase 2B: View page Filament menampilkan render metadata + body (artikel: body tersanitasi) sebagai pratinjau internal. **Preview halaman publik penuh** (memakai template Phase 3) ditunda; bila route publik belum ada, preview publik dicatat sebagai dependency Phase 3 (tidak dijanjikan sebagai selesai di 2B).

### 7.9 Upload validation

- Diterima: JPEG, PNG, WebP; maksimum 5 MB (FR-M14, aturan #11).
- Ditolak: SVG, file executable, MIME/extension di luar allowlist (aturan #12).
- Validasi: `acceptedFileTypes` + `maxSize` di Filament + server-side rule (MIME sniff, bukan hanya extension).
- Nama file dibuat ulang sistem (aturan #13).
- Kegagalan upload tidak meninggalkan record setengah jadi (transaksi 5.14, aturan #14).

### 7.10 HTTPS URL validation

- `external_url` jurnal wajib, valid, dan skema `https` (FR-M14 AC-4, aturan #7).
- Rule `App\Rules\HttpsUrl` + Filament `url()` + `startsWith https://`.

### 7.11 Soft delete, restore, dan force-delete policy

- List menyediakan filter trashed, action Restore, dan Force Delete (dengan konfirmasi).
- Force delete Author yang masih direferensikan artikel ditolak dengan pesan ramah (FK RESTRICT, 5.17).
- Force delete konten menghapus file media terkait (5.17).

### 7.12 Confirmation untuk destructive action

- Delete, Force Delete, dan Bulk Delete memerlukan modal konfirmasi (R-11 mitigasi single-admin salah hapus).
- Teks konfirmasi menyebut nama record.

### 7.13 Dashboard minimum

- Widget ringkas: jumlah Book/Journal/Article/Service (published vs draft), jumlah trashed.
- Tidak ada analytics production (di luar scope fase ini).

### 7.14 Authorization / policy

- Semua resource di belakang guard `admin` (Phase 1, FR-M11).
- Policy per model: single-admin → semua ability `true` untuk admin terautentikasi, `false` untuk guest. Policy tetap dibuat eksplisit agar audit jelas dan siap dikembangkan.
- `canAccessPanel` sudah `true` untuk admin (Phase 1).

### 7.15 Audit events yang direncanakan

- Event yang dicatat (log terpisah, tanpa credential/data personal — PRD §12.4): create/update konten, perubahan status publikasi, delete/restore/force-delete.
- Implementasi audit ringan via model events → log channel khusus. **Tidak** memperluas entitas `Admin`. Detail volume/retensi mengikuti §12.4 (dicatat sebagai rencana; retensi operasional Phase 6).

### 7.16 Acceptance-test flow admin maksimal 10 menit

Lihat Bagian 15 (skenario manual). Target O3-KR1: admin membuat + memublikasikan buku/jurnal/artikel dalam ≤10 menit.

---

## 8. Database Schema and Constraint Matrix

| Tabel | Kolom kunci | Tipe | Null | Unique | CHECK | Index | Soft delete |
|---|---|---|---|---|---|---|---|
| authors | name | string | no | — | — | — | ya |
| authors | about | string(255) | yes | — | `length(about)<=255` | — | ya |
| categories | slug | string | no | ya | — | — | ya |
| categories | name | string | no | `(name,type)` | — | — | ya |
| categories | type | string | no | — | `IN(book,journal,article)` | `type` | ya |
| books | slug | string | no | ya | — | — | ya |
| books | isbn | string | yes | ya (NULL multiple) | — | — | ya |
| books | price | integer | no | — | `>=0` | — | ya |
| books | publication_year | integer | yes | — | — | `year` | ya |
| books | status | string | no | — | `IN(draft,published)` | `status` | ya |
| books | published_at | datetime | yes | — | (app-level invariant) | `published_at` | ya |
| books | is_featured | boolean | no(default false) | — | — | `is_featured` | ya |
| books | cover_path | string | yes | — | — | — | ya |
| journals | slug | string | no | ya | — | — | ya |
| journals | external_url | string | no | — | (app: HTTPS) | — | ya |
| journals | status | string | no | — | `IN(draft,published)` | `status` | ya |
| journals | published_at | datetime | yes | — | (app-level) | `published_at` | ya |
| articles | slug | string | no | ya | — | — | ya |
| articles | author_id | FK | no | — | — | `author_id` | ya |
| articles | body | longtext | no | — | — | — | ya |
| articles | status | string | no | — | `IN(draft,published)` | `status` | ya |
| services | slug | string | no | ya | — | — | ya |
| services | features | json | yes | — | — | — | ya |
| services | is_active | boolean | no(default true) | — | — | `is_active` | ya |
| author_book | (author_id,book_id) | FK | no | composite | — | — | no |
| book_category | (book_id,category_id) | FK | no | composite | — | — | no |
| journal_category | (journal_id,category_id) | FK | no | composite | — | — | no |
| article_category | (article_id,category_id) | FK | no | composite | — | — | no |

---

## 9. Domain Validation Matrix

Pemetaan 17 aturan domain (prompt) → mekanisme + layer.

| # | Aturan | Mekanisme | Layer |
|---|---|---|---|
| 1 | Buku banyak author + sort order | pivot `author_book.sort_order`, relation manager reorder | DB + Filament |
| 2 | Book/Journal/Article M2M kategori | 3 pivot + composite unique | DB |
| 3 | Category.type membatasi pemakaian | `CategoryMatchesType` rule + UI filter | App + Filament |
| 4 | Author hanya name + optional about, tanpa foto/slug | skema tabel minimal | DB |
| 5 | ISBN kosong boleh, unik setelah normalisasi | mutator normalisasi + unique index nullable | App + DB |
| 6 | Harga tidak negatif, bukan float | kolom integer + `CHECK price>=0` | DB |
| 7 | Journal external URL valid + HTTPS | `HttpsUrl` rule + Filament url | App + Filament |
| 8 | Status hanya draft/published | enum + `CHECK` | App + DB |
| 9 | published_at wajib saat published | model saving hook + Filament rule | App + Filament |
| 10 | Draft/soft-deleted tidak di query publik | `scopePublished` + SoftDeletes global scope | App |
| 11 | Upload JPEG/PNG/WebP ≤5MB | allowlist MIME + maxSize | App + Filament |
| 12 | SVG & executable ditolak | MIME sniff + extension allowlist | App + Filament |
| 13 | Nama file dibuat ulang sistem | storage dengan nama hash/UUID | App |
| 14 | Upload gagal tidak sisakan record setengah jadi | `DB::transaction` + kompensasi file | App |
| 15 | Demo seed hanya local/testing/staging | guard `app()->environment()` | App |
| 16 | Tidak ada SITE_SETTINGS | tidak ada tabel/menu; config/env only | Arsitektur |
| 17 | Harga Service berupa integer Rupiah | kolom `price` default 0; input kosong menjadi 0 | DB/App |

---

## 10. Filament Resource Matrix

| Resource | Pages | Relation managers | Filters | Actions khusus | Policy |
|---|---|---|---|---|---|
| AuthorResource | List, Create, Edit | (Books, Articles read-only opsional) | trashed | restore, forceDelete (guard FK) | AuthorPolicy |
| CategoryResource | List, Create, Edit | — | type, trashed | restore, forceDelete | CategoryPolicy |
| BookResource | List, Create, Edit, View | Authors(sort_order), Categories(type=book) | status, category, year, featured, trashed | publish, unpublish, restore, forceDelete | BookPolicy |
| JournalResource | List, Create, Edit, View | Categories(type=journal) | status, category, year, trashed | publish, unpublish, restore, forceDelete | JournalPolicy |
| ArticleResource | List, Create, Edit, View | Categories(type=article) | status, category, author, trashed | publish, unpublish, restore, forceDelete | ArticlePolicy |
| ServiceResource | List, Create, Edit | — | is_active, trashed | activate/deactivate, restore, forceDelete | ServicePolicy |

---

## 11. Media Lifecycle Plan

| Tahap | Perilaku |
|---|---|
| Disk | `public` (AS-06, ADR-006); path di DB, file di `storage/app/public` |
| Direktori | `books/`, `journals/`, `articles/` |
| Penamaan | Nama dibuat ulang sistem (hash/UUID); nama asli dibuang (aturan #13) |
| Validasi | JPEG/PNG/WebP, ≤5MB, MIME sniff, tolak SVG/executable (aturan #11–12) |
| Upload transaksional | Simpan file → persist record; gagal → hapus file (aturan #14) |
| Replace | Upload baru → hapus file lama setelah record tersimpan |
| Soft delete | File dipertahankan (restore utuh) |
| Force delete | File dihapus via event model |
| Broken/missing | Fallback ditangani di render publik (Phase 3, dicatat) |

---

## 12. Seed and Fixture Strategy

| Aspek | Rencana |
|---|---|
| Admin seeder | `AdminSeeder` (Phase 1) tetap; selalu jalan; idempotent env-based |
| Demo content seeder | `DemoContentSeeder`: authors, categories (per tipe), books (multi-author, multi-kategori), journals, articles (rich body), services; campuran draft/published |
| Guard environment | `DemoContentSeeder` hanya `local`/`testing`/`staging` (Q10-B) |
| Production | `DatabaseSeeder` di production hanya panggil `AdminSeeder`; demo tidak masuk production tanpa persetujuan |
| Factory | `AuthorFactory`, `CategoryFactory` (state book/journal/article), `BookFactory`, `JournalFactory`, `ArticleFactory`, `ServiceFactory`; data valid & konsisten |
| Fixture test | Factory dipakai feature/unit test; state khusus (draft, trashed, published) tersedia |

---

## 13. Ordered Task Breakdown

Format tiap task: dependency · target file/module · expected DB/UI effect · test pembukti · kompleksitas S/M/L · rollback note.

### Phase 2A

**P2A-001 — Enum PublicationStatus & CategoryType**
- Dependency: — · Target: `app/Enums/PublicationStatus.php`, `app/Enums/CategoryType.php`
- Efek: dua backed enum tersedia untuk cast/validasi.
- Test: `Unit` enum values & from(); · Kompleksitas: S · Rollback: git revert.

**P2A-002 — Migration authors + categories**
- Dependency: P2A-001 · Target: `database/migrations/*_create_authors_table.php`, `*_create_categories_table.php`
- Efek: tabel `authors` (CHECK about), `categories` (slug UK, `(name,type)` UK, CHECK type, index type), soft delete.
- Test: schema assertion + CHECK ditolak nilai invalid · S · Rollback: `migrate:rollback`.

**P2A-003 — Migration books**
- Dependency: P2A-002 · Target: `*_create_books_table.php`
- Efek: tabel `books` (slug UK, isbn UK nullable, CHECK price>=0, CHECK status, index status/year/published_at/featured), soft delete.
- Test: schema + CHECK price negatif ditolak · M · Rollback: `migrate:rollback`.

**P2A-004 — Migration journals**
- Dependency: P2A-002 · Target: `*_create_journals_table.php`
- Efek: tabel `journals` (slug UK, external_url, CHECK status, index), soft delete.
- Test: schema assertion · S · Rollback: `migrate:rollback`.

**P2A-005 — Migration articles**
- Dependency: P2A-002 · Target: `*_create_articles_table.php`
- Efek: tabel `articles` (author_id FK RESTRICT, slug UK, body, CHECK status, index), soft delete.
- Test: schema + FK RESTRICT · M · Rollback: `migrate:rollback`.

**P2A-006 — Migration services**
- Dependency: P2A-002 · Target: `*_create_services_table.php`
- Efek: tabel `services` (slug UK, price integer default 0, features json, is_active, sort_order), soft delete.
- Test: schema dan default price 0 · S · Rollback: `migrate:rollback`.

**P2A-007 — Migration pivot (4)**
- Dependency: P2A-003..006 · Target: `*_create_author_book_table.php`, `*_create_book_category_table.php`, `*_create_journal_category_table.php`, `*_create_article_category_table.php`
- Efek: 4 pivot, composite unique, FK CASCADE, `author_book.sort_order`.
- Test: composite unique menolak duplikat · M · Rollback: `migrate:rollback`.

**P2A-008 — Support: SlugGenerator, Rules, HasPublicationState trait**
- Dependency: P2A-001 · Target: `app/Support/SlugGenerator.php`, `app/Rules/CategoryMatchesType.php`, `app/Rules/HttpsUrl.php`, `app/Models/Concerns/HasPublicationState.php`
- Efek: helper slug unik (termasuk trashed), rule kategori-tipe, rule HTTPS, scope published.
- Test: unit slug collision, rule reject, scope query · M · Rollback: git revert.

**P2A-009 — Model Author, Category**
- Dependency: P2A-002, P2A-008 · Target: `app/Models/Author.php`, `Category.php`
- Efek: model + SoftDeletes + relasi + casts + slug hook (Category).
- Test: relasi & cast enum type · S · Rollback: git revert.

**P2A-010 — Model Book**
- Dependency: P2A-003, P2A-007, P2A-008 · Target: `app/Models/Book.php`
- Efek: casts (price int, status enum), relasi authors(order)/categories, slug hook, isbn mutator, HasPublicationState.
- Test: isbn normalize, slug, published scope, price cast, authors ordered · M · Rollback: git revert.

**P2A-011 — Model Journal**
- Dependency: P2A-004, P2A-007, P2A-008 · Target: `app/Models/Journal.php`
- Efek: casts, relasi categories, slug hook, HasPublicationState.
- Test: scope + relasi · S · Rollback: git revert.

**P2A-012 — Model Article**
- Dependency: P2A-005, P2A-007, P2A-008 · Target: `app/Models/Article.php`
- Efek: belongsTo author, categories, slug hook, HasPublicationState.
- Test: relasi author + scope · S · Rollback: git revert.

**P2A-013 — Model Service**
- Dependency: P2A-006, P2A-008 · Target: `app/Models/Service.php`
- Efek: casts features array, slug hook, is_active, SoftDeletes.
- Test: cast array + scope active · S · Rollback: git revert.

**P2A-014 — Publication-state invariant + media event hooks**
- Dependency: P2A-010..012 · Target: model saving/deleting hooks
- Efek: `published_at` wajib saat published; force delete hapus file; soft delete pertahankan file.
- Test: publish tanpa published_at → auto/reject; force delete hapus file · M · Rollback: git revert.

**P2A-015 — Factories**
- Dependency: P2A-009..013 · Target: `database/factories/*`
- Efek: factory valid semua entitas + state.
- Test: `Model::factory()->create()` valid; state draft/published/trashed · M · Rollback: git revert.

**P2A-016 — Demo seeder + guard**
- Dependency: P2A-015 · Target: `database/seeders/DemoContentSeeder.php`, update `DatabaseSeeder.php`
- Efek: demo konten realistis; guard non-production; production hanya AdminSeeder.
- Test: seeder jalan di testing; guard mencegah production · M · Rollback: git revert.

**P2A-GATE — Verifikasi exit gate 2A (Bagian 6)**
- Dependency: P2A-001..016 · Efek: seluruh checklist 2A hijau · Test: `composer ci:check` · S · Rollback: —.

### Phase 2B

**P2B-001 — Install sanitizer HTML (OD-2)**
- Dependency: P2A-GATE · Target: `composer.json`/lock, config sanitizer
- Efek: library sanitizer terpasang (rekomendasi `stevebauman/purify`; final di implementasi); allowlist artikel.
- Test: body dengan `<script>` tersanitasi · M · Rollback: `composer remove` + git revert.

**P2B-002 — Policies (6 model)**
- Dependency: P2A-GATE · Target: `app/Policies/*`
- Efek: policy per model; admin allow, guest deny.
- Test: guest ditolak, admin diizinkan · S · Rollback: git revert.

**P2B-003 — AuthorResource**
- Dependency: P2B-002 · Target: `app/Filament/Resources/AuthorResource*`
- Efek: CRUD author (name, about); trashed/restore/forceDelete guard FK.
- Test: create/edit; force delete author berartikel ditolak ramah · M · Rollback: git revert.

**P2B-004 — CategoryResource**
- Dependency: P2B-002 · Target: `app/Filament/Resources/CategoryResource*`
- Efek: CRUD kategori + select type + filter type; slug auto.
- Test: create per tipe; filter type · M · Rollback: git revert.

**P2B-005 — BookResource + relation managers**
- Dependency: P2B-002, P2B-004 · Target: `app/Filament/Resources/BookResource*`, Authors & Categories relation managers
- Efek: form lengkap, upload cover, authors reorder, kategori type=book, filter, publish/unpublish, trashed.
- Test: create+publish; kategori lintas-tipe ditolak; author ordering tersimpan · L · Rollback: git revert.

**P2B-006 — JournalResource**
- Dependency: P2B-002, P2B-004 · Target: `app/Filament/Resources/JournalResource*`
- Efek: form + upload cover + external_url HTTPS + kategori type=journal + lifecycle.
- Test: non-HTTPS ditolak; publish flow · M · Rollback: git revert.

**P2B-007 — ArticleResource**
- Dependency: P2B-001, P2B-002, P2B-004 · Target: `app/Filament/Resources/ArticleResource*`
- Efek: form + rich body tersanitasi + featured image + author select + kategori type=article + lifecycle + preview view.
- Test: body sanitasi; publish flow; kategori type · L · Rollback: git revert.

**P2B-008 — ServiceResource**
- Dependency: P2B-002 · Target: `app/Filament/Resources/ServiceResource*`
- Efek: form harga Rupiah, features repeater, is_active, sort_order, lifecycle.
- Test: harga default 0 dan activate/deactivate · M · Rollback: git revert.

**P2B-009 — Upload validation terpusat**
- Dependency: P2B-005..008 · Target: komponen upload + rule MIME
- Efek: allowlist JPEG/PNG/WebP ≤5MB, tolak SVG/executable, nama file sistem, transaksional.
- Test: SVG ditolak, >5MB ditolak, gagal tidak sisakan orphan · M · Rollback: git revert.

**P2B-010 — Destructive confirmation + audit events**
- Dependency: P2B-003..008 · Target: resource actions + listener audit
- Efek: konfirmasi delete/forceDelete/bulk; log audit tanpa data personal.
- Test: konfirmasi muncul; audit tercatat tanpa credential · M · Rollback: git revert.

**P2B-011 — Dashboard minimum**
- Dependency: P2B-005..008 · Target: `app/Filament/Widgets/*`
- Efek: widget hitungan konten (published/draft/trashed).
- Test: widget render angka benar · S · Rollback: git revert.

**P2B-GATE — Verifikasi exit criteria 2B + acceptance ≤10 menit**
- Dependency: P2B-001..011 · Efek: DoD (Bagian 18) hijau · Test: skenario manual Bagian 15 + `composer ci:check` · M · Rollback: —.

---

## 14. Automated Test Matrix

### 14.1 Phase 2A (unit/feature)

| Test | Membuktikan | Task |
|---|---|---|
| Enum values & from() | PublicationStatus/CategoryType benar | P2A-001 |
| Schema authors/categories + CHECK | about>255 & type invalid ditolak | P2A-002 |
| Schema books + CHECK price | price negatif ditolak | P2A-003 |
| FK RESTRICT articles.author_id | author dipakai tak bisa dihapus | P2A-005 |
| Pivot composite unique | duplikat pasangan ditolak | P2A-007 |
| SlugGenerator collision | suffix incremental termasuk trashed | P2A-008 |
| CategoryMatchesType rule | kategori lintas-tipe ditolak | P2A-008 |
| HttpsUrl rule | non-HTTPS/URL invalid ditolak | P2A-008 |
| Published scope | draft & trashed & future dikecualikan | P2A-008/010 |
| Book relations | authors terurut sort_order; categories | P2A-010 |
| ISBN normalization | strip hyphen/spasi, unik non-NULL, NULL multiple | P2A-010 |
| Price cast | integer, tanpa float | P2A-010 |
| Publication invariant | published wajib published_at | P2A-014 |
| Media force delete | file dihapus saat forceDelete | P2A-014 |
| Media soft delete | file dipertahankan | P2A-014 |
| Transaction rollback | upload gagal tak sisakan orphan | P2A-014 |
| Factories valid | semua factory create sukses | P2A-015 |
| Demo seeder guard | jalan di testing; blok production | P2A-016 |

### 14.2 Phase 2B (feature)

| Test | Membuktikan | Task |
|---|---|---|
| Sanitizer body | `<script>`/on* dibuang | P2B-001 |
| Policy guest deny | guest tak akses resource | P2B-002 |
| Author force-delete guard | author berartikel ditolak ramah | P2B-003 |
| Category type filter | opsi kategori sesuai tipe | P2B-004/005 |
| Book create+publish | record published + published_at terisi | P2B-005 |
| Author ordering persist | sort_order tersimpan & terbaca urut | P2B-005 |
| Journal HTTPS enforce | non-HTTPS ditolak form | P2B-006 |
| Article publish flow | draft→published; body tersanitasi | P2B-007 |
| Service price | field/kolom harga integer default 0 | P2B-008 |
| Upload allowlist | SVG & >5MB ditolak; nama diubah | P2B-009 |
| Destructive confirm | konfirmasi wajib sebelum delete | P2B-010 |
| Audit event | tercatat tanpa data personal | P2B-010 |
| Dashboard widget | hitungan benar | P2B-011 |

---

## 15. Manual Acceptance Scenarios

### 15.1 Admin publish buku ≤10 menit (O3-KR1)

1. Login `/admin`.
2. Buat Author (bila perlu).
3. Buat Category type=book.
4. Buat Book: isi field, upload cover (JPEG/PNG/WebP), tambah 2 author dengan urutan, pilih kategori.
5. Set status published (published_at auto/isi).
6. Simpan → record tampil di list sebagai published.
7. Ukur waktu ≤10 menit.

### 15.2 Jurnal external URL

1. Buat Journal, isi `external_url` non-HTTPS → ditolak.
2. Isi HTTPS valid → tersimpan.

### 15.3 Artikel rich text

1. Buat Article, isi body mengandung `<script>` + formatting.
2. Simpan → script hilang, formatting aman.
3. Publish → View page menampilkan pratinjau body tersanitasi.

### 15.4 Kategori lintas-tipe

1. Pada Book, coba pasang kategori type=journal → tidak muncul/ditolak.

### 15.5 Soft delete & restore

1. Delete sebuah Book → hilang dari list default, muncul di filter trashed, file media tetap ada.
2. Restore → kembali dengan relasi utuh.
3. Force delete → record + pivot + file hilang; konfirmasi wajib.

### 15.6 Force delete author terpakai

1. Force delete author yang punya artikel → ditolak dengan pesan ramah.

### 15.7 Service dengan harga tetap

1. Form Service menampilkan field harga Rupiah dengan default 0; toggle is_active & sort_order berfungsi.

---

## 16. Migration and Rollback Strategy

| Aspek | Rencana |
|---|---|
| Urutan | Parent → pivot (5.1); filename timestamp berurutan |
| Reversibilitas | Setiap migration punya `down()`; `migrate:rollback` bersih |
| Fresh | `migrate:fresh --seed` di local/testing memuat demo |
| Data loss | 2A pada dataset kosong (belum ada konten production); aman |
| Backup | Migration berisiko production ditangani Phase 6 (backup sebelum migrate) |
| Rollback task | Tiap task punya rollback note (Bagian 13); git revert + `migrate:rollback` |
| SQLite FK | Pastikan `foreign_keys=ON`; uji CASCADE hanya via force delete |

---

## 17. Risks and Edge Cases

| ID | Risiko/Edge case | Level | Mitigasi |
|---|---|---|---|
| R2-01 | `published_at` wajib saat published tak bisa DB CHECK andal di SQLite | Sedang | Enforce app-level + Filament; CHECK enum status sebagai jaring |
| R2-02 | Sanitizer HTML belum dipilih (OD-2) | Sedang | Rekomendasi `stevebauman/purify`; keputusan final saat P2B-001; artikel tak publish sebelum sanitizer aktif |
| R2-03 | ISBN NULL vs unik | Rendah | SQLite NULL distinct → unique index nullable cukup (5.11) |
| R2-04 | Orphan file saat upload gagal | Sedang | Transaksi + kompensasi (5.14) |
| R2-05 | Force delete author terpakai artikel | Rendah | FK RESTRICT + pesan ramah (5.17) |
| R2-06 | Collision slug dengan record trashed | Rendah | SlugGenerator memperhitungkan trashed (5.10) |
| R2-07 (R-04 PRD) | XSS rich text | Tinggi | Sanitizer allowlist + render aman Phase 3 |
| R2-08 (R-05 PRD) | Upload berbahaya | Tinggi | Allowlist MIME/extension, size, rename, non-executable |
| R2-09 (R-06 PRD) | External URL jurnal berbahaya | Tinggi | HTTPS-only + validasi |
| R2-10 (R-11 PRD) | Admin salah hapus | Tinggi | Soft delete + konfirmasi + restore + audit |
| R2-11 | Preview publik penuh butuh template Phase 3 | Rendah | Pratinjau internal di 2B; preview publik dicatat dependency Phase 3 (FR-S06) |
| R2-12 | Filament v5 API drift saat implementasi | Sedang | Ikuti versi lock `v5.7.8`; verifikasi API saat implementasi, jangan mengarang |

---

## 18. Definition of Done

- [ ] Exit gate 2A (Bagian 6) seluruhnya hijau.
- [ ] 6 resource Filament (Author, Category, Book, Journal, Article, Service) CRUD berfungsi.
- [ ] Relation manager authors (sort_order) + kategori per tipe berfungsi.
- [ ] Draft/published action + invariant published_at berfungsi.
- [ ] Upload validasi (allowlist, size, rename, transaksional) berfungsi.
- [ ] External URL jurnal HTTPS-only diberlakukan.
- [ ] Rich text artikel disanitasi (sanitizer terpasang, OD-2 diputuskan di P2B-001).
- [ ] Soft delete/restore/force-delete + konfirmasi + media cleanup berfungsi.
- [ ] Policy per model aktif; guest ditolak.
- [ ] Dashboard minimum tampil.
- [ ] Audit event direncanakan & tercatat tanpa data personal.
- [ ] Service memiliki harga tetap; tidak ada SITE_SETTINGS.
- [ ] Factory + demo seeder valid & terguard non-production.
- [ ] Acceptance admin publish ≤10 menit terbukti (Bagian 15.1).
- [ ] `composer ci:check` lulus.

---

## 19. Exit Criteria

Sesuai PRD §15 M2: admin dapat menyelesaikan CRUD utama, seluruh pivot kategori tervalidasi, demo seed tersedia di local/staging, dan draft tidak terekspos (scope teruji di 2A; ekspos publik diverifikasi penuh di Phase 3). Seluruh item DoD (Bagian 18) terbukti dengan test/verifikasi. Phase 2B tidak dinyatakan selesai sebelum exit gate 2A lulus. Tidak lanjut Phase 3 tanpa exit criteria terpenuhi.

---

## 20. PRD Traceability Matrix

| Area Phase 2 | User Story | FR | NFR | Risk | Task | Milestone |
|---|---|---|---|---|---|---|
| Data model buku + multi-author + kategori | US-02, US-11 | FR-M03, FR-M12 | §7.1 | R-11 | P2A-003/007/010, P2B-005 | M2 |
| Jurnal metadata + external URL | US-05, US-11 | FR-M06, FR-M14 | — | R-06 | P2A-004/011, P2B-006 | M2 |
| Artikel rich text + kategori M2M | US-06, US-11 | FR-M07 | §7.4 | R-04 | P2A-005/012, P2B-001/007 | M2 |
| Layanan dengan harga tetap | US-08, US-11 | FR-M09 | — | — | P2A-006/013, P2B-008 | M2 |
| Kategori per tipe (M2M) | US-11 | FR-M07, FR-M12 | — | — | P2A-002/008, P2B-004 | M2 |
| Upload media & validasi | US-12 | FR-M14 | §12.2 | R-05 | P2A-014, P2B-009 | M2 |
| Status draft/published + scope | US-11 | FR-M12, FR-M13 | — | R-03 | P2A-008/014, P2B-007 | M2 |
| Soft delete + restore | US-11 | FR-S05 | — | R-11 | P2A-014, P2B-010 | M2 |
| Featured flag | US-11 | FR-S02 | — | — | P2A-003/004/005 | M2 |
| Preview sebelum publikasi | US-11 | FR-S06 | — | R2-11 | P2B-007 (+Phase 3) | M2 |
| CMS aman (policy/authz) | US-10, US-11 | FR-M11, FR-M12 | §12 | R-03 | P2B-002 | M2 |
| Demo seed non-production | US-11 | — (Q10-B) | — | — | P2A-015/016 | M2 |

---

## Status Penutup

**READY FOR IMPLEMENTATION**

Tidak ada blocker keras. Fondasi Phase 1 (Filament `v5.7.8`, guard `admin`, `Admin` model, seeder) telah terverifikasi mendukung Phase 2. Open decision tersisa **tidak** memblokir dimulainya Phase 2:

- **OD-2 (sanitizer HTML)** — tetap open decision dengan rekomendasi `stevebauman/purify`; diputuskan pada task P2B-001. Artikel tidak dipublikasikan sebelum sanitizer aktif. Bila tak ada sanitizer kompatibel Laravel 13 / PHP 8.3–8.5, eskalasi ke BLOCKED pada P2B-001.
- **OD-1 (nilai production)** — tetap placeholder; tidak relevan untuk domain/CMS Phase 2.

Aturan gate ditegakkan: Phase 2B tidak dimulai sebelum exit gate 2A (Bagian 6) lulus. Trade-off SQLite/Filament (published_at invariant, ISBN NULL-unique, price integer, preview publik) didokumentasikan tanpa mengubah keputusan produk secara diam-diam.

*Catatan tata kelola: dokumen ini adalah perencanaan. Eksekusi kode Phase 2 memerlukan instruksi eksplisit pada sesi implementasi terpisah beserta `AI-AGENT-GUARDRAILS.md`. Tidak lanjut ke Phase 3.*
