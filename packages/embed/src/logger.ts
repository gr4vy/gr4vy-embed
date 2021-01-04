export const log = (key: string, object: any, debug: string) => {
  // ignore if debugging is disabled
  if (!debug) {
    return
  }
  // determine with console method to use - this is useful to switch
  // between console.log and console.debug
  const logger = console[debug]

  // prepend the log with Gr4vy branding, the name of the object, and the serialized,
  // JSON encoded object.
  const output = debug === `log` ? JSON.stringify(object, null, 2) : object

  logger(`Gr4vy - ${key}`, output)
}
