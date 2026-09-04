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
