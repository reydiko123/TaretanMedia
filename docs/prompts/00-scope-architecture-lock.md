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
