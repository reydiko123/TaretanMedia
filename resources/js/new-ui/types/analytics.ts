export type NewsShareEvent = {
  name: "share_click"
  payload: {
    contentType: "news"
    identifier: string
    method: "native" | "clipboard" | "manual"
  }
}

export type AnalyticsEvent = {
  name: "journal_external_click"
  payload: { journalSlug: string }
} | NewsShareEvent

export type TrackEvent = (event: AnalyticsEvent) => void

export type TrackNewsEvent = (event: NewsShareEvent) => void
