# All Phase Prompts — Taretan Media

Dokumen gabungan ini memuat seluruh prompt Phase 0–6. Untuk eksekusi nyata, tetap disarankan memakai satu file per phase.

---

# Prompt — Phase 0: Scope & Architecture Lock

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Lead Software Architect dan Technical Delivery Planner.

Baca seluruh dokumen berikut sebagai sumber kebenaran utama:

PRD:
docs/product/taretan-media-prd.md

Repository:
root repository aktif saat ini

TUGAS

Buat implementation plan khusus untuk:

PHASE 0 — SCOPE, CONTENT, AND ARCHITECTURE LOCK

Jangan mengimplementasikan fitur atau mengubah application code. Anda hanya boleh melakukan inspeksi read-only terhadap repository dan membuat satu dokumen:

docs/implementation/00-scope-architecture-lock.md

ATURAN UTAMA

1. PRD adalah source of truth. Jangan menambah atau mengurangi scope secara diam-diam.
2. Jangan membuat REST API publik.
3. Jangan membuat akun pengunjung, cart, checkout, payment, order management, lead database, atau penyimpanan submission naskah.
4. Form Kirim Naskah harus tetap client-only dan hanya membentuk WhatsApp deep link.
5. Profil, visi, misi, nilai, alamat, dan teks global berasal dari source/config.
6. Nomor WhatsApp, email, social URL, credential, dan nilai per-environment berasal dari environment.
7. Shared-hosting preflight belum dijalankan pada fase ini. Buat checklist-nya saja.
8. Jangan mengarang kondisi repository. Periksa file, dependency, konfigurasi, dan git state yang benar-benar tersedia.
9. Bila suatu informasi tidak tersedia, tandai sebagai open decision atau dependency, bukan sebagai fakta.
10. Jangan melanjutkan ke Phase 1.

CAKUPAN PERENCANAAN

Implementation plan harus mencakup:

- ringkasan kondisi repository saat ini;
- daftar keputusan PRD yang bersifat immutable untuk MVP;
- information architecture dan route inventory;
- inventory seluruh halaman publik dan admin;
- field dictionary untuk Admin, Author, Category, Book, Journal, Article, dan Service;
- relasi antarentitas dan aturan kategorinya;
- pembagian nilai antara source/config dan environment;
- daftar environment variable beserta kategori: required, optional, secret, public-safe, dan production-only;
- rancangan demo seed untuk local/testing/staging;
- larangan demo content masuk ke production;
- media/storage strategy;
- daftar Architecture Decision Record yang perlu dibuat;
- dependency map antar-Phase 0 sampai Phase 6;
- shared-hosting readiness checklist tanpa menjalankan deployment;
- daftar asumsi, risiko, pertanyaan terbuka, dan keputusan yang memerlukan owner;
- Definition of Ready untuk memulai Phase 1.

FORMAT DOKUMEN WAJIB

1. Document Metadata
2. Phase Objective
3. Current Repository Assessment
4. Confirmed Scope
5. Explicit Non-Goals
6. Architecture Decisions
7. Information Architecture and Route Inventory
8. Domain and Field Dictionary
9. Configuration and Environment Inventory
10. Demo Data Strategy
11. Cross-Phase Dependency Map
12. Ordered Work Breakdown
13. Risks and Open Decisions
14. Review Checklist
15. Definition of Ready for Phase 1
16. PRD Traceability Matrix

ORDERED WORK BREAKDOWN

Buat task dengan format:

- ID task
- tujuan
- input/dependency
- aktivitas
- artifact yang dihasilkan
- file atau area repository terkait
- acceptance check
- ukuran kompleksitas S/M/L
- task yang memblokir atau diblokir

TRACEABILITY

Setiap keputusan dan task harus dipetakan, jika relevan, ke:

- User Story;
- Functional Requirement;
- Non-Functional Requirement;
- Risk Register;
- milestone atau exit criteria PRD.

Jangan menulis kode implementasi. Potongan pseudocode hanya diperbolehkan bila mutlak diperlukan untuk menjelaskan kontrak, bukan sebagai solusi final.

Akhiri dokumen dengan:

