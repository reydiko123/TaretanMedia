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
