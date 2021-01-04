import { log } from './logger'

const key = 'Page received - resize'
const data = { frame: { height: 100 } }

describe('log()', () => {
  let logSpy, debugSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation()
    debugSpy = jest.spyOn(console, 'debug').mockImplementation()
  })

  afterEach(() => {
    logSpy.mockRestore()
    debugSpy.mockRestore()
  })

  test('expect it to log to console.log when debug config is set to log', () => {
    log(key, data, 'log')
    expect(logSpy).toHaveBeenCalledWith(
      `Gr4vy - ${key}`,
      JSON.stringify(data, null, 2)
    )
  })

  test('expect it to log to console.debug when debug config is set to debug', () => {
    log(key, data, 'debug')
    expect(debugSpy).toHaveBeenCalledWith(`Gr4vy - ${key}`, data)
  })

  test('expect it to skip logging if the debug value is not set', () => {
    log(key, data, null)
    expect(logSpy).not.toHaveBeenCalled()
    expect(debugSpy).not.toHaveBeenCalled()
  })
})
