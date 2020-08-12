export const frameUrl = ({
  iframeHost
}) => {
  const url = new URL(`https://${iframeHost}`)
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  return String(url)
}