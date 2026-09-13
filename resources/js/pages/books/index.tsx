import { BooksIndexPage } from '@/new-ui/pages/Books/Index'
import { useInertiaNavigation } from '@/new-ui/inertia-adapters'
import { toBookIndexProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { BookFilters, CategoryOption, Paginated, BookCard, SeoProps } from '@/types'

export default function BooksIndex({ seo, books, filters, categories, filterOptions }: { seo: SeoProps; books: Paginated<BookCard>; filters: BookFilters; categories: CategoryOption[]; filterOptions?: { years: number[]; priceBounds: { min: number; max: number } } }) {
    const navigation = useInertiaNavigation()
    return <BooksIndexPage {...toBookIndexProps(books, filters, categories, useBackendSharedProps(), filterOptions)} navigation={navigation} />
}
