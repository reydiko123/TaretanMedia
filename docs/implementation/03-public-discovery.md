# Phase 3 — Public Discovery and Content Experience

> Implementation plan. Dokumen ini tidak mengimplementasikan application code. Eksekusi dilakukan pada sesi terpisah dengan tetap mengikuti `docs/prompts/AI-AGENT-GUARDRAILS.md`.

---

## 1. Document Metadata

| Atribut | Nilai |
|---|---|
| Dokumen | Implementation Plan — Phase 3: Public Discovery and Content Experience |
| Versi | 1.0 |
| Tanggal | 8 September 2026 |
| Phase | 3 dari 0–6, milestone PRD M3 |
| Work package | Phase 3A Public Shell and Informational Pages; Phase 3B Publication Catalogs and Detail Pages |
| Status akhir | **READY FOR IMPLEMENTATION** |
| Sumber kebenaran | `docs/product/taretan-media-prd.md`, implementation plan Phase 0–2, repository aktif |
| Referensi | `docs/prompts/03-public-discovery.md`, `docs/planning/00-phase-map.md`, `docs/prompts/AI-AGENT-GUARDRAILS.md` |
| Mode kerja dokumen | Read-only assessment dan implementation planning |

---

## 2. Phase Objective

Membangun pengalaman publik Taretan Media yang responsif, dapat diakses, aman, dan mudah ditemukan mesin pencari melalui Laravel web routes, server-side query rules, Inertia props yang eksplisit, dan halaman React.

Phase 3 harus memungkinkan pengunjung:

1. memahami identitas, profil, layanan, dan kanal resmi Taretan Media;
2. menemukan buku melalui pencarian, filter, sorting, dan pagination;
3. membuka detail buku beserta metadata publik dan author terurut;
4. menemukan jurnal dan menuju halaman publikasi eksternal resmi;
5. menemukan serta membaca artikel yang telah disanitasi;
6. membagikan halaman detail melalui Web Share API atau salin tautan;
7. menerima respons 404, 500, empty state, dan fallback media yang layak.

Phase 3 dibagi menjadi:

- **Phase 3A — Public Shell and Informational Pages**
- **Phase 3B — Publication Catalogs and Detail Pages**

Phase 3 tidak mengaktifkan form Kirim Naskah, WhatsApp conversion behavior final, atau analytics conversion. Integrasi conversion lengkap tetap menjadi Phase 4.

---

## 3. Scope and Non-Goals

### 3.1 Scope Phase 3A

- Global public layout.
- Header, desktop navigation, mobile menu, active state, footer.
- Inertia navigation progress/loading behavior.
- Responsive content container dan page primitives.
- Beranda.
- Profil.
- Layanan.
- Kontak.
- Kanal kontak/sosial hanya tampil bila terkonfigurasi.
- Penanganan konfigurasi kosong.
- Komponen gambar dengan fallback ketika path kosong atau gagal dimuat.
- Halaman 404 dan 500 generik.
- Struktur heading, landmark, focus state, keyboard navigation, dan skip link.

### 3.2 Scope Phase 3B

- Katalog dan detail Buku.
- Katalog dan detail Jurnal.
- Katalog dan detail Artikel.
- Controller tipis dan query/service layer.
- Eager loading relasi yang dibutuhkan.
- Search, category filter, sorting, pagination.
- Filter harga dan tahun khusus buku.
- URL sebagai sumber state filter.
- Normalisasi query invalid.
- Empty state dan reset filter.
- Multiple author ordering.
- Optional field rendering tanpa label kosong.
- Rendering rich text yang sudah disanitasi.
- External journal link HTTPS dengan atribut aman.
- Web Share API dan copy-link fallback.
- Title, meta description, canonical, dan Open Graph minimum.
- Sitemap, robots, breadcrumb, dan structured data prioritas.
- Loading, empty, error, dan media fallback state.

### 3.3 Explicit Non-Goals

- Tidak ada REST atau GraphQL API publik.
- Tidak ada akun, autentikasi, wishlist, komentar, rating, atau profil pengunjung.
- Tidak ada cart, checkout, payment, inventory, order, invoice, atau ongkir.
- Tidak ada form Kirim Naskah aktif pada Phase 3.
- Tidak ada WhatsApp deep-link conversion final atau event analytics final.
- Tidak ada penyimpanan data lead atau submission pengunjung.
- Tidak ada PDF viewer, hosting PDF jurnal, DOI workflow, volume/issue workflow, peer review, atau artikel ilmiah internal.
- Tidak ada harga layanan.
- Tidak ada `SITE_SETTINGS` atau pengaturan global melalui Filament.
- Tidak ada preview publik untuk draft.
- Tidak ada related content kecuali kapasitas tersisa dan disetujui sebagai scope tambahan.
- Tidak ada perubahan besar terhadap domain atau CMS Phase 2 kecuali defect yang benar-benar memblokir kontrak publik.

---

## 4. Current Repository Assessment

### 4.1 Foundation yang sudah tersedia

| Area | Kondisi aktual | Dampak Phase 3 |
|---|---|---|
| Backend | Laravel 13 dengan Inertia Laravel | Web controller dan Inertia response siap digunakan |
| Frontend | React 19, TypeScript, Tailwind CSS 4, komponen UI | Fondasi halaman dan komponen publik tersedia |
| Route publik | Hanya `/` menuju page `welcome` | Seluruh route katalog, detail, dan informasi perlu dibuat |
| Public layout | `resources/js/layouts/public-layout.tsx` tersedia | Dapat dijadikan shell tunggal, tetapi perlu diperkaya |
| Navigasi/footer | `PublicNav` dan `PublicFooter` tersedia | Perlu route lengkap, active state, mobile behavior, dan configured channels |
| Home | `resources/js/pages/welcome.tsx` berupa hero minimum | Perlu diganti/ditingkatkan menjadi Home Phase 3A berbasis props |
| Shared props | Hanya `name` dan `sidebarOpen` | Perlu public-safe config dan metadata tanpa membocorkan secret |
| Domain | Book, Journal, Article, Author, Category, Service tersedia | Siap dikonsumsi query layer publik |
| Publication rule | `scopePublished()` tersedia | Menjadi aturan wajib untuk katalog/detail publik |
| Soft delete | Domain utama memakai `SoftDeletes` | Query default mengecualikan deleted, tetap perlu tes eksplisit |
| Article sanitization | `HtmlSanitizer` dijalankan saat persistence | Body dapat dirender raw hanya dari field tersanitasi |
| Journal URL | HTTPS divalidasi pada CMS/domain | UI tetap wajib memakai `target="_blank"` dan `rel="noopener noreferrer"` |
| Public config | `config/taretan.php` memuat WhatsApp, email, Instagram, maps | Harus diproyeksikan menjadi props nullable dan aman |
| Tests | Test domain dan admin sudah tersedia | Perlu feature test khusus route, props, filter, SEO, dan visibility publik |

