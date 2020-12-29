// Converts a iframeHost to a full URL with a scheme
export const frameSource = ({ channel, iframeHost }): string => {
  const url = new URL(`https://${iframeHost}`)

  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  url.searchParams.set(
    `parentHost`,
    `${document?.location?.protocol}//${document?.location?.host}`
  )
  url.searchParams.set(`channel`, channel)
  return String(url)
}
