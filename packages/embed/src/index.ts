import FormNapper from 'form-napper'
import Emitter from './Emitter_'
import Logger from './Logger_'
import { Config, InternalConfig } from './types'
import { validateConfig } from './validation'

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export const setup = (config: Config) => {
  // exit early if the config is not valid
  if (!validateConfig(config)) {
    return
  }

  // set up the additional config
  const container: HTMLElement = document.querySelector(config.element)
  const formContainer: HTMLElement = document.querySelector(config.form)
  const channel: string = createChannel()
  const iframeUrl: URL = frameSource({ channel, config })

  // bind the new iframe
  setupFrame({ ...config, container, formContainer, iframeUrl, channel })
}

// Creates the iframe, attaches to any <form> on the page, and initializes the
// framebus connection
const setupFrame = (config: InternalConfig) => {
  config.frame = initFrame(config)
  config.form = initForm(config)
  config.logger = initLogger(config)
  config.emitter = initEmitter(config)

  appendFrame(config)
  setTimeoutListener(config)
}

// Create a random channel ID for this connection
const createChannel = (): string =>
  window.crypto.getRandomValues(new Uint32Array(3)).join('')

// Converts a iframeHost to a full URL with a scheme
const frameSource = ({
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

// Initialize the logger
const initLogger = (config: InternalConfig): Logger => {
  return new Logger(config.debug)
}

// Initialize the emitter, which listens and sends events to the iframe using framebus
const initEmitter = (config: InternalConfig): Emitter => {
  const emitter = new Emitter(config)

  // wait for a frameReady message and then send the iframe the config provided
  // by the merchant
  emitter.on(`frameReady`, () => emitter.updateOptions(config))

  // wait for a formLoaded message and then set the form to have loaded
  emitter.on(`formLoaded`, () => {
    config.loaded = true
    config.frame.style.visibility = 'unset'
  })

  // listen for resize events and resize the iframe to match the size of the content
  emitter.on(
    `resize`,
    (dimension) => (config.frame.style.height = `${dimension.frame.height}px`)
  )

  // allow the component user to subscribe to cross-frame events by providing
  // an onEvent handler
  emitter.subscribe(`formUpdate`, config.onEvent)
  emitter.subscribe(`resourceCreated`, config.onEvent)
  emitter.subscribe(`apiError`, config.onEvent)

  // listen to a hijacked form and use it to trigger a form submission
  config.formNapper.hijack(() => emitter.submitForm())

  // listen to the transactionCreated event and insert the transaction ID and
  // submit the form
  emitter.on(`transactionCreated`, ({ data }) => {
    config.formNapper.inject(`gr4vy_transaction_id`, data.id)
    config.formNapper.submit()
  })

  return emitter
}

// initialize formnapper, binding it to the form element
const initForm = (config: InternalConfig): FormNapper => {
  if (config.formContainer) {
    return new FormNapper(config.formContainer)
  }
}

// Initialize the frame but do not attach it to the page yet
const initFrame = (config: InternalConfig) => {
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

// Appends the frame to the page
const appendFrame = (config: InternalConfig) => {
  config.container.appendChild(config.frame)
}

// Set a timer to throw a timeoutError event when the frame takes too long to load.
const setTimeoutListener = (config: InternalConfig): void => {
  setTimeout(() => {
    if (!config.loaded) {
      config.onEvent(`timeoutError`, { message: `Embedded form timed out` })
    }
  }, config.timeout || 2000)
}
