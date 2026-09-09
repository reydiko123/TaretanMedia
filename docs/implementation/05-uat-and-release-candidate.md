# Phase 5 — UAT, Content Readiness, Backup Rehearsal, and Release Candidate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menghasilkan release candidate lokal/staging yang memenuhi acceptance criteria MVP, bebas demo content yang tidak disetujui, dapat dipulihkan dari backup, dan dapat dikemas sebagai artifact shared-hosting tanpa membutuhkan Node.js di server.

**Architecture:** Phase 5 adalah evidence-driven release gate, bukan fase fitur baru. Repository, kandidat konten, database SQLite, media, dan artifact diuji sebagai satu unit rilis; setiap hasil ditautkan ke requirement, skenario, defect, owner, dan bukti yang dapat diverifikasi ulang.

**Tech Stack:** Laravel 13, PHP 8.3+, SQLite, Inertia.js 3, React 19, Filament 5, PHPUnit 12, Vitest/Vite Plus, Vite 8, GitHub Actions, Lighthouse, browser assistive technology, dan checksum SHA-256.

**Spec:** `docs/prompts/05-uat-and-release-candidate.md`, `docs/product/taretan-media-prd.md`, dan `docs/implementation/00-scope-architecture-lock.md` sampai `04-conversion-and-hardening.md`.

## Global Constraints

- Jangan melakukan production deployment atau shared-hosting preflight; keduanya milik Phase 6.
- Jangan mengubah application code saat menyusun atau menjalankan assessment awal Phase 5. Defect yang ditemukan dicatat dan diperbaiki melalui task/commit terpisah sebelum regression.
- Jangan menjalankan `migrate:fresh`, `migrate:refresh`, `db:wipe`, atau operasi destruktif lain pada database aktif.
- Jangan memakai data, credential, nomor WhatsApp, endpoint analytics, atau URL production nyata di repository, log, screenshot, atau artifact evidence.
- Release candidate harus memakai asset hasil build; Node.js dan `node_modules` tidak boleh menjadi dependency runtime shared hosting.
- Database SQLite dan media harus dibackup, direstore ke target terisolasi, lalu diverifikasi sebelum status dapat menjadi READY.
- Demo content hanya boleh berada pada local/testing/staging dan tidak boleh masuk kandidat rilis tanpa persetujuan tertulis Content Owner.
- Status akhir hanya `RELEASE CANDIDATE READY` atau `RELEASE CANDIDATE BLOCKED`.
- READY dilarang bila ada Sev-1/Sev-2 terbuka, acceptance test kritis gagal, restore belum berhasil, demo content belum disetujui/dihapus, atau artifact tidak reproducible.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan — Phase 5: UAT & Release Candidate |
| Versi | 1.0 |
| Tanggal assessment | 9 September 2026 |
| Phase | 5 dari 0–6, milestone PRD M5 |
| Repository baseline | Branch `main`, commit `231e390` |
| Working tree saat assessment | Bersih sebelum dokumen ini dibuat |
| Status awal release candidate | **BLOCKED**; lihat Bagian 4 dan penutup |
| Target environment | Local production-like atau staging sementara; bukan production |
| Evidence root | CI artifact dan paket evidence eksternal `release-evidence/<RC_ID>/`; jangan commit secret, database, backup, atau data personal |
| Decision authority | QA Lead + Release Manager + Content Owner; Security/Engineering memberi verifikasi domainnya |

`RC_ID` wajib immutable dan berbentuk `taretan-media-rc-YYYYMMDD.N`, misalnya `taretan-media-rc-20260909.1`. Semua evidence, defect, artifact, checksum, dan sign-off memakai ID yang sama.

## 2. Phase Objective

1. Membuktikan seluruh Must Have PRD dan alur kritis berfungsi pada kandidat build yang sama.
2. Menjalankan UAT publik dan admin dengan hasil, severity, owner, serta evidence yang dapat diaudit.
3. Menetapkan kandidat konten yang disetujui dan membuktikan tidak ada demo content tak berizin.
4. Merehearsal backup/restore SQLite dan media, termasuk checksum serta integrity check pasca-restore.
5. Menghasilkan artifact deployment reproducible yang sudah membawa `vendor/` dan `public/build/`, tetapi tidak membawa Node.js, source secret, database lokal, atau demo media.
6. Merehearsal migration dan rollback pada salinan terisolasi.
7. Menyediakan operational runbook untuk handoff ke shared-hosting preflight Phase 6.
8. Mengambil keputusan release readiness tanpa mengubah kegagalan menjadi pengecualian informal.

## 3. Entry Criteria

| Kriteria masuk | Bukti minimum | Status 9 Sep 2026 | Owner |
|---|---|---|---|
| Phase 0–4 plan tersedia | Lima dokumen implementation | Terpenuhi | Release Manager |
| Repository berada pada commit kandidat dan working tree terkendali | Commit SHA + `git status --short` | Baseline tersedia; RC tag belum dibuat | Release Manager |
| PHP automated suite hijau | Output PHPUnit dengan jumlah test/assertion | Terpenuhi: 52 test, 425 assertion, 0 failure | Engineering |
| Frontend unit suite hijau | Output Vitest | Terpenuhi: 2 file, 4 test, 0 failure | Engineering |
| Lint/static analysis/build hijau | Vite Plus, PHPStan, Pint, Vite build | Terpenuhi pada baseline assessment | Engineering |
| Production config fixture valid | `taretan:validate-config --production` exit 0 | **Belum**: gagal pada `app.debug`, `app.url`, `session.secure` | Release Manager |
| Environment UAT terisolasi tersedia | URL/host lokal atau staging + access register | Belum dibuktikan | Engineering |
| Kandidat konten tersedia | Content manifest + approval | Belum tersedia | Content Owner |
| Backup target terenkripsi tersedia | Lokasi, akses, retention owner | Belum tersedia | Release Manager |
| Defect register aktif | Register dengan severity/owner/status | Belum tersedia | QA Lead |

Phase 5 boleh dimulai untuk menutup entry gap. Eksekusi UAT final hanya dilakukan setelah satu commit dan satu `RC_ID` dibekukan.

## 4. Current Release Readiness Assessment

