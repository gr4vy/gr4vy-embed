import {
  canSkipValidation,
  validateHost,
  validateNumber,
  validateCurrency,
  validateType,
  validateOneOf,
  validateHTMLElement,
  validate,
  emitArgumentError,
} from './validation'

let errorSpy

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('validate()', () => {
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
      bearerToken: `123456`,
    })
    expect(valid).toEqual(true)
  })
})

describe('emitArgumentError()', () => {
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

describe('canSkipValidation()', () => {
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

describe('validateHTMLElement()', () => {
  const defaultOptions = {
    argument: 'element',
    message: 'must be a valid HTML element',
  }

  const argumentError = {
    argument: 'element',
    code: 'argumentError',
    message: 'element must be a valid HTML element',
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
    message: 'frameHost must be a valid host',
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

  const argumentError = {
    argument: 'amount',
    code: 'argumentError',
    message: 'amount must be a valid number',
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
    const valid = validateNumber(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
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
    const options = {
      ...defaultOptions,
      value: 10000000,
      callback: jest.fn(),
    }
    const valid = validateNumber(options)
    expect(valid).toEqual(false)
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

  const argumentError = {
    argument: 'currency',
    code: 'argumentError',
    message: 'currency must be a valid 3-digit currency code',
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
    const valid = validateCurrency(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
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
    argument: 'capture',
    type: 'boolean',
    message: 'must be a boolean',
  }

  const argumentError = {
    argument: 'capture',
    code: 'argumentError',
    message: 'capture must be a boolean',
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
    const valid = validateType(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
  })
})

describe('validateOneOf()', () => {
  const defaultOptions = {
    argument: 'debug',
    allowedValues: ['debug', 'log'],
    message: 'must be set to either',
  }

  const argumentError = {
    argument: 'debug',
    code: 'argumentError',
    message: 'debug must be set to either ["debug","log"]',
  }

  test('should return true if validation can be skipped', () => {
    const options = {
      ...defaultOptions,
      value: null,
      required: false,
      callback: jest.fn(),
    }
    const valid = validateOneOf(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return true if the provided value is valid', () => {
    const options = {
      ...defaultOptions,
      value: 'debug',
      callback: jest.fn(),
    }
    const valid = validateOneOf(options)
    expect(valid).toEqual(true)
    expect(options.callback).not.toHaveBeenCalled()
  })

  test('should return false if the value is not one of the allowed options', () => {
    const options = {
      ...defaultOptions,
      value: 'foo',
      callback: jest.fn(),
    }
    const valid = validateOneOf(options)
    expect(valid).toEqual(false)
    expect(options.callback).toHaveBeenCalledWith(
      'argumentError',
      argumentError
    )
    expect(errorSpy).toHaveBeenCalledWith('Gr4vy - Error', argumentError)
  })
})
