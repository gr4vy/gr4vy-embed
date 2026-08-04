/**
 * The origin of the top-level page, which is not always the origin of the page
 * that called `setup()`.
 *
 * Wallets validate against the *top-level* document's domain, not the frame that
 * asks for a session: Apple Pay checks it as the merchant session's
 * `initiativeContext`. When a merchant embeds their own checkout page inside an
 * iframe, `document.location` is that inner frame, so sending it makes Apple
 * reject the payment — and it rejects late, once the shopper has already
 * authorized on their device, while the merchant-session call itself still
 * succeeds.
 *
 * `location.ancestorOrigins` is WebKit/Chromium-only, which covers the engines
 * that run Apple Pay. Elsewhere we fall back to the referrer (the embedding
 * document's URL) and finally to our own origin, so a page that isn't framed —
 * the overwhelmingly common case — always resolves to exactly what it did
 * before.
 */
const originOf = (url: string): string | undefined => {
  try {
    return new URL(url).origin
  } catch {
    return undefined
  }
}

export const resolveTopLevelUrl = (): string => {
  const ownOrigin = `${document.location.protocol}//${document.location.host}`

  // Not framed: this document is the top level.
  if (window.top === window.self) {
    return ownOrigin
  }

  // Ordered nearest-to-furthest, so the last entry is the top-level page even
  // when frames are nested more than one deep.
  const ancestors = window.location.ancestorOrigins
  if (ancestors?.length) {
    const outermost = originOf(ancestors[ancestors.length - 1])
    if (outermost) {
      return outermost
    }
  }

  // No ancestorOrigins (Firefox): the referrer is the embedding document. Only
  // accurate for a single level of nesting, and empty under a strict referrer
  // policy — in both cases prefer our own origin over sending nothing, and let
  // the merchant override it with `topLevelUrl`.
  return originOf(document.referrer) ?? ownOrigin
}
