import {
  canSkipValidation,
  validateHost,
  validateNumber,
  validateCurrency,
  validateType,
  validateHTMLElement,
  validateIntent,
  validate,
  emitArgumentError,
  validateStore,
  validateCondition,
  validateAutoSelectOption,
} from './validation'

let errorSpy

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('validate', () => {
  test('should successfully validate a valid set of props', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return document.createElement('div')
    })

    const valid = validate({
      element: `#app`,
      form: null,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      token: `123456`,
      country: 'US',
    })
    expect(valid).toEqual(true)
  })

  test('should validate shipping details', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return document.createElement('div')
    })

    const options = {
      element: `#app`,
      form: null,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      token: `123456`,
      country: 'US',
    }

    expect(validate(options)).toBeTruthy()
    expect(validate({ ...options, shippingDetailsId: '123' })).toBeFalsy()
    expect(
      validate({
        ...options,
        shippingDetailsId: '123',
        buyerExternalIdentifier: '123',
      })
    ).toBeTruthy()
    expect(
      validate({
        ...options,
        shippingDetailsId: '123',
        buyerId: '123',
      })
    ).toBeTruthy()
    expect(
      validate({
        ...options,
        shippingDetailsId: '123',
        buyer: {
          billingDetails: {
            firstName: 'John',
          },
        },
      })
    ).toBeFalsy()
  })

  test('should validate buyer details', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return document.createElement('div')
    })

    const options = {
      element: `#app`,
      form: null,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      token: `123456`,
      country: 'US',
    }

    expect(validate(options)).toBeTruthy()
    expect(
      validate({ ...options, buyerExternalIdentifier: '123' })
    ).toBeTruthy()
    expect(validate({ ...options, buyerId: '123' })).toBeTruthy()
    expect(
      validate({
        ...options,
        buyer: {
          displayName: 'Test buyer',
          externalIdentifier: '123',
          billingDetails: {
            firstName: 'John',
            lastName: null,
          },
          shippingDetails: {
            address: {
              country: 'GB',
            },
          },
        },
      })
    ).toBeTruthy()
    expect(
      validate({
        ...options,
        buyer: {
          billingDetails: {
            firstName: 'John',
            unknown: 'unknown',
          },
          unknown: 'unknown',
        } as any,
      })
    ).toBeFalsy()
    expect(
      validate({
        ...options,
        buyer: {
          billingDetails: {},
        } as any,
      })
    ).toBeFalsy()
    expect(
      validate({
        ...options,
        buyerExternalIdentifier: '123',
        buyer: {
          billingDetails: {
            firstName: 'John',
          },
        },
      })
    ).toBeFalsy()
    expect(
      validate({
        ...options,
        buyerId: '123',
        buyer: {
          billingDetails: {
            firstName: 'John',
          },
        },
      })
    ).toBeFalsy()
  })
})

test('should validate onBeforeTransaction', () => {
  jest.spyOn(document, 'querySelector').mockImplementation(() => {
    return document.createElement('div')
  })

  const options = {
    element: `#app`,
    form: null,
    amount: 1299,
    currency: `USD`,
    iframeHost: `127.0.0.1:8080`,
    apiHost: `127.0.0.1:3100`,
    token: `123456`,
    country: 'US',
    onBeforeTransaction: () => Promise.resolve({}),
  }

  expect(validate(options)).toBeTruthy()
  expect(validate({ ...options, onBeforeTransaction: true as any })).toBeFalsy()
})

test('should validate excludedMethods', () => {
  jest.spyOn(document, 'querySelector').mockImplementation(() => {
    return document.createElement('div')
  })

  const options = {
    element: `#app`,
    form: null,
    amount: 1299,
    currency: `USD`,
    iframeHost: `127.0.0.1:8080`,
    apiHost: `127.0.0.1:3100`,
    token: `123456`,
    country: 'US',
    excludedMethods: ['foo'],
  }

  expect(validate(options)).toBeTruthy()
  expect(validate({ ...options, excludedMethods: 'true' as any })).toBeFalsy()
})

