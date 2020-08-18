import fb from 'framebus'

import Emitter from '../../../src/components/Frame/Emitter'
import { act } from 'react-dom/test-utils'
class MockBus {
  constructor() { this.listeners = [] }
  on(key, callback) { this.listeners[key] = callback }
  emit(key, data) { this.listeners[key]?.(data) }
}

describe(`Emitter`, () => {
  let framebus = null

  beforeEach(() => {
    framebus = new MockBus()
  })

  test(`should take a logger and url`, () => {
    const logger = jest.mock()
    const url = `http://localhost:8080/`
    const emitter = new Emitter({ logger, url })
    expect(emitter.logger).toBe(logger)
    expect(emitter.framebus).toEqual(fb.target(`http://localhost:8080`))
  })

  test(`should take an optional framebus`, () => {
    const logger = jest.mock()
    const url = `http://localhost:8080/`
    const options = { framebus }
    const emitter = new Emitter({ logger, url, options })
    expect(emitter.framebus).toBe(framebus)
  })

  describe(`.on`, () => {
    test(`should call the callback when an event is received`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const data = jest.mock()
      const callback = jest.fn() 
      emitter.on(`resize`, callback)

      act(() => {
        framebus.emit(`resize`, data)
      })
      
      expect(callback).toHaveBeenCalledWith(data)
      expect(logger.log).toHaveBeenCalledWith(`Page received - resize`, data)
    })

    test(`should allow for a missing callback function`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const data = jest.mock()
      emitter.on(`resize`)

      act(() => {
        framebus.emit(`resize`, data)
      })
    })
  })

  describe(`.subscribe`, () => {
    test(`should call the callback when an event is received`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const data = jest.mock()
      const callback = jest.fn() 
      emitter.subscribe(`resize`, callback)

      act(() => {
        framebus.emit(`resize`, data)
      })
      
      expect(callback).toHaveBeenCalledWith(`resize`, data)
      expect(logger.log).toHaveBeenCalledWith(`Page received - resize`, data)
    })

    test(`should allow for a missing callback function`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const data = jest.mock()
      emitter.subscribe(`resize`)

      act(() => {
        framebus.emit(`resize`, data)
      })
    })
  })

  describe(`.updateOptions`, () => {
    test(`should emit an event`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const callback = jest.fn()
      framebus.on(`updateOptions`, callback)

      emitter.updateOptions({ options: { foo: `bar` } })
      expect(callback).toBeCalledWith({ foo: `bar` })
      expect(logger.log).toHaveBeenCalledWith(`Page emits - updateOptions`, { foo: `bar` })
    })
  })

  describe(`.submitForm`, () => {
    test(`should emit an event`, () => {
      const logger = { log: jest.fn() }
      const url = `http://localhost:8080/`
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const callback = jest.fn()
      framebus.on(`submitForm`, callback)

      emitter.submitForm()
      expect(callback).toHaveBeenCalled()
      expect(logger.log).toHaveBeenCalledWith(`Page emits - submitForm`, undefined)
    })
  })
})