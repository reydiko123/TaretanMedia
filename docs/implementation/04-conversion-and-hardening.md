# Phase 4 — Conversion Flows, Privacy, Security, Accessibility, and Performance Hardening

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengaktifkan conversion flow WhatsApp dan Kirim Naskah yang privacy-safe, lalu membawa aplikasi ke baseline keamanan, aksesibilitas, observability, dan performa yang dapat dibuktikan sebelum UAT.

**Architecture:** Laravel tetap menjadi source of truth untuk konfigurasi publik, routing, dan security controls; React menangani interaksi conversion dan validasi form Kirim Naskah tanpa submission ke server. Semua event analytics melewati adapter client allowlist yang default-off, sedangkan hardening diterapkan melalui middleware, konfigurasi tervalidasi, dan test gate berlapis.

**Tech Stack:** Laravel 13, PHP 8.3+, Inertia.js 3, React 19, TypeScript 5.7, Tailwind CSS 4, Filament 5, PHPUnit 12, Vite Plus, Vitest + Testing Library + axe-core untuk test frontend terfokus.

**Spec:** `docs/prompts/04-conversion-and-hardening.md`, `docs/product/taretan-media-prd.md`, dan implementation plan Phase 0–3.

## Global Constraints

- Jangan membuat endpoint POST, tabel, model, queue, email, upload, atau server-side submission untuk Kirim Naskah.
- Nama, email, judul naskah, jenis publikasi, dan isi pesan tidak boleh masuk ke request Taretan Media, database, log, monitoring context, atau analytics.
- Nomor WhatsApp berasal dari environment; struktur template dan daftar jenis publikasi berasal dari source/config.
- Jangan menaruh credential, token, DSN, atau nilai production nyata di repository atau Inertia props.
- Analytics hanya menerima nama event allowlist dan metadata agregat allowlist; default `disabled` sampai konfigurasi production lolos validasi.
- Seluruh mutasi Laravel/Livewire tetap melalui CSRF middleware; jangan mengecualikan route aplikasi dari CSRF.
- Security control harus mempunyai test eksplisit; keberadaan default framework bukan bukti kelulusan.
- CSP dimulai dalam `report-only`, lalu berpindah ke `enforce` setelah smoke test tidak menemukan violation yang dibutuhkan aplikasi.
- HSTS hanya diaktifkan setelah HTTPS end-to-end tervalidasi; jangan memakai `preload` atau `includeSubDomains` tanpa verifikasi seluruh subdomain.
- Jangan menjalankan migration destruktif (`migrate:fresh`, `db:wipe`) pada database aktif.
- Pertahankan route publik server-authoritative, published-only, canonical URL, dan explicit Inertia props dari Phase 3.
- Setiap task mengikuti red-green-refactor: test gagal, implementasi minimum, test lulus, lalu commit terfokus.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan Phase 4 |
| Status | Ready for implementation |
| Tanggal | 9 September 2026 |
| Input | PRD v1.0, prompt Phase 4, plan Phase 0–3, repository pada commit `faf62e4` |
| Output implementasi | Conversion flow aktif, privacy/security/a11y/performance gates, evidence untuk Phase 5 |
| Non-goal utama | Checkout, pembayaran, akun visitor, lead database, upload naskah, REST API publik |

## 2. Phase Objective

1. Menyelesaikan US-03, US-07, dan bagian conversion US-08/US-09 melalui WhatsApp yang terkonfigurasi dan aman.
2. Mencatat delapan event bisnis secara agregat tanpa data personal.
3. Memverifikasi dan memperkuat authentication, session, headers, sanitasi, upload, link eksternal, logging, audit, dan error response.
4. Menutup gap WCAG utama pada navigasi, form, feedback, contrast, motion, dan viewport 360px.
5. Mencapai gate Lighthouse mobile PRD dan menyiapkan pengukuran Core Web Vitals tanpa mengirim PII.
6. Menghasilkan test/evidence yang dapat dipakai sebagai entry gate UAT Phase 5.

## 3. Scope and Non-Goals

### 3.1 In scope

- CTA pesan buku dengan judul dan canonical URL.
- CTA konsultasi per layanan dengan nama layanan.
- Halaman GET `/kirim-naskah` dan form browser-only.
- WhatsApp generik pada halaman Kontak serta fallback email/alamat.
- Event `book_view`, `book_filter`, `book_whatsapp_click`, `journal_external_click`, `service_whatsapp_click`, `manuscript_form_start`, `manuscript_whatsapp_click`, dan `share_click`.
- Privacy notice yang menjelaskan pemrosesan analytics dan perpindahan data ke WhatsApp.
- Configuration validator, secure response headers, login/session/CSRF verification, privacy-safe logs, audit/error monitoring baseline.
- Accessibility remediation dan Lighthouse/query/payload/image checks.

### 3.2 Non-goals

- Penyimpanan atau dashboard lead/manuscript.
- Upload file naskah.
- Tracking individu, fingerprinting, user ID, session replay, advertising pixel, atau marketing profile.
- Cookie-consent platform generik. Consent banner hanya diperlukan bila analytics yang dipilih kemudian memakai cookie/identifier; driver harus tetap mati sampai mekanisme tersebut dirancang dan disetujui.
- Perubahan schema domain/CMS, redesign visual menyeluruh, SSR, CDN, image-transformation pipeline, atau hosting release.
- Menjamin kepatuhan hukum lintas yurisdiksi; owner tetap melakukan legal/privacy review atas notice dan vendor analytics.

## 4. Current Repository Assessment

