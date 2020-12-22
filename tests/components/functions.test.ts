import { frameUrl, validate } from '../../src/components/Frame/functions'

const validOptions = {
  amount: 1299,
  currency: `USD`,
  iframeHost: `cdn.apple.gr4vy.com`,
  apiHost: `api.apple.gr4vy.com`,
  bearerToken: `123456`,
  showButton: true,
  debug: `debug`,
  onEvent: () => {},
}

describe(`validate`, () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  test(`should accept valid options`, () => {
    expect(validate(validOptions)).toBeTruthy()
  })

  test(`should make sure the bearerToken is a string`, () => {
    const options = {
      ...validOptions,
      bearerToken: null,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should make sure the bearerToken is string with a minimal length`, () => {
    const options = {
      ...validOptions,
      bearerToken: ``,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should make sure the iframeHost is present`, () => {
    const options = {
      ...validOptions,
      iframeHost: null,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should allow an iframeHost of localhost`, () => {
    const options = {
      ...validOptions,
      iframeHost: `localhost:8000`,
    }
    expect(validate(options)).toBeTruthy()
  })

  test(`should allow an iframeHost of 127.0.0.1`, () => {
    const options = {
      ...validOptions,
      iframeHost: `127.0.0.1:8000`,
    }
    expect(validate(options)).toBeTruthy()
  })

  test(`should make sure the apiHost is present`, () => {
    const options = {
      ...validOptions,
      iframeHost: null,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should allow an apiHost of localhost`, () => {
    const options = {
      ...validOptions,
      apiHost: `localhost:8000`,
    }
    expect(validate(options)).toBeTruthy()
  })

  test(`should allow an apiHost of 127.0.0.1`, () => {
    const options = {
      ...validOptions,
      apiHost: `127.0.0.1:8000`,
    }
    expect(validate(options)).toBeTruthy()
  })

  test(`should make sure the amount is a real number`, () => {
    const options = {
      ...validOptions,
      amount: `foobar`,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should make sure the amount is present`, () => {
    const options = {
      ...validOptions,
      amount: null,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should make sure the currency is a valid string`, () => {
    const options = {
      ...validOptions,
      currency: ``,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should make sure the currency is present`, () => {
    const options = {
      ...validOptions,
      currency: null,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should require showButton to be a boolean`, () => {
    const options = {
      ...validOptions,
      showButton: `true`,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should require preferResponse to be a string`, () => {
    const options = {
      ...validOptions,
      preferResponse: 123,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })

  test(`should require debug to be a valid option`, () => {
    const options = {
      ...validOptions,
      debug: true,
    }
    expect(validate(options)).toBeFalsy()
    expect(console.error).toBeCalledTimes(1)
  })
})

describe(`frameUrl`, () => {
  test(`should return a full URL for a hostname`, () => {
    expect(
      frameUrl({
        iframeHost: `cdn.apple.app.gr4vy.com`,
        channel: `mychannel`,
      })
    ).toEqual(
      `https://cdn.apple.app.gr4vy.com/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`
    )
  })

  test(`should return an insecure URL for localhost`, () => {
    expect(
      frameUrl({
        iframeHost: `localhost:8000`,
        channel: `mychannel`,
      })
    ).toEqual(
      `http://localhost:8000/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`
    )
  })

  test(`should return an insecure URL for 127.0.0.1`, () => {
    expect(
      frameUrl({
        iframeHost: `127.0.0.1:8000`,
        channel: `mychannel`,
      })
    ).toEqual(
      `http://127.0.0.1:8000/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`
    )
  })
})
