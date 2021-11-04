import {
  browserSupportsApplePay,
  detectSupportedVersion,
} from './browser-support'

beforeEach(() => {
  window.ApplePaySession = ({
    canMakePayments: jest.fn(),
    supportsVersion: jest.fn(),
  } as unknown) as ApplePaySession
})

test('checks support for apple pay version 3', () => {
  const dataset: Array<[boolean, number, boolean]> = [
    [false, 3, false],
    [true, 3, true],
    [true, 2, false],
    [true, 4, true],
  ]

  dataset.forEach(([canMakePayments, version, expected]) => {
    ApplePaySession.canMakePayments = () => canMakePayments
    ApplePaySession.supportsVersion = (checkVersion) => version >= checkVersion

    const result = browserSupportsApplePay()

    expect(result).toBe(expected)
  })
})

test('checks for later support of apple pay', () => {
  const dataset: Array<[number, number]> = [
    [1, null],
    [3, 3],
    [4, 4],
    [8, 5],
  ]

  dataset.forEach(([supportedVersion, expected]) => {
    ApplePaySession.supportsVersion = (checkVersion) =>
      checkVersion <= supportedVersion

    const result = detectSupportedVersion()

    expect(result).toBe(expected)
  })
})
