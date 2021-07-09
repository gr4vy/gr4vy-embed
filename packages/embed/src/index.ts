import FormNapper from 'form-napper'
import Framebus from 'framebus'
import { createEmitter } from './emitter'
import { createFormController, FormNapperInstance } from './form'
import { createFrameController, getFrameUrl } from './frame'
import { createOverlayController, createOverlay } from './overlay'
import { registerSubscriptions } from './popup'
import { Skeleton, createSkeletonController } from './skeleton'
import { SetupConfig, Config } from './types'
import { generateChannelId } from './utils'
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
    iframeHost: gr4vyId ? `embed.${gr4vyId}.gr4vy.app` : setupConfig.apiHost,
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

  // Skeleton Loader
  const loader = Skeleton()
  config.element.appendChild(loader)
  createSkeletonController(loader)

  // Form - Optional
  if (config.form) {
    const formNapper = new FormNapper(config.form) as FormNapperInstance
    createFormController(formNapper, onComplete)
  }

  // Popup + Overlay (Authorizations)
  const overlayElement = document.createElement('div')
  document.body.append(overlayElement)
  createOverlayController(createOverlay(overlayElement))
  registerSubscriptions()

  // Framebus + Emitter (Communicate with iFrame via messaging)
  const framebus = Framebus.target({
    channel,
    origin: `${iframeUrl.protocol}//${iframeUrl.host}`,
  })
  createEmitter({ config, framebus })

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(frame, iframeUrl)
  config.element.appendChild(frame)
}