Assessment ini membedakan bukti yang benar-benar ada dari pekerjaan yang baru direncanakan.

| Area | Evidence saat ini | Penilaian | Gap menuju READY |
|---|---|---|---|
| Source baseline | `main@231e390`; implementasi Phase 1–4 tersedia | Partial | Bekukan RC commit/tag dan rekam dependency lock hash |
| Automated PHP | 52/52 test; 425 assertion lulus pada 9 Sep 2026 | Pass baseline | Ulangi pada artifact/RC final |
| Frontend unit | 4/4 test lulus | Pass baseline terbatas | Belum ada component/browser/axe suite untuk flow interaktif |
| Formatting/static analysis | Vite Plus check, Pint, PHPStan lulus | Pass baseline | Ulangi pada RC final |
| Production asset build | `npm run build` berhasil; `public/build` terbentuk | Partial | Belum ada dua-build reproducibility comparison dan paket artifact final |
| Production config | Validator exit 1: `app.debug`, `app.url`, `session.secure` | **Blocked** | Buat fixture UAT production-like tanpa nilai production nyata |
| Public acceptance | Feature tests tersedia untuk route/visibility/filter/error | Partial | UAT manual seluruh flow, browser, viewport, link, share, WA belum ada |
| Admin acceptance | Auth/resource render tests tersedia | Partial | CRUD/publish/draft/delete/restore/upload/rate-limit manual belum disign-off |
| Accessibility | Baseline semantic implementation ada | **Blocked** | Axe, keyboard, screen-reader, contrast, zoom, 360 px evidence belum ada |
| Performance | Build size diketahui; chunk analytics 347.77 kB raw/109.79 kB gzip | **Blocked** | Lighthouse representative median dan runtime network evidence belum ada |
| Security regression | Header/config/log tests tersedia | Partial | Adversarial upload/auth/session/external-link manual regression belum lengkap |
| Content readiness | Demo seeder memiliki environment guard | **Blocked** | Kandidat konten, provenance, link check, dan owner sign-off belum ada |
| Backup/restore | Tidak ditemukan runbook atau evidence rehearsal | **Blocked** | SQLite + media backup/restore/integrity rehearsal wajib |
| Migration/rollback | Migration tersedia | **Blocked** | Belum direhearsal pada clone data kandidat |
| Deployment artifact | Asset build ada; `MANIFEST.sha256` hanya memuat dokumen utama | **Blocked** | Artifact lengkap, exclusion audit, checksum, dan reproducibility wajib |
| Defect readiness | Belum ada defect register UAT | **Blocked** | Triage seluruh temuan dan nol Sev-1/Sev-2 terbuka |

Kesimpulan assessment: automated baseline cukup untuk memasuki pekerjaan Phase 5, tetapi belum cukup untuk menyatakan release candidate siap.

## 5. Requirement Coverage Matrix

| ID | Requirement/acceptance | Automated evidence yang ada | UAT/evidence Phase 5 | Gate |
|---|---|---|---|---|
| FR-M01 | Semua halaman publik MVP | `PublicDiscoveryTest`, `ManuscriptConversionTest` | UAT-P01–P15 | Critical |
| FR-M02 | Filter/search/sort/pagination buku | `PublicDiscoveryTest` | UAT-P02 | Critical |
| FR-M03 | Metadata buku + multiple authors | Domain/Public tests | UAT-P03 | Critical |
| FR-M04 | Pesan buku via WhatsApp | `ConversionConfigTest`, `whatsapp.test.ts` | UAT-P05 | Critical |
| FR-M05 | Native share/copy link | Implementasi UI; unit coverage terbatas | UAT-P04 | Major |
| FR-M06 | Katalog metadata jurnal + HTTPS external URL | Domain/Public tests | UAT-P06–P07 | Critical |
| FR-M07 | Artikel + sanitized rich text | Support/Public tests | UAT-P08–P09 | Critical |
| FR-M08 | Form Kirim Naskah client-only | Route test + WhatsApp unit | UAT-P12 dan network/storage inspection | Critical |
| FR-M09 | Layanan tanpa harga + konsultasi | Public tests | UAT-P10 | Critical |
| FR-M10 | Config/source global; env per-environment | Config mapper tests parsial | UAT-P11/P13 + env inventory | Critical |
| FR-M11 | Panel Filament privat | `AdminPanelTest` | UAT-A01/A02/A16 | Critical |
| FR-M12 | CRUD dan lifecycle seluruh konten | Resource render/domain tests | UAT-A03–A12 | Critical |
| FR-M13 | Draft/deleted/future tidak publik | Domain/Public tests | UAT-P03/P07/P09 + UAT-A09 | Critical |
| FR-M14 | Upload dan external URL tervalidasi | Domain rules parsial | UAT-A13–A15 | Critical |
| FR-M15 | SEO minimum | Public props tests parsial | View-source audit seluruh priority page | Major |
| FR-S01/S02 | Featured home dan ordering | Public/domain tests | Home populated/empty UAT | Major |
| FR-S03 | Sitemap, robots, breadcrumb/schema | Public test parsial | Validator XML/HTML manual | Major |
| FR-S04 | Analytics agregat privacy-safe | `analytics.test.ts`, logging tests | Disabled-mode network audit; enabled fixture audit | Critical bila enabled |
| FR-S05 | Soft delete/restore | Domain tests | UAT-A10/A11 | Critical |
| FR-S06 | Preview sebelum publish | Belum ada evidence publik final | Admin preview UAT | Minor bila tidak dijanjikan ke owner; Major bila dipakai |
| NFR 7.1 | Lighthouse/CWV readiness | Belum ada | Bagian 9 | Critical threshold |
| NFR 7.2 | Backup harian, restore, RPO/RTO | Belum ada | Bagian 12 | Hard gate |
| NFR 7.4 | WCAG 2.1 AA alur utama | Belum ada evidence lengkap | Bagian 8 | Critical |
| NFR 7.5 | Browser terbaru + mobile 360 px | Belum ada | Bagian 7 | Critical |
| NFR 7.7/§12 | Privacy/security | Automated parsial | Bagian 10 + privacy UAT | Critical |

## 6. UAT Scenario Matrix

