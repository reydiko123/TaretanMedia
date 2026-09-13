import { BookShowPage } from '@/new-ui/pages/Books/Show'
import { toBookCard, toBookDetail, toShellProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { BookCard, BookDetail, SeoProps } from '@/types'

export default function BooksShow({ seo, book, relatedBooks = [] }: { seo: SeoProps; book: BookDetail; relatedBooks?: BookCard[] }) {
    const shared = useBackendSharedProps()
    const whatsapp = shared.site?.conversion?.whatsapp
    return <BookShowPage {...toShellProps(shared)} book={toBookDetail(book)} relatedBooks={relatedBooks.map(toBookCard)} canonicalUrl={seo.canonicalUrl} whatsapp={{ number: whatsapp?.number ?? '', messageTemplate: whatsapp?.templates.book ?? '' }} />
}
