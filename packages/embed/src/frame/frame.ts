import { SubjectManager } from '../subjects'
import { Config } from '../types'

export const createFrameController = (
  frame: HTMLIFrameElement,
  iframeUrl: URL,
  subject: SubjectManager
) => {
  // default style
  frame.src = iframeUrl.toString()
  frame.title = 'Secure payment frame - Gr4vy'
  frame.style.visibility = 'hidden'
  frame.style.display = 'none'
  frame.style.width = '100%'
  frame.style.height = '0px'
  frame.style.border = '0'
  frame.style.overflow = 'hidden'

  // deprecated fields
  frame.setAttribute('frameBorder', '0')
  frame.setAttribute('scrolling', 'no')

  subject.frameHeight$.subscribe((height) => {
    if (frame.style.visibility === 'unset') {
      frame.style.height = `${height}px`
    }
  })

  subject.optionsLoaded$.subscribe(() => {
    frame.style.visibility = 'unset'
    frame.style.display = 'unset'
  })
}

export const getFrameUrl = ({
  channel,
  config: { iframeHost, theme },
}: {
  channel: string
  config: Pick<Config, 'theme' | 'iframeHost'>
}): URL => {
  // default to a https host
  const url = new URL(`https://${iframeHost}`)

  // switch the scheme to http only for localhost
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  // add the parentHost and channel query params
  const parentHost = `${document.location.protocol}//${document.location.host}`
  url.searchParams.set(`parentHost`, parentHost)
  url.searchParams.set(`channel`, channel)

  // add the font for preloading
  if (theme?.fonts?.body) {
    url.searchParams.set(`font`, encodeURIComponent(theme.fonts.body))
  }

  return url
}