Semua skenario memakai build dan database kandidat dengan `RC_ID` yang sama. Evidence minimum: waktu, tester, environment, commit, browser/device, input non-rahasia, hasil aktual, screenshot/video bila relevan, dan defect ID bila gagal.

### 6.1 Public

| ID | Skenario dan langkah inti | Expected result | Priority |
|---|---|---|---|
| UAT-P01 | Buka beranda dengan konten kandidat dan database kosong | 200; hierarchy jelas; featured hanya published; empty state tidak rusak | Critical |
| UAT-P02 | Cari buku via judul/author; kombinasikan kategori, harga, tahun, sort, pagination; Back/Forward; reset; query invalid | URL menjadi source of truth; hasil benar; invalid input tidak 500 | Critical |
| UAT-P03 | Buka detail buku lengkap/minimal; cek multiple authors berurutan; coba slug draft/deleted/future/tidak ada | Metadata benar; field kosong tidak meninggalkan label; hidden record 404 | Critical |
| UAT-P04 | Pakai native share lalu copy-link fallback termasuk permission rejection | Canonical URL dibagikan/disalin tepat; feedback accessible | Major |
| UAT-P05 | Pesan buku berjudul ASCII/Unicode/`&`/kutip/emoji dengan nomor non-production | `wa.me` HTTPS terbuka; title + canonical URL ter-encode sekali; user tetap menekan Send | Critical |
| UAT-P06 | Cari/filter/paginate katalog jurnal | Hanya published; state konsisten; empty state benar | Critical |
| UAT-P07 | Buka detail jurnal dan external link; coba hidden slug dan HTTP URL | Metadata benar; tab eksternal aman; hidden 404; URL invalid tidak lolos CMS | Critical |
| UAT-P08 | Cari/filter/paginate katalog artikel | Hanya published; metadata kartu benar; empty state benar | Critical |
| UAT-P09 | Buka artikel dengan heading/list/link dan payload berbahaya | Formatting aman; script/event/unsafe URI tidak aktif; hidden slug 404 | Critical |
| UAT-P10 | Buka layanan 0/1/banyak item; klik konsultasi per layanan | Hanya active; urut; tanpa harga; pesan memuat layanan yang tepat | Critical |
| UAT-P11 | Buka profil | Copy hanya dari config yang disetujui; SEO dan heading benar | Major |
| UAT-P12 | Kirim Naskah invalid lalu valid; inspect Network/Application | Error fokus/terbaca; valid membuka WA; nol POST, DB, log, cookie/storage, atau analytics PII | Critical |
| UAT-P13 | Kontak dengan WA+email, email-only, address-only, dan semua channel kosong | Hanya channel valid tampil; fallback netral; external link aman | Critical |
| UAT-P14 | Navigasi mobile 360 px dengan keyboard/touch | Menu buka/tutup, focus trap/return, active state, tanpa overflow | Critical |
| UAT-P15 | Trigger empty state, 404, dan generic 500 | Status HTTP tepat; navigasi pulih; tidak ada stack trace/path/query/secret | Critical |

### 6.2 Admin

| ID | Skenario dan langkah inti | Expected result | Priority |
|---|---|---|---|
| UAT-A01 | Login credential valid non-production | Login berhasil; session ID diregenerasi; dashboard terbuka | Critical |
| UAT-A02 | Login invalid dan enam percobaan cepat | Pesan generik; limiter 5/menit aktif; tidak bocor username | Critical |
| UAT-A03 | Create/edit/publish Book dengan dua author dan kategori Book | Selesai ≤10 menit; order author tersimpan; published tampil publik | Critical |
| UAT-A04 | Create/edit/publish Journal dengan HTTPS URL | Tersimpan; detail publik dan link sesuai | Critical |
| UAT-A05 | Create/edit/publish Article dengan rich text | Tersanitasi; tampil benar; payload berbahaya hilang | Critical |
| UAT-A06 | Create/edit Author | Bio ≤255 diterima; invalid ditolak | Major |
| UAT-A07 | Create/edit Category setiap tipe | Slug unik; tipe tersimpan; filter resource benar | Major |
| UAT-A08 | Create/edit/activate Service | Urutan benar; tanpa field harga | Critical |
| UAT-A09 | Ubah published menjadi draft | Hilang dari route publik dan sitemap | Critical |
| UAT-A10 | Soft-delete konten | Hilang publik; file dan relasi tetap untuk restore | Critical |
| UAT-A11 | Restore konten | Record, relasi, slug, dan media pulih | Critical |
| UAT-A12 | Force-delete pada fixture yang aman dan author yang masih direferensikan | Konfirmasi wajib; cleanup benar; FK violation tampil ramah | Major |
| UAT-A13 | Upload JPEG/PNG/WebP valid ≤5 MB | Nama sistem; file tampil; tidak executable | Critical |
| UAT-A14 | Upload SVG, executable, MIME spoof/polyglot, dan >5 MB | Ditolak tanpa record setengah jadi atau orphan file | Critical |
| UAT-A15 | Masukkan HTTP/javascript/data/protocol-relative external URL | Ditolak; hanya HTTPS valid diterima | Critical |
| UAT-A16 | Logout lalu akses ulang; akses admin sebagai anonymous; mutasi tanpa CSRF | Session invalid; redirect login; mutasi tanpa CSRF ditolak | Critical |

## 7. Browser and Device Matrix

Versi target adalah dua versi mayor terbaru yang tersedia pada hari eksekusi; tester mencatat versi persis, OS, dan tanggal. BrowserStack/Sauce Labs boleh dipakai bila perangkat fisik tidak tersedia, tetapi minimal satu Safari/iOS nyata wajib bila akses ada.

| Platform | Viewport/perangkat | Browser | Flow minimum |
|---|---|---|---|
| Windows 11 | 1366×768 dan 1920×1080 | Chrome, Edge, Firefox dua mayor terbaru | Seluruh public smoke + admin critical |
| macOS | 1440×900 | Safari dan Chrome dua mayor terbaru | Public critical + share/external link |
| Android | 360×800 dan perangkat representatif | Chrome dua mayor terbaru | Nav, filter, detail, WA, manuscript, errors |
| iOS | 375×812/390×844 | Safari dua mayor terbaru | Nav, native share, WA, manuscript, keyboard |
| Tablet | 768×1024 | Safari iPadOS atau Chrome Android | Nav, catalogs, admin smoke bila didukung |
| Zoom/reflow | Desktop 1280 px pada zoom 200% | Chrome/Firefox | Seluruh alur publik kritis tanpa loss of content |

