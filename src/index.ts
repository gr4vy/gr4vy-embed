import FormNapper from 'form-napper'
import { v4 as uuid } from 'uuid'
import Emitter from './Emitter'
import Logger from './Logger'
import { frameSource } from './frameSource'
import { Config, InternalConfig } from './types'
import { validateConfig } from './validation'

let loaded = false
let frame = null
let form = null
let logger = null
let emitter = null

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
const setup = (config: Config) => {
  if (validateConfig(config)) {
    const container: HTMLElement = document.querySelector(config.element)
    const formContainer: HTMLElement = document.querySelector(config.form)
    const channel: string = uuid()
    const iframeUrl = frameSource({ channel, iframeHost: config.iframeHost })

    setupFrame({ ...config, container, formContainer, iframeUrl, channel })
  }
}

export const setupFrame = (config: InternalConfig) => {
  initFrame(config)
  initForm(config)
  initEmitter(config)
  appendFrame(config)
}
// Initialized the emitter, which listens and sends events to the iframe.
const initEmitter = (config: InternalConfig) => {
  const { channel, debug, iframeUrl, onEvent } = config

  logger = new Logger(debug)
  emitter = new Emitter({ logger, channel, iframeUrl })

  // wait for a frameReady message and then send the iframe the config provided
  // by the merchant
  emitter.on(`frameReady`, () => emitter.updateOptions(config))
  // wait for a formLoaded message and then set the form to have loaded
  emitter.on(`formLoaded`, () => {
    loaded = true
    frame.style.visibility = 'unset'
  })
  // listen for resize events and resize the iframe to match the size of the content
  emitter.on(`resize`, (dim) => (frame.style.height = `${dim.frame.height}px`))

  // allow the component user to subscribe to cross-frame events by providing
  // an onEvent handler
  emitter.subscribe(`formUpdate`, onEvent)
  emitter.subscribe(`resourceCreated`, onEvent)
  emitter.subscribe(`apiError`, onEvent)

  // listen to a hijacked form and use it to trigger a form submission
  form.hijack(() => emitter.submitForm())

  // listen to the transactionCreated event and insert the transaction ID and
  // submit the form
  emitter.on(`transactionCreated`, ({ data }) => {
    form.inject(`gr4vy_transaction_id`, data.id)
    form.submit()
  })
}

const initForm = (config: InternalConfig) => {
  if (!config.formContainer) {
    return
  }

  // initialize formnapper bind it to the form element
  form = new FormNapper(config.formContainer)
}

// Initialized the frame but does not attach it yet
const initFrame = (config: InternalConfig) => {
  frame = document.createElement('iframe')
  frame.src = config.iframeUrl
  frame.title = 'Secure payment frame - Gr4vy'
  frame.style.visibility = 'hidden'

  frame.style.width = '100%'
  frame.style.height = '100%'
  frame.style.border = '0'
  frame.style.overflow = 'hidden'

  // deprecated fields set for backwards compatibility
  frame.setAttribute('frameBorder', '0')
  frame.setAttribute('scrolling', 'no')
}

// Appends the frame to the page
const appendFrame = (config: InternalConfig) => {
  config.container.appendChild(frame)

  // set a timeout to check if the form loaded
  setTimeout(() => {
    if (!loaded) {
      config.onEvent(`timeoutError`, { message: `Embedded form timed out` })
    }
  }, config.timeout || 2000)
}

export { setup }
