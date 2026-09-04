# Taretan Media — AI Agent Implementation Documentation

Paket ini berisi dokumen sumber dan prompt bertahap untuk meminta AI Agent menyusun implementation plan website Taretan Media.

## Isi Paket

```text
taretan-media-ai-agent-docs/
├── README.md
├── START-HERE.md
├── docs/
│   ├── product/
│   │   └── taretan-media-prd.md
│   ├── planning/
│   │   └── 00-phase-map.md
│   └── prompts/
│       ├── 00-scope-architecture-lock.md
│       ├── 01-technical-foundation.md
│       ├── 02-domain-and-admin-cms.md
│       ├── 03-public-discovery.md
│       ├── 04-conversion-and-hardening.md
│       ├── 05-uat-and-release-candidate.md
│       ├── 06-production-release.md
│       ├── AI-AGENT-GUARDRAILS.md
│       └── ALL-PHASE-PROMPTS.md
└── MANIFEST.sha256
```

## Rekomendasi Fase

Proyek dibagi menjadi tujuh fase bernomor 0–6:

1. Phase 0 — Scope & Architecture Lock
2. Phase 1 — Technical Foundation & Design System
3. Phase 2 — Data Model & Admin CMS
4. Phase 3 — Public Discovery Experience
5. Phase 4 — Conversion & Application Hardening
6. Phase 5 — UAT & Release Candidate
7. Phase 6 — Hosting Preflight & Production Release

Struktur ini mengikuti milestone M0–M6 pada PRD. Phase 2 dan Phase 3 masing-masing dibagi lagi menjadi dua work package internal agar cakupan AI Agent tetap terkendali.

## Cara Menggunakan

1. Letakkan seluruh folder ini pada root repository proyek.
2. Pastikan PRD berada di `docs/product/taretan-media-prd.md`.
3. Jalankan prompt secara berurutan, mulai Phase 0 sampai Phase 6.
4. Gunakan satu sesi planning terpisah untuk setiap phase.
5. Review implementation plan sebelum memberikannya kepada coding agent.
6. Jangan lanjut ke phase berikutnya sebelum exit criteria phase aktif terpenuhi.
7. Selalu sertakan `AI-AGENT-GUARDRAILS.md` saat meminta implementasi kode.

## Prinsip Penting

- PRD adalah sumber kebenaran utama.
- Planning dan implementation sebaiknya dilakukan pada sesi agent yang berbeda.
- Jangan meminta agent mengerjakan semua phase sekaligus.
- Shared-hosting preflight merupakan hard gate sebelum production.
- SQLite hanya boleh dipakai di production setelah preflight filesystem, locking, backup, dan runtime lulus.
- Fitur di luar scope harus dicatat sebagai proposal, bukan langsung dibuat.
