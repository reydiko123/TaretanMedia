# Phase 1 — Technical Foundation, Admin Authentication, and Design System

> Implementation plan. Read-only inspection output. Tidak ada application code yang diubah pada dokumen perencanaan ini. Eksekusi kode dilakukan pada sesi implementasi terpisah.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan — Phase 1: Technical Foundation & Design System |
| Versi | 1.0 |
| Tanggal | 4 September 2026 |
| Phase | 1 dari 0–6 (milestone PRD M1) |
| Status akhir | **READY FOR IMPLEMENTATION** (lihat Bagian 17 & penutup) |
| Sumber kebenaran | `docs/product/taretan-media-prd.md` (PRD v1.0), `docs/implementation/00-scope-architecture-lock.md` (Phase 0 = GO) |
| Referensi | `docs/prompts/01-technical-foundation.md`, `docs/planning/00-phase-map.md`, `docs/prompts/AI-AGENT-GUARDRAILS.md` |
| Mode kerja | Read-only inspection + satu dokumen perencanaan |
| Keputusan owner | ADM-1 tabel `admins` terpisah; PHP-1 PHP 8.5 dicatat risiko (constraint tetap `^8.3`); FIL-1 versi Filament diverifikasi saat implementasi |

---

## 2. Phase Objective

Merencanakan foundation Laravel + Inertia.js + React.js + Filament + SQLite yang:

- dapat dijalankan lokal;
- punya build & test pipeline;
- punya admin authentication aman (single admin);
- punya admin seeder idempotent dari environment;
- punya storage & asset pipeline;
- punya public application shell responsif;
- punya design system minimum untuk fase berikutnya.

Batasan fase: tidak membuat domain content migration/Filament content resource (kecuali minimum untuk auth), tidak REST API publik, tidak analytics production, tidak asumsi shared hosting tersedia. Tidak lanjut ke Phase 2.

Traceability: PRD §15 M1, US-10, FR-M11, §12.1.

---

## 3. Inputs and Preconditions

| Input | Status |
|---|---|
| PRD v1.0 | Tersedia |
| Phase 0 document (GO) | Tersedia, status GO |
| Keputusan konflik C-1/C-2/C-3 | Terkonfirmasi (strip Teams, single-admin session, install Filament) |
| Repository aktif | Terinspeksi (Bagian 4) |
| Keputusan Phase 1: ADM-1, PHP-1, FIL-1 | Terkonfirmasi owner |

Precondition eksekusi: baseline git commit disarankan sebelum strip Teams (repo 0 commit — OD-4 Phase 0).

---

## 4. Current Repository Assessment

Seluruh butir dari inspeksi aktual.

### 4.1 Runtime lokal terverifikasi

| Tool | Aktual | Constraint/kebutuhan | Catatan |
|---|---|---|---|
| PHP | 8.5.0 (NTS, Herd-lite) | composer.json `^8.3` | ⚠ Runtime **di atas** constraint. Verifikasi kompatibilitas vendor; target hosting PHP 8.3/8.4 (PHP-1) |
| Composer | 2.8.12 | — | OK |
| Node | 20.17.0 | build Vite | OK |
| Ekstensi PHP | `pdo`, `pdo_sqlite`, `pdo_mysql`, `sqlite3` | wajib `pdo_sqlite` | OK lokal; `pdo_mysql` tersedia untuk fallback |

### 4.2 Dependency terpasang (dari manifest & lock)

- PHP: laravel/framework `^13.17`, inertiajs/inertia-laravel `^3.0`, laravel/fortify `^1.37`, tinker, wayfinder, chisel. Dev: larastan `^3.9`, pint `^1.27`, phpunit `^12.5`, collision, mockery, faker, pail, sail, pao.
- JS: @inertiajs/react `^3`, react `^19.2`, vite `^8`, tailwind `^4`, radix-ui (banyak), lucide-react, sonner, class-variance-authority, tailwind-merge. Dev: wayfinder vite plugin, react-compiler babel, vite-plus.
- **Filament: TIDAK terpasang** (0 match `"name": "filament"` di composer.lock).

### 4.3 Coupling starter kit yang harus di-strip (C-1/C-2)

