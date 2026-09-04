# Start Here

## Alur Kerja yang Direkomendasikan

### Langkah 1 — Masukkan paket ke repository

Salin struktur berikut ke root repository:

```text
docs/product/taretan-media-prd.md
docs/planning/00-phase-map.md
docs/prompts/*.md
```

### Langkah 2 — Jalankan planning per phase

Gunakan prompt berikut secara berurutan:

| Urutan | File Prompt | Output yang Diminta dari Agent |
|---:|---|---|
| 1 | `docs/prompts/00-scope-architecture-lock.md` | `docs/implementation/00-scope-architecture-lock.md` |
| 2 | `docs/prompts/01-technical-foundation.md` | `docs/implementation/01-technical-foundation.md` |
| 3 | `docs/prompts/02-domain-and-admin-cms.md` | `docs/implementation/02-domain-and-admin-cms.md` |
| 4 | `docs/prompts/03-public-discovery.md` | `docs/implementation/03-public-discovery.md` |
| 5 | `docs/prompts/04-conversion-and-hardening.md` | `docs/implementation/04-conversion-and-hardening.md` |
| 6 | `docs/prompts/05-uat-and-release-candidate.md` | `docs/implementation/05-uat-and-release-candidate.md` |
| 7 | `docs/prompts/06-production-release.md` | `docs/implementation/06-production-release.md` |

### Langkah 3 — Review setiap plan

Sebelum implementasi, pastikan plan:

- mempunyai task ID dan dependency;
- menyebut target file atau module;
- mempunyai acceptance criteria dan test;
- tidak menambah fitur di luar PRD;
- tidak mengarang kondisi repository;
- mempunyai exit criteria yang dapat dibuktikan;
- mencantumkan blocker secara konkret.

### Langkah 4 — Implementasikan dalam sesi terpisah

Berikan kepada coding agent:

1. PRD;
2. implementation plan phase aktif;
3. `AI-AGENT-GUARDRAILS.md`;
4. repository aktif.

Jangan meminta coding agent melanjutkan otomatis ke phase berikutnya. Agent yang diberi kebebasan tanpa pagar biasanya menemukan cara yang sangat efisien untuk menciptakan utang teknis.

### Langkah 5 — Gunakan gate

Status yang diperbolehkan:

- `READY FOR IMPLEMENTATION`
- `BLOCKED`
- `RELEASE CANDIDATE READY`
- `RELEASE CANDIDATE BLOCKED`
- `PLAN READY — PREFLIGHT NOT YET EXECUTED`
- `PRODUCTION PLAN BLOCKED — HOSTING ACCESS REQUIRED`

Status tidak boleh berdasarkan asumsi atau perasaan optimistis.