### 4.2 Gap utama

1. Belum ada controller publik.
2. Belum ada request/query normalizer publik.
3. Belum ada query object/service katalog dan detail.
4. Belum ada DTO/resource array untuk Inertia props publik.
5. Belum ada route katalog/detail dan informational pages.
6. Belum ada halaman React Phase 3 selain welcome minimum.
7. Belum ada komponen katalog, filter, pagination, share, SEO, breadcrumb, dan fallback image yang lengkap.
8. Belum ada canonical URL policy, sitemap, dan robots response.
9. Belum ada error page 404/500 yang sesuai public shell.
10. Belum ada test matrix publik.

### 4.3 Keputusan arsitektur Phase 3

- Gunakan controller/action per area publik, bukan closure route untuk halaman data-driven.
- Gunakan query object/service agar aturan visibility, eager loading, filter, sorting, dan pagination tidak tersebar.
- Gunakan array mapper atau data object eksplisit. Jangan mengirim Eloquent model mentah.
- Gunakan query string sebagai source of truth state katalog.
- Gunakan route model lookup berbasis slug melalui query published, bukan implicit binding standar yang dapat menemukan draft.
- Sanitasi artikel tetap dilakukan pada persistence boundary. Query publik hanya mengirim field hasil sanitasi.
- Public configuration diproyeksikan melalui satu mapper yang menghapus nilai kosong dan tidak pernah mengirim credential admin.
- Metadata SEO disiapkan server-side sebagai props eksplisit agar konsisten antara initial visit dan Inertia navigation.

---

## 5. Public Route Matrix

| Route | Name | Controller/action | Query/service | Inertia page/response | Success | Error | Visibility dan test utama |
|---|---|---|---|---|---|---|---|
| `GET /` | `home` | `HomeController` | `HomeDiscoveryQuery` | `home` | 200 | 500 | Featured hanya published/non-deleted; tes empty dan populated |
| `GET /profil` | `profile` | `ProfileController` | `PublicSiteContent` | `profile` | 200 | 500 | Source/config content; tes heading dan metadata |
| `GET /layanan` | `services.index` | `ServiceController@index` | `PublicServiceQuery` | `services/index` | 200 | 500 | Hanya active/non-deleted; tanpa harga |
| `GET /kontak` | `contact` | `ContactController` | `PublicSiteConfig` | `contact` | 200 | 500 | Kanal kosong tidak dirender; props public-safe |
| `GET /buku` | `books.index` | `BookController@index` | `BookCatalogQuery` | `books/index` | 200 | 500 | Published only; filter dan pagination tests |
| `GET /buku/{slug}` | `books.show` | `BookController@show` | `PublishedBookQuery` | `books/show` | 200 | 404 | Draft/deleted/future/invalid slug = 404 |
| `GET /jurnal` | `journals.index` | `JournalController@index` | `JournalCatalogQuery` | `journals/index` | 200 | 500 | Published only; search/category/sort tests |
| `GET /jurnal/{slug}` | `journals.show` | `JournalController@show` | `PublishedJournalQuery` | `journals/show` | 200 | 404 | External URL HTTPS; hidden content = 404 |
| `GET /artikel` | `articles.index` | `ArticleController@index` | `ArticleCatalogQuery` | `articles/index` | 200 | 500 | Published only; search/category/sort tests |
| `GET /artikel/{slug}` | `articles.show` | `ArticleController@show` | `PublishedArticleQuery` | `articles/show` | 200 | 404 | Sanitized body; hidden content = 404 |
| `GET /sitemap.xml` | `sitemap` | `SitemapController` | `PublicSitemapQuery` | XML response | 200 | 500 | Hanya URL publik dan published |
| `GET /robots.txt` | `robots` | `RobotsController` atau static response | Config-based | Text response | 200 | 500 | Disallow admin; referensi sitemap |
| fallback | — | Laravel exception handling | — | `errors/404` | 404 | — | Public shell, no stack trace |
| exception | — | Laravel exception handling | — | `errors/500` | 500 | — | Pesan generik, no sensitive detail |

### 5.1 Cache considerations

- Jangan menambahkan cache persisten pada iterasi pertama sebelum correctness terverifikasi.
- Shared static config boleh menggunakan Laravel config cache.
- Sitemap boleh diberi short-lived cache setelah invalidation strategy ditentukan.
- Katalog dengan kombinasi query tinggi tidak dicache pada MVP tanpa bukti kebutuhan.
- Browser/static asset caching mengikuti Vite hashed assets.

---

## 6. Controller and Query-Layer Plan

### 6.1 Controller responsibilities

Controller publik hanya:

1. menerima typed request;
2. memanggil query/service;
3. membangun metadata canonical;
4. mengembalikan Inertia response atau XML/text response;
5. tidak menyimpan business filtering langsung di controller.

Target controller:

- `HomeController`
- `ProfileController`
- `ServiceController`
- `ContactController`
- `BookController`
- `JournalController`
- `ArticleController`
- `SitemapController`
- `RobotsController` bila tidak memakai static route response

### 6.2 Query/service responsibilities

Target query layer:

- `HomeDiscoveryQuery`: featured/latest published books, journals, articles, active services dengan limit eksplisit.
- `BookCatalogQuery`: normalize, filter, sort, eager load, paginate, append normalized query.
- `PublishedBookQuery`: lookup slug melalui `published()`, eager load author/categories.
- `JournalCatalogQuery`: search/filter/sort/paginate.
- `PublishedJournalQuery`: published slug lookup dan kategori.
- `ArticleCatalogQuery`: search/filter/sort/paginate dengan author/categories.
- `PublishedArticleQuery`: published slug lookup dan author/categories.
- `PublicServiceQuery`: `active()` dan ordered results.
- `PublicSitemapQuery`: kumpulan canonical URLs published.
- `PublicSiteConfig`: mapper config/env ke public-safe nullable values.