| Area | Fondasi tersedia | Gap Phase 4 |
|---|---|---|
| Routing | Home, catalog/detail, Profile, Services, Contact, sitemap/robots | Belum ada `/kirim-naskah` atau privacy page |
| WhatsApp | `WHATSAPP_NUMBER`; client hanya menerima `whatsappConfigured` | Nomor belum dinormalisasi, template/link builder/CTA belum ada |
| Conversion UI | CTA dan canonical URL tersedia | Buku/layanan masih menuju `/kontak`; manuscript masih placeholder |
| Analytics | Event list ada di PRD | Belum ada adapter, allowlist, config, tracking, atau privacy test |
| Auth | Filament base memanggil `rateLimit(5)`; generic failure custom tersedia | Perlu test key/decay, session regeneration/logout, dan brute-force behavior |
| CSRF/session | Filament memakai `PreventRequestForgery`; session config punya secure/HttpOnly/SameSite | Nilai production dan seluruh mutasi belum diverifikasi sebagai gate |
| Headers | Generic error mapping ada | Belum ada CSP/HSTS/nosniff/referrer/frame/permissions middleware |
| Content safety | HTMLPurifier article allowlist, HTTPS journal URL, safe `rel` tersedia | Perlu adversarial regression; rich-text link/image dan MIME content verification |
| Upload | MIME allowlist, 5 MB, UUID filename | Perlu bukti MIME spoof, SVG/polyglot, orphan cleanup, executable delivery |
| Logging/audit | Audit log berisi entity/id/action/admin_id | Belum ada centralized redaction dan error-monitoring privacy contract |
| Accessibility | Skip link, focus styles, semantic shell, reduced motion baseline | Form errors, focus summary, contrast/keyboard/360px audit belum ada |
| Performance | Pagination, eager loading, explicit image size, priority/lazy behavior | Belum ada budgets, repeatable query-count gate, Lighthouse CI/evidence |

Temuan penting: inline `<script>` dan `<style>` pada `resources/views/app.blade.php` harus memakai nonce atau dipindahkan sebelum CSP enforce. Tidak ada perubahan database yang dibutuhkan untuk conversion atau analytics.

## 5. Conversion Flow Architecture

```text
Environment/source config
  -> ConversionConfig (normalize + validate + availability)
  -> public Inertia props (hanya nilai public-safe)
  -> WhatsApp message builder (pure TypeScript)
  -> user click
       -> analytics allowlist event tanpa message/PII
       -> https://wa.me/<number>?text=<encoded message>
       -> user meninjau dan menekan Send di WhatsApp

Invalid/disabled config
  -> tidak membentuk WhatsApp URL
  -> CTA WhatsApp tidak dirender atau disabled dengan alasan generik
  -> fallback email/alamat ditampilkan
  -> deployment validator exit non-zero
```

Boundary yang wajib:

- `ConversionConfig` membaca config Laravel, tetapi hanya mengirim `available`, nomor ternormalisasi, dan template publik ke browser. Alasan internal/config secret tidak dikirim.
- `whatsapp.ts` adalah pure module: normalize field, substitute token, build `URL`; tidak membaca DOM, analytics, atau network.
- Komponen CTA hanya melakukan orchestration: track event allowlist lalu navigasi ke URL valid.
- Form manuscript menyimpan state hanya di memory React. Tidak memakai Inertia form helper, `fetch`, Axios, local/session storage, query string, atau server action.
- Semua link memakai HTTPS `wa.me`, sehingga browser dapat memilih native app atau WhatsApp Web tanpa custom protocol/open redirect.

## 6. WhatsApp URL and Template Contract

### 6.1 Source/config contract

`config/taretan.php` diperluas dengan struktur berikut (copy final dapat direview owner, tetapi token kontraknya tetap):

```php
'whatsapp' => [
    'number' => env('WHATSAPP_NUMBER'),
    'templates' => [
        'book' => 'Halo Taretan Media, saya ingin menanyakan buku ":title". :url',
        'service' => 'Halo Taretan Media, saya ingin berkonsultasi tentang layanan ":service".',
        'manuscript' => "Halo Taretan Media, saya ingin berkonsultasi tentang naskah.\nNama: :name\nEmail: :email\nJudul: :title\nJenis: :publication_type",
        'contact' => 'Halo Taretan Media, saya ingin meminta informasi.',
    ],
    'publication_types' => ['Buku', 'Jurnal', 'Artikel'],
],
```

### 6.2 Validation and encoding

- Nomor dinormalisasi dengan membuang spasi, `+`, tanda hubung, dan kurung, lalu wajib cocok `^[1-9][0-9]{7,14}$` (E.164 digits-only, maksimum 15 digit).
- Template wajib non-kosong, maksimum 1.500 karakter setelah substitution, dan hanya boleh memakai token yang terdaftar.
- Required token: book `:title,:url`; service `:service`; manuscript `:name,:email,:title,:publication_type`; contact tanpa required token.
- Nilai field di-trim, line ending dinormalisasi, karakter kontrol selain newline/tab dibuang, dan dibatasi: nama 100, email 254, judul 200, jenis harus exact allowlist.
- Bangun URL menggunakan `new URL('https://wa.me/{digits}')` dan `searchParams.set('text', message)`. Jangan melakukan concatenation query manual atau double encoding.
- Book URL harus sama dengan `seo.canonicalUrl`, bukan `window.location.href` yang dapat mengandung filter/token.
- Builder mengembalikan `null` bila config/input invalid; komponen wajib memakai fallback kontak, bukan URL parsial.
- Test mencakup apostrof, kutip, `&`, `?`, `#`, emoji, newline, `%`, Unicode, token-like user input, dan input sangat panjang.

## 7. Manuscript Client-Only Form Plan