Pass mensyaratkan tidak ada blocker fungsi, horizontal page scroll pada 360 px, clipped CTA, focus hilang, layout overlap, atau fitur yang hanya bekerja pada satu engine.

## 8. Accessibility QA Plan

Target: WCAG 2.1 AA PRD; audit juga memakai kriteria kritis relevan WCAG 2.2.

1. Jalankan axe pada Home, Books Index/Show, Journals Index/Show, Articles Index/Show, Services, Manuscript, Contact, 404, dan admin login. Critical/serious violation = gagal.
2. Uji keyboard-only: skip link, nav/mobile dialog, filters, pagination, share, CTA eksternal, semua field/form error, login, dan logout.
3. Uji NVDA + Firefox/Chrome di Windows; lakukan VoiceOver + Safari smoke bila perangkat tersedia.
4. Verifikasi satu `h1`, hierarchy heading, landmark, label, accessible name, `aria-current`, error summary, live feedback, dan focus return.
5. Ukur contrast text/UI/focus, light/dark theme, disabled state, dan link di rich text.
6. Uji zoom 200%, viewport 360 px, reduced motion, serta target sentuh minimum 44×44 untuk aksi primer.
7. Simpan axe JSON/HTML, checklist keyboard, kombinasi screen reader/browser, screenshot focus/contrast, dan defect IDs.

Tidak adanya dependency `axe-core`/Testing Library pada baseline dicatat sebagai gap. QA boleh memakai axe DevTools/manual runner untuk evidence awal; automation baru hanya ditambahkan melalui defect/improvement task terpisah dan tidak boleh dianggap sudah ada.

## 9. Performance QA Plan

| Gate | Target | Metode/evidence |
|---|---|---|
| Lighthouse mobile | Performance ≥80; Accessibility, Best Practices, SEO ≥90 | Production build, representative data, throttled mobile; 3 run/page, median |
| Pages | Home, Books Index, Book Detail, Article Detail, Services, Manuscript | Laporan JSON/HTML per `RC_ID` |
| LCP/INP/CLS readiness | LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 | Lab proxy pada UAT; field p75 baru dinilai pasca-launch |
| Query | Tidak ada N+1 | Query log/ceiling pada fixture stabil |
| Image | LCP image saja eager/high priority; lainnya lazy; dimensi/aspect ratio eksplisit | DOM/network inspection |
| Payload | Tidak ada raw model, PII, duplicate full body pada card | Inertia payload inspection |
| JavaScript | Analytics absent saat disabled; tidak menghalangi conversion | Network/bundle inspection |

Build baseline berhasil, tetapi chunk `analytics` berukuran sekitar 347.77 kB raw/109.79 kB gzip. Ini bukan defect otomatis; QA harus membuktikan apakah chunk dimuat pada initial route dan apakah ia menyebabkan threshold gagal. Threshold gagal tidak boleh dihapus hanya karena satu rerun lulus.

## 10. Security Regression Plan

| Area | Regression wajib | Evidence |
|---|---|---|
| Authentication | Login valid/invalid, 5/min limiter, generic error, fixation, logout | HTTP/session assertions + manual capture tanpa secret |
| Authorization/CSRF | Anonymous admin access dan mutation tanpa CSRF ditolak | Status/redirect log |
| Headers | CSP report-only/enforce fixture, nonce unik, nosniff, referrer, frame, permissions | Header dump public/admin/404/500 |
| HTTPS/HSTS | HSTS hanya secure production-like request; long duration tetap Phase 6 | Header test; tidak mengaktifkan HSTS production |
| Article XSS | script, event, style, form, iframe, object, embed, unsafe URI | Stored/rendered fixture diff |
| Upload | SVG, executable, MIME spoof, polyglot, oversize, orphan cleanup | Admin attempt + storage inventory |
| External links | HTTPS-only dan `noopener noreferrer` | Source/DOM inspection |
| Draft exposure | Direct slug, catalog, sitemap | 404/list/XML evidence |
| Secrets/debug | Validator, error page, logs, Inertia props, artifact | Secret-pattern scan dengan synthetic canary |
| Privacy | Manuscript PII tidak masuk DB/log/analytics/URL/storage | Network, log, DB, Application-tab evidence |
| Open redirect/WA injection | Origin selalu `https://wa.me`; special chars encoded sekali | Unit + manual decoded URL |

Security/privacy finding High/Critical dipetakan minimal Sev-2 dan memblokir RC.

## 11. Content Readiness and Demo-Data Removal

1. Content Owner membuat manifest kandidat: `content_id`, tipe, judul, slug, status, author order, kategori, source, rights approval, media filename, external URL, dan approval state.
2. Kandidat database dibuat dari migration kosong dan `AdminSeeder`; jangan menyalin database development yang pernah menjalankan `DemoContentSeeder`.
3. Konten dimasukkan melalui Filament. CSV/importer tidak diasumsikan tersedia; kebutuhan bulk import menjadi perubahan scope terpisah.
4. Setiap buku/jurnal/artikel/service dibandingkan dengan manifest; jumlah record per status dan checksum media direkam.
5. Cari indikator demo: judul/slug dari fixture, domain `example.*`, lorem/faker text, placeholder image, email/nomor dummy, `Test User`, dan record tanpa provenance.
6. Semua external URL diperiksa: valid HTTPS, response yang dapat diterima, tujuan tepat, redirect final aman, dan tanggal pemeriksaan tercatat. Link yang diblokir bot diverifikasi manual.
7. Gunakan nomor WhatsApp non-production yang disetujui untuk UAT; decoded message diverifikasi tanpa benar-benar mengirim pesan bila owner tidak mengizinkan.
8. Content Owner menandatangani copy profil, visi/misi/nilai, kontak, CTA/template pesan, hak media, serta keputusan atas setiap demo-like record.