### 6.3 Query invariants

- Selalu mulai Book, Journal, dan Article dari `published()`.
- Jangan memakai `withTrashed()` pada route publik.
- Detail memakai `firstOrFail()` setelah scope published dan slug condition.
- Semua list relation memakai eager loading selektif.
- Pilih kolom yang dibutuhkan bila tidak mengganggu hydration relasi.
- Author buku mengikuti `author_book.sort_order` dari relasi model.
- Pagination menggunakan batas konstan, rekomendasi awal 12 item per halaman.
- Query string normalized diteruskan dengan `withQueryString()` atau `appends()` hanya setelah whitelist.

---

## 7. Inertia Props Contracts

Semua props berupa scalar, array, nullable scalar, atau pagination envelope. Date dikirim sebagai ISO 8601 dan label terformat bila dibutuhkan UI. URL media dibangun server-side atau oleh helper publik yang konsisten.

### 7.1 Shared props

```ts
type PublicSharedProps = {
    site: {
        name: string;
        tagline: string;
        contact: {
            email: string | null;
            whatsappConfigured: boolean;
            instagramUrl: string | null;
            mapsUrl: string | null;
        };
    };
    navigation: Array<{
        label: string;
        href: string;
    }>;
};
```

Nomor WhatsApp mentah tidak perlu dikirim pada Phase 3 bila conversion behavior belum aktif. Jika dibutuhkan untuk configured-state, kirim boolean atau URL yang telah dibangun dan disetujui, bukan secret lain.

### 7.2 Common metadata

```ts
type SeoProps = {
    title: string;
    description: string;
    canonicalUrl: string;
    openGraph: {
        type: 'website' | 'article' | 'book';
        title: string;
        description: string;
        url: string;
        imageUrl: string | null;
    };
};
```

### 7.3 Catalog envelope

```ts
type Paginated<T> = {
    data: T[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    from: number | null;
    to: number | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};
```

### 7.4 Book contracts

```ts
type BookCard = {
    title: string;
    slug: string;
    coverUrl: string | null;
    authors: string[];
    categories: Array<{ name: string; slug: string }>;
    price: number;
    formattedPrice: string;
    publicationYear: number | null;
};

type BookDetail = BookCard & {
    isbn: string | null; // berasal dari isbn_display
    publisher: string | null;
    pageCount: number | null;
    synopsis: string | null;
    tableOfContents: string | null;
    publishedAt: string;
};
```

### 7.5 Journal contracts

```ts
type JournalCard = {
    title: string;
    slug: string;
    coverUrl: string | null;
    theme: string | null;
    editionLabel: string | null;
    publicationYear: number | null;
    categories: Array<{ name: string; slug: string }>;
};

type JournalDetail = JournalCard & {
    description: string | null;
    externalUrl: string;
    publishedAt: string;
};
```

### 7.6 Article contracts

```ts
type ArticleCard = {
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImageUrl: string | null;
    author: { name: string };
    categories: Array<{ name: string; slug: string }>;
    publishedAt: string;
};

type ArticleDetail = ArticleCard & {
    bodyHtml: string;
};
```

### 7.7 Filters contract

```ts
type CatalogFilters = {
    search: string;
    category: string | null;
    sort: string;
};

type BookFilters = CatalogFilters & {
    minPrice: number | null;
    maxPrice: number | null;
    year: number | null;
};
```

---

## 8. Phase 3A Plan

### 8.1 Public shell

- Jadikan `PublicLayout` satu-satunya wrapper halaman publik.
- Pindahkan duplikasi shell dari `welcome.tsx` ke layout.
- Pertahankan skip link dan `main#main-content`.
- Tambahkan max-width/container primitives konsisten.
- Pastikan footer berada di bawah viewport pada halaman pendek.
- Tambahkan progress indicator Inertia yang tidak mengunci keyboard.

### 8.2 Navigation

- Route: Beranda, Buku, Jurnal, Artikel, Profil, Layanan, Kontak.
- Jangan menampilkan link Kirim Naskah aktif pada Phase 3, atau tampilkan hanya sebagai disabled/future element jika desain memerlukannya dan tidak membingungkan.
- Active state berdasarkan pathname/route.
- Desktop navigation terlihat pada breakpoint yang tepat.
- Mobile menu memakai dialog/sheet accessible, focus trap, Escape close, dan close setelah navigasi.
- Brand/logo memiliki accessible name.

### 8.3 Footer

- Nama dan deskripsi singkat organisasi.
- Link navigasi utama.
- Kanal email, Instagram, dan maps hanya jika configured.
- External link memakai atribut aman.
- Tahun hak cipta dinamis dapat dipertahankan.
- Tidak merender anchor tanpa href atau label kosong.

### 8.4 Home

Urutan konten yang direncanakan:

1. Hero value proposition.
2. Shortcut discovery ke Buku, Jurnal, dan Artikel.
3. Featured/latest books.
4. Featured/latest journals.
5. Featured/latest articles.
6. Ringkasan layanan aktif.
7. Profil/credibility teaser.
8. CTA konsultasi sebagai presentational component, tanpa conversion tracking final.

Home harus tetap bermakna ketika seluruh koleksi dinamis kosong.

### 8.5 Profile

- Konten profil berasal dari source/config, bukan tabel baru.
- Struktur: identitas, visi/positioning, fokus penerbitan, kredibilitas, dan jalur menuju publikasi/layanan.
- Hindari klaim faktual yang belum tersedia di PRD/config.
- Metadata SEO unik.

### 8.6 Services

- Query hanya `Service::active()` dan non-deleted.
- Urutan mengikuti `sort_order`.
- Render name, summary, description, features, dan CTA label hanya bila tersedia.
- Tidak ada price field atau placeholder harga.
- CTA pada Phase 3 boleh mengarah ke Kontak atau memakai komponen siap-Phase-4 tanpa tracking final.
- Empty state tetap menyediakan jalur ke Kontak.

### 8.7 Contact

