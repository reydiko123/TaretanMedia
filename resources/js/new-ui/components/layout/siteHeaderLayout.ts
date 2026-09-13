const INITIAL_MAX_WIDTH = "70rem"
const SCROLLED_MAX_WIDTH = "64rem"

export function getHeaderMaxWidth(hasScrolled: boolean) {
  return hasScrolled ? SCROLLED_MAX_WIDTH : INITIAL_MAX_WIDTH
}
