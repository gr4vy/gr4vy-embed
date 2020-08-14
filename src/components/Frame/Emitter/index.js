import framebus from 'framebus'

/**
 * A wrapper around the framebus library that handles
 * logging and subscriptions
 */
export default class Emitter {
  /**
   * Initialize with a logger, the url of the iframe, 
   * and an optional framebus instance (used in testing mostly)
   */
  constructor({ logger, options = {} }) {
    this.logger = logger
    this.framebus = options.framebus || framebus
    
    // if (url && this.framebus.target) {
    //   this.framebus = this.framebus.target(url.replace(/\/$/, ``))
    // }
  }

  /**
   * Listens for a framebus event, then logs any message it receives and 
   * passes the data to the callbacl
   */
  on(key, callback) {

    // console.dir(this.target)
    this.framebus.on(key, data => {
      this.logger.log(`Page received - ${key}`, data)
      callback?.(data)
    })
  }

  /**
   * Similar to on, but also returns the key of the event. This is used to
   * propegate events to a callback provided by a user.
   */
  subscribe(key, callback) {
    if (!callback) { return }
    this.on(key, data => callback?.(key, data))
  }

  /**
   * Sends the options to the iframe once it's loaded.
   */
  updateOptions({ options }) {
    let parentHost = `${document?.location?.protocol}//${document?.location?.host}`
    this.emit(`updateOptions`, { ...options, parentHost })
  }

  /**
   * Sends a message to try and submit the form
   */
  submitForm() {
    this.emit(`submitForm`)
  }

  // PRIVATE

  /**
   * Internal function used to emit an event and log the data
   */
  emit(key, value) {
    this.logger.log(`Page emits - ${key}`, value)
    this.framebus.emit(key, value)
  }
}

