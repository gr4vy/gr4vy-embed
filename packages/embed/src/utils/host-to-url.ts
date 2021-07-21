export const hostToUrl = (host: string): string => {
  // default to a https host
  const url = new URL(`https://${host}`)

  // switch the scheme to http only for localhost
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }

  return url.toString().replace(/\/$/, '')
}