| Area | File | Coupling |
|---|---|---|
| Model | `app/Models/User.php` | `use HasTeams`, `current_team_id` fillable, kolom 2FA di docblock |
| Auth provider | `app/Providers/FortifyServiceProvider.php` | login view inject `teamInvitation`; feature aktif hanya `resetPasswords()` |
| Domain Teams | `app/Models/{Team,TeamInvitation,Membership}`, `app/Enums/{TeamRole,TeamPermission}`, `app/Policies/TeamPolicy`, `app/Data/*`, `app/Concerns/{HasTeams,GeneratesUniqueTeamSlugs,...}`, `app/Actions/Teams/*`, `app/Http/Controllers/Teams/*`, `app/Http/Middleware/{EnsureTeamMembership,SetTeamUrlDefaults}`, `app/Rules/{ValidTeamInvitation,UniqueTeamInvitation,TeamName}`, `app/Notifications/Teams/*` | Seluruh domain multi-tenant |
| Routes | `routes/web.php`, `routes/settings.php` | `{current_team}` prefix, invitations, teams settings |
| Migration | `2026_01_27_000001_create_teams_table`, `2026_01_27_000002_add_current_team_id_to_users_table` | Skema Teams |
| Frontend | `resources/js/pages/teams/*`, sebagian `settings/*` | Halaman Teams/pengunjung |
| Seeder | `database/seeders/DatabaseSeeder.php` | `Test User` factory (bukan admin env) |

### 4.4 Yang sudah sesuai PRD

- Stack inti Laravel/Inertia/React/SQLite/Tailwind.
- Storage disk `public` (`storage/app/public`) + `storage:link` terdefinisi (`config/filesystems.php`) — kompatibel AS-06.
- Rate limiter login 5/menit per (username|IP) sudah ada (`FortifyServiceProvider::configureRateLimiting`) — sesuai US-10 AC-2.
- `SESSION_DRIVER=database`, `DB_CONNECTION=sqlite`, file `database/database.sqlite` ada.

### 4.5 Git state

Branch `master`, 0 commit, tanpa remote.

---

## 5. Target Foundation Architecture

### 5.1 Struktur direktori target (pasca-strip)

```text
app/
  Http/Controllers/        # controller publik minimal (Home shell) — konten menyusul fase berikut
  Models/Admin.php         # model admin baru (tabel admins)
  Providers/               # FortifyServiceProvider di-strip Teams / atau digantikan auth Filament
  Filament/                # panel & resource admin (dibuat Phase 1: panel + auth saja)
config/                    # + filament config (hasil publish)
database/
  migrations/              # + create_admins_table; hapus migration Teams
  seeders/                 # AdminSeeder idempotent; DatabaseSeeder guard environment
resources/js/
  layouts/                 # public app layout + admin (Filament mengelola sendiri)
  components/ui/           # design system minimum
  pages/                   # welcome→Home shell; hapus teams/*; ramping settings/*
routes/
  web.php                  # route publik minimal, tanpa Teams
```

### 5.2 Keputusan arsitektur diterapkan (dari Phase 0 ADR)

ADR-001 strip Teams · ADR-002 single-admin session · ADR-003 Filament · ADR-004 Inertia props no REST · ADR-006 storage public disk · ADR-007 config vs env.

### 5.3 Admin model strategy (ADM-1)

