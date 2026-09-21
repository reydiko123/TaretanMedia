import { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import type { PublicNavigation } from '@/new-ui/app/navigation'
import type {
    ArticleCard as BackendArticleCard,
    ArticleDetail as BackendArticleDetail,
    BookCard as BackendBookCard,
    BookDetail as BackendBookDetail,
    BookFilters as BackendBookFilters,
    BookFilterOptions as BackendBookFilterOptions,
    CatalogFilters as BackendCatalogFilters,
    JournalCard as BackendJournalCard,
    JournalDetail as BackendJournalDetail,
    JournalFilterOptions as BackendJournalFilterOptions,
    Paginated as BackendPaginated,
    PublicService as BackendService,
    PublicSharedProps,
    SeoProps,
} from '@/types'
import type {
    BookCard,
    BookDetail,
    CatalogPage,
    CategoryOption,
    ImageAsset,
    JournalCard,
    NewsCardData,
    NewsDetail,
    NewsFilters,
    PublicShellProps,
} from '@/new-ui/types/public'
import type { BookFilterOptions, BooksIndexProps } from '@/new-ui/types/catalog'
import type { JournalsIndexProps, JournalDetail } from '@/new-ui/types/journal'
import type { ProfileProps } from '@/new-ui/pages/Profile/profileTypes'
import type { ServicesPageProps } from '@/new-ui/pages/Services/servicesTypes'
import type { ContactProps } from '@/new-ui/pages/Contact/contactTypes'
import type { NewsIndexProps, ManuscriptCreateProps } from '@/new-ui/types/public'

export function useInertiaNavigation(): PublicNavigation {
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(() => {
        const removeStart = router.on('start', () => setIsNavigating(true))
        const removeFinish = router.on('finish', () => setIsNavigating(false))
        return () => {
            removeStart()
            removeFinish()
        }
    }, [])

    return {
        visit: (href, options) => router.visit(href, options),
        isNavigating,
    }
}

export function useBackendSharedProps(): Partial<PublicSharedProps> {
    return usePage().props as unknown as Partial<PublicSharedProps>
}

export function toImage(src: string | null | undefined, alt: string): ImageAsset | null {
    return src ? { src, alt } : null
}

function toCategory(category: { name: string; slug: string }, index: number): CategoryOption {
    return { id: index + 1, name: category.name, slug: category.slug }
}

export function toBookCard(book: BackendBookCard): BookCard {
    return {
        title: book.title,
        slug: book.slug,
        cover: toImage(book.coverUrl, `Sampul buku ${book.title}`),
        authors: book.authors,
        categories: book.categories.map((category) => category.name),
        price: book.price,
        publicationYear: book.publicationYear ?? 0,
        isbn: 'isbn' in book && typeof book.isbn === 'string' ? book.isbn : null,
    }
}

export function toBookDetail(book: BackendBookDetail): BookDetail {
    return {
        ...toBookCard(book),
        id: 0,
        publisher: book.publisher ?? '',
        pageCount: book.pageCount,
        synopsis: book.synopsis,
        tableOfContents: book.tableOfContents,
        authors: book.authors.map((name, index) => ({ id: index + 1, name })),
        categories: book.categories.map(toCategory),
        publishedAt: book.publishedAt,
    }
}

export function toJournalCard(journal: BackendJournalCard): JournalCard {
    return {
        title: journal.title,
        slug: journal.slug,
        theme: journal.theme ?? '',
        editionLabel: journal.editionLabel,
        publicationYear: journal.publicationYear ?? 0,
        cover: toImage(journal.coverUrl, `Sampul jurnal ${journal.title}`),
    }
}

export function toJournalDetail(journal: BackendJournalDetail): JournalDetail {
    return {
        ...toJournalCard(journal),
        id: 0,
        description: journal.description,
        externalUrl: journal.externalUrl,
        categories: journal.categories.map(toCategory),
    }
}

export function toNewsCard(article: BackendArticleCard): NewsCardData {
    return {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        featuredImage: toImage(article.featuredImageUrl, `Ilustrasi berita ${article.title}`),
        authorName: article.author.name,
        categories: article.categories.map((category) => category.name),
        publishedAt: article.publishedAt,
    }
}

export function toNewsDetail(article: BackendArticleDetail): NewsDetail {
    return {
        ...toNewsCard(article),
        id: 0,
        bodyHtml: article.bodyHtml,
        author: { id: 0, name: article.author.name },
    }
}

function toPage<TBackend, TFrontend>(page: BackendPaginated<TBackend>, map: (value: TBackend) => TFrontend): CatalogPage<TFrontend> {
    return {
        data: page.data.map(map),
        pagination: {
            currentPage: page.currentPage,
            lastPage: page.lastPage,
            total: page.total,
            perPage: page.perPage,
            from: page.from,
            to: page.to,
        },
    }
}

function toSort(sort: string): 'latest' | 'oldest' | 'price_asc' | 'price_desc' | 'title' {
    if (sort === 'newest') return 'latest'
    if (sort === 'title_asc') return 'title'
    return sort as 'latest' | 'oldest' | 'price_asc' | 'price_desc' | 'title'
}

export function toBookIndexProps(books: BackendPaginated<BackendBookCard>, filters: BackendBookFilters, categories: Array<{ name: string; slug: string }>, shared: Partial<PublicSharedProps>, backendFilterOptions?: BackendBookFilterOptions): BooksIndexProps {
    const years = backendFilterOptions?.years ?? [...new Set(books.data.map((book) => book.publicationYear).filter((year): year is number => year !== null))].sort((a, b) => b - a)
    const prices = books.data.map((book) => book.price).filter((price) => Number.isFinite(price))
    return {
        ...toShellProps(shared),
        books: toPage(books, toBookCard),
        filters: { q: filters.search, category: filters.category, minPrice: filters.minPrice, maxPrice: filters.maxPrice, year: filters.year, hasIsbn: filters.hasIsbn ?? null, sort: toSort(filters.sort) },
        filterOptions: {
            categories: categories.map((category, index) => toCategory(category, index)),
            years,
            priceBounds: backendFilterOptions?.priceBounds ?? { min: prices.length ? Math.min(...prices) : 0, max: prices.length ? Math.max(...prices) : 1_000_000 },
        },
    }
}

export function toJournalIndexProps(journals: BackendPaginated<BackendJournalCard>, filters: BackendCatalogFilters, categories: Array<{ name: string; slug: string }>, shared: Partial<PublicSharedProps>, backendFilterOptions?: BackendJournalFilterOptions): JournalsIndexProps {
    const years = backendFilterOptions?.years ?? [...new Set(journals.data.map((journal) => journal.publicationYear).filter((year): year is number => year !== null))].sort((a, b) => b - a)
    return {
        ...toShellProps(shared),
        journals: toPage(journals, toJournalCard),
        filters: { q: filters.search, category: filters.category, year: (filters as BackendCatalogFilters & { year?: number | null }).year ?? null },
        filterOptions: { categories: categories.map((category, index) => toCategory(category, index)), years },
    }
}

export function toNewsIndexProps(articles: BackendPaginated<BackendArticleCard>, filters: BackendCatalogFilters, categories: Array<{ name: string; slug: string }>, shared: Partial<PublicSharedProps>): NewsIndexProps {
    return {
        ...toShellProps(shared),
        news: toPage(articles, toNewsCard),
        filters: { q: filters.search, category: filters.category },
        filterOptions: { categories: categories.map((category, index) => toCategory(category, index)) },
    }
}

export function toShellProps(shared: Partial<PublicSharedProps>): PublicShellProps {
    const site = shared.site
    const contact = site?.contact
    const whatsapp = site?.conversion?.whatsapp
    return {
        site: { name: site?.name ?? 'CV Taretan Media Publishing', tagline: site?.tagline ?? '', shortDescription: site?.tagline ?? '', about: null, vision: null, mission: [], values: [] },
        contact: { whatsappNumber: whatsapp?.number ?? null, whatsappLabel: whatsapp?.number ? 'WhatsApp CV Taretan Media Publishing' : null, whatsappGreeting: whatsapp?.templates.contact ?? null, email: contact?.email ?? null, instagramUrl: contact?.instagramUrl ?? null, mapUrl: contact?.mapsUrl ?? null, address: contact?.address ?? null },
    }
}

export function toProfileProps(profile: { summary?: string; vision?: string; mission?: string[]; values?: string[] }, shared: Partial<PublicSharedProps>): ProfileProps {
    const descriptions: Record<string, string> = {
        Kualitas: 'Karya ilmiah dikembangkan, disiapkan, dan diterbitkan dengan standar profesional yang terjaga.',
        'Integritas Akademik': 'Proses publikasi dijalankan dengan kejujuran dan etika akademik yang konsisten.',
        Profesionalisme: 'Pendampingan dan penerbitan dilakukan secara profesional dari naskah hingga terbit.',
        Kemitraan: 'CV Taretan Media Publishing menjadi mitra terpercaya bagi penulis dalam menerbitkan karyanya.',
        Kolaborasi: 'Kami membangun proses penerbitan melalui kerja sama yang terbuka dan saling menguatkan.',
        Aksesibilitas: 'Pengetahuan dan publikasi dibuat lebih mudah dijangkau oleh pembaca yang lebih luas.',
        Integritas: 'Setiap proses penerbitan dijalankan secara jujur, bertanggung jawab, dan beretika.',
    }
    return { ...toShellProps(shared), profile: { about: profile.summary ?? '', vision: profile.vision ?? '', mission: profile.mission ?? [], values: (profile.values ?? []).map((value) => ({ title: value, description: descriptions[value] ?? 'Kami menjaga kualitas proses penerbitan dengan penuh tanggung jawab.' })) } }
}

export function toServicesProps(services: BackendService[], shared: Partial<PublicSharedProps>): ServicesPageProps {
    const whatsapp = shared.site?.conversion?.whatsapp
    return { ...toShellProps(shared), services: services.map((service, index) => ({ id: index + 1, name: service.name, slug: (service as BackendService & { slug?: string }).slug ?? `layanan-${index + 1}`, summary: service.summary ?? '', description: service.description ?? '', features: service.features ?? [], ctaLabel: 'Hubungi Kami', price: service.price })), whatsapp: { number: whatsapp?.number ?? '', messageTemplate: whatsapp?.templates.service ?? '' } }
}

export function toContactProps(shared: Partial<PublicSharedProps>, seo: SeoProps): ContactProps {
    return { ...toShellProps(shared), contact: { ...toShellProps(shared).contact, heading: 'Hubungi Kami', description: seo.description } }
}

export function toManuscriptProps(shared: Partial<PublicSharedProps>): ManuscriptCreateProps {
    const whatsapp = shared.site?.conversion?.whatsapp
    const publicationTypes = (whatsapp?.publicationTypes ?? []).map((label) => ({ value: label, label }))
    return { ...toShellProps(shared), publicationTypes, whatsapp: { number: whatsapp?.number ?? '', messageTemplate: whatsapp?.templates.manuscript ?? '' }, privacyNotice: { text: 'Dengan melanjutkan, Anda memahami bahwa informasi awal naskah akan digunakan untuk kebutuhan konsultasi penerbitan.', privacyPolicyUrl: '/privasi' }, alternativeContact: shared.site?.contact?.email ? { type: 'email', label: 'Hubungi melalui email', href: `mailto:${shared.site.contact.email}` } : null }
}