- Route GET bernama `manuscripts.create` merender `manuscripts/create`; tidak ada `store` route.
- Field: `name`, `email`, `title`, `publicationType`; semua required.
- Browser validation ditulis eksplisit agar error copy konsisten; HTML attributes `required`, `maxLength`, `type=email`, dan select tetap menjadi progressive constraint.
- Submit handler selalu `preventDefault()`, validasi seluruh field, fokus ke error summary bila invalid, lalu membentuk URL hanya setelah valid.
- Error summary berisi link/focus target ke setiap field invalid; tiap field punya label, description bila perlu, inline error, `aria-invalid`, dan `aria-describedby`.
- `manuscript_form_start` dikirim sekali per page view pada interaksi pertama dengan field, tanpa nama field atau nilainya.
- `manuscript_whatsapp_click` dikirim hanya setelah validasi sukses dan tepat sebelum membuka WhatsApp; event tidak membawa field form/message.
- Notice di atas tombol: data belum dikirim ke Taretan Media; setelah membuka WhatsApp pengguna meninjau pesan dan memilih sendiri apakah menekan Send; pemrosesan berikutnya tunduk pada kebijakan WhatsApp.
- Setelah link dibuka, state tidak disimpan dan tidak otomatis dikosongkan agar user dapat memperbaiki/mencoba kembali jika popup diblokir.
- Automated route test membuktikan GET 200 dan POST/PUT/PATCH/DELETE tidak tersedia; browser test memata-matai `fetch`, storage, analytics payload, dan `window.open`.

## 8. Analytics Event and Privacy Matrix

### 8.1 Adapter decision

Gunakan adapter browser `track(event, properties?)` dengan driver `none` dan `plausible`. Driver default `none`. Plausible hanya boleh diaktifkan bila endpoint HTTPS, site domain, CSP allowlist, Data Processing Agreement, retention, dan legal/privacy review sudah disetujui. Adapter harus membuang unknown event/property dan tidak pernah meneruskan location query/hash, referrer penuh, DOM text, form state, canonical URL, atau user/session identifier.

| Event | Trigger | Allowed properties | Forbidden examples |
|---|---|---|---|
| `book_view` | Detail buku selesai dirender, sekali | tidak ada | title, slug, URL, ISBN |
| `book_filter` | Filter valid diterapkan | `filter_kind` enum: search/category/price/year/sort/reset | search text, category name, angka harga |
| `book_whatsapp_click` | CTA buku valid diklik | tidak ada | title, URL, message |
| `journal_external_click` | CTA jurnal eksternal diklik | tidak ada | external URL, title |
| `service_whatsapp_click` | CTA layanan valid diklik | tidak ada | service name, message |
| `manuscript_form_start` | Interaksi field pertama | tidak ada | field name/value |
| `manuscript_whatsapp_click` | Form valid membuka WhatsApp | tidak ada | seluruh data form/message |
| `share_click` | Native share/copy dipilih | `method` enum: native/clipboard | shared URL/title/text |

### 8.2 Privacy and consent behavior

- Bila analytics disabled, jangan load script, set cookie/storage, atau melakukan request.
- Mode Plausible hanya untuk cookieless aggregate configuration. Privacy page mengungkap tujuan, event, property, processor, retention, dan contact channel.
- Consent banner tidak dibuat untuk baseline cookieless ini. Jika provider/config kemudian memakai cookie, local identifier, cross-site advertising, session replay, atau enriched URL/referrer, analytics otomatis dianggap tidak memenuhi kontrak dan harus tetap disabled sampai consent design baru disetujui.
- Add test yang memindai payload untuk key/value menyerupai email, token, credential, manuscript field, query/hash URL, dan WhatsApp message.

## 9. Security Hardening Plan

### 9.1 Control plan

| Control | Configuration | Verification |
|---|---|---|
| CSRF | Web/Filament middleware tetap aktif; tidak ada exception baru | Mutasi admin tanpa token ditolak 419; valid Livewire action tetap bekerja |
| Login rate limit | Pertahankan Filament `rateLimit(5)`, tambahkan characterization test per username+IP dan recovery setelah decay | Enam attempt cepat throttled; username/IP berbeda tidak berbagi bucket yang salah |
| Session fixation | Pastikan login regenerate session ID; logout invalidate session dan regenerate token | Feature/Livewire auth test membandingkan ID/token sebelum-sesudah |
| Cookies | Production: `SESSION_SECURE_COOKIE=true`, `SESSION_HTTP_ONLY=true`, `SESSION_SAME_SITE=lax`, `SESSION_ENCRYPT=true` | Response assertion dan config validator |
| HTTPS/HSTS | Proxy-aware HTTPS; HSTS 300 detik saat canary, kemudian 31536000 setelah Phase 6 validation | HTTP redirect/HTTPS header smoke; HSTS tidak ada di HTTP/local |
| CSP | Nonce per response; `default-src 'self'`, `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, restricted script/style/font/img/connect/form-action | Report-only smoke, browser console, then enforce test |
| Other headers | `nosniff`, `strict-origin-when-cross-origin`, restrictive Permissions Policy | Feature test seluruh HTML public/admin |
| Rich text | Persistence sanitizer + output fixture audit; reject dangerous scheme/event/style/form/embed | Adversarial PHPUnit fixtures and rendered response scan |
| Upload | MIME sniff + JPEG/PNG/WebP + 5 MB + UUID; validate public delivery as non-executable | Spoofed extension, SVG/polyglot, oversize, orphan tests |
| External links | HTTPS validation; `_blank` always `noopener noreferrer`; no user-controlled redirect target | Component/HTTP/static scan |
| Debug/secrets | Production validator requires `APP_DEBUG=false`, valid APP_KEY, non-placeholder admin password, HTTPS APP_URL | Command exits non-zero per invalid fixture without printing secret |
| Draft exposure | Published scope remains mandatory | Existing + adversarial slug/sitemap tests |

### 9.2 Threat checklist

| Threat | Attack path | Required mitigation/evidence |
|---|---|---|
| XSS | Article HTML, config copy, analytics script | Purifier fixtures, React escaping, CSP enforce evidence |
| Malicious upload | MIME spoof/polyglot/executable | Server MIME allowlist, renamed file, web-server no-execute, rejection test |
| Unsafe external URL | Journal/social/maps/analytics endpoint | HTTPS parser + scheme/host validation + safe rel tests |
| Leaked secret | Inertia props, logs, CI output, config command | Props/log scan; validator redacts values; secret scanning in CI |
| Analytics PII capture | Form/URL/referrer sent as event data | Compile-time event schema + runtime allowlist + network inspection |
| Session fixation | Reused ID across login/logout | Regeneration/invalidation feature tests |
| Brute-force login | Repeated username/password attempts | 5/min limiter test + generic response |
| Draft content exposure | Direct slug, sitemap, analytics | Published query tests; analytics never serializes content identity |
| Open redirect | User/config controls CTA destination | Fixed `https://wa.me` origin; parsed HTTPS allowlist; no redirect endpoint |
| WhatsApp injection/malformed encoding | Control chars/token collision/double encoding | Normalize/length limit/URL API + Unicode/special-character test matrix |

