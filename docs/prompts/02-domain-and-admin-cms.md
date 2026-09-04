# Prompt — Phase 2: Data Model & Admin CMS

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Senior Laravel Domain Engineer, Filament Architect, Database Designer, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. docs/implementation/00-scope-architecture-lock.md
3. docs/implementation/01-technical-foundation.md
4. seluruh repository aktif

TUGAS

Buat implementation plan khusus untuk:

PHASE 2 — DOMAIN MODEL, DATA INTEGRITY, AND FILAMENT CMS

Jangan mengimplementasikan kode. Buat:

docs/implementation/02-domain-and-admin-cms.md

Jangan melanjutkan ke halaman publik.

PENTING

Pecah fase ini menjadi dua work package internal:

PHASE 2A — Data Model and Domain Rules
PHASE 2B — Filament CMS and Content Lifecycle

Phase 2B tidak boleh dianggap siap sebelum exit criteria Phase 2A terpenuhi.

ENTITAS YANG DICAKUP

- Admin
- Author
- Category
- Book
- Journal
- Article
- Service
- AuthorBook
- BookCategory
- JournalCategory
- ArticleCategory

ATURAN DOMAIN YANG WAJIB DIPERTAHANKAN

1. Buku dapat memiliki banyak author dengan sort order.
2. Buku, jurnal, dan artikel masing-masing mempunyai relasi kategori many-to-many.
3. Category.type membatasi penggunaan kategori untuk book, journal, atau article.
4. Author hanya mempunyai name dan optional short about sesuai PRD. Jangan menambah foto atau slug.
5. Book ISBN boleh kosong, tetapi harus unik setelah normalisasi jika diisi.
6. Harga buku tidak boleh negatif dan tidak memakai floating-point.
7. Journal external URL wajib valid dan HTTPS.
8. Status publikasi hanya draft dan published.
9. published_at wajib untuk record published.
10. Record draft atau soft-deleted tidak boleh tersedia pada query publik.
11. Upload hanya JPEG, PNG, atau WebP maksimum 5 MB.
12. SVG dan file executable ditolak.
13. Nama file upload dibuat ulang oleh sistem.
14. File upload gagal tidak boleh meninggalkan record setengah jadi.
15. Demo seed hanya untuk local/testing/staging.
16. Tidak ada SITE_SETTINGS.
17. Tidak ada harga pada Service.

IMPLEMENTATION PLAN WAJIB MENCAKUP

PHASE 2A:

- urutan migrations;
- foreign keys;
- unique constraints;
- database checks yang realistis untuk SQLite;
- indexes;
- model casts;
- enum atau value-object strategy;
- relationship definitions;
- published scopes;
- slug generation dan collision handling;
- ISBN normalization;
- publication-state transition rules;
- category-type validation;
- transaction boundaries;
- soft delete behavior;
- media path lifecycle;
- deletion and restore implications;
- factory dan demo seeder;
- unit dan feature test matrix.

PHASE 2B:

- resource Filament untuk seluruh konten;
- create, edit, list, view bila dibutuhkan;
- form schemas;
- table columns dan filters;
- relation managers;
- ordering multiple authors;
- category filtering berdasarkan publication type;
- draft/published actions;
- preview strategy;
- upload validation;
- HTTPS URL validation;
- soft delete, restore, dan force-delete policy;
- confirmation untuk destructive action;
- dashboard minimum;
- authorization/policy;
- audit events yang direncanakan;
- acceptance-test flow admin maksimal 10 menit.

FORMAT DOKUMEN

1. Document Metadata
2. Phase Objective
3. Scope and Non-Goals
4. Current Repository Assessment
5. Phase 2A Plan
6. Phase 2A Exit Gate
7. Phase 2B Plan
8. Database Schema and Constraint Matrix
9. Domain Validation Matrix
10. Filament Resource Matrix
11. Media Lifecycle Plan
12. Seed and Fixture Strategy
13. Ordered Task Breakdown
14. Automated Test Matrix
15. Manual Acceptance Scenarios
16. Migration and Rollback Strategy
17. Risks and Edge Cases
18. Definition of Done
19. Exit Criteria
20. PRD Traceability Matrix

TASK BREAKDOWN

Gunakan task ID seperti:

- P2A-001
- P2A-002
- P2B-001
- P2B-002

Setiap task harus menyebutkan:

- dependency;
- target file/module;
- expected database or UI effect;
- test yang membuktikan task selesai;
- complexity S/M/L;
- rollback note.

Jangan mengubah requirement menjadi lebih sederhana hanya agar mudah diimplementasikan. Bila ada ketidaksesuaian antara kemampuan SQLite, Filament, dan aturan PRD, dokumentasikan opsi dan trade-off tanpa diam-diam mengganti keputusan produk.

Akhiri dengan status:

READY FOR IMPLEMENTATION
atau
BLOCKED
```
