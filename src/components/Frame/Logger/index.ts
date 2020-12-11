/**
 * A helper class used for outputting debug logs
 */
export default class Logger {
  debugLevel

  constructor({ options }) {
    this.debugLevel = options.debug || null
  }

  /**
   * A helper method used to output debug logs
   */
  log(name, object) {
    // ignore if debugging is disabled
    if (!this.debugLevel) {
      return
    }
    // determine with console method to use - this is useful to switch
    // between console.log for Storybook and console.debug for general use
    const logger = console[this.debugLevel]
    // prepend the log with Gr4vy branding, the name of the object, and the serialized,
    // JSON encoded object.
    const output =
      this.debugLevel === `log` ? JSON.stringify(object, null, 2) : object
    logger(`Gr4vy - ${name}`, output)
  }
}