- Render hanya kanal yang terkonfigurasi.
- Email memakai `mailto:` hanya bila valid/non-empty.
- Instagram dan maps external link memakai rel aman.
- Bila semua kanal kosong, tampilkan copy netral tanpa broken link.
- Jangan mengekspos admin username/password atau env yang tidak public-safe.

### 8.8 Errors

- 404: heading jelas, pesan singkat, link kembali ke Home/katalog.
- 500: pesan generik, tidak membocorkan exception, stack trace, path, atau query.
- Gunakan public visual language namun hindari query data yang dapat gagal lagi.
- Pastikan status HTTP asli tetap 404/500.

---

## 9. Phase 3A Exit Gate

Phase 3A dinyatakan lulus jika:

1. Semua route informational menghasilkan 200.
2. Layout konsisten di desktop dan mobile.
3. Keyboard dapat membuka, menavigasi, dan menutup mobile menu.
4. Skip link berfungsi.
5. Kanal kosong tidak menghasilkan link/label kosong.
6. Layanan hanya active dan non-deleted serta tidak menampilkan harga.
7. Home tetap valid dengan database kosong.
8. Broken/missing image memiliki fallback.
9. 404 dan 500 mempertahankan status HTTP dan tidak membocorkan detail internal.
10. Feature tests Phase 3A, TypeScript check, formatter, lint, dan build lulus.

Phase 3B tidak boleh dianggap selesai sebelum exit gate ini lulus.

---

## 10. Phase 3B Plan

### 10.1 Books Index

- Search pada title dan author name.
- Category filter hanya kategori tipe Book.
- Min/max price integer non-negatif.
- Year filter integer dalam rentang domain yang disepakati.
- Sort whitelist: terbaru, terlama, judul A–Z, judul Z–A, harga rendah–tinggi, harga tinggi–rendah.
- Pagination 12 item.
- URL menyimpan semua filter normalized.
- Reset menghapus query katalog yang dikenal.
- Card menampilkan hanya metadata relevan dan tidak memunculkan label optional kosong.

### 10.2 Book Detail

- Lookup melalui `Book::published()->whereSlug($slug)`.
- Eager load author terurut dan kategori Book.
- Gunakan `isbn_display` sebagai nilai tampilan, bukan tebakan formatting.
- Format Rupiah dan tahun tanpa pemisah ribuan.
- Render publisher, ISBN, page count, synopsis, dan table of contents hanya bila tersedia.
- Share button menggunakan canonical URL.
- CTA pemesanan dapat dirender sebagai interface/presentational hook, tetapi conversion behavior lengkap masuk Phase 4.

### 10.3 Journals Index

- Search title, theme, dan edition label bila dibutuhkan.
- Category filter hanya kategori tipe Journal.
- Sort whitelist: terbaru, terlama, judul A–Z, judul Z–A, tahun terbaru/terlama.
- Pagination dan reset filter.
- Metadata-only presentation, tidak ada PDF viewer.

### 10.4 Journal Detail

- Lookup published/non-deleted berdasarkan slug.
- Optional metadata dirender kondisional.
- External URL wajib HTTPS dari domain validation.
- Link membuka tab baru dengan `target="_blank"` dan `rel="noopener noreferrer"`.
- Label menyatakan bahwa pengguna menuju situs eksternal.
- Tidak mencoba embed atau proxy konten eksternal.

### 10.5 Articles Index

- Search title, excerpt, dan author name. Jangan melakukan search terhadap HTML mentah bila berisiko/mahal tanpa kebutuhan.
- Category filter hanya kategori tipe Article.
- Sort whitelist: terbaru, terlama, judul A–Z, judul Z–A.
- Card menampilkan author, published date, excerpt, categories, dan featured image fallback.

### 10.6 Article Detail

- Lookup published/non-deleted berdasarkan slug.
- Body dikirim dari field yang telah disanitasi pada persistence boundary.
- Render raw HTML hanya pada komponen khusus yang menerima `bodyHtml` terpercaya dari server.
- Terapkan typography styles untuk heading, paragraph, list, quote, link, dan media yang diizinkan sanitizer.
- External links dalam body mengikuti hasil sanitizer; evaluasi transform tambahan untuk rel aman bila sanitizer belum menjamin.
- Metadata type `article`, author, published time, breadcrumb, share.

### 10.7 Share behavior

- Gunakan `navigator.share()` bila tersedia.
- Payload hanya title, text ringkas, canonical URL.
- Bila tidak tersedia atau ditolak karena unsupported, tampilkan tombol salin tautan.
- Clipboard fallback menangani permission/error dan memberi feedback accessible.
- User cancellation bukan application error.
- Analytics `share_click` ditunda ke Phase 4.

---

## 11. Component and Page Inventory

### 11.1 Pages

- `pages/home.tsx`
- `pages/profile.tsx`
- `pages/contact.tsx`
- `pages/services/index.tsx`
- `pages/books/index.tsx`
- `pages/books/show.tsx`
- `pages/journals/index.tsx`
- `pages/journals/show.tsx`
- `pages/articles/index.tsx`
- `pages/articles/show.tsx`
- `pages/errors/404.tsx`
- `pages/errors/500.tsx`

### 11.2 Layout and global components

- `layouts/public-layout.tsx`
- `components/public-nav.tsx`
- `components/public-footer.tsx`
- `components/public-page-header.tsx`
- `components/seo-head.tsx`
- `components/breadcrumbs.tsx`
- `components/responsive-image.tsx`
- `components/empty-state.tsx`
- `components/error-state.tsx`
- `components/loading-indicator.tsx`

### 11.3 Catalog components

- `components/catalog/search-input.tsx`
- `components/catalog/category-filter.tsx`
- `components/catalog/sort-select.tsx`
- `components/catalog/book-filter-panel.tsx`
- `components/catalog/active-filter-summary.tsx`
- `components/catalog/reset-filters.tsx`
- `components/catalog/pagination.tsx`
- `components/catalog/result-summary.tsx`

### 11.4 Content components

- `components/books/book-card.tsx`
- `components/books/book-metadata.tsx`
- `components/journals/journal-card.tsx`
- `components/journals/external-journal-link.tsx`
- `components/articles/article-card.tsx`
- `components/articles/article-body.tsx`
- `components/services/service-card.tsx`
- `components/share-button.tsx`

