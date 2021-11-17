import { SetupConfig } from './types'

// checks if a value needs validation to pass
export const canSkipValidation = ({
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
  value: string | HTMLElement | Element
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  if (value instanceof Element) {
    return true
  }

  const element: HTMLElement = document.querySelector(value)
  if (canSkipValidation({ required, value }) || element) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

// Validates a URI origin
export const validateHost = ({
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
  if (canSkipValidation({ required, value })) {
    return true
  }

  let valid = false

  try {
    const url = new URL(`http://${value}`)
    valid = value === url.host
  } catch {
    // do nothing here
  }

  if (!valid) {
    emitArgumentError({
      argument,
      message: `${value} ${message}`,
      callback,
    })
  }

  return valid
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
  const valid = number >= 0 && number <= 999999

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
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

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

export const validateIntent = ({
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
  const valid =
    typeof value === 'string' &&
    ['authorize', 'capture', 'approve'].includes(value)

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

export const validateStore = ({
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
  const valid = [true, false, 'ask'].includes(value)

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
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

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
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
    code: `argumentError`,
    argument,
    message,
  }
  console.error(`Gr4vy - Error`, error)
  callback?.(`argumentError`, error)
}

// Validates all Config
export const validate = (options: SetupConfig) =>
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
  validateType({
    argument: 'gr4vyId',
    value: options.gr4vyId,
    required: !options.iframeHost && !options.apiHost,
    type: 'string',
    message: 'must be a valid gr4vyId or iframeHost/apiHost',
    callback: options.onEvent,
  }) &&
  validateHost({
    argument: 'iframeHost',
    value: options.iframeHost,
    required: !options.gr4vyId,
    message: 'must be a valid hostname with an optional :port',
    callback: options.onEvent,
  }) &&
  validateHost({
    argument: 'apiHost',
    value: options.apiHost,
    message: 'must be a valid hostname with an optional :port',
    required: !options.gr4vyId,
    callback: options.onEvent,
  }) &&
  validateIntent({
    argument: 'intent',
    value: options.intent,
    message: 'must be a valid intent',
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
    argument: 'token',
    value: options.token,
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
    message: 'must be valid non-negative number',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'debug',
    value: options.debug,
    type: 'boolean',
    message: 'must be a boolean',
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
  }) &&
  validateType({
    argument: 'environment',
    value: options.environment,
    type: 'string',
    message: 'must be "production" or "sandbox"',
    required: false,
    callback: options.onEvent,
  }) &&
  validateStore({
    argument: 'store',
    value: options.store,
    message: 'must be true, false or "ask"',
    required: false,
  }) &&
  validateType({
    argument: 'country',
    value: options.country,
    type: 'string',
    message: 'must be a string ISO country code',
    required: true,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'display',
    value: options.display,
    type: 'string',
    message: 'must be "storedOnly", "addOnly", "supportsTokenization" or "all"',
    required: false,
  })
