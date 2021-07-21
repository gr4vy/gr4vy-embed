import Framebus from 'framebus'
import { createEmitter } from './emitter'
import { createFormController } from './form'
import { createFrameController } from './frame'
import { createOverlayController } from './overlay'
import { createPopupController } from './popup'
import { createSkeletonController } from './skeleton'
import { createSubjectManager } from './subjects'
import { SetupConfig, Config } from './types'
import {
  appendUrlParams,
  generateChannelId,
  hostToUrl,
  mutableRef,
} from './utils'
import { validate } from './validation'

// Map of cleanup callbacks
const cleanup = new Map<string, () => void>()

// Stores of count of unique embed instances
let embedId = 0

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export function setup(setupConfig: SetupConfig): void {
  const { gr4vyId, onComplete, ...rest } = setupConfig

  const channel = generateChannelId()
  const iframeHost = gr4vyId
    ? `embed.${gr4vyId}.gr4vy.app`
    : setupConfig.iframeHost
  const apiHost = gr4vyId ? `api.${gr4vyId}.gr4vy.app` : setupConfig.apiHost

  const config: Config = {
    store: 'ask',
    display: 'all',
    apiHost,
    apiUrl: hostToUrl(apiHost),
    iframeHost,
    iframeUrl: hostToUrl(iframeHost),
    ...rest,
  }

  // exit early if the config is not valid
  if (!validate(config)) {
    return
  }

  // set up the additional config
  if (!(config.element instanceof Element)) {
    config.element = document.querySelector(config.element) as HTMLElement
  }
  if (config.form && !(config.form instanceof Element)) {
    config.form = document.querySelector(config.form) as HTMLFormElement
  }

  const subjectManager = createSubjectManager()

  const existingEmbedId = (config.element as HTMLElement).dataset.embedId

  // Cleanup existing element
  if (config.element.hasChildNodes()) {
    while (config.element.firstChild) {
      config.element.removeChild(config.element.lastChild)
    }
  }

  // Cleanup existing events
  if (cleanup.has(existingEmbedId)) {
    const cleanupFn = cleanup.get(existingEmbedId)
    cleanupFn()
  }

  // Attach a unique ID
  embedId = embedId + 1
  ;(config.element as HTMLElement).dataset.embedId = embedId.toString()

  // Loader
  const loader = document.createElement('div')
  createSkeletonController(loader, subjectManager)

  // Overlay
  const overlay = document.createElement('div')
  createOverlayController(overlay, subjectManager)

  // Form
  createFormController(
    config.form as HTMLFormElement,
    onComplete,
    subjectManager
  )

  createPopupController(
    mutableRef<{ popup: Window; stopCallback: () => void }>(),
    subjectManager
  )

  // Framebus + Emitter (Communicate with iFrame via messaging)
  const framebus = Framebus.target({
    channel,
    origin: config.iframeUrl,
  })
  createEmitter({ config, framebus }, subjectManager)

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(
    frame,
    appendUrlParams(config.iframeUrl, {
      parentUrl: `${document.location.protocol}//${document.location.host}`,
      font: setupConfig.theme?.fonts?.body
        ? encodeURIComponent(setupConfig.theme.fonts.body)
        : undefined,
      channel,
    }),
    subjectManager
  )

  // Attach elements to the DOM
  config.element.append(overlay, loader, frame)

  const messageHandler = ({ origin, data: message }) => {
    // Trust API postMessages
    if (origin !== config.apiUrl) return

    framebus.emit(message.type, message.data)
  }

  // Pass-through api postMessage callbacks
  window.addEventListener('message', messageHandler)

  // Cleanup
  cleanup.set(embedId.toString(), () => {
    window.removeEventListener('message', messageHandler)
  })
}
