import { frameHeight$, optionsLoaded$ } from '../subjects'

export const createFrameController = (
  frame: HTMLIFrameElement,
  iframeUrl: URL
) => {
  const _frame = frame

  // default style
  _frame.src = iframeUrl.toString()
  _frame.title = 'Secure payment frame - Gr4vy'
  _frame.style.visibility = 'hidden'
  _frame.style.display = 'none'
  _frame.style.width = '100%'
  _frame.style.height = '0px'
  _frame.style.border = '0'
  _frame.style.overflow = 'hidden'

  // deprecated fields
  _frame.setAttribute('frameBorder', '0')
  _frame.setAttribute('scrolling', 'no')

  frameHeight$.subscribe((height) => {
    if (_frame.style.visibility === 'unset') {
      _frame.style.height = `${height}px`
    }
  })

  optionsLoaded$.subscribe(() => {
    _frame.style.visibility = 'unset'
    _frame.style.display = 'unset'
  })
}

export const getFrameUrl = ({
  channel,
  config: { iframeHost },
}: {
  channel: string
  config: { iframeHost: string }
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
  return url
}
