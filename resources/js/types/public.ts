export type PublicNavigationItem = {
    label: string;
    href: string;
};

export type PublicSiteContact = {
    email: string | null;
    whatsappConfigured: boolean;
    instagramUrl: string | null;
    mapsUrl: string | null;
    address?: string | null;
};

export type PublicConversion = {
    whatsapp: import('@/lib/whatsapp').WhatsAppConfig;
    analytics: { enabled: boolean; endpoint: string | null };
};

export type PublicSite = {
    name: string;
    tagline: string;
    contact: PublicSiteContact;
    conversion?: PublicConversion;
};

export type PublicSharedProps = {
    site: PublicSite;
    navigation: PublicNavigationItem[];
};

export type SeoProps = {
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

export type CategoryOption = {
    name: string;
    slug: string;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

export type CatalogFilters = {
    search: string;
    category: string | null;
    sort: string;
};

export type BookFilters = CatalogFilters & {
    minPrice: number | null;
    maxPrice: number | null;
    year: number | null;
};

export type BookCard = {
    title: string;
    slug: string;
    coverUrl: string | null;
    authors: string[];
    categories: CategoryOption[];
    price: number;
    formattedPrice: string;
    publicationYear: number | null;
};

export type BookDetail = BookCard & {
    isbn: string | null;
    publisher: string | null;
    pageCount: number | null;
    synopsis: string | null;
    tableOfContents: string | null;
    publishedAt: string;
};

export type JournalCard = {
    title: string;
    slug: string;
    coverUrl: string | null;
    theme: string | null;
    editionLabel: string | null;
    publicationYear: number | null;
    categories: CategoryOption[];
};

export type JournalDetail = JournalCard & {
    description: string | null;
    externalUrl: string;
    publishedAt: string;
};

export type ArticleCard = {
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImageUrl: string | null;
    author: { name: string };
    categories: CategoryOption[];
    publishedAt: string;
};

export type ArticleDetail = ArticleCard & {
    bodyHtml: string;
};

export type PublicService = {
    name: string;
    price: number;
    formattedPrice: string;
    summary: string | null;
    description: string | null;
    features: string[];
    ctaLabel: string | null;
};

export type PublicBreadcrumbItem = {
    label: string;
    href?: string;
};
