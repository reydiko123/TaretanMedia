import { BookShowPage } from '@/new-ui/pages/Books/Show'
import { toBookDetail, toShellProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { BookDetail, SeoProps } from '@/types'

export default function BooksShow({ seo, book }: { seo: SeoProps; book: BookDetail }) {
    const shared = useBackendSharedProps()
    const whatsapp = shared.site?.conversion?.whatsapp
    return <BookShowPage {...toShellProps(shared)} book={toBookDetail(book)} canonicalUrl={seo.canonicalUrl} whatsapp={{ number: whatsapp?.number ?? '', messageTemplate: whatsapp?.templates.book ?? '' }} />
}
