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