Inventory adalah target modular. Implementasi boleh menggabungkan komponen sangat kecil bila reuse tidak nyata, tetapi tidak boleh menciptakan satu page monolitik yang sulit diuji.

---

## 12. Filter and Query Normalization Rules

### 12.1 General rules

- Hanya key whitelist yang dibaca: `q`, `category`, `sort`, `page`, ditambah `min_price`, `max_price`, `year` untuk buku.
- Unknown query key diabaikan dan tidak diteruskan ke pagination links.
- Search di-trim, whitespace berulang dinormalisasi, dan dibatasi panjangnya, rekomendasi 100 karakter.
- Empty string menjadi null/default.
- Category memakai slug exact dari tipe katalog terkait.
- Category invalid tidak boleh menyebabkan 500. Pilihan kebijakan: normalize ke null dan canonical tanpa filter invalid.
- Sort invalid kembali ke default `newest`.
- Page non-integer, negatif, atau nol dinormalisasi ke 1 oleh paginator/request rules.
- Filter tidak membypass published scope.

### 12.2 Book-specific rules

- `min_price` dan `max_price` hanya integer >= 0.
- Bila min > max, kebijakan deterministik: tukar nilai atau abaikan keduanya. Rekomendasi: abaikan invalid pair dan kembalikan normalized filters agar UI konsisten.
- `year` integer dan tidak diformat sebagai angka ribuan.
- Year invalid dinormalisasi ke null.
- Search author menggunakan `whereHas('authors')` dan tetap eager load authors.

### 12.3 URL-state preservation

- Form filter menggunakan GET/Inertia visit.
- `preserveState` dan `replace` digunakan secara selektif agar back/forward browser tetap natural.
- Pergantian filter mereset page ke 1.
- Pagination mempertahankan normalized filters.
- Reset menuju pathname katalog tanpa query.
- Props `filters` harus identik dengan state normalized yang benar-benar diterapkan server.

### 12.4 Canonical query policy

- Canonical detail selalu URL slug tanpa query tracking.
- Canonical katalog default tanpa query.
- Untuk halaman filter/search, rekomendasi MVP: canonical ke base catalog agar kombinasi parameter tidak menciptakan duplikasi index berlebih.
- Keputusan canonical filter harus konsisten di seluruh katalog dan diuji.

---

## 13. SEO and Sharing Plan

### 13.1 Minimum SEO

Setiap page menyediakan:

- title unik;
- meta description;
- canonical URL absolut;
- Open Graph title, description, URL, type, dan optional image;
- language document Bahasa Indonesia;
- semantic heading tunggal `h1` per page.

### 13.2 Metadata source

- Home/Profile/Services/Contact: source/config copy.
- Catalog: title dan description statis dengan optional result context.
- Detail: title record; description dari synopsis/excerpt/description yang di-strip tags dan dipotong aman.
- Image: cover/featured image bila tersedia, fallback global bila disediakan.

### 13.3 Sitemap

- Memuat Home, Profile, Services, Contact, katalog utama.
- Memuat detail Book, Journal, Article yang published dan non-deleted.
- Tidak memuat admin, draft, deleted, future publication, filter URL, atau error pages.
- `lastmod` memakai `updated_at` bila tersedia.
- Response XML valid dan memiliki content type yang benar.

### 13.4 Robots

- Allow public pages.
- Disallow `/admin` dan path internal yang relevan.
- Cantumkan absolute sitemap URL.
- Environment non-production dapat memakai kebijakan noindex melalui konfigurasi deployment, bukan hard-code yang berisiko terbawa production.

### 13.5 Breadcrumb and structured data priority

Prioritas implementasi:

1. Breadcrumb visual dan `BreadcrumbList` untuk detail.
2. `Article` structured data untuk artikel.
3. `Book` structured data untuk buku jika mapping field valid.
4. `Organization`/`WebSite` pada Home bila data organisasi cukup.

Jangan menerbitkan structured data dengan field rekaan atau tidak tersedia.

---

## 14. Accessibility and Responsive Behavior

- Landmark: header, nav, main, footer.
- Satu `h1`, hierarchy heading berurutan.
- Skip link terlihat saat focus.
- Semua interactive element dapat digunakan keyboard.
- Focus ring tidak dihilangkan.
- Mobile menu mengelola focus dan `aria-expanded`.
- Icon-only button memiliki accessible name.
- Search/filter memiliki label, bukan hanya placeholder.
- Filter validation/error announcement memakai live region bila diperlukan.
- Pagination memiliki `nav` label dan current page semantics.
- Image memiliki alt sesuai konteks. Decorative fallback memakai alt kosong bila judul sudah berdampingan.
- Kontras warna menargetkan WCAG AA.
- Layout tidak menghasilkan horizontal scroll pada 320px.
- Tap target memadai pada mobile.
- Rich text table/media tidak memecah viewport.
- Reduced-motion preference dihormati untuk progress/transition.
- Copy-link feedback dapat dibaca screen reader.

---

## 15. Loading, Empty, Error, and Fallback States

### 15.1 Loading

- Inertia top progress untuk navigasi global.
- Disable atau beri pending state pada submit filter untuk mencegah klik berulang.
- Pertahankan konten lama saat partial reload bila tidak membingungkan.
- Skeleton hanya bila memberi nilai dan tidak menyebabkan layout shift besar.

### 15.2 Empty

- Home section kosong dapat disembunyikan atau menampilkan copy netral.
- Katalog tanpa data: pesan belum ada publikasi.
- Filter tanpa hasil: tampilkan filter aktif dan tombol reset.
- Services kosong: arahkan ke Contact tanpa menyatakan layanan yang tidak tersedia.

### 15.3 Error

- 404 untuk slug invalid, draft, deleted, atau future publication.
- 500 generik tanpa detail exception.
- Error clipboard/share ditampilkan non-blocking.
- Kegagalan image tidak menggagalkan page.

### 15.4 Media fallback

- Null path langsung memakai placeholder.
- `onError` mengganti broken URL ke placeholder tanpa infinite loop.
- Tetapkan aspect ratio untuk mengurangi CLS.
- Jangan mengasumsikan semua file pada DB masih tersedia di storage.

### 15.5 Optional fields

Gunakan conditional block pada seluruh label/value. Jangan menghasilkan:

