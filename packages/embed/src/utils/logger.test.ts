import { log } from './logger'

const key = 'Page received - resize'
const data = { frame: { height: 100 } }

describe('log()', () => {
  let logSpy, warnSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation()
    warnSpy = jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('expect it to log to console.log when debug config is set', () => {
    log(key, data, { debug: true })
    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - ${key}`, data)
  })

  test('expect it to skip logging if the debug value is not set', () => {
    log(key, data)
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('expect it to use a different level of logging when set', () => {
    log(key, data, { debug: true, level: 'warn' })
    expect(warnSpy).toHaveBeenCalledWith(`Gr4vy - ${key}`, data)
  })
})
