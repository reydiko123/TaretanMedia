# Phase 3 Public Discovery Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Finish and verify the existing Phase 3 public discovery implementation without resetting or recreating the existing database.

**Architecture:** Keep the committed Laravel public backend as the server source of truth, complete the uncommitted Inertia/React surface, and add only focused regression coverage for gaps found during verification. Public visibility remains published, due, non-deleted content; props remain explicit allowlisted arrays.

**Tech Stack:** Laravel 13, Inertia Laravel, React 19, TypeScript, Tailwind CSS, PHPUnit, Vite Plus.

**Spec:** `docs/implementation/03-public-discovery.md`

## Global Constraints

- Never run `migrate:fresh`, `db:wipe`, destructive seeders, or any command that drops existing tables/data.
- Do not activate Kirim Naskah, final WhatsApp conversion, or analytics behavior from Phase 4.
- Public routes expose only published, due, non-deleted records and explicit public props.
- Preserve the user's current tracked and untracked frontend work; do not reset or checkout it away.

### Task 1: Establish a non-destructive verification baseline

**Files:**
- Read: `docs/implementation/03-public-discovery.md`
- Read: `phpunit.xml`, `package.json`, `.env`
- Test: existing PHPUnit and frontend checks, using the configured environment

- [ ] Step 1: Record `git status`, current commit, and existing database driver without changing files.
- [ ] Step 2: Run the focused public PHPUnit suite with result caching disabled and no migration/reset command.
- [ ] Step 3: Run TypeScript/lint checks using the repository's installed toolchain; record environment blockers separately.

### Task 2: Complete frontend route/page integration

**Files:**
- Modify: `resources/js/app.tsx`
- Modify: `resources/js/layouts/public-layout.tsx`
- Modify: `resources/js/components/public-nav.tsx`
- Modify: `resources/js/components/public-footer.tsx`
- Modify/Create: `resources/js/components/public/*.tsx`
- Modify/Create: `resources/js/pages/**/*.tsx`
- Modify: `resources/js/types/*.ts`

- [ ] Step 1: Confirm every backend Inertia component name has a matching frontend page entry.
- [ ] Step 2: Fix only compile/runtime/type errors found by the checks, preserving the public props contracts and PRD scope.
- [ ] Step 3: Verify filter URL state, conditional channels, fallback media, share fallback, error pages, and safe external links through focused checks.

### Task 3: Close backend and security verification gaps

**Files:**
- Modify only if a failing test identifies a defect: `app/`, `bootstrap/app.php`, `routes/web.php`
- Test: `tests/Feature/PublicDiscoveryTest.php`

- [ ] Step 1: Add a minimal failing regression test for each confirmed defect, without changing production code first.
- [ ] Step 2: Implement the smallest fix that keeps publication, soft-delete, sanitization, canonical, and allowlist invariants intact.
- [ ] Step 3: Run the focused public suite again and confirm no migration/reset was invoked.

### Task 4: Run Phase 3 gates and document remaining evidence

**Files:**
- Read: `docs/implementation/03-public-discovery.md`
- Modify only if required by verified defects: implementation/test files

- [ ] Step 1: Run backend tests, TypeScript check, formatter/lint, and production frontend build with fresh output.
- [ ] Step 2: Run representative route/SEO/sitemap/robots checks and inspect query-count or payload evidence where available.
- [ ] Step 3: Compare results against P3A-11, P3B-13, P3B-14, and the Definition of Done; report any environment-only blocker instead of claiming completion.

