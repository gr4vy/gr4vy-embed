import Framebus from 'framebus'
import Logger from './Logger'

/**
 * A wrapper around the framebus library that handles
 * logging and subscr(iptions
 */
export default class Emitter {
  logger
  framebus
  /**
   * Initialize with a logger, the url of the iframe,
   * and an optional framebus instance (used in testing mostly)
   */
  constructor({
    logger,
    channel,
    iframeUrl,
    framebus,
  }: {
    logger: Logger
    channel: string
    iframeUrl: string
    framebus?: Framebus
  }) {
    this.logger = logger
    this.framebus = framebus ?? this.initFramebus({ channel, iframeUrl })
  }

  initFramebus({ channel, iframeUrl }) {
    const parsedUrl = new URL(iframeUrl)
    const origin = `${parsedUrl.protocol}//${parsedUrl.host}`

    return Framebus.target({
      channel,
      origin,
    })
  }

  /**
   * Listens for a framebus event, then logs any message it receives and
   * passes the data to the callbacl
   */
  on(key, callback?) {
    this.framebus.on(key, (data) => {
      this.logger.log(`Page received - ${key}`, data)
      callback?.(data)
    })
  }

  /**
   * Similar to on, but also returns the key of the event. This is used to
   * propegate events to a callback provided by a user.
   */
  subscribe(key, callback?) {
    if (!callback) {
      return
    }
    this.on(key, (data) => callback?.(key, data))
  }

  /**
   * Sends the options to the iframe once it's loaded.
   */
  updateOptions(config) {
    this.emit(`updateOptions`, config)
  }

  /**
   * Sends a message to try and submit the form
   */
  submitForm() {
    this.emit(`submitForm`)
  }

  /**
   * Internal function used to emit an event and log the data
   */
  private emit(key, value?) {
    this.logger.log(`Page emits - ${key}`, value)
    this.framebus.emit(key, value)
  }
}