Gate lulus hanya bila manifest dan database/media sama, tidak ada record tanpa provenance, dan daftar demo content yang dipertahankan memiliki persetujuan eksplisit.

## 12. Backup and Restore Rehearsal

### 12.1 Backup set dan control

| Item | Isi | Lokasi rehearsal | Control |
|---|---|---|---|
| Database | File SQLite kandidat setelah writes dihentikan/checkpoint | Direktori sementara di luar web root | Enkripsi AES-256 melalui tool organisasi; SHA-256 sebelum/sesudah |
| Media | `storage/app/public/` kandidat | Arsip terpisah di luar web root | Enkripsi + file manifest SHA-256 |
| Release metadata | `RC_ID`, commit, migration list, PHP/dependency versions, timestamp UTC/WIB | Evidence package | Tanpa secret |
| Retention | Harian 30 hari sesuai PRD; rehearsal mengikuti policy yang sama | Storage backup terotorisasi | Access log + expiry test/documentation |

Backup tidak boleh diletakkan permanen di `public/`, repository, atau folder artifact. Kunci enkripsi disimpan di secret manager/password vault terpisah dari backup.

### 12.2 Rehearsal procedure

1. Bekukan write pada environment UAT dan catat waktu mulai.
2. Jalankan `PRAGMA wal_checkpoint(FULL)` bila WAL aktif; rekam journal mode.
3. Buat backup konsisten memakai SQLite Online Backup API/CLI `.backup`, bukan menyalin file aktif secara buta.
4. Buat arsip media dan manifest path+size+SHA-256.
5. Enkripsi kedua backup; hitung checksum file terenkripsi; uji bahwa file plaintext sementara dihapus dari area evidence setelah verifikasi.
6. Restore ke direktori/temp environment terisolasi dengan APP_URL dan credential non-production.
7. Jalankan `PRAGMA integrity_check` dan wajib memperoleh satu baris `ok`; jalankan `PRAGMA foreign_key_check` dan wajib memperoleh nol baris.
8. Bandingkan migration list, row count per tabel bisnis, record sampling, dan checksum seluruh media.
9. Jalankan smoke: Home, satu detail tiap tipe, login, edit non-kritis, dan render media pada hasil restore.
10. Catat durasi backup/restore terhadap target RPO ≤24 jam dan RTO ≤4 jam.
11. QA Lead dan Release Manager menandatangani evidence; kegagalan membuat Sev-2 dan menghentikan RC.

Failure response: hentikan promosi RC, lindungi backup terakhir yang valid, simpan log tanpa secret, buka defect Sev-2/Sev-1 sesuai dampak kehilangan data, tetapkan owner, perbaiki prosedur, lalu ulangi rehearsal dari awal.

## 13. Deployment Artifact Plan

Artifact diberi nama `<RC_ID>.tar.gz` atau `<RC_ID>.zip` dan dibangun dari clean checkout commit kandidat.

### 13.1 Build recipe

1. Verifikasi lockfile: `composer.lock` dan `package-lock.json` ada dan tidak berubah.
2. Jalankan `composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction` pada workspace packaging terisolasi.
3. Jalankan `npm ci`, `npm run check`, `npm run test:unit -- --run`, dan `npm run build` pada build host.
4. Jalankan `php artisan test --do-not-cache-result` dan `php artisan taretan:validate-config --production` memakai fixture production-like tanpa secret nyata.
5. Jangan menjalankan config/route/view cache sebelum `.env` target tersedia; runbook Phase 6 melakukannya setelah konfigurasi hosting ditempatkan.
6. Paketkan application source/runtime, `vendor/`, dan `public/build/`.

### 13.2 Inclusion/exclusion

| Include | Exclude |
|---|---|
| `app/`, `bootstrap/`, `config/`, `database/migrations/`, `public/`, `resources/views/`, `routes/`, `storage/` directory skeleton, `vendor/`, `artisan`, `composer.json`, `composer.lock` | `.git/`, `.github/`, `.env*` kecuali template non-secret bila dibutuhkan runbook, `node_modules/`, tests, docs, local SQLite file, logs, caches, screenshots/evidence, demo uploads, editor/agent folders |

Artifact audit wajib membuktikan:

- `node`, `npm`, atau `node_modules` tidak dibutuhkan untuk boot/runtime;
- asset manifest dan semua referenced hashed assets tersedia;
- tidak ada absolute path, local username, `.env`, credential, private key, backup, database lokal, log, atau demo media;
- ukuran dan file count dicatat;
- SHA-256 artifact dicatat di evidence index.

Reproducibility gate: bangun dua kali dari clean checkout, normalisasi metadata archive (timestamp/order/owner), lalu checksum harus identik. Jika format/tool tidak dapat deterministik, file manifest path+size+SHA-256 hasil ekstraksi harus identik dan alasannya didokumentasikan; perbedaan konten sekecil apa pun memblokir RC.

## 14. Migration and Rollback Rehearsal

1. Buat dua environment terisolasi: `pre_migration` dari backup kandidat dan `target` untuk rehearsal.
2. Rekam `php artisan migrate:status`, schema hash/logical schema, row counts, dan checksum media sebelum migration.
3. Backup database/media sesuai Bagian 12.
4. Jalankan `php artisan migrate --force` pada target; dilarang memakai `migrate:fresh` pada salinan yang mewakili data aktif.
5. Jalankan integrity/foreign-key check, automated suite relevan, dan smoke public/admin.
6. Uji rollback migration hanya bila seluruh migration kandidat memiliki `down()` yang aman dan rollback tidak menghapus data bisnis. Bila tidak backward-compatible, rollback resmi adalah application artifact sebelumnya + restore database/media backup.
7. Rehearsal rollback ke artifact sebelumnya; restore backup; ulangi integrity check, row count, media checksum, dan smoke test.
8. Catat waktu, command, operator, hasil, serta titik keputusan abort/continue.

Migration atau rollback yang gagal tanpa prosedur pemulihan terverifikasi adalah Sev-2.

## 15. Operational Runbook Outline

Runbook Phase 6 harus dapat dijalankan operator yang tidak menulis application code dan memuat:

1. Release identification: `RC_ID`, commit, artifact checksum, approver.
2. Environment inventory: PHP/version/extensions, web root, writable directories, SQLite path, storage link strategy, Composer/CLI availability, cron, backup target, TLS/proxy mode.
3. Pre-deploy gates: content sign-off, defect gate, backup freshness, maintenance window, rollback authority.
4. Upload/extract artifact dan ownership/permission minimum; database wajib di luar public web root.
5. `.env` placement dari secure channel dan `taretan:validate-config --production`.
6. Commands berurutan: maintenance mode bila relevan, backup, migrate, storage-link alternative, `config:cache`, `route:cache` bila kompatibel, `view:cache`, permission verification.
7. Smoke test: Home, book filter/detail/WA, journal link, article, manuscript, services, contact, admin login/CRUD/logout, 404/500.
8. Header/TLS/debug/log validation dan analytics disabled/enabled decision.
9. Rollback triggers, commands, artifact sebelumnya, restore source, dan decision owner.
10. Monitoring 0–2 jam, hari 1–7, capacity/storage, error, broken link, dan backup alert.
11. Contact/escalation matrix dan incident evidence location.

Nilai hosting aktual tetap diisi pada Phase 6 setelah akses tersedia; Phase 5 menyediakan template dan command order tanpa mengarang capability hosting.

## 16. Defect Severity and Triage Rules

| Severity | Definisi/contoh | Release rule | Response target |
|---|---|---|---|
| Sev-1 Critical | Data loss/corruption, auth bypass, secret/PII leak, stored XSS/RCE, seluruh situs/admin tidak dapat dipakai | RC langsung BLOCKED | Triage segera; owner eksekutif + Engineering |
| Sev-2 High | Flow kritis gagal tanpa workaround aman, restore/artifact/migration gagal, draft/demo content bocor, major browser inaccessible, Lighthouse/security gate kritis gagal | RC BLOCKED | Owner hari yang sama; fix + full regression |
| Sev-3 Medium | Fungsi non-kritis terganggu dengan workaround aman, layout/SEO/a11y localized | Bisa diterima hanya dengan Product/QA risk acceptance tertulis dan target fix | Triage ≤1 hari kerja |
| Sev-4 Low | Cosmetic/copy minor tanpa dampak flow, security, privacy, atau accessibility | Tidak memblokir bila tercatat | Backlog terjadwal |

Setiap defect wajib memiliki ID, `RC_ID`, requirement/UAT ID, environment, reproduction, expected/actual, severity rationale, owner tunggal, status, evidence, fix commit, dan regression result. Severity tidak boleh diturunkan hanya untuk meloloskan release. Defect reopened kembali memengaruhi gate.

## 17. Ordered Task Breakdown

### P5-01 — Freeze release candidate baseline

- [ ] Pilih commit setelah working tree bersih; tetapkan `RC_ID`; rekam commit, lockfile hash, runtime versions, route list, migration status, dan config key inventory tanpa nilai.
- [ ] Buat evidence index dan defect register untuk `RC_ID`.
- [ ] Acceptance: seluruh evidence berikutnya dapat ditautkan ke baseline immutable yang sama.
- Owner: Release Manager. Dependency: tidak ada. Rollback: batalkan RC ID dan buat increment baru; jangan memakai ulang ID.

### P5-02 — Close entry-criteria gaps

- [ ] Siapkan environment production-like terisolasi dan non-production values.
- [ ] Pastikan `APP_DEBUG=false`, HTTPS-like `APP_URL`, secure session fixture, valid APP_KEY, admin credential non-placeholder, dan fallback contact.
- [ ] Jalankan `php artisan taretan:validate-config --production`; expected exit 0 tanpa mencetak value.
- [ ] Acceptance: seluruh item Bagian 3 memiliki evidence atau blocker/owner eksplisit.
- Owner: Engineering + Release Manager. Dependency: P5-01.

### P5-03 — Run automated release baseline

- [ ] Dari clean checkout jalankan `npm ci`, `composer install`, `npm run check`, `npm run test:unit -- --run`, `npm run build`, `composer types:check`, dan `php artisan test --do-not-cache-result`.
- [ ] Rekam exit code, jumlah test/assertion, dependency versions, dan build asset manifest.
- [ ] Acceptance: seluruh command exit 0 pada commit kandidat.
- Owner: Engineering. Dependency: P5-01.

### P5-04 — Prepare approved content candidate

- [ ] Buat database kosong dari migration + AdminSeeder, masukkan konten via Filament, hasilkan content/media manifest, jalankan demo scan dan external-link verification.
- [ ] Acceptance: Bagian 11 lulus dan Content Owner menandatangani manifest.
- Owner: Content Owner. Dependency: P5-02.

### P5-05 — Execute public UAT

- [ ] Jalankan UAT-P01–P15 pada kandidat konten dan simpan evidence per skenario.
- [ ] Buat defect untuk setiap perbedaan expected/actual; jangan mengedit hasil test agar terlihat pass.
- [ ] Acceptance: seluruh Critical pass; Major/Minor mengikuti aturan Bagian 16.
- Owner: QA Lead. Dependency: P5-03/P5-04.

### P5-06 — Execute admin UAT

- [ ] Jalankan UAT-A01–A16, termasuk durasi publish ≤10 menit, restore, upload adversarial, auth, dan CSRF.
- [ ] Acceptance: seluruh Critical pass dan database kembali ke state kandidat yang diketahui.
- Owner: QA Lead + Content Admin. Dependency: P5-03/P5-04.

### P5-07 — Browser/device and accessibility QA

- [ ] Jalankan matriks Bagian 7 dan 8; simpan browser versions, axe, keyboard, screen-reader, zoom, contrast, motion, dan 360 px evidence.
- [ ] Acceptance: nol critical/serious axe violation dan tidak ada blocker manual pada alur kritis.
- Owner: QA Lead. Dependency: P5-05.

### P5-08 — Performance QA

- [ ] Jalankan tiga Lighthouse run per halaman, ambil median, inspeksi network/query/image/payload/bundle.
- [ ] Acceptance: seluruh threshold Bagian 9 lulus tanpa menurunkan target.
- Owner: Engineering + QA Lead. Dependency: P5-03/P5-04.