## 10. Accessibility Remediation Plan

- Audit public shell, catalogs, detail pages, Contact, Services, errors, and manuscript form against WCAG 2.2 AA critical criteria.
- Full keyboard path: skip link, desktop/mobile nav, filters, pagination, share, external CTA, form, error links, and dialog focus return.
- Preserve visible focus at 3:1 minimum and ensure sticky header does not obscure target.
- Form controls require programmatic labels; placeholder never menjadi label.
- Invalid submit produces focusable error summary (`role=alert`, `tabIndex=-1`) plus inline errors; live status must not announce duplicates.
- Verify text, UI component, focus indicator, disabled state, and link contrast in light/dark theme.
- All hover motion has non-motion equivalent; global reduced-motion rule remains and animated icons/transforms obey it.
- At viewport 360px: no horizontal page scroll, clipped CTA, two-column card overflow, or touch target below 44x44 CSS pixels for primary actions.
- Images use meaningful alt or empty alt for decorative assets; icon-only buttons retain accessible names.
- Automated axe failures are release blockers, tetapi automated pass tidak menggantikan keyboard/screen-reader manual test.

## 11. Performance Remediation Plan

### 11.1 Budgets

| Budget | Gate |
|---|---|
| Lighthouse mobile | Performance ≥80; Accessibility/Best Practices/SEO ≥90 |
| Core Web Vitals readiness | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 target p75 saat field data tersedia |
| Images | Above-fold LCP image only eager/high; all others lazy; explicit width/height/aspect ratio |
| Queries | No N+1; representative Home/catalog/detail query ceiling recorded from stable fixtures plus ≤2 tolerance |
| Payload | No raw model; no manuscript data; no duplicate full content in card props |
| JavaScript | Analytics script absent when disabled and loaded `defer` when enabled; no heavyweight consent dependency |

### 11.2 Execution

- Establish reproducible Lighthouse environment: production build, `APP_ENV=production`, `APP_DEBUG=false`, seeded representative SQLite copy, throttled mobile profile.
- Test Home, Books Index, Book Detail, Article Detail, Services, and Kirim Naskah at least three runs; record median.
- Audit `PublicImage`: only true LCP candidates use priority; card images remain lazy; rich-text images receive safe dimensions/loading policy or documented fallback.
- Add query-count assertions around Home/catalog/detail with listeners disabled after each test.
- Inspect Inertia payload and build output; split conversion/analytics module through normal tree-shaking, not premature manual chunks.
- Web-vitals field collection, if enabled later, may send only metric name/rating/value bucket—never URL/query, element selector, or visitor ID.

## 12. Error Handling and Monitoring Plan

- Preserve generic 404/500 Inertia pages; production response never contains exception message, trace, SQL, path, env, config, or request form value.
- Laravel remains the error-reporting boundary. Add a Monolog processor/tap that recursively redacts keys matching password, secret, token, authorization, cookie, email, name, manuscript/title/message, and DSN before handler delivery.
- Do not log request bodies for public pages or Livewire login. Authentication audit records event type, timestamp, success/failure/throttled, and hashed/coarsened actor key only; never username/password/session ID/IP plaintext.
- Existing content audit stays entity/id/admin/action-only and keeps 90-day local rotation; retention/deletion must be included in Phase 6 operations.
- `/up` supplies uptime health. Production error alerting uses the configured Laravel log channel; external DSN integration is optional and must pass the same redaction/processor contract before enablement.
- Analytics or WhatsApp failure is non-fatal: show fallback contact and keep content page usable.
- Config validation failure during deployment exits non-zero with variable names/reasons only; no values.

## 13. Ordered Task Breakdown

### P4-01 — Freeze baseline and add focused frontend test harness

- **Dependency:** Phase 3 exit gate.
- **Affected:** `package.json`, `package-lock.json`, `vite.config.ts`, `resources/js/**/*.test.ts(x)`.
- **Security/privacy impact:** Enables deterministic tests for client-only and no-PII guarantees.
- **Steps:** add Vitest, jsdom, Testing Library, user-event, axe-core; add `test:unit`; include it in `composer ci:check`; create one passing smoke test.
- **Acceptance criteria:** frontend tests run non-watch in CI and do not contact network.
- **Automated verification:** `npm run test:unit -- --run`; `npm run check`; `npm run types:check`.
- **Manual verification:** inspect dependency lock and CI command output.
- **Complexity:** M.
- **Rollback/disable:** revert test dependencies/scripts; production bundle remains unaffected.

### P4-02 — Conversion configuration and fail-safe validation

- **Dependency:** P4-01.
- **Affected:** `config/taretan.php`, `.env.example`, create `app/Services/Conversion/ConversionConfig.php`, `app/Console/Commands/ValidateProductionConfigCommand.php`, tests `tests/Unit/ConversionConfigTest.php`, `tests/Feature/ProductionConfigValidationTest.php`.
- **Security/privacy impact:** Prevents malformed destination/template, placeholder secrets, debug production, and accidental secret output.
- **Steps:** implement normalization/token validation; expose availability; command `php artisan taretan:validate-config --production`; production boot logs disabled conversion safely while deployment command fails hard.
- **Acceptance criteria:** invalid number/template cannot produce link; validator reports key/reason only; valid config succeeds.
- **Automated verification:** focused PHPUnit with valid, missing, malformed, extra-token, placeholder-secret, HTTP APP_URL, debug-on datasets.
- **Manual verification:** run command against safe local fixtures and confirm no values printed.
- **Complexity:** L.
- **Rollback/disable:** set WhatsApp unavailable and render email/address fallback; revert service/command.

