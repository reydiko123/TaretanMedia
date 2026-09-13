export type ShareDependencies = {
  share?: (data: ShareData) => Promise<void>
  writeText?: (text: string) => Promise<void>
  writeClipboard?: (text: string) => Promise<void>
}

export type ShareNewsInput = {
  title: string
  text: string
  url: string
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed"

function getDefaultDependencies(): ShareDependencies {
  if (typeof navigator === "undefined") return {}

  return {
    share: typeof navigator.share === "function" ? navigator.share.bind(navigator) : undefined,
    writeText: typeof navigator.clipboard?.writeText === "function"
      ? navigator.clipboard.writeText.bind(navigator.clipboard)
      : undefined,
  }
}

function getClipboardWriter(dependencies: ShareDependencies) {
  return dependencies.writeClipboard ?? dependencies.writeText
}

export async function shareOrCopy(
  input: { title: string; url: string },
  dependencies: ShareDependencies = getDefaultDependencies(),
): Promise<"shared" | "copied" | "failed"> {
  if (dependencies.share) {
    try {
      await dependencies.share({ title: input.title, url: input.url })
      return "shared"
    } catch {
      // Fall through to clipboard for unsupported, cancelled, or failed share attempts.
    }
  }

  const writeClipboard = getClipboardWriter(dependencies)
  if (writeClipboard) {
    try {
      await writeClipboard(input.url)
      return "copied"
    } catch {
      // The caller exposes the manual URL fallback for this result.
    }
  }

  return "failed"
}

export async function shareOrCopyNews(
  input: ShareNewsInput,
  dependencies: ShareDependencies = getDefaultDependencies(),
): Promise<ShareResult> {
  if (dependencies.share) {
    try {
      await dependencies.share(input)
      return "shared"
    } catch (error) {
      if (error && typeof error === "object" && "name" in error && error.name === "AbortError") return "cancelled"
    }
  }

  const writeClipboard = getClipboardWriter(dependencies)
  if (writeClipboard) {
    try {
      await writeClipboard(input.url)
      return "copied"
    } catch {
      return "failed"
    }
  }

  return "failed"
}