- GO apabila Phase 1 siap dimulai;
- BLOCKED apabila masih ada keputusan kritis;
- daftar blocker yang konkret apabila statusnya BLOCKED.
```

---

# Prompt — Phase 1: Technical Foundation & Design System

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Lead Laravel Engineer, Frontend Architect, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. docs/implementation/00-scope-architecture-lock.md
3. seluruh repository aktif

TUGAS

Buat implementation plan khusus untuk:

PHASE 1 — TECHNICAL FOUNDATION, ADMIN AUTHENTICATION, AND DESIGN SYSTEM

Jangan mengimplementasikan kode. Anda hanya boleh melakukan inspeksi read-only dan membuat atau memperbarui:

docs/implementation/01-technical-foundation.md

Jangan melanjutkan ke Phase 2.

TUJUAN FASE

Merencanakan foundation Laravel + Inertia.js + React.js + Filament + SQLite yang:

- dapat dijalankan secara lokal;
- mempunyai build dan test pipeline;
- mempunyai admin authentication yang aman;
- mempunyai admin seeder idempotent dari environment;
- mempunyai storage dan asset pipeline;
- mempunyai public application shell responsif;
- mempunyai design system minimum yang dapat dipakai fase berikutnya.

BATASAN

1. Gunakan dependency dan konvensi repository yang sudah ada bila kompatibel dengan PRD.
2. Jangan mengarang versi package. Verifikasi dari composer.json, composer.lock, package.json, dan lockfile.
3. Bila repository masih kosong, dokumentasikan strategi bootstrap dan compatibility matrix yang harus diverifikasi.
4. Akun admin menggunakan struktur minimal sesuai PRD. Jangan menambahkan profil admin, role hierarchy, atau password reset mandiri.
5. Credential admin awal berasal dari ADMIN_USERNAME dan ADMIN_PASSWORD atau nama environment variable yang telah disepakati.
6. Seeder harus idempotent, melakukan hash, menolak nilai kosong, dan tidak mencetak password.
7. Jangan membuat domain content migrations atau Filament content resources pada fase ini, kecuali struktur minimum yang benar-benar diperlukan untuk authentication.
8. Jangan membuat REST API publik.
9. Jangan mengaktifkan analytics production.
10. Jangan menganggap shared hosting sudah tersedia.

IMPLEMENTATION PLAN WAJIB MENCAKUP

- dependency compatibility assessment;
- struktur direktori Laravel, Inertia, React, dan Filament;
- strategi penggunaan custom Admin model dengan Filament;
- session authentication;
- login rate limiting;
- session regeneration dan logout invalidation;
- CSRF;
- cookie settings per environment;
- environment validation;
- APP_DEBUG dan error handling baseline;
- SQLite local configuration;
- Laravel Storage configuration;
- Vite/build strategy;
- strategi deployment artifact tanpa membutuhkan Node.js di production;
- CI checks;
- linting dan formatting;
- test environment;
- admin seeder;
- app layout, navigation shell, typography, spacing, buttons, form controls, cards, alert, modal, loading indicator, empty-state component, dan responsive breakpoint strategy;
- accessibility baseline;
- error-page skeleton;
- logging baseline tanpa secret;
- Definition of Done.

FORMAT DOKUMEN

1. Document Metadata
2. Phase Objective
3. Inputs and Preconditions
4. Current Repository Assessment
5. Target Foundation Architecture
6. Dependency and Compatibility Matrix
7. Authentication and Session Plan
8. Environment and Configuration Plan
9. Storage and Asset Build Plan
10. CI and Quality Tooling Plan
11. Design System and Application Shell Plan
12. Ordered Task Breakdown
13. Test Strategy and Verification Commands
14. Security Review
15. Risks, Assumptions, and Rollback Considerations
16. Definition of Done
17. Exit Criteria
18. PRD Traceability Matrix

TASK DETAIL

Setiap task harus memuat:

- task ID;
- outcome;
- dependency;
- target file atau module;
- langkah implementasi berurutan;
- acceptance criteria;
- automated test yang dibutuhkan;
- manual verification;
- complexity S/M/L;
- rollback atau recovery note jika relevan.

VERIFICATION

Berikan daftar command yang kelak harus dijalankan oleh implementation agent, tetapi jangan menjalankannya sebagai bagian dari tugas planning ini.

Akhiri dengan status:

READY FOR IMPLEMENTATION
atau
BLOCKED

Apabila BLOCKED, tuliskan blocker yang benar-benar menghambat Phase 1. Jangan menggunakan pertanyaan kosmetik sebagai blocker.
```

---

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

---

# Prompt — Phase 3: Public Discovery Experience

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Senior Laravel/Inertia Engineer, React Frontend Architect, SEO Engineer, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. seluruh implementation plan Phase 0 sampai Phase 2
3. seluruh repository aktif

TUGAS

