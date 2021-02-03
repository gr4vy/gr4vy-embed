import { log } from './logger'

const key = 'Page received - resize'
const data = { frame: { height: 100 } }

describe('log()', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('expect it to log to console.log when debug config is set', () => {
    log(key, data, true)
    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - ${key}`, data)
  })

  test('expect it to skip logging if the debug value is not set', () => {
    log(key, data, null)
    expect(logSpy).not.toHaveBeenCalled()
  })
})
