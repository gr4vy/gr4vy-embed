export const log = (key: string, object: any, debug: boolean) => {
  // ignore if debugging is disabled
  if (!debug) {
    return
  }
  console.log(`Gr4vy - ${key}`, object)
}
