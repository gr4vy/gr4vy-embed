import Framebus from 'framebus'
import { createConfig } from './create-config'
import { createEmitter } from './emitter'
import { createFormController } from './form'
import { createFrameController } from './frame'
import { createOverlayController } from './overlay'
import { createPopupController } from './popup'
import { createSkeletonController } from './skeleton'
import { createSubjectManager } from './subjects'
import { SetupConfig } from './types'
import { mutableRef } from './utils'
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
  // exit early if the config is not valid
  if (!validate(setupConfig)) {
    return
  }

  const config = createConfig(setupConfig)

  const subjectManager = createSubjectManager()

  const existingEmbedId = config.element.dataset.embedId

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
  config.element.dataset.embedId = embedId.toString()

  // Loader
  const loader = document.createElement('div')
  createSkeletonController(loader, subjectManager)

  // Overlay
  const overlay = document.createElement('div')
  createOverlayController(overlay, subjectManager)

  // Form
  createFormController(
    config.form as HTMLFormElement,
    config.onComplete,
    subjectManager
  )

  createPopupController(
    mutableRef<{ popup: Window; stopCallback: () => void }>(),
    subjectManager
  )

  // Framebus + Emitter (Communicate with iFrame via messaging)
  const framebus = Framebus.target({
    origin: config.iframeUrl,
    channel: config.channel,
  })
  createEmitter({ config, framebus }, subjectManager)

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(frame, config.iframeSrc, subjectManager)

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
