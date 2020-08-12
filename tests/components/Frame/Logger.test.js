import Logger from '../../../src/components/Frame/Logger'

describe(`Emitter`, () => {
  test(`should take debug option`, () => {
    const options = { debug: `debug` }
    const emitter = new Logger({ options })
    expect(emitter.debugLevel).toBe(`debug`)
  })

  test(`should default to a debug option of null`, () => {
    const options = {}
    const emitter = new Logger({ options })
    expect(emitter.debugLevel).toBeNull()
  })

  describe(`.log`, () => {
    test(`should not output anything for no debug level`, () => {
      console.log = jest.fn()
      console.debug = jest.fn()

      const options = {}
      const logger = new Logger({ options })

      logger.log(`key`, jest.mock())

      expect(console.log).not.toHaveBeenCalled()
      expect(console.debug).not.toHaveBeenCalled()

      console.log.mockRestore()
      console.debug.mockRestore()
    })

    test(`should output to console.log for a debug level of log`, () => {
      console.log = jest.fn()

      const options = { debug: `log` }
      const logger = new Logger({ options })

      const data = { foo: `bar` }
      logger.log(`key`, data)

      expect(console.log).toHaveBeenCalledWith(`Gr4vy - key`, JSON.stringify(data, null, 2))

      console.log.mockRestore()
    })

    test(`should output to console.debug for a debug level of debug`, () => {
      console.debug = jest.fn()

      const options = { debug: `debug` }
      const logger = new Logger({ options })

      const data = { foo: `bar` }
      logger.log(`key`, data)

      expect(console.debug).toHaveBeenCalledWith(`Gr4vy - key`, data)

      console.debug.mockRestore()
    })
    
  })
})