Buat implementation plan khusus untuk:

PHASE 3 — PUBLIC DISCOVERY AND CONTENT EXPERIENCE

Jangan mengimplementasikan kode. Buat:

docs/implementation/03-public-discovery.md

Pecah rencana menjadi:

PHASE 3A — Public Shell and Informational Pages
PHASE 3B — Publication Catalogs and Detail Pages

Jangan mengaktifkan form Kirim Naskah atau final WhatsApp conversion tracking pada fase ini. Komponen dan props pendukung boleh direncanakan, tetapi conversion behavior lengkap masuk Phase 4.

HALAMAN YANG DICAKUP

- Beranda
- Katalog Buku
- Detail Buku
- Katalog Jurnal
- Detail Jurnal
- Katalog Artikel
- Detail Artikel
- Profil
- Layanan
- Kontak
- 404
- 500 generik

ROUTE DAN DATA

Gunakan web routes dan Inertia props. Jangan membuat REST API publik.

Server harus menjadi source of truth untuk:

- record published;
- soft-delete visibility;
- filter normalization;
- sorting;
- pagination;
- authorization;
- sanitasi rich text;
- canonical URL.

CAKUPAN PHASE 3A

- global layout;
- header, navigation, mobile menu, footer;
- loading/progress navigation;
- responsive shell;
- Home;
- Profile;
- Services;
- Contact;
- configured-channel visibility;
- empty configuration handling;
- broken image fallback;
- 404 dan 500;
- accessibility struktur halaman.

CAKUPAN PHASE 3B

- Books Index dan Show;
- Journals Index dan Show;
- Articles Index dan Show;
- query/service layer;
- eager loading;
- pagination;
- search;
- category filter;
- book price and year filters;
- sorting;
- URL query-state preservation;
- invalid-query handling;
- empty state dan reset filter;
- multiple author ordering;
- optional field rendering;
- sanitized rich text;
- secure external link;
- Web Share API dan copy-link fallback;
- title, meta description, canonical, dan Open Graph minimum;
- sitemap, robots, breadcrumb, dan structured data bila termasuk scope prioritas;
- loading, empty, error, dan fallback states.

BATASAN

1. Hanya konten published dan tidak terhapus yang boleh tampil.
2. Detail draft, deleted, atau slug invalid harus 404.
3. Journal hanya metadata dan external URL. Jangan membuat PDF viewer, volume/issue workflow, atau artikel ilmiah internal.
4. Service tidak mempunyai harga.
5. Field opsional kosong tidak boleh menghasilkan label kosong.
6. Rich text harus disanitasi sebelum diberikan ke rendering raw HTML.
7. External journal link wajib HTTPS dan menggunakan rel aman.
8. Filter state harus konsisten dengan URL.
9. Jangan mengirim model Eloquent mentah sebagai Inertia props.
10. Props hanya membawa field publik yang dibutuhkan.

FORMAT DOKUMEN

1. Document Metadata
2. Phase Objective
3. Scope and Non-Goals
4. Current Repository Assessment
5. Public Route Matrix
6. Controller and Query-Layer Plan
7. Inertia Props Contracts
8. Phase 3A Plan
9. Phase 3A Exit Gate
10. Phase 3B Plan
11. Component and Page Inventory
12. Filter and Query Normalization Rules
13. SEO and Sharing Plan
14. Accessibility and Responsive Behavior
15. Loading, Empty, Error, and Fallback States
16. Ordered Task Breakdown
17. Automated Test Matrix
18. Manual Acceptance Scenarios
19. Performance Considerations
20. Risks and Edge Cases
21. Definition of Done
22. Exit Criteria
23. PRD Traceability Matrix

Untuk setiap route, dokumentasikan:

- route;
- controller/action;
- query object atau service;
- Inertia page;
- props contract;
- cache consideration;
- success status;
- error status;
- authorization/publication rule;
- test cases.

Untuk setiap task, sertakan:

- ID;
- dependency;
- target module;
- implementation steps;
- acceptance criteria;
- automated test;
- manual test;
- complexity S/M/L.