### P4-03 — Typed WhatsApp builder

- **Dependency:** P4-02.
- **Affected:** create `resources/js/lib/whatsapp.ts`, `resources/js/lib/whatsapp.test.ts`, modify `resources/js/types/public.ts`, `app/Services/PublicSiteConfig.php`, `app/Http/Middleware/HandleInertiaRequests.php`.
- **Security/privacy impact:** Centralizes validation, token substitution, fixed origin, length limits, and encoding.
- **Interfaces:** `buildWhatsAppUrl(kind, context, config): string | null`; context is a discriminated union for book/service/manuscript/contact.
- **Acceptance criteria:** output origin exactly `https://wa.me`; decoded message equals expected once; invalid context returns null.
- **Automated verification:** Unicode/control-char/token/double-encoding tests plus Inertia props allowlist test.
- **Manual verification:** open representative URLs on desktop/mobile without sending messages.
- **Complexity:** M.
- **Rollback/disable:** `available=false` removes all WhatsApp CTAs while fallback remains.

### P4-04 — Privacy-safe analytics adapter

- **Dependency:** P4-01,P4-02.
- **Affected:** `config/taretan.php`, `.env.example`, create `resources/js/lib/analytics.ts`, `resources/js/lib/analytics.test.ts`, `resources/js/components/conversion/analytics-script.tsx`, modify `resources/js/app.tsx`, `resources/js/types/public.ts`, `app/Services/PublicSiteConfig.php`.
- **Security/privacy impact:** Enforces event/property allowlist and disabled-by-default behavior.
- **Interfaces:** `track(event: AnalyticsEvent, properties?: AnalyticsProperties): void`; unknown runtime input is discarded.
- **Acceptance criteria:** disabled mode makes zero requests/storage writes; enabled mode sends only matrix fields; PII-like properties rejected.
- **Automated verification:** fake provider/network tests; payload snapshot; config props test.
- **Manual verification:** DevTools Network/Application inspection with disabled and safe enabled fixture.
- **Complexity:** L.
- **Rollback/disable:** `ANALYTICS_ENABLED=false` removes script and turns `track` into no-op.

### P4-05 — Reusable tracked conversion components

- **Dependency:** P4-03,P4-04.
- **Affected:** create `resources/js/components/conversion/whatsapp-cta.tsx`, `tracked-external-link.tsx`; modify `ShareButton` in `resources/js/components/public/public-ui.tsx`; add component tests.
- **Security/privacy impact:** Ensures safe rel/origin and prevents content/message leakage to analytics.
- **Acceptance criteria:** tracking happens once per deliberate click; invalid WhatsApp URL renders fallback; share emits method only.
- **Automated verification:** user-event tests for native share, clipboard, external journal, valid/invalid CTA.
- **Manual verification:** keyboard activation, popup behavior, feedback announcement.
- **Complexity:** M.
- **Rollback/disable:** switch call sites back to ordinary safe links; analytics no-op remains.

### P4-06 — Book and service conversion flows

- **Dependency:** P4-05.
- **Affected:** `app/Http/Controllers/Public/BookController.php`, `ServiceController.php`, `app/Data/Public/PublicPropsMapper.php`, `resources/js/pages/books/show.tsx`, `resources/js/pages/services/index.tsx`, types and focused tests.
- **Security/privacy impact:** Canonical-only book message; service name escaped/encoded; no content identity in analytics.
- **Acceptance criteria:** book message contains exact title+canonical; service message exact name; fallback present when disabled.
- **Automated verification:** PHP props tests and component URL/event tests.
- **Manual verification:** special-character title/service on 360px and desktop.
- **Complexity:** M.
- **Rollback/disable:** config flag hides WhatsApp actions and restores Contact fallback.

### P4-07 — Kirim Naskah GET page and client-only form

- **Dependency:** P4-03,P4-05.
- **Affected:** `routes/web.php`, create `app/Http/Controllers/Public/ManuscriptController.php`, `resources/js/pages/manuscripts/create.tsx`, `resources/js/components/conversion/manuscript-form.tsx`, tests.
- **Security/privacy impact:** Handles PII solely in memory and transfers it only through user-reviewed WhatsApp navigation.
- **Acceptance criteria:** GET works; no mutation route; invalid submit focuses errors and opens nothing; valid submit builds URL; no network/storage/log/analytics PII.
- **Automated verification:** route-method matrix, browser/component spies, axe test, encoding test.
- **Manual verification:** keyboard-only, screen reader labels/errors, popup blocked, back navigation, 360px.
- **Complexity:** L.
- **Rollback/disable:** remove route/nav CTA; no data cleanup required because nothing persisted.

### P4-08 — Contact flow, navigation, and privacy notice

- **Dependency:** P4-04,P4-07.
- **Affected:** `resources/js/pages/contact.tsx`, `home.tsx`, `public-nav.tsx`, `public-footer.tsx`; create `PrivacyController.php`, `resources/js/pages/privacy.tsx`; `routes/web.php`, sitemap and tests.
- **Security/privacy impact:** Transparent processing notice and safe fallback; no misleading configured state.
- **Acceptance criteria:** manuscript/privacy discoverable; Contact displays valid configured channels only; privacy page accurately lists analytics behavior and WhatsApp handoff.
- **Automated verification:** route/props/sitemap/external-rel tests.
- **Manual verification:** all-channel, email-only, address-only, and no-channel fixtures.
- **Complexity:** M.
- **Rollback/disable:** hide WhatsApp/manuscript CTA; privacy page can remain as static disclosure.

### P4-09 — Complete analytics instrumentation