- Tabel `admins` terpisah (id, username unik, password hash) sesuai ERD PRD §9.
- Model `App\Models\Admin` extends `Authenticatable`, implements `Filament\Models\Contracts\FilamentUser`.
- Guard auth `admin` (provider eloquent → `Admin`), dipakai Filament panel.
- Tanpa profil, role hierarchy, 2FA, atau self password reset (batasan prompt #4).
- Tabel `users` existing: dihapus bila tidak ada konsumen lain pasca-strip Teams, atau dipertahankan kosong bila diperlukan Fortify residual — **diputuskan saat implementasi** (lihat OD-P1-4).

---

## 6. Dependency and Compatibility Matrix

Versi dari manifest/lock aktual. Yang belum ada ditandai untuk verifikasi (tidak dikarang).

| Package | Versi terpasang | Kebutuhan Phase 1 | Aksi | Catatan |
|---|---|---|---|---|
| php | runtime 8.5.0 / require `^8.3` | jalan lokal & hosting | Verifikasi vendor di 8.5; hosting target 8.3/8.4 | PHP-1 (risiko R-P1-1) |
| laravel/framework | `^13.17` | foundation | pakai | OK |
| inertiajs/inertia-laravel | `^3.0` | bridge | pakai | OK |
| laravel/fortify | `^1.37` | auth | **evaluasi**: pertahankan untuk login saja atau ganti auth Filament | ADR-002 |
| filament/filament | **belum ada** | admin panel | **install; verifikasi versi kompatibel Laravel 13 + PHP 8.5 saat implementasi** | FIL-1 (OD-P1-2) |
| larastan/larastan | `^3.9` | static analysis | pakai | OK |
| laravel/pint | `^1.27` | formatting | pakai | OK |
| phpunit/phpunit | `^12.5` | test | pakai | OK |
| @inertiajs/react, react, vite, tailwind | terpasang | frontend/build | pakai | OK |

Aturan: versi Filament & kompatibilitasnya **tidak** dituliskan sebagai fakta di sini; implementation agent wajib me-resolve via `composer require filament/filament` dan mencatat versi terpasang ke lock.

---

## 7. Authentication and Session Plan

Target: single-admin session aman (US-10, §12.1). Batasan prompt #4: tanpa profil admin, role hierarchy, atau self password reset.

| Aspek | Rencana | Traceability |
|---|---|---|
| Model & guard | `Admin` (tabel `admins`), guard `admin`, Filament panel auth | ADM-1, FR-M11 |
| Session authentication | Session driver `database`; login via panel Filament | US-10 |
| Login rate limiting | Pertahankan limiter 5/menit per (username\|IP) yang sudah ada; arahkan ke identitas admin | US-10 AC-2, sudah ada di provider |
| Session regeneration | Regenerate session ID saat login sukses | US-10 AC-3 |
| Logout invalidation | Invalidate session + regenerate CSRF token saat logout | US-10 AC-4 |
| CSRF | Middleware `web` CSRF untuk semua mutasi/panel | §12.2, US-10 |
| Generic error | Pesan login gagal generik (tak ungkap username terdaftar) | US-10 AC-1 |
| Cookie per environment | `SESSION_SECURE_COOKIE=true`, `HttpOnly`, `SameSite=lax/strict` di production; longgar di local | §12.1 |
| Register/self-reset/2FA | **Dinonaktifkan** (hapus feature `resetPasswords`, forgot/reset views, register) | C-2, prompt #4 |
| Anonymous block | Pengunjung anonim tidak dapat akses `/admin/*` | US-10 AC-5, FR-M11 |
| Password recovery | Prosedur operasional terotorisasi (di luar app), tanpa self-reset | §12.1 |

---

## 8. Environment and Configuration Plan

### 8.1 Environment variable (dari Phase 0 §9.2)

| Variable | Kategori | Aksi Phase 1 |
|---|---|---|
| APP_NAME | R, P | Set `Taretan Media` |
| APP_ENV / APP_KEY / APP_DEBUG / APP_URL | R (APP_KEY S) | Pastikan; `APP_DEBUG=false` untuk non-local |
| DB_CONNECTION / DB_DATABASE | R | `sqlite`; path file jelas (production di luar public root — dicatat, bukan dieksekusi) |
| SESSION_DRIVER | R | `database` |
| SESSION_SECURE_COOKIE / SESSION_SAME_SITE / SESSION_ENCRYPT | R, Prod | Tambah/tegaskan untuk production |
| FILESYSTEM_DISK | R | `public` untuk media |
| **ADMIN_USERNAME** | R | Tambah ke `.env.example` (placeholder non-rahasia) |
| **ADMIN_PASSWORD** | R, S | Tambah ke `.env.example` (placeholder; production via hosting) |
| **WHATSAPP_NUMBER** | R, P | Tambah placeholder |
| **CONTACT_EMAIL** | R, P | Tambah placeholder |
| **SOCIAL_INSTAGRAM_URL / MAPS_URL** | O, P | Tambah placeholder opsional |

### 8.2 Environment validation

- Validasi keberadaan `ADMIN_USERNAME`/`ADMIN_PASSWORD` non-kosong saat seeding (gagal cepat bila kosong).
- Dokumentasikan daftar env wajib; boot-time check ringan untuk nilai kritis.

### 8.3 APP_DEBUG & error handling baseline

- `APP_DEBUG=false` di non-local; halaman 404/500 generik tanpa stack trace (§12.2).
- Logging tanpa secret (§7.7): tidak mencatat credential/session token.

### 8.4 SQLite local configuration

- File `database/database.sqlite` (sudah ada) untuk local; production path di luar public root (Phase 6).

---

## 9. Storage and Asset Build Plan

| Aspek | Rencana | Traceability |
|---|---|---|
| Media disk | `public` (`storage/app/public`); path+metadata di DB, bukan BLOB | AS-06, ADR-006 |
| Symlink | `php artisan storage:link` (config sudah mendefinisikan link) | §8.2 |
| Vite/build | `npm run build` (`vp build`) menghasilkan asset terkompilasi | §7.1 |
| Deployment artifact tanpa Node | Build asset lokal → commit/upload hasil build; production tidak butuh Node.js | PRD §15 M5 |
| SSR | Opsional (`build:ssr`) — tidak diaktifkan Phase 1 | — |

---

## 10. CI and Quality Tooling Plan

| Tool | Command | Sumber |
|---|---|---|
| Formatting | `composer lint` / `pint --parallel` | composer.json |
| Format check | `composer lint:check` | composer.json |
| Static analysis | `composer types:check` / `phpstan analyse` (larastan) | composer.json, phpstan.neon |
| Frontend check | `npm run check` (`vp check`), `npm run types:check` (`tsc --noEmit`) | package.json |
| Unit/feature test | `php artisan test` (PHPUnit 12) | composer.json, phpunit.xml |
| Agregat CI | `composer ci:check` (npm check + types + test) | composer.json |

CI GitHub Actions (`.github/`) diverifikasi/diperbarui agar menjalankan `ci:check`. Tidak mengaktifkan analytics production.

---

## 11. Design System and Application Shell Plan

Design system minimum berbasis komponen existing (Radix UI + Tailwind 4 + cva + tailwind-merge).

| Elemen | Rencana | a11y |
|---|---|---|
| App layout & navigation shell | Header nav global (Beranda, Buku, Jurnal, Artikel, Layanan, Kirim Naskah, Profil, Kontak) + footer kontak | landmark, skip-link |
| Typography & spacing | Skala tipografi akademis-formal modern; token spacing Tailwind | kontras WCAG AA |
| Buttons | Varian primary (aksen CTA)/secondary/ghost via cva | focus indicator |
| Form controls | Input, select, label terasosiasi, error inline | label-for, aria-invalid |
| Cards | Kartu publikasi (dipakai katalog fase 3) | heading hierarchy |
| Alert | Info/success/error (sonner tersedia) | role=alert |
| Modal/dialog | Radix Dialog | focus trap, esc |
| Loading indicator | Inertia progress + skeleton | aria-busy |
| Empty-state | Komponen empty dengan aksi reset | teks bermakna |
| Error-page skeleton | 404 ramah + 500 generik | navigasi kembali |
| Responsive breakpoint | Mobile-first; breakpoint 360px+ | §7.5, §11.1 |
| Reduced motion | Hormati `prefers-reduced-motion` | §7.4 |

Traceability: §11 UI/UX, §7.4 accessibility, FR-S01 (shell menyiapkan beranda).

---

## 12. Ordered Task Breakdown

Format tiap task: outcome, dependency, target file/module, langkah, acceptance, automated test, manual verification, kompleksitas, rollback.

### P1-T1 — Baseline git commit

- **Outcome:** repo punya baseline commit sebelum perubahan destruktif.
- **Dependency:** —
- **Target:** seluruh repo.
- **Langkah:** `git add -A`; commit "chore: baseline starter kit + phase 0/1 planning".
- **Acceptance:** `git log` menampilkan 1 commit; working tree clean.
- **Automated test:** —
- **Manual verification:** `git log --oneline`.
- **Kompleksitas:** S.
- **Rollback:** —. (Prasyarat rollback task lain.)

### P1-T2 — Strip domain Teams (C-1)

- **Outcome:** seluruh domain multi-tenant dihapus; app tetap boot.
- **Dependency:** P1-T1.
- **Target:** file Teams di §4.3 (models, enums, policies, data, concerns, actions, controllers, middleware, rules, notifications, pages), `routes/web.php`, `routes/settings.php`, migration Teams, `User` model.
- **Langkah:** hapus file Teams; lepas `HasTeams` & `current_team_id` dari `User`; hapus route `{current_team}`/invitations/teams; hapus migration Teams; hapus `resources/js/pages/teams/*`; bersihkan referензи import.
- **Acceptance:** `php artisan route:list` tanpa route Teams; `composer types:check` lulus; tidak ada referensi `HasTeams`/`Team` tersisa (grep bersih).
- **Automated test:** suite lama Teams dihapus; smoke test boot app.
- **Manual verification:** `php artisan config:clear && php artisan route:list`.
- **Kompleksitas:** L.
- **Rollback:** `git reset --hard` ke P1-T1.

### P1-T3 — Admin model + reduce auth (C-2, ADM-1)

- **Outcome:** model `Admin` + guard `admin`; register/self-reset/2FA nonaktif.
- **Dependency:** P1-T2.
- **Target:** `app/Models/Admin.php`, `database/migrations/*_create_admins_table.php`, `config/auth.php`, `app/Providers/FortifyServiceProvider.php` (atau penggantinya), `config/fortify.php`, `resources/js/pages/auth/*`.
- **Langkah:** buat migration `admins` (id, username UK, password, timestamps); buat model `Admin`; tambah guard/provider `admin` di `config/auth.php`; hapus feature `resetPasswords` + views forgot/reset; hapus register; lepas `teamInvitation` dari login view.
- **Acceptance:** tabel `admins` terbentuk; guard `admin` resolve; tidak ada route register/forgot/reset; login view bersih dari Teams.
- **Automated test:** feature test: login sukses regenerate session; logout invalidate; anonim ditolak `/admin`.
- **Manual verification:** `php artisan migrate:fresh`; cek `route:list`.
- **Kompleksitas:** M.
- **Rollback:** git revert task; `migrate:rollback`.

### P1-T4 — Install & configure Filament (C-3, FIL-1)

- **Outcome:** panel admin Filament di `/admin`, auth via guard `admin`.
- **Dependency:** P1-T3.
- **Target:** `composer.json`/lock, `config/filament*`, `app/Filament/*`, `app/Providers/Filament/AdminPanelProvider.php`.
- **Langkah:** `composer require filament/filament` (**resolve versi kompatibel Laravel 13 + PHP 8.5; catat versi terpasang**); `php artisan filament:install --panels`; set panel guard `admin`, path `/admin`; `Admin implements FilamentUser` (`canAccessPanel`).
- **Acceptance:** `/admin/login` tampil; admin (dari seeder T5) bisa login; anonim redirect ke login; versi Filament tercatat di lock.
- **Automated test:** feature test akses panel (admin 200, guest 302).
- **Manual verification:** buka `/admin` di browser lokal.
- **Kompleksitas:** M.
- **Rollback:** `composer remove filament/filament`; git revert.

### P1-T5 — Admin seeder idempotent env-based (Q8-A)

- **Outcome:** admin awal dari `ADMIN_USERNAME`/`ADMIN_PASSWORD`.
- **Dependency:** P1-T3.
- **Target:** `database/seeders/AdminSeeder.php`, `database/seeders/DatabaseSeeder.php`.
- **Langkah:** buat `AdminSeeder` `updateOrCreate` by username; hash password; tolak nilai kosong (throw); jangan cetak password; guard demo `environment(['local','testing','staging'])` di `DatabaseSeeder`; hapus `Test User`.
- **Acceptance:** seed 2× tanpa duplikasi; password kosong → gagal jelas; log tidak memuat password.
- **Automated test:** test seeder idempotent + reject empty.
- **Manual verification:** `php artisan db:seed --class=AdminSeeder` dua kali.
- **Kompleksitas:** S.
- **Rollback:** git revert.

### P1-T6 — Environment variables + validation

- **Outcome:** `.env.example` memuat var PRD; validasi nilai kritis.
- **Dependency:** P1-T3.
- **Target:** `.env.example`, boot/config validation.
- **Langkah:** tambah `APP_NAME=Taretan Media`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `SOCIAL_INSTAGRAM_URL`, `MAPS_URL`, cookie session flags; validasi seeding.
- **Acceptance:** `.env.example` lengkap; nilai placeholder non-rahasia; validasi gagal cepat bila kosong.
- **Automated test:** config test env keys ada.
- **Manual verification:** diff `.env.example`.
- **Kompleksitas:** S.
- **Rollback:** git revert.

### P1-T7 — Storage + build artifact

- **Outcome:** media disk `public` siap; build asset tanpa Node di production.
- **Dependency:** P1-T2.
- **Target:** `config/filesystems.php` (verifikasi), pipeline build.
- **Langkah:** `php artisan storage:link`; set `FILESYSTEM_DISK=public`; verifikasi `npm run build`.
- **Acceptance:** symlink `public/storage` ada; build sukses; asset di `public/build`.
- **Automated test:** —
- **Manual verification:** `npm run build`; cek symlink.
- **Kompleksitas:** S.
- **Rollback:** hapus symlink; git revert.

### P1-T8 — CI pipeline

- **Outcome:** CI menjalankan lint + types + test.
- **Dependency:** P1-T2..T7.
- **Target:** `.github/workflows/*`.
- **Langkah:** pastikan workflow menjalankan `composer ci:check`; PHP 8.3/8.4 matrix (bukan 8.5-only).
- **Acceptance:** `composer ci:check` lulus lokal; workflow valid.
- **Automated test:** pipeline hijau.
- **Manual verification:** `composer ci:check`.
- **Kompleksitas:** M.
- **Rollback:** git revert.

### P1-T9 — Design system + app shell + error pages

- **Outcome:** shell publik responsif + komponen minimum + 404/500.
- **Dependency:** P1-T2.
- **Target:** `resources/js/layouts/*`, `resources/js/components/ui/*`, `resources/js/pages/*`, error pages.
- **Langkah:** buat layout+nav+footer; komponen button/form/card/alert/modal/loading/empty; error skeleton; breakpoint 360px+; a11y baseline; ganti `welcome` → Home shell placeholder.
- **Acceptance:** shell render mobile+desktop; keyboard-navigable; 404/500 tampil; Home shell hidup.
- **Automated test:** render test halaman shell.
- **Manual verification:** `npm run dev`, cek responsif + keyboard.
- **Kompleksitas:** L.
- **Rollback:** git revert.

---

## 13. Test Strategy and Verification Commands

Command untuk **implementation agent** (tidak dijalankan pada planning ini):

```bash
# dependency & build
composer install
composer require filament/filament   # resolve versi kompatibel, catat ke lock
npm install
npm run build

# database & seeder
php artisan migrate:fresh
php artisan db:seed --class=AdminSeeder
php artisan db:seed --class=AdminSeeder   # idempotency check

# storage
php artisan storage:link

# quality gates
composer lint:check
composer types:check
php artisan test
composer ci:check
npm run types:check

# runtime verification
php artisan route:list      # tanpa route Teams
php artisan config:clear
```

Test yang wajib ditulis:

- Auth: login sukses (session regenerate), logout (invalidate), anonim ditolak `/admin`, error generik.
- Seeder: idempotent, reject empty credential, tidak log password.
- Filament: akses panel admin 200 / guest 302.
- Boot smoke: app boot tanpa domain Teams.

---

## 14. Security Review

| Kontrol | Rencana | Traceability |
|---|---|---|
| Password hashing | Algoritma default Laravel; casting `hashed` | §12.1 |
| No plaintext credential | Seeder tak cetak; env-only; tidak di repo | Q8-A, §12.1 |
| Session security | Regenerate on login; invalidate on logout; secure cookie/HttpOnly/SameSite (prod) | §12.1, US-10 |
| CSRF | Middleware web untuk mutasi & panel | §12.2 |
| Rate limiting | 5/menit per (username\|IP) | US-10 AC-2 |
| Generic auth error | Tidak ungkap username terdaftar | US-10 AC-1 |
| Admin panel protection | Guard `admin`, anonim ditolak | FR-M11 |
| APP_DEBUG | `false` non-local; no stack trace | §12.2 |
| Logging no secret | Tanpa credential/session token | §7.7 |
| No public REST API | Inertia props only | FR-W07 |

---

## 15. Risks, Assumptions, and Rollback Considerations

### 15.1 Risiko

| ID | Risiko | Level | Mitigasi |
|---|---|---|---|
| R-P1-1 | PHP 8.5 di atas constraint `^8.3`; vendor/Filament mungkin belum sertifikasi 8.5 | Sedang | Verifikasi vendor di 8.5; target hosting 8.3/8.4; CI matrix 8.3/8.4 |
| R-P1-2 | Versi Filament kompatibel Laravel 13 belum dipastikan | Sedang | Resolve via composer saat implementasi; catat versi; bila gagal, evaluasi Laravel/Filament pinning (blocker bila tak ada versi kompatibel) |
| R-P1-3 | Strip Teams berdampak luas (banyak file coupled) | Sedang | Baseline commit (P1-T1); grep sisa referensi; test boot |
| R-P1-4 | Sisa artefak Fortify (Teams-aware) menimbulkan error | Rendah | Review `FortifyServiceProvider`; hapus injeksi Teams |
| R-10 (PRD) | Admin kehilangan akses (tanpa self-reset) | Sedang | Prosedur recovery operasional; re-seed dari env |

### 15.2 Asumsi

- Runtime hosting akan menyediakan PHP 8.3/8.4 kompatibel (dikonfirmasi Phase 6).
- Filament rilis kompatibel Laravel 13 tersedia (diverifikasi implementasi).

### 15.3 Rollback

- Setiap task revert via git ke baseline P1-T1.
- Migration `admins` reversible (`migrate:rollback`).
- Filament removable (`composer remove`).

---

## 16. Definition of Done

- [ ] Domain Teams dihapus; app boot tanpa error; `route:list` bersih.
- [ ] Model `Admin` (tabel `admins`) + guard `admin` aktif.
- [ ] Register/self-reset/2FA nonaktif.
- [ ] Filament panel `/admin` jalan; admin login; guest ditolak.
- [ ] AdminSeeder idempotent env-based; tolak kosong; tidak log password.
- [ ] `.env.example` memuat var PRD (placeholder).
- [ ] Storage public + `storage:link`; build asset sukses tanpa Node di production.
- [ ] `composer ci:check` lulus; CI hijau (PHP 8.3/8.4 matrix).
- [ ] Design system minimum + app shell responsif + 404/500.
- [ ] Security review (Bagian 14) terpenuhi.

---

## 17. Exit Criteria

Sesuai PRD §15 M1: build/test pipeline lulus, seeder membuat admin dari environment tanpa credential di repository, admin login aman, shell responsif tersedia. Semua item DoD (Bagian 16) terbukti dengan test/verifikasi. Tidak lanjut Phase 2 tanpa exit criteria terpenuhi.

---

## 18. PRD Traceability Matrix

| Area Phase 1 | User Story | FR | NFR | Risk | Milestone |
|---|---|---|---|---|---|
| Admin authentication | US-10 | FR-M11 | §12.1 | R-10, R-P1-4 | M1 |
| Admin seeder env-based | US-10 | FR-M11 | §12.1 | — | M1 |
| Strip Teams / no multi-tenant | — | FR-W (Out-of-Scope #10) | — | R-P1-3 | M1 |
| Storage/media pipeline | US-12 (fondasi) | FR-M14 (fondasi) | §7.1 | R-05 (fondasi) | M1 |
| Build/CI pipeline | — | — | §7.6 | R-P1-1, R-P1-2 | M1 |
| Design system & shell | US-01..US-09 (fondasi) | FR-S01 | §7.4, §7.5, §11 | — | M1 |
| Env & config split | — | FR-M10 | §12.2 | — | M1 |

---

## Status Penutup

**READY FOR IMPLEMENTATION**

Tidak ada blocker keras. Konflik struktural telah diputuskan (C-1/C-2/C-3) dan diterjemahkan menjadi task P1-T2..T4. Open decision tersisa **tidak** memblokir dimulainya Phase 1:

- OD-P1-1 (PHP 8.5 vs `^8.3`) — verifikasi saat implementasi; target hosting 8.3/8.4.
- OD-P1-2 (versi Filament) — resolve via composer saat implementasi; **eskalasi ke BLOCKED hanya bila** tidak ada rilis Filament kompatibel Laravel 13.
- OD-P1-4 (nasib tabel `users` pasca-strip) — diputuskan saat P1-T2/T3.

*Catatan tata kelola: dokumen ini adalah perencanaan. Eksekusi kode Phase 1 memerlukan instruksi eksplisit pada sesi implementasi terpisah beserta `AI-AGENT-GUARDRAILS.md`. Tidak lanjut ke Phase 2.*
