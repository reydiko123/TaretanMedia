import { HomePage } from '@/new-ui/pages/Home/Index'
import type { ArticleCard, BookCard, JournalCard, SeoProps } from '@/types'

type HomeProps = {
    seo: SeoProps
    books?: BookCard[]
    journals?: JournalCard[]
    articles?: ArticleCard[]
}

export default function Home(props: HomeProps) {
    return <HomePage books={props.books} journals={props.journals} articles={props.articles} />
}
