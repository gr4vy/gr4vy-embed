import framebus from 'framebus'

export default class Emitter {
  constructor({ logger, url }) {
    this.logger = logger
    this.target = url
  }

  onFrameReady(callback) {
    this.on(`frameReady`, callback)
  }

  updateOptions({ options = {} }) {
    let parentHost = document?.location?.host
    this.emit(`updateOptions`, { ...options, parentHost })
  }
  
  onFormLoaded(callback) {
    this.on(`formLoaded`, data => callback(data.loaded))
  }

  onResize(callback) {
    this.on(`resize`, data => callback(data.frame.height))
  }

  subscribe(key, callback) {
    this.on(key, data => callback(key, data))
  }

  // PRIVATE

  on(key, callback) {
    framebus.on(key, data => {
      this.logger.log(`Page received - ${key}`, data)
      callback(data)
    })
  }

  emit(key, value) {
    this.logger.log(`Page emits - ${key}`, value)
    framebus.emit(key, value)
  }
}