- **Dependency:** P4-04..P4-08.
- **Affected:** book catalog/detail, journal detail, service, manuscript, share components; tests.
- **Security/privacy impact:** Measures intent without publication/form identifiers.
- **Acceptance criteria:** all eight events fire at defined trigger, once per action/page lifecycle; no extra event names/properties.
- **Automated verification:** event matrix component tests and source scan for direct provider calls outside adapter.
- **Manual verification:** DevTools event sequence for all eight journeys.
- **Complexity:** L.
- **Rollback/disable:** analytics flag no-op; conversion remains functional.

### P4-10 — Security header middleware and CSP rollout

- **Dependency:** P4-04 (analytics origins known).
- **Affected:** create `app/Http/Middleware/SecurityHeaders.php`, `config/security.php`; modify `bootstrap/app.php`, `resources/views/app.blade.php`, `.env.example`, feature tests.
- **Security/privacy impact:** Mitigates XSS, framing, MIME sniffing, referrer leakage, and unnecessary browser permissions.
- **Acceptance criteria:** nonce unique per response; required directives/headers present; CSP report-only/enforce selectable; local/HSTS behavior correct.
- **Automated verification:** header parser assertions on public/admin/error routes; nonce matches inline assets; forbidden wildcard/unsafe origins absent.
- **Manual verification:** CSP console/network smoke for public and Filament before enforce.
- **Complexity:** L.
- **Rollback/disable:** `CSP_MODE=report-only`; `HSTS_ENABLED=false`; retain non-breaking headers.

### P4-11 — Authentication, CSRF, cookie, and audit verification

- **Dependency:** P4-02,P4-10.
- **Affected:** `app/Filament/Auth/Login.php` only if characterization fails; `config/session.php`, `.env.example`, admin/security tests, audit tests.
- **Security/privacy impact:** Brute-force, fixation, CSRF, cookie theft, and sensitive audit protection.
- **Acceptance criteria:** 5/min limiter behavior, generic login error, session regeneration/logout invalidation, 419 without CSRF, secure cookie attributes under production config.
- **Automated verification:** Livewire/feature tests with isolated limiter cache and frozen time.
- **Manual verification:** browser cookie inspection over representative HTTPS environment.
- **Complexity:** L.
- **Rollback/disable:** no bypass; revert only custom code while retaining verified framework control.

### P4-12 — Rich text, upload, URL, and draft adversarial suite

- **Dependency:** P4-11.
- **Affected:** existing sanitizer/rules/upload code only when a failing regression proves a defect; security fixtures/tests.
- **Security/privacy impact:** Directly covers XSS, malicious upload, unsafe URL, and draft exposure.
- **Acceptance criteria:** all threat fixtures rejected/sanitized; public files non-executable; failed upload has no record/orphan; hidden content remains 404.
- **Automated verification:** PHPUnit datasets for scripts/events/data/javascript URLs/SVG/polyglot/MIME spoof/oversize/slug/sitemap.
- **Manual verification:** upload through Filament and inspect served response headers/path.
- **Complexity:** L.
- **Rollback/disable:** disable affected upload/content action while preserving read-only content; revert minimal remediation only.

### P4-13 — Privacy-safe logging and error monitoring

- **Dependency:** P4-11.
- **Affected:** create `app/Logging/RedactSensitiveContext.php`, update `config/logging.php`, exception/auth audit hooks, tests.
- **Security/privacy impact:** Prevents credential/form/PII leakage in application and monitoring logs.
- **Acceptance criteria:** nested sensitive keys/headers redacted; generic 500 unchanged; validator and login never print input; health endpoint works.
- **Automated verification:** fake log channel assertions with canary secrets/PII; 500 response and audit schema tests.
- **Manual verification:** inspect sanitized local log using synthetic values, then remove synthetic log artifact.
- **Complexity:** M.
- **Rollback/disable:** external monitoring disabled; retain local sanitized daily log.

### P4-14 — Accessibility remediation and regression suite

- **Dependency:** P4-07..P4-10.
- **Affected:** public components/pages and `resources/css/app.css`; frontend axe/component tests.
- **Security/privacy impact:** None direct; accessible error handling avoids accidental submission and user confusion.
- **Acceptance criteria:** automated axe critical/serious zero; keyboard/focus/error/contrast/reduced-motion/360px matrix passes.
- **Automated verification:** Vitest axe tests plus type/lint/build.
- **Manual verification:** keyboard, NVDA/VoiceOver smoke, light/dark contrast tool, 360/768/desktop.
- **Complexity:** L.
- **Rollback/disable:** revert isolated visual remediation; never remove labels/focus/error semantics.

### P4-15 — Query, image, payload, and bundle performance gates

- **Dependency:** P4-09,P4-14.
- **Affected:** query/controller/mapper/image files only if profiling fails; performance tests and build scripts.
- **Security/privacy impact:** Payload audit also detects internal/PII exposure.
- **Acceptance criteria:** recorded query ceilings, image policy, minimal props, analytics absent when off, build succeeds without regression.
- **Automated verification:** PHPUnit query-count/payload tests; frontend build stats; image attribute component tests.
- **Manual verification:** Network panel with cache-disabled and representative content.
- **Complexity:** M.
- **Rollback/disable:** revert individual optimization; keep correctness and privacy controls.

### P4-16 — Lighthouse, configuration smoke, and Phase 4 exit gate

- **Dependency:** P4-01..P4-15.
- **Affected:** `.github/workflows/tests.yml`, scripts/config only as required for repeatability; evidence recorded in PR/CI artifact, not committed generated reports.
- **Security/privacy impact:** Final proof of production-like safe configuration.
- **Acceptance criteria:** full CI, production config validation, eight conversion journeys, header tests, axe, query gates, and Lighthouse thresholds pass.
- **Automated verification:** `composer ci:check`; `php artisan taretan:validate-config --production`; production build and Lighthouse CI.
- **Manual verification:** scenarios in sections 15 and 17; owner reviews privacy copy/template.
- **Complexity:** L.
- **Rollback/disable:** disable analytics/WhatsApp/CSP enforcement/HSTS independently; rollback release if security or privacy gate fails.