### P5-09 — Security and privacy regression

- [ ] Jalankan matriks Bagian 10 dengan synthetic canary, lalu hapus artifact sensitif sementara.
- [ ] Acceptance: tidak ada High/Critical finding, secret/PII leak, unsafe content/link/upload, atau auth/session bypass.
- Owner: Security Reviewer + Engineering. Dependency: P5-03/P5-06.

### P5-10 — Rehearse SQLite and media backup/restore

- [ ] Ikuti Bagian 12 dari freeze write sampai restored smoke; simpan encrypted-backup checksum, integrity output, media comparison, durasi, dan verifier sign-off.
- [ ] Acceptance: restore berhasil, `integrity_check=ok`, `foreign_key_check` kosong, row/media match, RTO/RPO tercapai.
- Owner: Release Manager; verifier: QA Lead. Dependency: P5-04.

### P5-11 — Build reproducible deployment artifact

- [ ] Jalankan Bagian 13 dua kali dari clean checkout; audit includes/excludes, dependency runtime, path/secret/demo scan, lalu checksum.
- [ ] Acceptance: content manifest dua build identik dan artifact dapat boot tanpa Node.js.
- Owner: Release Manager + Engineering. Dependency: P5-03/P5-04.

### P5-12 — Rehearse migration and rollback

- [ ] Jalankan Bagian 14 pada clone terisolasi, termasuk restore-based rollback.
- [ ] Acceptance: forward migration dan rollback memulihkan integrity, row count, media, dan critical smoke.
- Owner: Engineering; verifier: Release Manager. Dependency: P5-10/P5-11.

### P5-13 — Complete operational runbook

- [ ] Tulis runbook sesuai Bagian 15 dengan placeholder berlabel untuk capability hosting yang baru dapat diisi Phase 6.
- [ ] Lakukan tabletop walkthrough oleh operator kedua.
- [ ] Acceptance: operator dapat menjelaskan langkah, stop condition, rollback, evidence, dan escalation tanpa asumsi tersembunyi.
- Owner: Release Manager. Dependency: P5-10–P5-12.

### P5-14 — Defect fix and regression loop

- [ ] Triage setiap defect; perbaikan application code dilakukan pada commit terpisah dengan test regression, review, dan RC ID baru bila artifact/commit berubah.
- [ ] Ulangi automated, impacted UAT, security, artifact, dan backup checks sesuai blast radius.
- [ ] Acceptance: nol Sev-1/Sev-2 terbuka; accepted Sev-3 memiliki approval tertulis.
- Owner: QA Lead + Engineering. Dependency: P5-05–P5-13.

### P5-15 — Sign-off and release decision

- [ ] QA Lead, Release Manager, Content Owner, dan Engineering meninjau evidence checklist.
- [ ] Rekam satu keputusan final beserta blocker/owner bila gagal.
- [ ] Acceptance: seluruh hard gate Bagian 19/21 terpenuhi untuk READY; selain itu BLOCKED.
- Owner: Release Manager. Dependency: P5-14.

## 18. Evidence Required for Sign-Off

| Evidence | Isi minimum | Approver |
|---|---|---|
| Baseline record | RC ID, commit, lock hashes, runtime, environment class | Release Manager |
| Automated report | Command/exit,  test/assertion count, build manifest | Engineering |
| Requirement/UAT report | Semua requirement dan UAT ID, pass/fail, evidence link | QA Lead |
| Browser/a11y report | Version/device, axe, keyboard, AT, contrast, viewport | QA Lead |
| Performance report | 3-run raw result + median + environment | QA + Engineering |
| Security/privacy report | Threat matrix, synthetic canary result, open findings | Security Reviewer |
| Content manifest | Provenance, status, media rights/checksum, link result | Content Owner |
| Demo-removal report | Scan query/pattern, exceptions, approval | Content Owner + QA |
| Backup/restore report | Scope, encrypted checksum, target, duration, integrity, verifier | Release Manager + QA |
| Artifact report | Recipe, include/exclude, two-build manifest/checksum, boot smoke | Engineering + Release Manager |
| Migration/rollback report | Before/after state, commands, integrity, elapsed time | Engineering + Release Manager |
| Defect register | Severity, owner, state, fix/regression evidence | QA Lead |
| Runbook walkthrough | Reviewer, date, gaps, resolved actions | Release Manager |
| Final sign-off | Named approval and decision timestamp | Semua decision authority |

Evidence yang mengandung database, backup, personal data, secret, atau internal URL tidak di-commit. Evidence index boleh di-commit hanya bila telah direview bebas informasi sensitif.

## 19. Release Candidate Checklist

- [ ] RC ID, commit, lockfiles, dan environment tercatat.
- [ ] Working tree build bersih dan seluruh automated gates lulus.
- [ ] Production-like config validator exit 0.
- [ ] Requirement coverage tidak memiliki Critical gap.
- [ ] UAT-P01–P15 dan UAT-A01–A16 critical pass.
- [ ] Browser/device matrix dan viewport 360 px pass.
- [ ] Accessibility automated/manual gate pass.
- [ ] Lighthouse/performance gate pass.
- [ ] Security/privacy regression pass.
- [ ] Content manifest dan external links disetujui.
- [ ] Tidak ada demo content tanpa persetujuan.
- [ ] WhatsApp diuji memakai non-production values.
- [ ] SQLite dan media backup terenkripsi serta checksum tercatat.
- [ ] Restore rehearsal, integrity, row count, dan media verification pass.
- [ ] Artifact memuat production assets/vendor dan tidak membutuhkan Node.js.
- [ ] Artifact bebas `.env`, secret, local DB, backup, logs, absolute path, dan demo media.
- [ ] Dua artifact build memiliki content manifest identik.
- [ ] Migration dan rollback rehearsal pass.
- [ ] Operational runbook lulus tabletop walkthrough.
- [ ] Nol Sev-1/Sev-2 terbuka.
- [ ] Semua required owner menandatangani evidence.

## 20. Definition of Done

Phase 5 selesai hanya bila:

