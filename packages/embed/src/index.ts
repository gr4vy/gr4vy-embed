import Framebus from 'framebus'
import { createEmitter } from './emitter'
import { createFormController } from './form'
import { createFrameController, getFrameUrl } from './frame'
import { createOverlayController } from './overlay'
import { createPopupController } from './popup'
import { createSkeletonController } from './skeleton'
import { createSubjectManager } from './subjects'
import { SetupConfig, Config } from './types'
import { generateChannelId, mutableRef } from './utils'
import { validate } from './validation'

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export function setup(setupConfig: SetupConfig): void {
  const { gr4vyId, onComplete, ...rest } = setupConfig
  const config: Config = {
    store: 'ask',
    display: 'all',
    apiHost: gr4vyId ? `api.${gr4vyId}.gr4vy.app` : setupConfig.apiHost,
    iframeHost: gr4vyId ? `embed.${gr4vyId}.gr4vy.app` : setupConfig.iframeHost,
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
  const channel: string = generateChannelId()
  const iframeUrl: URL = getFrameUrl({ channel, config })
  const subjectManager = createSubjectManager()

  // Remove existing elements from the DOM
  if (config.element.hasChildNodes()) {
    while (config.element.firstChild) {
      config.element.removeChild(config.element.lastChild)
    }
  }

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
    origin: `${iframeUrl.protocol}//${iframeUrl.host}`,
  })
  createEmitter({ config, framebus }, subjectManager)

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(frame, iframeUrl, subjectManager)

  // Attach elements to the DOM
  config.element.append(overlay, loader, frame)
}