- label tanpa nilai;
- separator yatim;
- anchor tanpa href;
- list kosong;
- heading section tanpa konten.

---

## 16. Ordered Task Breakdown

### Phase 3A

| ID | Dependency | Target module | Implementation steps | Acceptance criteria | Automated test | Manual test | Complexity |
|---|---|---|---|---|---|---|---|
| P3A-01 | Phase 2 complete | Public config/data | Buat mapper public-safe untuk site identity, contact, social, maps; normalize empty values | Tidak ada secret; empty menjadi null | Unit/feature props test | Inspect Inertia props | S |
| P3A-02 | P3A-01 | Shared Inertia props | Share site/navigation props secara eksplisit | Semua public page menerima contract konsisten | Middleware feature test | Navigasi antarhalaman | S |
| P3A-03 | P3A-02 | Public layout | Konsolidasikan shell, skip link, container, progress | Tidak ada shell duplication; keyboard usable | Component/type/build checks | Desktop/mobile keyboard | M |
| P3A-04 | P3A-03 | Nav/footer | Lengkapi route links, active state, mobile menu, configured channels | Link valid; kanal kosong tersembunyi | Feature/component tests | Resize dan keyboard | M |
| P3A-05 | P3A-01 | Static content service | Definisikan content source untuk profile/home/contact copy | Tidak ada DB settings baru | Unit config test | Review copy | S |
| P3A-06 | P3A-02,P3A-05 | Informational controllers/routes | Tambah Home/Profile/Contact routes dan controllers | 200 dan props minimal | Route feature tests | Open semua route | M |
| P3A-07 | Phase 2 domain | Service query/page | Query active services, mapper props, page cards | Active only, ordered, no price | Visibility/order tests | Empty/populated state | M |
| P3A-08 | P3A-06,P3A-07 | Home | Query featured/latest content dengan limits dan fallback | Published only; empty-safe | Home props tests | Demo dan empty DB | L |
| P3A-09 | P3A-03 | Image fallback | Buat responsive image/fallback component | Null dan broken URL aman | Component test bila setup tersedia | Putus file storage | S |
| P3A-10 | P3A-03 | Error rendering | Tambah public 404/500 pages dan exception mapping | Status benar, no leakage | HTTP error tests | Trigger local safe errors | M |
| P3A-11 | P3A-01..10 | Phase 3A gate | Jalankan lint, typecheck, build, tests, accessibility checklist | Semua exit gate lulus | CI checks | Multi-device smoke test | M |

### Phase 3B

| ID | Dependency | Target module | Implementation steps | Acceptance criteria | Automated test | Manual test | Complexity |
|---|---|---|---|---|---|---|---|
| P3B-01 | P3A gate | Query normalization | Buat request/value object whitelist untuk catalog filters | Invalid query deterministik | Data provider tests | Uji URL invalid | M |
| P3B-02 | P3B-01 | Public props mappers | Buat mapper Book/Journal/Article/Category/Pagination | Tidak ada raw Eloquent | Props shape tests | Inspect Inertia payload | M |
| P3B-03 | P3B-01,02 | Book catalog backend | Search title/author, category, price, year, sort, pagination | Semua filter server-authoritative | Query/HTTP tests | Kombinasi filter | L |
| P3B-04 | P3B-03 | Books Index UI | Filter GET, cards, result summary, pagination, reset | URL dan UI selalu sinkron | Type/build + HTTP props | Back/forward browser | L |
| P3B-05 | P3B-02 | Book detail backend/UI | Published slug lookup, author order, conditional metadata, ISBN display | Hidden content 404; ISBN identik input | HTTP visibility tests | Detail lengkap/minimal | L |
| P3B-06 | P3B-01,02 | Journal catalog/backend UI | Search, category, sort, pagination | Metadata-only dan URL-state | Query/HTTP tests | Filter/reset | L |
| P3B-07 | P3B-02 | Journal detail | Published lookup, external HTTPS link aman | Draft/deleted 404; rel aman | HTTP props test | Open external link | M |
| P3B-08 | P3B-01,02 | Article catalog/backend UI | Search, category, sort, pagination | Published only dan eager loaded | Query count/HTTP tests | Filter/reset | L |
| P3B-09 | P3B-02 | Article detail | Published lookup, sanitized raw rendering, author/category metadata | Script/event attributes tidak aktif | Security/HTTP tests | Rich text fixtures | L |
| P3B-10 | Detail pages | Share component | Web Share API + clipboard fallback + accessible feedback | Unsupported browser tetap dapat copy | Component/helper tests | Mobile/desktop | M |
| P3B-11 | All pages | SEO head | Title, description, canonical, OG | Metadata unik dan absolut | HTML response tests | View source/social preview | M |
| P3B-12 | P3B-11 | Sitemap/robots/breadcrumb/schema | Implementasi prioritas SEO teknis | Hanya URL publik valid | XML/text/schema tests | Validate output | M |
| P3B-13 | P3B-03..12 | Performance | Audit eager loading, query count, payload size, image sizing | No obvious N+1; payload minimal | Query-count tests | Network/Lighthouse baseline | M |
| P3B-14 | All | Phase 3 gate | CI lengkap dan acceptance suite | Semua Definition of Done lulus | Full CI | End-to-end manual scenarios | L |

---

## 17. Automated Test Matrix

### 17.1 Backend feature tests

| Area | Cases |
|---|---|
| Informational routes | Home/Profile/Services/Contact 200; expected Inertia component; public-safe props |
| Visibility | Published past visible; draft, deleted, future publication absent dari index dan 404 pada detail |
| Home | Featured published returned; hidden records excluded; empty database safe; result limits respected |
| Services | Active visible; inactive/deleted hidden; sort order respected; no price prop |
| Book search | Match title; match author; non-match absent; hidden content absent |
| Book filters | Category type, min/max price, year, combinations, reset/default |
| Book sorting | Every whitelist option deterministic; invalid falls back |
| Book pagination | Correct envelope, query retained, out-of-range behavior |
| Book detail | Ordered authors; `isbn_display`; optional nulls; canonical URL |
| Journal | Search/category/sort/pagination; HTTPS URL prop; hidden detail 404 |
| Article | Search/category/sort/pagination; author eager loaded; hidden detail 404 |
| Sanitization | Dangerous script/event/style payload not present in public body |
| Invalid query | Unknown key ignored; malformed numbers safe; long search constrained; invalid category/sort normalized |
| SEO | Title, description, canonical, OG props on all priority pages |
| Sitemap | Valid XML; published URLs included; hidden/admin/filter URLs excluded |
| Robots | Content type, sitemap line, admin disallow |
| Errors | 404 status/component; production-style 500 contains no sensitive detail |

