import FormNapper from 'form-napper'
import Framebus from 'framebus'
import { createEmitter } from './emitter'
import { createFormController, FormNapperInstance } from './form'
import { createFrameController, getFrameUrl } from './frame'
import { createOverlayController } from './overlay'
import './popup'
import { Skeleton, createSkeletonController } from './skeleton'
import { Config, InternalConfig } from './types'
import { pick, generateChannelId } from './utils'
import { validate } from './validation'

const internalConfigKeys = [
  'amount',
  'channel',
  'currency',
  'intent',
  'apiHost',
  'bearerToken',
  'showButton',
  'debug',
  'externalIdentifier',
  'preferResponse',
  'buyerId',
  'buyerExternalIdentifier',
]

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export const setup = (config: Config): void => {
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

  // Form
  const formNapper = new FormNapper(config.form) as FormNapperInstance
  createFormController(formNapper)

  // Overlay
  const overlayElement = document.createElement('div')
  document.body.append(overlayElement)
  createOverlayController(overlayElement)

  /**
   * Create a framebus to communicate with the frame
   */
  const framebus = Framebus.target({
    channel,
    origin: `${iframeUrl.protocol}//${iframeUrl.host}`,
  })

  // Attach events
  const internalConfig = pick<InternalConfig>(config, internalConfigKeys)
  createEmitter({ config: internalConfig, framebus })

  /**
   * Create the iFrame
   */
  const frame = document.createElement('iframe')
  createFrameController(frame, iframeUrl)
  config.element.appendChild(frame)
}

// describe('createFramebus()', () => {
//   test('should return a new framebus object', () => {
//     const framebus = createFramebus(validConfig)
//     expect(framebus.origin).toBe('http://127.0.0.1:8080')
//     expect(framebus.channel).toBe(validConfig.channel)
//   })
// })

// expect(formNapper.inject).toHaveBeenCalledWith(
//   `gr4vy_transaction_id`,
//   '123'
// )
// expect(formNapper.submit).toHaveBeenCalled()

/**
test('should work without a form', () => {
  const frame = document.createElement('iframe')
  createEmitter({ framebus, config: validConfig })
  const fb = (Framebus as any).getInstances()[1]
  fb.emit('transactionCreated', { id: '123' })
})

*/
