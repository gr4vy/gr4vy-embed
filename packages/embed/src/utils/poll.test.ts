import { poll } from './poll'

describe('poll', () => {
  const options = {
    url: 'https://google.ca',
  }
  let warnSpy

  beforeAll(() => {
    warnSpy = jest.spyOn(console, 'warn')
    jest.useFakeTimers()
  })

  afterAll(() => {
    warnSpy.mockReset()
    jest.useRealTimers()
  })

  test('should resolve with the response if polling was successful', () => {
    // @ts-ignore fetch's Response normally has other mandatory
    // properties, but it's fine in this case.
    const successfulFetch = Promise.resolve<Response>({ ok: true })
    global.fetch = () => successfulFetch

    return poll(options).then(() => {
      jest.runAllTimers()
      expect(warnSpy).toHaveBeenCalledTimes(0)
    })
  })

  test(`should log the warning if all else fails`, () => {
    const warning = `
=> Error - retrying in 3000 milliseconds`
    const failedFetch = Promise.reject('Error')
    global.fetch = () => failedFetch

    return poll(options).then(() => {
      jest.runAllTimers()
      expect(warnSpy).toHaveBeenCalledWith(warning, {})
    })
  })
})