### 17.2 Query and performance tests

- Assert eager-loaded relations for card/detail mappings.
- Add query-count guard for representative catalog/detail routes where stable.
- Ensure pagination does not serialize unneeded model attributes.
- Ensure search/filter indexes from Phase 2 are used where applicable; inspect SQLite query plan only if performance concern appears.

### 17.3 Frontend checks

- TypeScript check.
- Formatter and lint.
- Production build.
- Component/helper tests for share and URL/filter serialization if frontend test harness exists.
- If no component test harness exists, prioritize typed pure helpers plus feature tests and documented manual acceptance. Do not add a large test dependency without justification.

### 17.4 CI command

Jalankan repository-standard CI command. Bila environment lokal tidak menyediakan Node executable, backend checks tetap dijalankan lokal dan full `ci:check` wajib dikonfirmasi pada GitHub Actions sebelum Phase 3 selesai.

---

## 18. Manual Acceptance Scenarios

1. Buka seluruh route publik pada viewport 320px, tablet, dan desktop.
2. Navigasi memakai keyboard saja, termasuk membuka/menutup mobile menu.
3. Gunakan skip link dan verifikasi focus berpindah ke main content.
4. Kosongkan konfigurasi email/social/maps di environment uji dan pastikan tidak ada broken link.
5. Buka Home dengan demo data dan database konten kosong.
6. Cari buku berdasarkan judul dan nama salah satu dari multiple authors.
7. Kombinasikan kategori, min/max price, year, sort, dan pagination.
8. Gunakan browser Back/Forward dan pastikan filter UI mengikuti URL.
9. Masukkan query invalid, angka negatif, sort acak, category tidak dikenal, dan page invalid.
10. Buka detail published Book, Journal, Article.
11. Coba slug draft, deleted, future publication, dan tidak dikenal. Semuanya harus 404.
12. Verifikasi urutan author buku sama dengan CMS pivot order.
13. Verifikasi ISBN tampil persis seperti input admin.
14. Verifikasi optional field kosong tidak meninggalkan label/separator kosong.
15. Hapus atau rename file media di storage dan pastikan fallback image bekerja.
16. Buka external journal URL dan pastikan tab baru serta rel aman.
17. Uji share pada browser mobile yang mendukung Web Share API.
18. Uji copy-link fallback pada desktop dan skenario permission/error.
19. Uji article body dengan heading, list, quote, link, dan payload berbahaya yang telah disanitasi.
20. Inspect title, meta description, canonical, dan Open Graph pada initial response serta navigasi Inertia.
21. Validasi `/sitemap.xml` dan `/robots.txt`.
22. Trigger 404 dan safe 500 pada environment non-production untuk memverifikasi status dan no leakage.
23. Jalankan Lighthouse baseline pada Home, Books Index, Book Detail, dan Article Detail.

---

## 19. Performance Considerations

- Gunakan eager loading untuk author/categories dan hindari lazy loading dalam mapper.
- Batasi featured/latest Home query dengan limit kecil dan eksplisit.
- Pagination default 12, bukan mengambil seluruh dataset.
- Props tidak membawa raw model, audit fields, normalized ISBN internal, status internal yang tidak diperlukan, atau timestamps yang tidak dipakai.
- Cover dan featured image menetapkan dimensions/aspect ratio.
- Gunakan responsive image attributes bila varian image tersedia. Jangan membuat pipeline transform kompleks pada Phase 3 tanpa dukungan storage.
- Hindari rendering seluruh article body di katalog.
- Search `LIKE` SQLite cukup untuk MVP dataset kecil; full-text search bukan scope kecuali profiling membuktikan kebutuhan.
- Debounce search hanya bila UX membutuhkan. Server tetap source of truth.
- Partial reload Inertia boleh digunakan untuk filter katalog setelah correctness dasar selesai.
- Lazy-load image di bawah fold.
- Pantau bundle size dan hindari library baru untuk fitur yang dapat dibuat dengan platform API.
- Lighthouse target mengikuti PRD: Performance >=80, Accessibility/Best Practices/SEO >=90 pada environment representatif.

---

## 20. Risks and Edge Cases

| ID | Risiko/edge case | Dampak | Mitigasi |
|---|---|---|---|
| R3-01 | Draft/deleted ditemukan melalui implicit binding | Kebocoran konten | Published query explicit + 404 tests |
| R3-02 | Future `published_at` terlihat | Pelanggaran lifecycle | Selalu gunakan `scopePublished()` |
| R3-03 | N+1 author/categories | Katalog lambat | Eager loading + query-count test |
| R3-04 | Raw Eloquent membocorkan internal fields | Data exposure dan payload besar | Mapper/DTO allowlist |
| R3-05 | Query invalid menyebabkan 500 | UX buruk | Whitelist dan deterministic normalization |
| R3-06 | Filter UI berbeda dari query server | State membingungkan | Server mengembalikan normalized filters |
| R3-07 | Banyak kombinasi filter diindeks SEO | Duplicate content | Canonical base catalog policy |
| R3-08 | Media path ada tetapi file hilang | Broken layout | Client image fallback + fixed ratio |
| R3-09 | Rich text legacy tidak tersanitasi | XSS | Sanitize persistence + security fixture test; audit existing rows |
| R3-10 | External URL membuka opener context | Security | HTTPS validation + noopener noreferrer |
| R3-11 | Semua channel config kosong | Contact/footer kosong | Conditional rendering + neutral fallback copy |
| R3-12 | Web Share unavailable/rejected | Share gagal | Clipboard fallback dan cancellation handling |
| R3-13 | Pagination ke page di luar range | Empty/confusing response | Tetapkan behavior dan test, prefer paginator standard |
| R3-14 | Multiple authors salah urut | Metadata salah | Gunakan relation order pivot; test order |
| R3-15 | ISBN display null pada legacy row | Detail kehilangan ISBN | Migration Phase 2 harus dijalankan dan backfill diverifikasi |
| R3-16 | Config cache menyimpan env lama | Kanal tidak sinkron | Deployment menjalankan config clear/cache secara benar |
| R3-17 | 500 page memanggil data layer yang gagal | Recursive error | Error page props minimum dan dependency-free |
| R3-18 | Home menjadi terlalu berat | LCP buruk | Batasi section/items, lazy image, payload audit |
| R3-19 | Copy statis profil belum final | Konten tidak akurat | Gunakan hanya PRD/source terkonfirmasi; tandai placeholder deployment |
| R3-20 | Phase 4 behavior masuk terlalu dini | Scope creep | CTA presentational saja; no final tracking/form behavior |

