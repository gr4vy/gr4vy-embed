import { initEmitter } from './emitter'
import { initFormNapper } from './form'
import { Config, InternalConfig } from './types'

// Creates the iframe, attaches to any <form> on the page, and initializes the
// framebus connection
export const setupFrame = (config: InternalConfig) => {
  const frame = initFrame(config)
  const form = initFormNapper(config)

  initEmitter(form, frame, config)
  attachFrame(frame, config)
  setTimeoutListener(config)
}

// Initialize the frame but do not attach it to the page yet
export const initFrame = (config: InternalConfig) => {
  const frame = document.createElement('iframe')
  frame.src = config.iframeUrl.toString()
  frame.title = 'Secure payment frame - Gr4vy'

  // add the default style of the frame
  frame.style.visibility = 'hidden'
  frame.style.width = '100%'
  frame.style.height = '100px'
  frame.style.border = '0'
  frame.style.overflow = 'hidden'

  // deprecated fields set for backwards compatibility
  frame.setAttribute('frameBorder', '0')
  frame.setAttribute('scrolling', 'no')

  return frame
}

// Converts a iframeHost to a full URL with a scheme
export const getFrameUrl = ({
  channel,
  config,
}: {
  channel: string
  config: Config
}): URL => {
  // default to a https host
  const url = new URL(`https://${config.iframeHost}`)

  // switch the scheme to http only for localhost
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  // add the parentHost and channel query params
  const parentHost = `${document?.location?.protocol}//${document?.location?.host}`
  url.searchParams.set(`parentHost`, parentHost)
  url.searchParams.set(`channel`, channel)
  return url
}

// Appends the frame to the page
export const attachFrame = (frame: HTMLElement, config: InternalConfig) => {
  config.element.appendChild(frame)
}

// Set a timer to throw a timeoutError event when the frame takes too long to load.
export const setTimeoutListener = (config: InternalConfig): void => {
  setTimeout(() => {
    if (!config.loaded) {
      config.onEvent(`timeoutError`, { message: `Embedded form timed out` })
    }
  }, config.timeout || 2000)
}