1. Seluruh task P5-01–P5-15 selesai dengan evidence untuk satu RC final.
2. Semua Must Have PRD terpetakan ke automated/manual test dan lulus.
3. Content Owner menyetujui kandidat konten, media, copy, contact, WhatsApp template, dan external links.
4. Tidak ada demo content tak berizin pada database, media, atau artifact.
5. Backup SQLite/media terenkripsi dapat direstore dan hasilnya lolos integrity serta smoke test.
6. Artifact reproducible, bebas secret/local state, membawa asset/vendor, dan boot tanpa Node.js.
7. Migration/rollback rehearsal membuktikan jalur pemulihan.
8. Browser, accessibility, performance, security, dan privacy gates lulus.
9. Nol Sev-1/Sev-2 terbuka; Sev-3 yang diterima memiliki risk acceptance tertulis.
10. Runbook dan evidence package disetujui seluruh decision authority.

## 21. Exit Criteria

### 21.1 READY gate

Status boleh menjadi `RELEASE CANDIDATE READY` hanya jika seluruh checklist Bagian 19 tercentang, seluruh DoD Bagian 20 terbukti, dan final sign-off merujuk tepat ke checksum artifact final. READY berarti siap memasuki shared-hosting preflight Phase 6, bukan berarti sudah aman untuk deployment tanpa preflight.

### 21.2 BLOCKED gate

Status wajib `RELEASE CANDIDATE BLOCKED` bila satu saja kondisi berikut benar:

- Sev-1 atau Sev-2 masih terbuka;
- critical UAT/acceptance, security, privacy, accessibility, atau performance gate gagal;
- database/media backup belum berhasil direstore dan diverifikasi;
- demo content masih terbawa tanpa approval;
- artifact tidak reproducible, mengandung secret/local state, atau membutuhkan Node.js di hosting;
- migration/rollback rehearsal gagal;
- content/evidence/sign-off wajib belum lengkap.

### 21.3 Handoff Phase 6

Handoff hanya membawa artifact final + checksum, runbook, environment key inventory tanpa value, backup/rollback evidence, content manifest, defect register, dan sign-off. Phase 6 tetap harus melakukan hosting preflight SQLite/filesystem/locking/PHP/extensions/public-root/TLS/cron sebelum deployment.

## 22. PRD Traceability Matrix

| PRD outcome/requirement | Phase 5 validation | Evidence/task |
|---|---|---|
| O1 / US-01 / FR-M02 | Discovery buku ≤3 menit, filter/search benar | UAT-P02, P5-05 |
| US-02 / FR-M03 | Detail, multiple authors, optional fields, hidden state | UAT-P03 |
| US-03 / FR-M04 | WA buku, canonical, encoding, fallback | UAT-P05, P5-09 |
| US-04 / FR-M05 | Share/copy-link | UAT-P04 |
| US-05 / FR-M06 | Katalog/detail jurnal dan safe external link | UAT-P06/P07, content link report |
| US-06 / FR-M07 | Katalog/detail artikel dan sanitasi | UAT-P08/P09, security report |
| US-07 / FR-M08 | Manuscript client-only, validation, privacy | UAT-P12, P5-09 |
| US-08 / FR-M09 | Layanan active, tanpa harga, WA | UAT-P10 |
| US-09 / FR-M10 | Profil/kontak/config channel | UAT-P11/P13, content sign-off |
| O3 / US-10 / FR-M11 | Login/logout/rate limit/session/anonymous block | UAT-A01/A02/A16 |
| US-11 / FR-M12/13 | CRUD, publish/draft/delete/restore/public visibility | UAT-A03–A12 |
| US-12 / FR-M14 | Upload dan URL validation | UAT-A13–A15, security report |
| FR-M15 / FR-S03 | Metadata, canonical, OG, sitemap, robots | Public UAT + SEO/Lighthouse evidence |
| Q10-B | Demo hanya non-production | P5-04, demo-removal report |
| NFR 7.1 | Lighthouse, queries, payload, images | P5-08 |
| NFR 7.2/7.3 | SQLite backup/restore, RPO/RTO, migration/rollback | P5-10/P5-12 |
| NFR 7.4/7.5 | WCAG dan compatibility | P5-07 |
| NFR 7.6 | Reproducible build/runbook | P5-03/P5-11/P5-13 |
| NFR 7.7 / PRD §12 | Privacy/security/no leakage | P5-09 |
| PRD M5 exit | No Sev-1/2, acceptance pass, artifact, runbook | P5-14/P5-15 |
| PRD M6 boundary | Shared-hosting preflight belum dilakukan | Handoff Bagian 21.3 |

---

## Current Blockers and Owners

| Blocker | Severity | Owner |
|---|---|---|
| Production-like configuration fixture belum lulus (`app.debug`, `app.url`, `session.secure`) | Sev-2 release blocker | Release Manager + Engineering |
| Kandidat konten, provenance, demo-removal evidence, dan Content Owner sign-off belum tersedia | Sev-2 release blocker | Content Owner |
| Public/admin UAT serta browser/device matrix belum dijalankan | Sev-2 release blocker | QA Lead |
| Accessibility dan Lighthouse/performance evidence belum tersedia | Sev-2 release blocker | QA Lead + Engineering |
| Security/privacy manual regression belum lengkap | Sev-2 release blocker | Security Reviewer + Engineering |
| SQLite/media backup-restore rehearsal belum dilakukan | Sev-2 release blocker | Release Manager |
| Reproducible deployment artifact dan no-Node boot belum dibuktikan | Sev-2 release blocker | Engineering + Release Manager |
| Migration/rollback rehearsal dan operational runbook belum selesai | Sev-2 release blocker | Engineering + Release Manager |
| Defect register serta final multi-owner sign-off belum tersedia | Sev-2 release blocker | QA Lead + Release Manager |

# RELEASE CANDIDATE BLOCKED

Status ini mencerminkan evidence repository pada 9 September 2026. Automated baseline dan production build lokal lulus, tetapi hard gate UAT, content, accessibility, performance, backup/restore, artifact reproducibility, migration/rollback, runbook, defect triage, dan sign-off belum dibuktikan. Status hanya boleh diubah melalui P5-15 setelah seluruh blocker ditutup dengan evidence untuk artifact final yang sama.