---

## 21. Definition of Done

Phase 3 dianggap selesai jika:

1. Semua halaman dalam scope tersedia: Home, Books Index/Show, Journals Index/Show, Articles Index/Show, Profile, Services, Contact, 404, dan 500.
2. Seluruh route memakai web routes dan Inertia, tanpa REST API publik.
3. Book, Journal, Article public queries selalu published, due, dan non-deleted.
4. Detail draft, deleted, future, atau slug invalid memberikan 404.
5. Services hanya active/non-deleted dan tidak mempunyai price pada props/UI.
6. Filter, sorting, pagination, dan URL state sesuai aturan normalisasi.
7. Multiple author order benar.
8. ISBN menggunakan `isbn_display` persis input admin.
9. Optional values tidak menghasilkan empty labels atau broken controls.
10. Article raw HTML berasal dari sanitized field dan lulus security tests.
11. Journal external link HTTPS dan memakai rel aman.
12. Share menyediakan Web Share API dan copy-link fallback.
13. Semua priority page memiliki title, meta description, canonical, dan Open Graph minimum.
14. Sitemap dan robots tidak membocorkan admin/draft/deleted content.
15. Public layout responsif dan memenuhi accessibility checklist utama.
16. Loading, empty, error, dan image fallback states tersedia.
17. Tidak ada raw Eloquent model pada Inertia props.
18. Tidak ada form Kirim Naskah aktif, final WhatsApp conversion, atau analytics Phase 4 yang diimplementasikan.
19. Automated tests, formatter, lint, typecheck, build, dan CI GitHub lulus.
20. Manual acceptance scenarios kritis telah dijalankan dan didokumentasikan.

---

## 22. Exit Criteria

### 22.1 Phase 3A exit

- Route informational dan shell selesai.
- Configured-channel behavior, errors, fallback image, responsive, dan accessibility dasar lulus.
- CI untuk deliverable 3A hijau.

### 22.2 Phase 3B exit

- Seluruh katalog/detail selesai dan server-authoritative.
- Visibility/security rules lulus.
- Filter/query/SEO/share state lulus.
- Tidak ada N+1 signifikan pada workflow utama.
- CI final hijau.
- Tidak ada blocker terbuka yang memerlukan perubahan arsitektur Phase 0–2.

### 22.3 Handoff ke Phase 4

Handoff Phase 3 harus menyediakan:

- route dan detail page stabil untuk target CTA;
- reusable CTA component interface;
- canonical URL untuk share/tracking;
- configured-channel state;
- titik integrasi event tanpa event production aktif;
- daftar kebutuhan Form Kirim Naskah dan WhatsApp conversion yang sengaja ditunda.

---

## 23. PRD Traceability Matrix

| Requirement | Phase 3 coverage | Task/gate |
|---|---|---|
| US-01 menemukan buku | Search/filter/sort/pagination Books Index | P3B-01,03,04 |
| US-02 melihat detail buku | Book Detail, authors, metadata, SEO | P3B-05,11 |
| US-03 pemesanan buku | Interface CTA saja; conversion ditunda Phase 4 | Handoff Phase 4 |
| US-04 membagikan buku | Web Share + copy fallback | P3B-10 |
| US-05 menemukan jurnal | Journal catalog/detail dan external link | P3B-06,07 |
| US-06 membaca artikel | Article catalog/detail dan sanitized body | P3B-08,09 |
| US-07 kirim naskah | Explicit non-goal Phase 3 | Phase 4 |
| US-08 memahami layanan | Active services page, no price | P3A-07 |
| US-09 kontak/profil | Profile, Contact, configured channels | P3A-01,05,06 |
| FR-M01 | Semua halaman Phase 3 kecuali Kirim Naskah yang ditunda sesuai prompt | P3A/P3B gates |
| FR-M02 | Full book catalog discovery | P3B-01,03,04 |
| FR-M03 | Public book metadata dan multiple authors | P3B-02,05 |
| FR-M04 | Komponen/props readiness saja | Phase 4 handoff |
| FR-M05 | Share behavior | P3B-10 |
| FR-M06 | Journal metadata dan external URL | P3B-06,07 |
| FR-M07 | Article rich text, kategori, published status | P3B-08,09 |
| FR-M08 | Tidak diaktifkan pada Phase 3 | Phase 4 |
| FR-M09 | Services tanpa harga | P3A-07 |
| FR-M10 | Source/config dan env public channels | P3A-01,05 |
| FR-M13 | Published dan non-deleted only | Semua public queries/tests |
| FR-M15 | Title, description, canonical, OG | P3B-11 |
| FR-S01 | Featured Home sections | P3A-08 |
| FR-S03 | Sitemap, robots, breadcrumb, structured data | P3B-12 |
| NFR accessibility | Semantic shell, keyboard, contrast, responsive | P3A-03,04,11; Bagian 14 |
| NFR performance | Pagination, eager loading, minimal props, images | P3B-13; Bagian 19 |
| Security | Sanitized HTML, secure external links, no raw models | P3B-02,07,09 |

---

## Final Status

Seluruh prerequisite utama tersedia dari Phase 1 dan Phase 2: authentication/admin terpisah, domain models, publication scope, soft delete, rich-text sanitization, category relations, author ordering, media paths, service activation, dan public configuration foundation.

Tidak ada open decision yang memblokir dimulainya Phase 3. Copy profil dan metadata global yang belum final harus memakai nilai terkonfirmasi atau placeholder deployment yang jelas, tanpa mengarang fakta organisasi.

# READY FOR IMPLEMENTATION