## 14. Automated Security and Functional Tests

| Suite | Required coverage |
|---|---|
| Conversion config | number normalization, token contract, invalid/empty/oversize, no secret output |
| WhatsApp unit | all four message kinds, Unicode/special chars, exact single encoding, fixed origin |
| Manuscript | no POST route, validation, focus errors, no URL before valid, no network/storage/PII event |
| Analytics | eight-event allowlist, property enum, disabled zero-request, reject PII/query/hash/token |
| Auth/session | 5/min throttle, generic error, session regenerate, logout invalidate/token rotate |
| CSRF | representative admin create/update/delete without token rejected |
| Headers/CSP | required headers, nonce, report/enforce, HSTS conditional, no unsafe wildcard |
| Sanitizer | script/event/style/form/iframe/object/embed and unsafe URI fixtures |
| Upload | MIME spoof, SVG, executable, polyglot, >5 MB, UUID, orphan cleanup |
| External URL | HTTP/javascript/data/protocol-relative rejected; safe rel on rendered links |
| Visibility/errors | draft/deleted/future 404; sitemap clean; generic 500 no leakage |
| Logging/audit | recursive redaction; strict audit schema; no username/password/email/message |
| Performance | stable query ceilings, explicit image dimensions/loading, prop allowlist |

## 15. Accessibility Test Matrix

| Surface | Keyboard/focus | Semantics/announcement | Responsive/visual |
|---|---|---|---|
| Public layout/nav | skip to main, mobile dialog trap/return | landmarks, current page, button names | 360px no overflow; focus visible |
| Catalog/filter | tab order, submit/reset/pagination | labels, result count, current page | controls stack without clipping |
| Book/service/journal CTA | Enter/Space activation | destination/purpose clear; external context | 44px target; wrapped long copy |
| Share | activation and fallback | polite success/failure once | no layout shift |
| Manuscript form | logical order, summary-to-field focus | labels, required, errors, notice, status | keyboard/zoom 200%, 360px |
| Errors | focus starts at useful heading/main | correct heading/status copy | usable without media |
| Themes/motion | focus in both themes | content unchanged | AA contrast; reduced motion |

## 16. Performance Test Matrix

| Page | Data state | Primary check |
|---|---|---|
| Home | representative and empty | LCP hero, six-item limits, query ceiling, CLS |
| Books index | first page + filters | payload, query ceiling, lazy cards, INP filter |
| Book detail | complete/minimal/broken image | eager cover only, explicit dimensions, CTA INP |
| Article detail | long rich text/images | sanitized image behavior, LCP/CLS, DOM size |
| Services | 0/6/large fixture | card rendering, CTA interaction, no N+1 |
| Manuscript | empty/errors/valid | JS responsiveness, zero server request, CLS errors |

Run three Lighthouse mobile samples per priority page against a production build and use median. A threshold failure is not waived by a single passing rerun; diagnose asset, server, or environment variance and attach evidence.

## 17. Manual Acceptance Scenarios

1. Pesan buku dengan judul ASCII, Unicode, `&`, kutip, dan emoji; decoded message memuat canonical URL tepat sekali.
2. Klik konsultasi pada dua layanan; masing-masing memuat nama layanan yang benar tanpa analytics property nama.
3. Uji Contact dengan WhatsApp+email, email-only, address-only, dan semua channel invalid.
4. Isi manuscript invalid; tidak ada popup/request/storage, summary fokus, link error menuju field.
5. Isi manuscript valid; WhatsApp terbuka dengan pesan terbaca; user masih harus menekan Send sendiri.
6. Batalkan/tutup WhatsApp; aplikasi tidak menganggap pesan terkirim dan tidak menyimpan data.
7. Periksa Network/Application: analytics disabled menghasilkan nol request/cookie/storage.
8. Dengan safe analytics fixture, jalankan semua delapan event dan inspeksi payload tanpa PII/content URL.
9. Login gagal enam kali; pesan tetap generik dan limiter aktif; login normal setelah decay.
10. Login/logout dan inspeksi session cookie/ID/CSRF pada HTTPS representative environment.
11. Coba mutasi admin tanpa CSRF, upload SVG/spoof/oversize, external URL non-HTTPS, dan rich-text payload berbahaya.
12. Buka draft/deleted/future slug serta sitemap; tidak ada content exposure.
13. Inspect headers pada public, admin login, 404, 500; CSP report-only lalu enforce tanpa breakage.
14. Uji seluruh flow dengan keyboard, screen reader smoke, reduced motion, light/dark, zoom 200%, dan viewport 360px.
15. Jalankan Lighthouse matrix dan bandingkan median terhadap thresholds.

## 18. Configuration Validation and Failure Modes

| Failure | Detection | Runtime behavior | Release behavior |
|---|---|---|---|
| Missing/invalid WhatsApp number | service + validator | CTA absent; email/address fallback | validator fails |
| Invalid/missing token template | validator | affected flow disabled only | validator fails |
| No fallback contact | validator | neutral contact copy | production validator fails |
| Analytics disabled | config | no script/request/storage | allowed and privacy-safe |
| Analytics enabled but invalid endpoint/domain | validator | forced no-op | validator fails |
| APP_DEBUG true/non-HTTPS APP_URL | validator | no automatic override | production validator fails |
| Weak/placeholder admin secret | validator without echoing value | seeder/auth unchanged | validator fails |
| Secure cookie flags missing | validator | warning outside production | production validator fails |
| CSP violation | browser/report-only logs | page remains usable during canary | block transition to enforce |
| HTTPS not proven | HSTS condition | no HSTS | block HSTS rollout, not local dev |
| Analytics/provider unavailable | adapter timeout/failure swallowed | conversion proceeds | alert only if persistent |
| Popup blocked | browser | show accessible instruction/link | no server side effect |

