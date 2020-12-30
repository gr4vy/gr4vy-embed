import { generateChannelId } from './channel'
import { getFrameUrl, setupFrame } from './frame'
import { Config } from './types'
import { validate } from './validation'

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
  const container: HTMLElement = document.querySelector(config.element)
  const formContainer: HTMLElement = document.querySelector(config.form)
  const channel: string = generateChannelId()
  const iframeUrl: URL = getFrameUrl({ channel, config })

  // bind the new iframe
  setupFrame({ ...config, container, formContainer, iframeUrl, channel })
}
