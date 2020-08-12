import fb from 'framebus'

import Emitter from '../../../src/components/Frame/Emitter'
import { act } from 'react-dom/test-utils'

describe(`Emitter`, () => {
  let listeners = null
  let framebus = null

  beforeEach(() => {
    listeners = []
    framebus = {
      on: (key, callback) => { listeners[key] = callback },
      emit: (key, data) => { listeners[key]?.(data) }
    }
  })

  test(`should take a logger and url`, () => {
    const logger = jest.mock()
    const url = jest.mock()
    const emitter = new Emitter({ logger, url })
    expect(emitter.logger).toBe(logger)
    expect(emitter.logger).toBe(url)
    expect(emitter.framebus).toBe(fb)
  })

  test(`should take an optional framebus`, () => {
    const logger = jest.mock()
    const url = jest.mock()
    const options = { framebus }
    const emitter = new Emitter({ logger, url, options })
    expect(emitter.framebus).toBe(framebus)
  })

  describe(`.on`, () => {
    test(`should call the callback when an event is received`, () => {
      const logger = { log: jest.fn() }
      const url = jest.mock()
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
      const url = jest.mock()
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
      const url = jest.mock()
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
      const url = jest.mock()
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
      const url = jest.mock()
      const options = { framebus }
      const emitter = new Emitter({ logger, url, options })

      const callback = jest.fn()
      framebus.on(`updateOptions`, callback)

      emitter.updateOptions({ options: { foo: `bar` } })
      expect(callback).toBeCalledWith({ foo: `bar`, parentHost: `localhost` })
      expect(logger.log).toHaveBeenCalledWith(`Page emits - updateOptions`, { foo: `bar`, parentHost: `localhost` })
    })
  })
})