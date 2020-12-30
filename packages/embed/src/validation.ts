import { Config } from './types'

// checks if a value is optional and if it has been set to either undefined or null
export const isOptional = ({
  required,
  value,
}: {
  required: boolean
  value: any
}) => {
  return !required && [undefined, null].includes(value)
}

// Validates a HTML element
export const validateHTMLElement = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: string | HTMLElement
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  if (value instanceof Element) {
    return true
  }

  const element: HTMLElement = document.querySelector(value)
  if ((!required && [undefined, null].includes(value)) || element) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${element} ${message}`,
    callback,
  })
  return false
}

// Validates a URI origin
export const validateOrigin = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  if (!required && [undefined, null].includes(value)) {
    return true
  }

  try {
    new URL(`http://${value}`)
    return true
  } catch {
    emitArgumentError({
      argument,
      message: `${argument} ${message}`,
      callback,
    })
    return false
  }
}

// Validates a number
export const validateNumber = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const number = Number(value)
  const valid = number > 0 && number <= 999999

  if (isOptional({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${argument} ${message}`,
    callback,
  })
  return false
}

// Validates a currency
export const validateCurrency = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = typeof value === 'string' && value.length === 3

  if (isOptional({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${argument} ${message}`,
    callback,
  })
  return false
}

// Validates a type
export const validateType = ({
  argument,
  value,
  message,
  type,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  type: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = typeof value === type

  if (isOptional({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${argument} ${message}`,
    callback,
  })
  return false
}

// Validates that a value is one of the providef values
export const validateOneOf = ({
  argument,
  value,
  allowedValues,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  allowedValues: any[]
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = allowedValues.includes(value)

  if (isOptional({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${argument} ${message} ${JSON.stringify(allowedValues)}`,
    callback,
  })
  return false
}

// Emites an argument error to the command line and to the `onEvent` handler.
export const emitArgumentError = ({
  argument,
  message,
  callback,
}: {
  argument: string
  message: string
  callback?: (name: string, event: { message: string }) => void
}) => {
  const error = {
    code: `emitArgumentError`,
    argument,
    message,
  }
  console.error(`Gr4vy - Error`, error)
  callback?.(`emitArgumentError`, error)
}

// Validates all Config
export const validate = (options: Config) =>
  validateHTMLElement({
    argument: 'element',
    value: options.element,
    message: 'must be a valid HTML element',
    callback: options.onEvent,
  }) &&
  validateHTMLElement({
    argument: 'form',
    value: options.form,
    required: false,
    message: 'must be a valid HTML form element',
    callback: options.onEvent,
  }) &&
  validateOrigin({
    argument: 'iframeHost',
    value: options.iframeHost,
    message: 'must be a valid hostname with an optional :port',
    callback: options.onEvent,
  }) &&
  validateOrigin({
    argument: 'apiHost',
    value: options.iframeHost,
    message: 'must be a valid hostname with an optional :port',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'capture',
    value: options.capture,
    type: 'boolean',
    message: 'must be a boolean',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'showButton',
    value: options.showButton,
    type: 'boolean',
    message: 'must be a boolean',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'onEvent',
    value: options.onEvent,
    type: 'function',
    message: 'must be a function',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'bearerToken',
    value: options.bearerToken,
    type: 'string',
    message: 'must be a string',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'preferResponse',
    value: options.preferResponse,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'externalIdentifier',
    value: options.externalIdentifier,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateCurrency({
    argument: 'currency',
    value: options.currency,
    message: 'must be a valid currency format',
    callback: options.onEvent,
  }) &&
  validateNumber({
    argument: 'amount',
    value: options.amount,
    message: 'must be valid, positive number',
    callback: options.onEvent,
  }) &&
  validateNumber({
    argument: 'timeout',
    value: options.timeout,
    message: 'must be valid, positive number',
    required: false,
    callback: options.onEvent,
  }) &&
  validateOneOf({
    argument: 'debug',
    value: options.debug,
    allowedValues: ['debug', 'log'],
    message: 'must be set to either',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerExternalIdentifier',
    value: options.buyerExternalIdentifier,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerId',
    value: options.buyerId,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  })