Akhiri dengan READY FOR IMPLEMENTATION atau BLOCKED.
```

---

# Prompt — Phase 4: Conversion & Application Hardening

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Senior Full-Stack Engineer, Application Security Engineer, Accessibility Specialist, Performance Engineer, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. seluruh implementation plan Phase 0 sampai Phase 3
3. seluruh repository aktif

TUGAS

Buat implementation plan khusus untuk:

PHASE 4 — CONVERSION FLOWS, PRIVACY, SECURITY, ACCESSIBILITY, AND PERFORMANCE HARDENING

Jangan mengimplementasikan kode. Buat:

docs/implementation/04-conversion-and-hardening.md

SCOPE CONVERSION

1. Book WhatsApp ordering.
2. Service WhatsApp consultation.
3. Kirim Naskah client-only form.
4. Contact-channel interactions.
5. Aggregate analytics events.
6. Privacy notice dan consent behavior bila diperlukan.

ATURAN FORM KIRIM NASKAH

- tidak mempunyai endpoint POST;
- tidak mengirim data ke domain Taretan Media;
- tidak menyimpan data pada database;
- tidak memasukkan data ke server log;
- tidak memasukkan nama, email, atau judul naskah ke analytics;
- validasi dilakukan di sisi client;
- WhatsApp URL baru dibentuk setelah form valid;
- pengguna tetap meninjau dan menekan tombol kirim di WhatsApp;
- halaman menjelaskan perpindahan pemrosesan ke WhatsApp.

ATURAN WHATSAPP

- nomor berasal dari konfigurasi environment yang aktif;
- template pesan berasal dari source/config atau konfigurasi yang disepakati;
- pesan harus URL-encoded;
- book message memuat judul dan canonical URL;
- service message memuat nama layanan;
- fallback WhatsApp Web tetap dapat digunakan;
- nomor atau template invalid harus terdeteksi saat boot, deployment, atau smoke test;
- sediakan fallback kontak yang aman.

ANALYTICS

Rencanakan event agregat:

- book_view
- book_filter
- book_whatsapp_click
- journal_external_click
- service_whatsapp_click
- manuscript_form_start
- manuscript_whatsapp_click
- share_click

Analytics tidak boleh menerima field form, credential, token, atau URL yang mengandung personal data.

HARDENING YANG WAJIB DIRENCANAKAN

- CSRF pada seluruh mutasi;
- login rate limit;
- secure, HttpOnly, dan SameSite cookies;
- HTTPS dan HSTS rollout;
- CSP;
- X-Content-Type-Options;
- referrer policy;
- frame-ancestors;
- permissions policy;
- rich-text sanitization verification;
- upload security verification;
- external-link security;
- APP_DEBUG=false;
- secret management;
- privacy-safe logging;
- audit events;
- error monitoring;
- generic 500;
- keyboard navigation;
- focus indicator;
- form labels;
- error summary dan inline error;
- contrast;
- reduced motion;
- mobile viewport mulai 360px;
- lazy loading;
- explicit image dimensions;
- eager loading;
- query-count checks;
- Lighthouse gate;
- Core Web Vitals readiness.

FORMAT DOKUMEN

1. Document Metadata
2. Phase Objective
3. Scope and Non-Goals
4. Current Repository Assessment
5. Conversion Flow Architecture
6. WhatsApp URL and Template Contract
7. Manuscript Client-Only Form Plan
8. Analytics Event and Privacy Matrix
9. Security Hardening Plan
10. Accessibility Remediation Plan
11. Performance Remediation Plan
12. Error Handling and Monitoring Plan
13. Ordered Task Breakdown
14. Automated Security and Functional Tests
15. Accessibility Test Matrix
16. Performance Test Matrix
17. Manual Acceptance Scenarios
18. Configuration Validation and Failure Modes
19. Risks and Rollback Strategy
20. Definition of Done
21. Exit Criteria
22. PRD Traceability Matrix

Setiap task harus mempunyai:

- task ID;
- dependency;
- affected routes/components/config;
- security atau privacy impact;
- acceptance criteria;
- automated verification;
- manual verification;
- complexity S/M/L;
- rollback atau disable strategy.

Buat juga threat checklist minimum untuk:

- XSS;
- malicious upload;
- unsafe external URL;
- leaked secret;
- analytics PII capture;
- session fixation;
- brute-force login;
- draft content exposure;
- open redirect;
- WhatsApp message injection atau malformed encoding.

Jangan menyatakan suatu control sudah aman hanya karena framework menyediakannya secara default. Rencana harus menjelaskan bagaimana control tersebut dikonfigurasi dan diuji.

Akhiri dengan READY FOR IMPLEMENTATION atau BLOCKED.
```

---

# Prompt — Phase 5: UAT & Release Candidate

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai QA Lead, Release Manager, Content Migration Planner, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. seluruh implementation plan Phase 0 sampai Phase 4
3. seluruh repository aktif
4. test suite, build configuration, migration, seeder, dan deployment-related files yang tersedia

