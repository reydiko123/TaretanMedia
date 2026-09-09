# Service Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional service price stored as Rupiah integer data, defaulting to zero when empty, and display the same formatted price on service cards in `/layanan` and the homepage.

**Architecture:** Additive database migration with a non-negative integer `price` defaulting to `0`; expose the value through the existing `PublicPropsMapper`; render one reusable service-card component in both public locations. The `/layanan` card keeps its WhatsApp CTA, while the homepage card uses the same content and price without the CTA. ISBN behavior remains untouched.

**Tech Stack:** Laravel 13, SQLite, Eloquent, Filament, Inertia, React, TypeScript, Vitest/PHPUnit.

**Spec:** Client revision in the conversation; the client revision supersedes the older no-service-price statement in `docs/product/taretan-media-prd.md`.

## Global Constraints

- Service price is a single Rupiah amount represented as an integer, not floating point.
- Empty admin input results in `0`, displayed as `Rp 0`.
- No service detail route/page is added.
- `/layanan` retains its consultation/WhatsApp CTA; homepage service cards have no consultation CTA.
- ISBN-related behavior and files are out of scope.
- Existing user changes, including `docs/implementation/05-uat-and-release-candidate.md`, must be preserved.

---

### Task 1: Add failing coverage for service pricing

**Files:**
- Modify: `tests/Feature/PublicDiscoveryTest.php`
- Modify: `tests/Feature/Admin/ContentManagementTest.php` if required by the existing admin assertions

**Interfaces:**
- Consumes the existing `Service` factory and Inertia assertions.
- Produces regression coverage for a zero/default service price and a non-zero formatted public price.

- [ ] **Step 1: Write the failing tests**
  - Assert a service created without a price persists/exposes `0`.
  - Assert `/layanan` exposes `price: 0` and `formattedPrice: 'Rp 0'`.
  - Assert `/` exposes the same service price data.

- [ ] **Step 2: Run the focused tests and verify they fail for the missing price contract**

  Run: `php artisan test tests/Feature/PublicDiscoveryTest.php`

  Expected: FAIL because the current services table/model/mapper do not provide `price` or `formattedPrice`.

### Task 2: Add service price persistence and admin input

**Files:**
- Create: `database/migrations/2026_09_09_000000_add_price_to_services_table.php`
- Modify: `app/Models/Service.php`
- Modify: `app/Filament/Resources/Services/Schemas/ServiceForm.php`
- Modify: `app/Filament/Resources/Services/Tables/ServicesTable.php`
- Modify: `database/factories/ServiceFactory.php`

**Interfaces:**
- Produces `Service::$price` as a non-negative integer with database default `0`.
- Admin input accepts an empty value as `0` and formats the table value as Rupiah.

- [ ] **Step 1: Add an additive migration with `price` integer default `0` and a non-negative constraint consistent with the existing SQLite schema style.**
- [ ] **Step 2: Add `price` to the model fillable list, cast it to integer, and document the property.**
- [ ] **Step 3: Add the optional numeric `Harga (Rp)` field to the Filament service form with minimum `0` and default `0`.**
- [ ] **Step 4: Add a formatted `Harga` column to the admin services table.**
- [ ] **Step 5: Give the service factory a non-negative integer price default so tests and demo data produce valid values.**
- [ ] **Step 6: Run the focused tests and confirm Task 1 turns green.**

### Task 3: Expose and render the public price consistently

**Files:**
- Modify: `app/Data/Public/PublicPropsMapper.php`
- Modify: `resources/js/types/public.ts`
- Create: `resources/js/components/public/service-card.tsx`
- Modify: `resources/js/pages/services/index.tsx`
- Modify: `resources/js/pages/home.tsx`
- Modify: `docs/product/taretan-media-prd.md` and affected implementation docs that still assert services have no price

**Interfaces:**
- `PublicService` exposes `price: number` and `formattedPrice: string`.
- `ServiceCard` accepts a `PublicService`, a `showCta` boolean, and optional public WhatsApp configuration; `/layanan` passes `true`, homepage passes `false`.

- [ ] **Step 1: Add `price` and `formattedPrice` to the public mapper using the exact book format `Rp ` plus Indonesian thousands separators.**
- [ ] **Step 2: Update the TypeScript public service contract.**
- [ ] **Step 3: Extract the shared service-card markup so homepage and `/layanan` have identical content and price presentation.**
- [ ] **Step 4: Keep the WhatsApp CTA enabled only on `/layanan`; omit it from homepage cards.**
- [ ] **Step 5: Replace the old no-price copy that contradicts the client revision.**
- [ ] **Step 6: Run TypeScript, frontend checks, and the focused PHP tests.**

### Task 4: Full verification

**Files:**
- No additional files; review the complete diff and test output.

- [ ] **Step 1: Run the complete backend test suite.**

  Run: `php artisan test`

- [ ] **Step 2: Run frontend type checking and static checks.**

  Run: `npm run types:check`

  Run: `npm run check`

- [ ] **Step 3: Run the production frontend build.**

  Run: `npm run build`

- [ ] **Step 4: Verify the final diff contains only service-pricing changes plus this implementation plan and preserves ISBN files.**
