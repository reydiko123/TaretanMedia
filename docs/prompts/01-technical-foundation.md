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
