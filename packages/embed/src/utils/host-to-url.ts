export const hostToUrl = (host: string, secure: boolean = true): string => {
  // default to a https host
  const url = new URL(`https://${host}`)

  if (!secure) {
    url.protocol = `http`
  }

  return url.toString().replace(/\/$/, '')
}