TUGAS

Buat implementation plan khusus untuk:

PHASE 5 — UAT, CONTENT READINESS, BACKUP REHEARSAL, AND RELEASE CANDIDATE

Jangan melakukan production deployment. Jangan mengubah application code. Buat:

docs/implementation/05-uat-and-release-candidate.md

TUJUAN

Menghasilkan release candidate yang:

- memenuhi acceptance criteria MVP;
- tidak membawa demo data tanpa persetujuan;
- dapat dibangun sebagai deployment artifact;
- tidak bergantung pada Node.js di shared hosting;
- tidak mempunyai absolute-path dependency;
- mempunyai backup dan restore procedure yang telah direhearsal;
- mempunyai runbook deployment;
- tidak mempunyai defect Sev-1 atau Sev-2 terbuka;
- siap memasuki shared-hosting preflight.

CAKUPAN

- requirement coverage audit;
- test-suite coverage audit;
- user acceptance test;
- admin workflow test;
- browser dan viewport compatibility;
- accessibility QA;
- Lighthouse/performance QA;
- security regression;
- content candidate import atau entry plan;
- demo-data removal verification;
- external-link verification;
- WhatsApp configuration test menggunakan non-production values;
- SQLite backup rehearsal;
- media backup rehearsal;
- restore rehearsal;
- database integrity verification setelah restore;
- deployment artifact creation;
- migration rehearsal;
- rollback rehearsal;
- environment inventory;
- operational runbook;
- defect triage;
- content-owner sign-off checklist;
- release readiness decision.

FORMAT DOKUMEN

1. Document Metadata
2. Phase Objective
3. Entry Criteria
4. Current Release Readiness Assessment
5. Requirement Coverage Matrix
6. UAT Scenario Matrix
7. Browser and Device Matrix
8. Accessibility QA Plan
9. Performance QA Plan
10. Security Regression Plan
11. Content Readiness and Demo-Data Removal
12. Backup and Restore Rehearsal
13. Deployment Artifact Plan
14. Migration and Rollback Rehearsal
15. Operational Runbook Outline
16. Defect Severity and Triage Rules
17. Ordered Task Breakdown
18. Evidence Required for Sign-Off
19. Release Candidate Checklist
20. Definition of Done
21. Exit Criteria
22. PRD Traceability Matrix

UAT WAJIB MENCAKUP

PUBLIC:

- beranda;
- filter dan pencarian buku;
- detail buku;
- multiple authors;
- share/copy-link;
- WhatsApp order;
- katalog dan detail jurnal;
- journal external link;
- katalog dan detail artikel;
- sanitasi artikel;
- layanan;
- konsultasi WhatsApp;
- kirim naskah;
- profil;
- kontak;
- mobile navigation;
- empty state;
- 404;
- generic 500 behavior.

ADMIN:

- login valid;
- login invalid;
- rate limiting;
- create/edit/publish/draft/delete/restore;
- category-type validation;
- author ordering;
- upload valid;
- upload invalid;
- external URL invalid;
- logout;
- anonymous admin-route access.

BACKUP/RESTORE

Rencana harus menjelaskan:

- apa yang dibackup;
- lokasi backup;
- enkripsi;
- retensi;
- restore target;
- checksum atau integrity check;
- siapa yang memverifikasi;
- evidence yang disimpan;
- failure response.

Jangan menyatakan release candidate READY bila:

- ada Sev-1 atau Sev-2 terbuka;
- backup belum dapat direstore;
- demo content masih terbawa tanpa persetujuan;
- acceptance test kritis gagal;
- artifact deployment tidak reproducible.

Akhiri dengan salah satu status:

RELEASE CANDIDATE READY
RELEASE CANDIDATE BLOCKED

Sertakan daftar blocker dan owner-nya bila blocked.
```

---

# Prompt — Phase 6: Hosting Preflight & Production Release

Salin seluruh prompt di bawah ini ke AI Agent.

```text
Anda bertindak sebagai Release Engineer, Laravel Deployment Specialist, Database Reliability Engineer, dan Technical Delivery Planner.

Baca:

1. docs/product/taretan-media-prd.md
2. seluruh implementation plan Phase 0 sampai Phase 5
3. repository aktif
4. deployment artifact dan runbook yang tersedia
5. detail lingkungan shared hosting yang benar-benar dapat diakses

TUGAS

Buat implementation plan khusus untuk:

PHASE 6 — SHARED-HOSTING PREFLIGHT, DATABASE GO/NO-GO, PRODUCTION DEPLOYMENT, AND POST-LAUNCH VALIDATION

Jangan mengklaim deployment berhasil. Tugas ini hanya membuat implementation plan berdasarkan bukti hosting yang tersedia.

Buat:

docs/implementation/06-production-release.md

CRITICAL GATE

SQLite hanya boleh digunakan di production apabila semua pemeriksaan inti lulus:

- versi PHP kompatibel;
- ekstensi Laravel yang dibutuhkan tersedia;
- pdo_sqlite aktif;
- file database berada pada filesystem persisten;
- file database writable oleh application process;
- file database berada di luar public web root;
- file locking berfungsi;
- concurrent read/write test dapat diterima;
- backup dapat dijalankan;
- restore dapat dilakukan;
- cron atau scheduler tersedia sesuai kebutuhan;
- storage media persisten;
- public storage strategy bekerja;
- deployment dan migration dapat dilakukan secara terkontrol.

Apabila satu syarat inti gagal, plan harus memilih MySQL atau PostgreSQL yang disediakan hosting, menjelaskan perubahan konfigurasi, migration verification, dan regression test yang perlu diulang.

Jangan memaksa SQLite hanya karena digunakan pada local development.

CAKUPAN IMPLEMENTATION PLAN

- inventory hosting;
- access model;
- PHP dan extension preflight;
- Composer/CLI availability;
- strategy bila Composer tidak tersedia di server;
- document-root mapping;
- environment configuration;
- secret setup;
- file permission;
- database location;
- SQLite locking test;
- database fallback decision;
- storage link atau equivalent mapping;
- scheduler/cron;
- production asset upload;
- config, route, dan view cache;
- pre-deployment backup;
- controlled migration;
- initial production admin seeding;
- demo-data exclusion;
- content verification;
- smoke test;
- monitoring;
- alerting;
- log access;
- backup schedule;
- restore verification;
- rollback;
- production sign-off;
- Day 1–7 monitoring;
- Day 30 KPI baseline review;
- Day 90 product and database review.

FORMAT DOKUMEN

1. Document Metadata
2. Entry Criteria
3. Known Hosting Facts
4. Unknowns and Access Blockers
5. Shared-Hosting Preflight Matrix
6. SQLite Go/No-Go Decision Framework
7. MySQL/PostgreSQL Fallback Plan
8. Production Environment Plan
9. File and Storage Layout
10. Deployment Sequence
11. Migration Safety Plan
12. Backup and Rollback Plan
13. Smoke Test Matrix
14. Monitoring and Alerting Plan
15. Production Content Verification
16. Ordered Task Breakdown
17. Responsibility and Sign-Off Matrix
18. Post-Launch Plan
19. Definition of Done
20. Final Go/No-Go Checklist
21. PRD Traceability Matrix

SETIAP PREFLIGHT CHECK HARUS MEMUAT

- check ID;
- requirement;
- cara memeriksa;
- command atau procedure;
- expected result;
- actual evidence placeholder;
- PASS/FAIL/BLOCKED rule;
- impact jika gagal;
- fallback;
- owner.

DEPLOYMENT SEQUENCE

Rencana wajib menyertakan urutan yang eksplisit, termasuk:

1. freeze perubahan;
2. verifikasi artifact;
3. backup;
4. upload/release;
5. environment setup;
6. permissions;
7. database setup;
8. controlled migration;
9. cache build;
10. storage verification;
11. smoke test;
12. monitoring verification;
13. content-owner sign-off;
14. release announcement;
15. rollback trigger bila ditemukan failure kritis.

SMOKE TEST MINIMUM

- homepage;
- book search/filter;
- book detail;
- book WhatsApp;
- journal detail dan external link;
- article detail;
- manuscript client-only flow;
- services CTA;
- contact links;
- admin login;
- content CRUD;
- publish/draft visibility;
- upload;
- logout;
- backup execution.

Bila detail atau akses hosting belum tersedia, hasil akhir harus:

PRODUCTION PLAN BLOCKED — HOSTING ACCESS REQUIRED

Jangan mengarang hasil preflight.

Bila seluruh informasi sudah tersedia tetapi pemeriksaan belum dilakukan, gunakan:

PLAN READY — PREFLIGHT NOT YET EXECUTED

Jangan menggunakan status PRODUCTION READY sebelum semua evidence PASS dan sign-off terdefinisi.
```