describe('emitArgumentError', () => {
  test('should raise a console and callback error', () => {
    const options = {
      argument: 'element',
      message: 'should be a valid HTML element',
      callback: jest.fn(),
    }
    const error = {
      code: 'argumentError',
      argument: 'element',
      message: 'should be a valid HTML element',
    }
    emitArgumentError(options)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })

  test('should be able to handle a missing callback function', () => {
    const options = {
      argument: 'element',
      message: 'should be a valid HTML element',
    }
    const error = {
      code: 'argumentError',
      argument: 'element',
      message: 'should be a valid HTML element',
    }
    emitArgumentError(options)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})

describe('canSkipValidation', () => {
  test('should return true if the value is not required and unset', () => {
    expect(canSkipValidation({ required: false, value: null })).toEqual(true)
    expect(canSkipValidation({ required: false, value: undefined })).toEqual(
      true
    )
  })

  test('should return false if the value is not required and set', () => {
    expect(canSkipValidation({ required: false, value: '' })).toEqual(false)
  })

  test('should return false if the value is not not required', () => {
    expect(canSkipValidation({ required: true, value: '' })).toEqual(false)
  })
})

describe('validateHTMLElement', () => {
  const defaultOptions = {
    argument: 'element',
    message: 'must be a valid HTML element',
  }

  const argumentError = {
    argument: 'element',
    code: 'argumentError',
    message: '#app must be a valid HTML element',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateHTMLElement(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the element is valid a valid element', () => {
    const options = {
      ...defaultOptions,
      value: document.createElement('div'),
      callback: jest.fn(),
    }
    const valid = validateHTMLElement(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the element represents a query for a valid element', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return document.createElement('div')
    })

    const options = {
      ...defaultOptions,
      value: '#app',
      callback: jest.fn(),
    }
    const valid = validateHTMLElement(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should emit an error if the element could not be found', () => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      return null
    })

    const options = {
      ...defaultOptions,
      value: '#app',
      callback: jest.fn(),
    }
    const valid = validateHTMLElement(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
  })
})

describe('validateHost()', () => {
  const defaultOptions = {
    argument: 'frameHost',
    message: 'must be a valid host',
  }

  const argumentError = {
    argument: 'frameHost',
    code: 'argumentError',
    message: 'example/8888 must be a valid host',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateHost(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the host is valid', () => {
    const options = {
      ...defaultOptions,
      value: 'localhost:8888',
      callback: jest.fn(),
    }
    const valid = validateHost(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the host is valid and has no port', () => {
    const options = {
      ...defaultOptions,
      value: 'example.com',
      callback: jest.fn(),
    }
    const valid = validateHost(options)
    expect(valid).toEqual(true)
  })

  test('should emit an error if the host is invalid', () => {
    const options = {
      ...defaultOptions,
      value: 'example/8888',
      callback: jest.fn(),
    }
    const valid = validateHost(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
  })

  test('should emit an error if the host would throw a parsing error', () => {
    const options = {
      ...defaultOptions,
      value: '///////',
      callback: jest.fn(),
    }
    const valid = validateHost(options)
    expect(valid).toEqual(false)
  })
})

describe('validateNumber()', () => {
  const defaultOptions = {
    argument: 'amount',
    message: 'must be a valid number',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the number is valid', () => {
    const options = {
      ...defaultOptions,
      value: 200,
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return false if the number is not a number', () => {
    const options = {
      ...defaultOptions,
      value: 'example',
      callback: jest.fn(),
    }
    const error = {
      argument: 'amount',
      code: 'argumentError',
      message: 'example must be a valid number',
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })

  test('should return false if the number is negative', () => {
    const options = {
      ...defaultOptions,
      value: -1,
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(false)
  })

  test('should return false if the number is too large', () => {
    const maxResult = validateNumber({
      ...defaultOptions,
      value: 99999999,
      callback: jest.fn(),
    })
    expect(maxResult).toEqual(true)
    const aboveMaxResult = validateNumber({
      ...defaultOptions,
      value: 100000000,
      callback: jest.fn(),
    })
    expect(aboveMaxResult).toEqual(false)
  })

  test('should return true if the number is a number as a string', () => {
    const options = {
      ...defaultOptions,
      value: '0.1',
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(true)
  })
})

describe('validateCurrency()', () => {
  const defaultOptions = {
    argument: 'currency',
    message: 'must be a valid 3-digit currency code',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateCurrency(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the currency is valid', () => {
    const options = {
      ...defaultOptions,
      value: 'USD',
      callback: jest.fn(),
    }
    const valid = validateCurrency(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return false if the currency is not a string', () => {
    const options = {
      ...defaultOptions,
      value: 123,
      callback: jest.fn(),
    }
    const error = {
      argument: 'currency',
      code: 'argumentError',
      message: '123 must be a valid 3-digit currency code',
    }
    const valid = validateCurrency(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })

  test('should return false if the currency code is not 3 digits', () => {
    const options = {
      ...defaultOptions,
      value: 'ABCD',
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(false)
  })
})

describe('validateType()', () => {
  const defaultOptions = {
    argument: 'foo',
    type: 'boolean',
    message: 'must be a boolean',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateType(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the type is valid', () => {
    const options = {
      ...defaultOptions,
      value: true,
      callback: jest.fn(),
    }
    const valid = validateType(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return false if the type does not match', () => {
    const options = {
      ...defaultOptions,
      value: 123,
      callback: jest.fn(),
    }
    const error = {
      argument: 'foo',
      code: 'argumentError',
      message: '123 must be a boolean',
    }
    const valid = validateType(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})

describe('validateIntent()', () => {
  const defaultOptions = {
    argument: 'intent',
    message: 'must be a valid intent',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateIntent(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the intent is valid', () => {
    ;['authorize', 'capture'].forEach((value) => {
      const options = {
        ...defaultOptions,
        value,
        callback: jest.fn(),
      }
      const valid = validateIntent({
        ...defaultOptions,
        value: 'authorize',
        callback: jest.fn(),
      })
      expect(valid).toEqual(true)
      expect(options.callback).not.toHaveBeenCalled()
    })
  })

  test('should return false if the intent is not valid', () => {
    const options = {
      ...defaultOptions,
      value: 123,
      callback: jest.fn(),
    }
    const error = {
      argument: 'intent',
      code: 'argumentError',
      message: '123 must be a valid intent',
    }
    const valid = validateIntent(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})

describe('validateStore', () => {
  test('should return false if store is not valid', () => {
    const options = {
      argument: 'store',
      message: 'must be true, false or "ask"',
      value: 123,
      callback: jest.fn(),
    }
    const error = {
      argument: 'store',
      code: 'argumentError',
      message: '123 must be true, false or "ask"',
    }
    const valid = validateStore(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith('argumentError', error)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})

describe('validateCondition', () => {
  test('should return false if condition is not true', () => {
    const options = {
      argument: 'foo',
      message: 'must be true',
      condition: false,
    }
    const error = {
      argument: 'foo',
      code: 'argumentError',
      message: 'must be true',
    }
    const valid = validateCondition(options)
    expect(valid).toEqual(false)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})

describe('validateAutoSelectOption()', () => {
  const defaultOptions = {
    argument: 'autoSelectOption',
    message: 'must be "first", "firstStored", "firstNonStored", "none" or null',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
    }
    const valid = validateAutoSelectOption(options)
    expect(valid).toEqual(true)
  })

  test('should return true if autoSelectOption is valid', () => {
    ;['first', 'firstStored', 'firstNonStored', 'none', null].forEach(
      (value) => {
        const valid = validateAutoSelectOption({
          ...defaultOptions,
          value,
        })
        expect(valid).toEqual(true)
      }
    )
  })

  test('should return false if autoSelectOption is not valid', () => {
    const options = {
      ...defaultOptions,
      value: true,
    }
    const error = {
      argument: 'autoSelectOption',
      code: 'argumentError',
      message:
        'true must be "first", "firstStored", "firstNonStored", "none" or null',
    }
    const valid = validateAutoSelectOption(options)
    expect(valid).toEqual(false)
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', error)
  })
})