## 19. Risks and Rollback Strategy

| ID | Risk | Mitigation | Rollback/disable |
|---|---|---|---|
| R4-01 | CSP breaks Inertia/Filament/fonts | nonce + report-only inventory + route smoke | return report-only |
| R4-02 | HSTS locks invalid HTTPS deployment | canary max-age 300; Phase 6 verification | disable before long max-age; HSTS cache must expire |
| R4-03 | PII leaks to analytics/logs | central schema/redaction + canary tests | disable analytics/external monitoring immediately |
| R4-04 | WhatsApp malformed/wrong number | validator + exact URL tests | disable WhatsApp and use email/address |
| R4-05 | Form accidentally becomes server submission | no action/route + network spies | remove manuscript route/component |
| R4-06 | Provider script hurts performance/privacy | async/defer, default-off, CSP allowlist | set analytics disabled |
| R4-07 | Security hardening blocks admin operations | public/admin/error smoke in report phase | revert isolated middleware directive, not CSRF/auth |
| R4-08 | Query-count test brittle | stable fixture and small documented tolerance | adjust evidence-based ceiling, never remove N+1 detection silently |
| R4-09 | Accessibility fix changes layout | component-level changes + viewport snapshots/manual matrix | revert visual part while retaining semantics |
| R4-10 | Upload defense differs at web server | app tests + Phase 6 no-execute hosting check | disable uploads until hosting rule verified |

Rollback order during incident: disable analytics → disable affected WhatsApp CTA → set CSP report-only → disable HSTS only before long-lived rollout → rollback application commit. Never weaken CSRF, authentication, sanitizer, published scope, or log redaction to restore availability.

## 20. Definition of Done

- [ ] Book, service, manuscript, and Contact conversion flows meet exact message contract and safe fallback behavior.
- [ ] Kirim Naskah has GET only and demonstrably sends nothing to Taretan Media infrastructure.
- [ ] All eight analytics events pass allowlist/privacy tests; disabled mode produces zero telemetry.
- [ ] Privacy notice and processor/consent decision are reviewed by owner.
- [ ] Production config validator fails safely for every critical invalid state without exposing values.
- [ ] CSRF, login limiter, session fixation/logout, cookie flags, debug/secrets have explicit passing tests.
- [ ] CSP, nosniff, referrer, frame-ancestors, permissions policy, HTTPS/HSTS rollout are configured and smoke-tested.
- [ ] Rich-text, upload, external URL, draft exposure, open redirect, and WhatsApp injection suites pass.
- [ ] Generic 500, sanitized logging, content/auth audit, and health/error-monitoring baseline pass.
- [ ] Automated axe and manual keyboard/focus/form/contrast/motion/360px matrices pass.
- [ ] Image, query, payload, bundle, Lighthouse, and Core Web Vitals readiness gates pass.
- [ ] `composer ci:check`, production build, and configuration smoke are green.
- [ ] Each feature can be independently disabled or rolled back as documented.

## 21. Exit Criteria

Phase 4 dapat diserahkan ke Phase 5 bila:

1. P4-01 sampai P4-16 selesai dan seluruh evidence tersedia pada CI/PR checklist.
2. Tidak ada open high/critical security atau privacy finding.
3. Tidak ada PII manuscript pada database, logs, analytics, URL aplikasi, storage browser, atau monitoring.
4. WhatsApp production value boleh tetap menunggu owner hanya jika release memakai conversion disabled dan fallback valid; Phase 5 UAT memakai nilai staging tervalidasi.
5. CSP minimal telah lulus report-only seluruh route; enforce wajib sebelum production release dan idealnya sebelum Phase 5 selesai.
6. HSTS long-duration tetap menjadi rollout Phase 6 setelah HTTPS hosting terverifikasi; middleware dan canary test sudah siap di Phase 4.
7. Lighthouse dan accessibility thresholds PRD lulus pada environment representatif, atau environment-only variance memiliki bukti dan owner acceptance tanpa menurunkan target.
8. Tidak ada perubahan arsitektur/domain yang memblokir UAT.

## 22. PRD Traceability Matrix

| PRD / prompt requirement | Coverage | Task/evidence |
|---|---|---|
| US-03 / FR-M04 book WhatsApp | title + canonical + encoded config number | P4-02,03,05,06 |
| US-07 / FR-M08 manuscript | client-only validation and WhatsApp handoff | P4-07 |
| US-08 / FR-M09 service CTA | service-name message, no price | P4-06 |
| US-09 contact channels | conditional safe channels/fallback | P4-08 |
| FR-S04 aggregate analytics | eight-event adapter/matrix | P4-04,09 |
| Privacy/consent | disclosure, cookieless baseline, future consent gate | Sections 8, P4-08 |
| US-10 auth security | generic failure, rate limit, session/logout | P4-11 |
| CSRF/cookies/debug/secrets | explicit production validation/tests | P4-02,11 |
| CSP/security headers/HTTPS/HSTS | nonce middleware and staged rollout | P4-10,16 |
| Rich text/upload/external link/draft | adversarial suite | P4-12 |
| Logging/audit/error monitoring/generic 500 | redaction + health + log boundary | P4-13 |
| Keyboard/focus/labels/errors/contrast/motion/360px | accessibility plan and matrix | P4-07,14; Section 15 |
| Lazy/eager/dimensions/query/Lighthouse/CWV | performance budgets and gates | P4-15,16; Section 16 |
| Threat checklist | ten required threats | Section 9.2 |
| Rollback/failure modes | feature flags and staged controls | Sections 18–19 |

Tidak ada blocker arsitektural untuk memulai Phase 4. Nilai WhatsApp production, persetujuan vendor analytics/privacy, dan akses hosting tidak menghalangi implementasi karena conversion/analytics mempunyai mode disabled serta fallback yang aman; nilai tersebut menjadi release gate sesuai Sections 18 dan 21.

# READY FOR IMPLEMENTATION
