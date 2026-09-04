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
